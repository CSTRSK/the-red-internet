import { useState } from 'react';
import { Printer, ArrowLeft, ExternalLink } from 'lucide-react';
import { BOOK_METADATA, CHAPTERS } from '../data/chapters';
import { SupportedLang } from '../data/types';

interface ExportViewProps {
  onBackToReader: () => void;
  lang: SupportedLang;
}

export function ExportView({ onBackToReader, lang }: ExportViewProps) {
  const [includeDossiers, setIncludeDossiers] = useState(true);
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');

  const handlePrint = () => {
    window.print();
  };

  const displayedChapters =
    selectedChapterId === 'all'
      ? CHAPTERS
      : CHAPTERS.filter((c) => c.id === selectedChapterId);

  const labels = {
    de: {
      back: 'Zurück zum Lese-Modus',
      allChapters: 'Gesamtes Buch (12 Kapitel)',
      includeDossiers: 'Dossiers & Primärquellen einbinden',
      printPdf: 'Drucken / Als PDF speichern',
      chapterPrefix: 'KAPITEL',
      dossierHeading: 'RECHTLICHES DOSSIER & PRIMÄRQUELLE',
      jurisdiction: 'Gerichtsbarkeit',
      officialSource: 'Offizielle Quelle',
    },
    en: {
      back: 'Back to Reader Mode',
      allChapters: 'Full Book (All 12 Chapters)',
      includeDossiers: 'Include Dossiers & Primary Sources',
      printPdf: 'Print / Save as PDF',
      chapterPrefix: 'CHAPTER',
      dossierHeading: 'LEGAL DOSSIER & PRIMARY SOURCE',
      jurisdiction: 'Jurisdiction',
      officialSource: 'Official Source',
    },
    es: {
      back: 'Volver al Modo Lectura',
      allChapters: 'Libro Completo (12 Capítulos)',
      includeDossiers: 'Incluir Expedientes y Fuentes Primarias',
      printPdf: 'Imprimir / Guardar como PDF',
      chapterPrefix: 'CAPÍTULO',
      dossierHeading: 'EXPEDIENTE LEGAL Y FUENTE PRIMARIA',
      jurisdiction: 'Jurisdicción',
      officialSource: 'Fuente Oficial',
    },
    fr: {
      back: 'Retour au Mode Lecture',
      allChapters: 'Livre Complet (12 Chapitres)',
      includeDossiers: 'Inclure Dossiers et Sources Primaires',
      printPdf: 'Imprimer / Enregistrer en PDF',
      chapterPrefix: 'CHAPITRE',
      dossierHeading: 'DOSSIER JURIDIQUE ET SOURCE PRIMAIRE',
      jurisdiction: 'Juridiction',
      officialSource: 'Source Officielle',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Utility Controls */}
      <div className="no-print max-w-4xl mx-auto mb-8 p-4 bg-white border border-stone-300 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToReader}
          className="flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{labels.back}</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedChapterId}
            onChange={(e) =>
              setSelectedChapterId(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="text-xs py-1.5 px-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-700 font-mono"
          >
            <option value="all">{labels.allChapters}</option>
            {CHAPTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.number}. {c.title[lang] || c.title.en}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeDossiers}
              onChange={(e) => setIncludeDossiers(e.target.checked)}
              className="accent-red-600 rounded"
            />
            <span>{labels.includeDossiers}</span>
          </label>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{labels.printPdf}</span>
          </button>
        </div>
      </div>

      {/* Book Document Body */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-14 border border-stone-200 shadow-xl rounded-xl space-y-16">
        
        {/* Title Page */}
        <div className="text-center py-16 border-b border-stone-300 space-y-6">
          <div className="text-xs font-mono tracking-widest uppercase text-stone-500">
            {BOOK_METADATA.edition} · {BOOK_METADATA.year}
          </div>
          <h1 className="text-4xl sm:text-5xl font-display-book font-bold tracking-tight text-stone-950">
            {BOOK_METADATA.title[lang] || BOOK_METADATA.title.en}
          </h1>
          <p className="text-base sm:text-lg font-serif-book italic text-stone-600 max-w-xl mx-auto">
            {BOOK_METADATA.subtitle[lang] || BOOK_METADATA.subtitle.en}
          </p>
          <div className="pt-8 text-xs font-mono text-stone-500">
            {BOOK_METADATA.author}
          </div>
          <div className="max-w-md mx-auto pt-6 text-xs italic text-stone-600 border-t border-stone-200">
            "{BOOK_METADATA.epigraph[lang] || BOOK_METADATA.epigraph.en}"
          </div>
        </div>

        {/* Chapters */}
        {displayedChapters.map((chapter) => (
          <article key={chapter.id} className="print-break space-y-8 pt-6">
            <div className="border-b border-stone-300 pb-4">
              <div className="text-xs font-mono uppercase tracking-widest text-red-700 mb-1">
                {labels.chapterPrefix} {chapter.number}
              </div>
              <h2 className="text-3xl font-display-book font-bold text-stone-900 mb-2">
                {chapter.title[lang] || chapter.title.en}
              </h2>
              <p className="text-sm italic text-stone-600">
                {chapter.theme[lang] || chapter.theme.en}
              </p>
            </div>

            <blockquote className="p-5 bg-stone-50 border-l-2 border-red-700 italic font-display-book text-base text-stone-800">
              "{chapter.quote[lang] || chapter.quote.en}"
            </blockquote>

            <div className="space-y-6 font-serif-book text-stone-800 text-[16px] leading-relaxed">
              {chapter.sections.map((sec) => (
                <div key={sec.id} className="space-y-4">
                  <h3 className="text-xl font-display-book font-semibold text-stone-900 pt-2">
                    {sec.heading[lang] || sec.heading.en}
                  </h3>
                  {(sec.paragraphs[lang] || sec.paragraphs.en).map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            {includeDossiers && (
              <div className="mt-8 p-6 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs">
                <div className="font-mono uppercase text-red-700 tracking-wider font-semibold">
                  {labels.dossierHeading}: {chapter.dossier.caseStudy.title[lang] || chapter.dossier.caseStudy.title.en}
                </div>
                <div className="text-stone-600">
                  <strong>{labels.jurisdiction}:</strong> {chapter.dossier.caseStudy.jurisdiction} ({chapter.dossier.caseStudy.year})
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {chapter.dossier.caseStudy.summary[lang] || chapter.dossier.caseStudy.summary.en}
                </p>
                <div className="font-mono text-stone-600 text-[11px]">
                  <strong>Ref:</strong> {chapter.dossier.caseStudy.legalReference}
                </div>
                <div className="text-stone-600 text-[11px]">
                  <strong>{labels.officialSource}:</strong>{' '}
                  <span className="font-mono text-stone-800">{chapter.dossier.caseStudy.sourceUrl}</span>
                </div>
                <div className="italic text-stone-700 pt-1 border-t border-stone-200">
                  "{chapter.dossier.caseStudy.significance[lang] || chapter.dossier.caseStudy.significance.en}"
                </div>
              </div>
            )}
          </article>
        ))}

        <div className="pt-12 border-t border-stone-300 text-center text-xs font-mono text-stone-500">
          {BOOK_METADATA.title[lang] || BOOK_METADATA.title.en} · {BOOK_METADATA.author} · Published 2026
        </div>
      </div>
    </div>
  );
}
