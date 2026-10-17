import { useState, useRef, useEffect } from 'react';
import { Sliders, Bookmark, Globe, ChevronDown } from 'lucide-react';
import { AmbientDrone } from './AmbientDrone';
import { SupportedLang } from '../data/types';

export type ActiveTab = 'reader' | 'toc' | 'dossier' | 'export';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
  onOpenSettings: () => void;
  bookmarksCount: number;
}

const LANGUAGES: Array<{ code: SupportedLang; label: string; full: string }> = [
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'es', label: 'ES', full: 'Español' },
  { code: 'fr', label: 'FR', full: 'Français' },
];

export function Navbar({
  activeTab,
  onSelectTab,
  lang,
  onSelectLang,
  onOpenSettings,
  bookmarksCount,
}: NavbarProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLabels = {
    de: {
      brand: 'DAS ROTE INTERNET',
      read: 'Buch lesen',
      chapters: 'Kapitel',
      dossier: 'Reale Dossiers',
      export: 'Druck & Export',
    },
    en: {
      brand: 'THE RED INTERNET',
      read: 'Read Book',
      chapters: 'Chapters',
      dossier: 'Case Dossiers',
      export: 'Export & Print',
    },
    es: {
      brand: 'LA RED ROJA',
      read: 'Leer Libro',
      chapters: 'Capítulos',
      dossier: 'Expedientes',
      export: 'Imprimir y Exportar',
    },
    fr: {
      brand: "L'INTERNET ROUGE",
      read: 'Lire le Livre',
      chapters: 'Chapitres',
      dossier: 'Dossiers Réels',
      export: 'Imprimer / Exporter',
    },
  }[lang];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5 bg-[#0b0f17]/95 backdrop-blur-md border-b border-stone-800/80">
      {/* Zone 1: Single text wordmark */}
      <button
        onClick={() => onSelectTab('reader')}
        className="text-left group flex items-baseline gap-2 whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span className="text-base sm:text-lg font-brand-book font-bold tracking-widest text-red-500 group-hover:text-red-400 transition-colors">
          {navLabels.brand}
        </span>
      </button>

      {/* Zone 2: 4 single-line clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wider uppercase text-stone-400">
        <button
          onClick={() => onSelectTab('reader')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'reader' ? 'text-red-400 border-red-500 font-semibold' : 'border-transparent'
          }`}
        >
          {navLabels.read}
        </button>

        <button
          onClick={() => onSelectTab('toc')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'toc' ? 'text-red-400 border-red-500 font-semibold' : 'border-transparent'
          }`}
        >
          {navLabels.chapters}
        </button>

        <button
          onClick={() => onSelectTab('dossier')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'dossier' ? 'text-red-400 border-red-500 font-semibold' : 'border-transparent'
          }`}
        >
          {navLabels.dossier}
        </button>

        <button
          onClick={() => onSelectTab('export')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'export' ? 'text-red-400 border-red-500 font-semibold' : 'border-transparent'
          }`}
        >
          {navLabels.export}
        </button>
      </nav>

      {/* Zone 3: Primary utilities & language selection */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Ambient audio generator */}
        <AmbientDrone lang={lang} />

        {/* Bookmarks indicator */}
        {bookmarksCount > 0 && (
          <button
            onClick={() => onSelectTab('toc')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono-book text-amber-300 bg-amber-950/40 border border-amber-900/50 rounded whitespace-nowrap"
            title={`${bookmarksCount} bookmarks`}
          >
            <Bookmark className="w-3 h-3 fill-current text-amber-400" />
            <span>{bookmarksCount}</span>
          </button>
        )}

        {/* 4-Language Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-book font-bold text-stone-200 bg-stone-900 border border-stone-800 hover:border-red-600 rounded transition-colors whitespace-nowrap"
            title="Switch Language / Sprache wählen"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span className="text-red-400">{lang.toUpperCase()}</span>
            <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-36 py-1 bg-[#131b26] border border-stone-800 rounded-lg shadow-xl z-50">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    onSelectLang(item.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono-book text-left transition-colors ${
                    lang === item.code
                      ? 'bg-red-950/60 text-red-300 font-bold'
                      : 'text-stone-300 hover:bg-stone-800/80'
                  }`}
                >
                  <span>{item.full}</span>
                  <span className="text-[10px] text-stone-500 font-mono">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-stone-400 hover:text-stone-100 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded transition-colors"
          title="Reader Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
