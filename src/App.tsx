import { useState, useEffect } from 'react';
import { CHAPTERS } from './data/chapters';
import { SupportedLang } from './data/types';
import { Navbar, ActiveTab } from './components/Navbar';
import { Reader } from './components/Reader';
import { TableOfContents } from './components/TableOfContents';
import { DossierDrawer } from './components/DossierDrawer';
import { ExportView } from './components/ExportView';
import { AudioNarration } from './components/AudioNarration';
import { ReaderSettingsModal, ReaderSettings } from './components/ReaderSettingsModal';

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 'base',
  fontFamily: 'serif',
  theme: 'obsidian',
  scanlines: false,
};

export default function App() {
  // Current active chapter
  const [currentChapterId, setCurrentChapterId] = useState<number>(() => {
    const saved = localStorage.getItem('red_internet_chapter');
    return saved ? Math.min(12, Math.max(1, parseInt(saved, 10))) : 1;
  });

  // Language state (defaults to German since initial user request was in German)
  const [lang, setLang] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem('red_internet_lang') as SupportedLang;
    if (saved && ['de', 'en', 'es', 'fr'].includes(saved)) {
      return saved;
    }
    return 'de';
  });

  // Current view tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('reader');

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('red_internet_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Read chapters tracking
  const [readChapterIds, setReadChapterIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('red_internet_read_chapters');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Reader Settings
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem('red_internet_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAudioNarrationOpen, setIsAudioNarrationOpen] = useState(false);
  const [dossierInitialChapterId, setDossierInitialChapterId] = useState<number | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('red_internet_chapter', currentChapterId.toString());
  }, [currentChapterId]);

  useEffect(() => {
    localStorage.setItem('red_internet_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('red_internet_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('red_internet_read_chapters', JSON.stringify(readChapterIds));
  }, [readChapterIds]);

  useEffect(() => {
    localStorage.setItem('red_internet_settings', JSON.stringify(settings));
  }, [settings]);

  const handleSelectChapter = (id: number) => {
    setCurrentChapterId(id);
    setActiveTab('reader');
    if (!readChapterIds.includes(id)) {
      setReadChapterIds((prev) => [...prev, id]);
    }
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectLang = (newLang: SupportedLang) => {
    setLang(newLang);
  };

  const handleOpenDossierDetail = (chapterId: number) => {
    setDossierInitialChapterId(chapterId);
    setActiveTab('dossier');
  };

  const currentChapter =
    CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  return (
    <div className="relative min-h-screen bg-[#0b0f17] text-stone-200">
      {/* Optional CRT Scanlines & Glitch Atmosphere Overlay */}
      {settings.scanlines && (
        <div className="fixed inset-0 pointer-events-none z-50 scanline-overlay crt-vignette" />
      )}

      {/* Top Bar Navigation */}
      {activeTab !== 'export' && (
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          lang={lang}
          onSelectLang={handleSelectLang}
          onOpenSettings={() => setIsSettingsOpen(true)}
          bookmarksCount={bookmarkedIds.length}
        />
      )}

      {/* Main Views */}
      {activeTab === 'reader' && (
        <Reader
          chapter={currentChapter}
          onSelectChapter={handleSelectChapter}
          lang={lang}
          settings={settings}
          isBookmarked={bookmarkedIds.includes(currentChapter.id)}
          onToggleBookmark={handleToggleBookmark}
          onStartAudio={() => setIsAudioNarrationOpen(true)}
          onOpenDossierDetail={handleOpenDossierDetail}
        />
      )}

      {activeTab === 'toc' && (
        <TableOfContents
          onSelectChapter={handleSelectChapter}
          lang={lang}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          readChapterIds={readChapterIds}
        />
      )}

      {activeTab === 'dossier' && (
        <DossierDrawer
          onSelectChapter={handleSelectChapter}
          lang={lang}
          initialChapterId={dossierInitialChapterId}
        />
      )}

      {activeTab === 'export' && (
        <ExportView
          onBackToReader={() => setActiveTab('reader')}
          lang={lang}
        />
      )}

      {/* Audio Narration Player */}
      {isAudioNarrationOpen && (
        <AudioNarration
          chapter={currentChapter}
          lang={lang}
          onClose={() => setIsAudioNarrationOpen(false)}
        />
      )}

      {/* Mobile Bottom Tab Bar (Visible only on small screens < md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0d141e]/95 backdrop-blur-md border-t border-stone-800/80 px-2 py-1.5 flex items-center justify-around text-[10px] font-mono-book uppercase">
        <button
          onClick={() => setActiveTab('reader')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'reader' ? 'text-red-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="text-xs">📖</span>
          <span>
            {lang === 'de' ? 'Lesen' : lang === 'es' ? 'Lectura' : lang === 'fr' ? 'Lecture' : 'Read'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('toc')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'toc' ? 'text-red-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="text-xs">📑</span>
          <span>
            {lang === 'de' ? 'Kapitel' : lang === 'es' ? 'Capítulos' : lang === 'fr' ? 'Chapitres' : 'Chapters'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('dossier')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'dossier' ? 'text-red-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="text-xs">⚖️</span>
          <span>
            {lang === 'de' ? 'Dossiers' : lang === 'es' ? 'Expedientes' : lang === 'fr' ? 'Dossiers' : 'Dossiers'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'export' ? 'text-red-400 font-bold' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="text-xs">🖨️</span>
          <span>
            {lang === 'de' ? 'Export' : lang === 'es' ? 'Imprimir' : lang === 'fr' ? 'Imprimer' : 'Export'}
          </span>
        </button>
      </nav>

      {/* Reader Settings Modal */}
      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newPartial) =>
          setSettings((prev) => ({ ...prev, ...newPartial }))
        }
        lang={lang}
      />
    </div>
  );
}
