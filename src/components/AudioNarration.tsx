import { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Pause, Square, FastForward, Volume2, X, Loader2 } from 'lucide-react';
import { Chapter } from '../data/chapters';
import { SupportedLang } from '../data/types';
import { TtsSession } from '@mintplex-labs/piper-tts-web';

interface AudioNarrationProps {
  chapter: Chapter;
  lang: SupportedLang;
  onClose?: () => void;
}

/** Neuronale Piper-Stimmen je Sprache (moderne Modelle). */
const PIPER_STIMME: Record<SupportedLang, string> = {
  de: 'de_DE-thorsten-medium',
  en: 'en_US-lessac-medium',
  es: 'es_ES-davefx-medium',
  fr: 'fr_FR-siwis-medium',
};

const SYSTEM_LANG: Record<SupportedLang, string> = { de: 'de-DE', en: 'en-US', es: 'es-ES', fr: 'fr-FR' };

/** Laufzeitdateien liegen selbst gehostet unter ./tts-runtime/ */
function wasmPfade() {
  const basis = new URL('tts-runtime/', document.baseURI).href;
  return {
    onnxWasm: basis,
    piperData: basis + 'piper_phonemize.data',
    piperWasm: basis + 'piper_phonemize.wasm',
  };
}

/** Text in sprechbare Einheiten zerlegen — satzweise Synthese bleibt flüssig. */
function inSaetze(text: string, maxLaenge = 240): string[] {
  const grob = text.match(/[^.!?…]+[.!?…]+[\s]*|[^.!?…]+$/g) ?? [text];
  const out: string[] = [];
  let puffer = '';
  for (const teil of grob) {
    const sauber = teil.trim();
    if (!sauber) continue;
    if (puffer && (puffer + ' ' + sauber).length > maxLaenge) {
      out.push(puffer.trim());
      puffer = sauber;
    } else {
      puffer = (puffer + ' ' + sauber).trim();
    }
  }
  if (puffer.trim()) out.push(puffer.trim());
  return out.length ? out : [text];
}

