import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Square, FastForward, Volume2, X } from 'lucide-react';
import { Chapter } from '../data/chapters';
import { SupportedLang } from '../data/types';

interface AudioNarrationProps {
  chapter: Chapter;
  lang: SupportedLang;
  onClose?: () => void;
}

export function AudioNarration({ chapter, lang, onClose }: AudioNarrationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [progressPercent, setProgressPercent] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Compile full chapter text in active language
  const fullText = [
    chapter.title[lang],
    chapter.theme[lang],
    chapter.quote[lang],
    ...chapter.sections.flatMap((s) => [s.heading[lang], ...s.paragraphs[lang]]),
  ].join('. ');

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgressPercent(0);
  };

  const getVoiceLang = (l: SupportedLang) => {
    switch (l) {
      case 'de':
        return 'de-DE';
      case 'es':
        return 'es-ES';
      case 'fr':
        return 'fr-FR';
      case 'en':
      default:
        return 'en-US';
    }
  };

  const [unsupported, setUnsupported] = useState(false);

  const playAudio = () => {
    if (!('speechSynthesis' in window)) {
      setUnsupported(true);
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = getVoiceLang(lang);
    utterance.rate = rate;
    utterance.pitch = 0.95; // Deep authoritative timbre

    utterance.onboundary = (e) => {
      if (e.charIndex && fullText.length) {
        const pct = Math.min(100, Math.round((e.charIndex / fullText.length) * 100));
        setProgressPercent(pct);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgressPercent(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const changeRate = (newRate: number) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      stopAudio();
      setTimeout(() => playAudio(), 100);
    }
  };

  useEffect(() => {
    stopAudio();
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [chapter.id, lang]);

  const labels = {
    de: { narrator: 'Audio-Narrator', listen: 'Anhören', resume: 'Fortsetzen', pause: 'Pause', stop: 'Stopp' },
    en: { narrator: 'Audio Narration', listen: 'Listen', resume: 'Resume', pause: 'Pause', stop: 'Stop' },
    es: { narrator: 'Narración de Audio', listen: 'Escuchar', resume: 'Reanudar', pause: 'Pausar', stop: 'Detener' },
    fr: { narrator: 'Narration Audio', listen: 'Écouter', resume: 'Reprendre', pause: 'Pause', stop: 'Arrêter' },
  }[lang];

  return (
    <div className="fixed bottom-16 md:bottom-6 right-3 md:right-6 left-3 md:left-auto z-40 max-w-sm w-auto md:w-full p-4 bg-[#111722]/95 backdrop-blur-md border border-red-900/40 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-stone-200">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-red-500" />
          <span className="text-xs font-mono-book uppercase tracking-wider text-stone-400">
            {labels.narrator} · Ch. {chapter.number} ({lang.toUpperCase()})
          </span>
        </div>
        {onClose && (
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="text-stone-400 hover:text-stone-100 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="text-sm font-semibold truncate text-stone-100 mb-2">
        {chapter.title[lang]}
      </div>

      {unsupported && (
        <div className="text-xs text-amber-400 bg-amber-950/40 p-2 rounded mb-2 border border-amber-900/40 font-mono-book">
          Browser-Sprachausgabe wird in dieser Umgebung nicht unterstützt.
        </div>
      )}

      {/* Progress track */}
      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className="bg-red-600 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={playAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
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
            <button
              onClick={stopAudio}
              className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
              title={labels.stop}
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-1 text-xs font-mono-book text-stone-400">
          <FastForward className="w-3 h-3 text-stone-500" />
          {[0.9, 1.0, 1.25].map((speed) => (
            <button
              key={speed}
              onClick={() => changeRate(speed)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                rate === speed
                  ? 'bg-red-950 text-red-300 font-bold border border-red-800'
                  : 'hover:text-stone-200'
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
