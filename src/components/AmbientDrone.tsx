import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { SupportedLang } from '../data/types';

interface AmbientDroneProps {
  lang: SupportedLang;
}

export function AmbientDrone({ lang }: AmbientDroneProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Sub-bass root tone (55 Hz - A1)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Low harmonic drone (82.4 Hz - E2 fifth)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

      // Lowpass filter for deep submerged atmospheric hum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);

      // LFO for slow breathing filter pulse
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(50, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      lfo.start();
    }
  };

  const toggleSound = async () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      return;
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      setTimeout(() => {
        audioCtxRef.current?.suspend();
        setIsPlaying(false);
      }, 250);
    } else {
      await audioCtxRef.current.resume();
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.2);
      }
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(newVol, audioCtxRef.current.currentTime, 0.05);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const titleText = {
    de: 'Dystopische Klangatmosphäre umschalten',
    en: 'Toggle dystopian ambient drone',
    es: 'Activar/desactivar atmósfera ambiental distópica',
    fr: 'Basculer l’ambiance sonore dystopique',
  }[lang];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-book rounded transition-colors whitespace-nowrap shrink-0 border ${
          isPlaying
            ? 'bg-red-950/80 text-red-300 border-red-700/60 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
            : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
        }`}
        title={titleText}
      >
        {isPlaying ? (
          <>
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">AMB: ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">AMB: OFF</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-stone-900/80 border border-stone-800 rounded">
          <Volume2 className="w-3 h-3 text-stone-400" />
          <input
            type="range"
            min="0.05"
            max="0.6"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 accent-red-600 bg-stone-700 rounded cursor-pointer"
            title="Ambient Volume"
          />
        </div>
      )}
    </div>
  );
}
