import { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  Clock,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { BOOK_METADATA, CHAPTERS, Chapter } from '../data/chapters';
import { SupportedLang } from '../data/types';

interface TableOfContentsProps {
  onSelectChapter: (id: number) => void;
  lang: SupportedLang;
  bookmarkedIds: number[];
  onToggleBookmark: (id: number) => void;
  readChapterIds: number[];
}

export function TableOfContents({
  onSelectChapter,
  lang,
  bookmarkedIds,
  onToggleBookmark,
  readChapterIds,
}: TableOfContentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  const totalReadTime = CHAPTERS.reduce((acc, c) => acc + c.readTimeMin, 0);

  const filteredChapters = CHAPTERS.filter((chapter) => {
    if (filterBookmarked && !bookmarkedIds.includes(chapter.id)) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const titleMatch = (chapter.title[lang] || chapter.title.en).toLowerCase().includes(query);
    const themeMatch = (chapter.theme[lang] || chapter.theme.en).toLowerCase().includes(query);
    const quoteMatch = (chapter.quote[lang] || chapter.quote.en).toLowerCase().includes(query);
    const numMatch = chapter.number.includes(query);
    const dossierMatch = (chapter.dossier.caseStudy.title[lang] || chapter.dossier.caseStudy.title.en).toLowerCase().includes(query);

    return titleMatch || themeMatch || quoteMatch || numMatch || dossierMatch;
  });

  const labels = {
    de: {
      chapters: 'Kapitel',
      totalReadTime: 'Gesamtlesezeit',
      completed: 'Gelesen',
      searchPlaceholder: 'Kapitel, Thesen oder Dossiers durchsuchen...',
      bookmarkedOnly: 'Nur Gemerkte',
      read: 'Lesen',
      noResults: 'Keine Kapitel gefunden, die den Suchkriterien entsprechen.',
      chapterPrefix: 'KAPITEL',
    },
    en: {
      chapters: 'Chapters',
      totalReadTime: 'Total Read Time',
      completed: 'Completed',
      searchPlaceholder: 'Search chapters, doctrines, or dossiers...',
      bookmarkedOnly: 'Bookmarked',
      read: 'Read',
      noResults: 'No chapters found matching your filter criteria.',
      chapterPrefix: 'CHAPTER',
    },
    es: {
      chapters: 'Capítulos',
      totalReadTime: 'Tiempo Total de Lectura',
      completed: 'Leídos',
      searchPlaceholder: 'Buscar capítulos, doctrinas o expedientes...',
      bookmarkedOnly: 'Guardados',
      read: 'Leer',
      noResults: 'No se encontraron capítulos que coincidan con los criterios.',
      chapterPrefix: 'CAPÍTULO',
    },
    fr: {
      chapters: 'Chapitres',
      totalReadTime: 'Temps Total de Lecture',
      completed: 'Lus',
      searchPlaceholder: 'Rechercher chapitres, thèses ou dossiers...',
      bookmarkedOnly: 'Enregistrés',
      read: 'Lire',
      noResults: 'Aucun chapitre trouvé correspondant à vos critères.',
      chapterPrefix: 'CHAPITRE',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Book Marquee Hero */}
        <section className="relative overflow-hidden p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#131b26] to-[#0d141e] border border-stone-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-book uppercase tracking-widest text-red-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                {BOOK_METADATA.edition}
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>{BOOK_METADATA.author}</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>{BOOK_METADATA.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand-book font-black tracking-tight text-stone-100">
              {BOOK_METADATA.title[lang] || BOOK_METADATA.title.en}
            </h1>

            <p className="text-base sm:text-lg font-display-book text-stone-300 leading-relaxed italic">
              {BOOK_METADATA.subtitle[lang] || BOOK_METADATA.subtitle.en}
            </p>

            {/* Epigraph */}
            <div className="p-4 sm:p-5 rounded-lg bg-black/40 border border-red-950/40 text-stone-300 text-sm italic font-serif-book">
              "{BOOK_METADATA.epigraph[lang] || BOOK_METADATA.epigraph.en}"
            </div>

            {/* Overview Stats */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono-book text-stone-400 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-500" />
                <span>12 {labels.chapters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>~{totalReadTime} min {labels.totalReadTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span>
                  {readChapterIds.length} / 12 {labels.completed}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono-book bg-[#131b26] border border-stone-800 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterBookmarked(!filterBookmarked)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono-book rounded-lg border transition-colors ${
                filterBookmarked
                  ? 'bg-amber-950/60 text-amber-300 border-amber-700'
                  : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${filterBookmarked ? 'fill-current text-amber-400' : ''}`} />
              <span>
                {labels.bookmarkedOnly} ({bookmarkedIds.length})
              </span>
            </button>
          </div>
        </div>

        {/* 12 Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChapters.map((chapter: Chapter) => {
            const isBookmarked = bookmarkedIds.includes(chapter.id);

            return (
              <div
                key={chapter.id}
                className="group relative flex flex-col justify-between p-6 rounded-xl bg-[#121926] border border-stone-800/80 hover:border-red-600/70 transition-all duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono-book">
                    <span className="text-red-500 font-bold tracking-wider">
                      {labels.chapterPrefix} {chapter.number}
                    </span>
                    <div className="flex items-center gap-3 text-stone-500">
                      <span>{chapter.readTimeMin} min</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(chapter.id);
                        }}
                        className="hover:text-amber-400 p-0.5 transition-colors"
                        title="Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-amber-400 fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectChapter(chapter.id)}
                    className="text-xl font-display-book font-bold text-stone-100 group-hover:text-red-400 cursor-pointer transition-colors mb-2"
                  >
                    {chapter.title[lang] || chapter.title.en}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {chapter.theme[lang] || chapter.theme.en}
                  </p>

                  <div className="p-3 rounded-lg bg-black/40 border border-stone-800/60 mb-4 text-xs italic font-serif-book text-stone-300 line-clamp-2">
                    "{chapter.quote[lang] || chapter.quote.en}"
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono-book">
                  <span className="text-stone-500 truncate max-w-[200px]">
                    {chapter.dossier.caseStudy.title[lang] || chapter.dossier.caseStudy.title.en}
                  </span>
                  <button
                    onClick={() => onSelectChapter(chapter.id)}
                    className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{labels.read}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredChapters.length === 0 && (
          <div className="text-center py-16 text-stone-500 font-mono-book text-xs">
            {labels.noResults}
          </div>
        )}
      </div>
    </div>
  );
}