export function AudioNarration({ chapter, lang, onClose }: AudioNarrationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [ladeFortschritt, setLadeFortschritt] = useState<number | null>(null);
  const [engine, setEngine] = useState<'piper' | 'system' | null>(null);

  const saetzeRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const sessionRef = useRef<TtsSession | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobCache = useRef<Map<number, string>>(new Map());
  const abbruchRef = useRef(false);

  const fullText = [
    chapter.title[lang],
    chapter.theme[lang],
    chapter.quote[lang],
    ...chapter.sections.flatMap((s) => [s.heading[lang], ...s.paragraphs[lang]]),
  ].join('. ');

  const aufraeumen = useCallback(() => {
    abbruchRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    blobCache.current.forEach((url) => URL.revokeObjectURL(url));
    blobCache.current.clear();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgressPercent(0);
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    aufraeumen();
    saetzeRef.current = inSaetze(fullText);
    setStatus(null);
    setEngine(null);
    return () => {
      abbruchRef.current = true;
      if (audioRef.current) audioRef.current.pause();
      blobCache.current.forEach((url) => URL.revokeObjectURL(url));
      blobCache.current.clear();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [chapter.id, lang, fullText, aufraeumen]);

  /** Gerätestimme, satzweise (Chrome bricht lange Ansagen nach ~15 s ab). */
  const sprichSystem = useCallback(
    (index: number) => {
      if (!('speechSynthesis' in window)) {
        setStatus('Dieser Browser hat keine Sprachausgabe.');
        setIsPlaying(false);
        return;
      }
      const saetze = saetzeRef.current;
      if (index >= saetze.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setProgressPercent(100);
        return;
      }
      const u = new SpeechSynthesisUtterance(saetze[index]);
      const ziel = SYSTEM_LANG[lang];
      u.lang = ziel;
      u.rate = rate;
      const stimmen = window.speechSynthesis.getVoices();
      const passend =
        stimmen.find((v) => v.lang.replace('_', '-') === ziel) ??
        stimmen.find((v) => v.lang.toLowerCase().startsWith(ziel.slice(0, 2)));
      if (passend) u.voice = passend;
      else if (stimmen.length === 0) setStatus('Im Browser ist keine Stimme installiert.');
      u.onend = () => {
        if (abbruchRef.current) return;
        indexRef.current = index + 1;
        setProgressPercent(Math.round(((index + 1) / saetze.length) * 100));
        sprichSystem(index + 1);
      };
      u.onerror = () => {
        if (abbruchRef.current) return;
        setStatus('Die Gerätestimme hat abgebrochen.');
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(u);
    },
    [lang, rate]
  );

  /** Spielt einen fertigen Blob und stößt den nächsten Satz an. */
  const spieleBlob = useCallback(
    (url: string, index: number) => {
      const audio = new Audio(url);
      audio.playbackRate = rate;
      audioRef.current = audio;
      audio.onended = () => {
        if (abbruchRef.current) return;
        const naechster = index + 1;
        indexRef.current = naechster;
        setProgressPercent(Math.round((naechster / saetzeRef.current.length) * 100));
        void sprichPiper(naechster);
      };
      void audio.play().catch(() => {
        setStatus('Der Browser hat die Wiedergabe blockiert — bitte erneut auf „Anhören" tippen.');
        setIsPlaying(false);
      });
    },
    [rate]
  );

  /** Neuronale Synthese (Piper). Lädt die Stimme beim ersten Mal und cached sie im Browser. */
  const sprichPiper = useCallback(
    async (index: number) => {
      if (abbruchRef.current) return;
      const saetze = saetzeRef.current;
      if (index >= saetze.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setProgressPercent(100);
        return;
      }
      try {
        if (!sessionRef.current) {
          setStatus('Sprachmodell wird geladen (einmalig) …');
          sessionRef.current = await TtsSession.create({
            voiceId: PIPER_STIMME[lang] as never,
            wasmPaths: wasmPfade(),
            progress: (p) => {
              if (p.total) setLadeFortschritt(Math.round((p.loaded / p.total) * 100));
            },
          });
          setLadeFortschritt(null);
          setEngine('piper');
          setStatus(null);
        }
        if (abbruchRef.current) return;
        let url = blobCache.current.get(index);
        if (!url) {
          const blob = await sessionRef.current.predict(saetze[index]);
          if (abbruchRef.current) return;
          url = URL.createObjectURL(blob);
          blobCache.current.set(index, url);
        }
        setEngine('piper');
        spieleBlob(url, index);
        const folge = index + 1;
        if (folge < saetze.length && !blobCache.current.has(folge) && sessionRef.current) {
          void sessionRef.current
            .predict(saetze[folge])
            .then((b) => {
              if (!abbruchRef.current) blobCache.current.set(folge, URL.createObjectURL(b));
            })
            .catch(() => undefined);
        }
      } catch (e) {
        setLadeFortschritt(null);
        const meldung = e instanceof Error ? e.message : String(e);
        setEngine('system');
        setStatus(`Neuronale Stimme nicht verfügbar — nutze Gerätestimme (${meldung.slice(0, 50)}).`);
        sprichSystem(index);
      }
    },
    [lang, spieleBlob, sprichSystem]
  );

  const starte = () => {
    abbruchRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    setStatus(null);
    const weiter = indexRef.current;
    if (engine === 'system') sprichSystem(weiter);
    else void sprichPiper(weiter);
  };

  const playAudio = () => {
    if (isPaused) {
      if (engine === 'system' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }
      if (audioRef.current) {
        void audioRef.current.play();
        setIsPaused(false);
        setIsPlaying(true);
        return;
      }
    }
    starte();
  };

  const pauseAudio = () => {
    if (engine === 'system' && 'speechSynthesis' in window) window.speechSynthesis.pause();
    if (audioRef.current) audioRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const changeRate = (neu: number) => {
    setRate(neu);
    if (audioRef.current) audioRef.current.playbackRate = neu;
  };

  const labels = {
    de: { narrator: 'Vorlesen', listen: 'Anhören', resume: 'Fortsetzen', pause: 'Pause', stop: 'Stopp' },
    en: { narrator: 'Narration', listen: 'Listen', resume: 'Resume', pause: 'Pause', stop: 'Stop' },
    es: { narrator: 'Narración', listen: 'Escuchar', resume: 'Reanudar', pause: 'Pausar', stop: 'Detener' },
    fr: { narrator: 'Narration', listen: 'Écouter', resume: 'Reprendre', pause: 'Pause', stop: 'Arrêter' },
  }[lang];

  return (
    <div className="fixed bottom-16 md:bottom-6 right-3 md:right-6 left-3 md:left-auto z-40 max-w-sm w-auto md:w-full p-4 bg-[#111722]/95 backdrop-blur-md border border-red-900/40 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-stone-200">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-red-500" />
          <span className="text-xs font-mono-book uppercase tracking-wider text-stone-400">
            {labels.narrator} · Ch. {chapter.number} ({lang.toUpperCase()})
            {engine && <span className="ml-1 text-stone-500">· {engine === 'piper' ? 'neural' : 'Gerät'}</span>}
          </span>
        </div>
        {onClose && (
          <button
            onClick={() => {
              aufraeumen();
              onClose();
            }}
            className="text-stone-400 hover:text-stone-100 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="text-sm font-semibold truncate text-stone-100 mb-2">{chapter.title[lang]}</div>

      {ladeFortschritt !== null && (
        <div className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded mb-2 border border-amber-900/40 font-mono-book flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Stimme wird geladen … {ladeFortschritt} %
        </div>
      )}

      {status && ladeFortschritt === null && (
        <div className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded mb-2 border border-amber-900/40 font-mono-book">
          {status}
        </div>
      )}

      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-3">
        <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={playAudio}
              disabled={ladeFortschritt !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-lg transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPaused ? labels.resume : labels.listen}</span>
            </button>
          ) : (
            <button
              onClick={pauseAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{labels.pause}</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button onClick={aufraeumen} className="p-1.5 text-stone-400 hover:text-red-400 transition-colors" title={labels.stop}>
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-mono-book text-stone-400">
          <FastForward className="w-3 h-3 text-stone-500" />
          {[0.9, 1.0, 1.25].map((speed) => (
            <button
              key={speed}
              onClick={() => changeRate(speed)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                rate === speed ? 'bg-red-950 text-red-300 font-bold border border-red-800' : 'hover:text-stone-200'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
