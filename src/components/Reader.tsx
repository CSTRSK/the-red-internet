import { useEffect, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Scale,
  FileText,
  ShieldAlert,
  Share2,
  Check,
  ExternalLink,
  Link2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Chapter, CHAPTERS } from '../data/chapters';
import { SupportedLang } from '../data/types';
import { ReaderSettings } from './ReaderSettingsModal';

interface ReaderProps {
  chapter: Chapter;
  onSelectChapter: (id: number) => void;
  lang: SupportedLang;
  settings: ReaderSettings;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onStartAudio: () => void;
  onOpenDossierDetail: (chapterId: number) => void;
}

export function Reader({
  chapter,
  onSelectChapter,
  lang,
  settings,
  isBookmarked,
  onToggleBookmark,
  onStartAudio,
  onOpenDossierDetail,
}: ReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingMode, setReadingMode] = useState<'full' | 'compact'>('full');
  const [mobileDossierOpen, setMobileDossierOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(current);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapter.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileDossierOpen(false);
  }, [chapter.id]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const prevChapter = CHAPTERS.find((c) => c.id === chapter.id - 1);
  const nextChapter = CHAPTERS.find((c) => c.id === chapter.id + 1);

  const fontSizeClass = {
    sm: 'text-[15px] leading-relaxed',
    base: 'text-[17px] leading-relaxed',
    lg: 'text-[19px] leading-loose',
    xl: 'text-[21px] leading-loose',
  }[settings.fontSize];

  const fontFamilyClass = settings.fontFamily === 'serif' ? 'font-serif-book' : 'font-sans-book';

  const themeClasses = {
    obsidian: {
      bg: 'bg-[#0b0f17]',
      cardBg: 'bg-[#121926]',
      border: 'border-stone-800/80',
      text: 'text-stone-300',
      heading: 'text-stone-100',
      muted: 'text-stone-400',
      quoteBg: 'bg-[#15131d]/60',
    },
    crimson: {
      bg: 'bg-[#110708]',
      cardBg: 'bg-[#1b0c0f]',
      border: 'border-red-950/80',
      text: 'text-stone-300',
      heading: 'text-stone-100',
      muted: 'text-red-300/60',
      quoteBg: 'bg-[#1f0d11]/60',
    },
    parchment: {
      bg: 'bg-[#fbf9f5]',
      cardBg: 'bg-[#f4efe6]',
      border: 'border-stone-300',
      text: 'text-stone-800',
      heading: 'text-stone-900',
      muted: 'text-stone-600',
      quoteBg: 'bg-[#f2ece0]',
    },
  }[settings.theme];

  const labels = {
    de: {
      chapter: 'KAPITEL',
      readTime: 'min Lesezeit',
      compactTime: 'min (Kompakt)',
      save: 'Merken',
      saved: 'Gemerkt',
      audio: 'Anhören',
      doctrine: 'KERNTHESE DER DOKTRIN',
      precedent: 'REALE PRÄZEDENZFÄLLE',
      ref: 'Rechtsreferenz',
      source: 'Offizielle Primärquelle / Gesetzestext',
      impact: 'Verfassungsrechtliche Tragweite',
      memo: 'LECK / PROTOKOLLAUSZUG',
      metrics: 'ÜBERWACHUNGS-KENNZAHLEN',
      allDossiers: '→ Alle Dossiers & Quellen im Archiv ansehen',
      prev: 'Vorheriges Kapitel',
      next: 'Nächstes Kapitel',
      verifiedSources: 'VERIFIZIERTE QUELLEN & RECHTSQUELLEN',
      verifiedDesc: 'Wissenschaftliche Studien, Gesetzestexte und zivilgesellschaftliche Dokumente zu diesem Kapitel',
      modeFull: 'Volltext',
      modeCompact: 'Kompakt / Essenz',
      mobileDossierToggle: 'Fallstudie & Quellen zu diesem Kapitel anzeigen',
    },
    en: {
      chapter: 'CHAPTER',
      readTime: 'min read',
      compactTime: 'min (Compact)',
      save: 'Bookmark',
      saved: 'Saved',
      audio: 'Listen',
      doctrine: 'CANONICAL DOCTRINE',
      precedent: 'REAL PRECEDENT',
      ref: 'Statutory Reference',
      source: 'Official Primary Source / Legal Text',
      impact: 'Constitutional Impact',
      memo: 'DECLASSIFIED NOTE',
      metrics: 'SURVEILLANCE METRICS',
      allDossiers: '→ View All Dossiers & Sources in Archive',
      prev: 'Previous Chapter',
      next: 'Next Chapter',
      verifiedSources: 'VERIFIED SOURCES & PRIMARY DOCUMENTS',
      verifiedDesc: 'Academic research, statutory texts, and civil rights filings related to this chapter',
      modeFull: 'Full Essay',
      modeCompact: 'Compact / Essence',
      mobileDossierToggle: 'View precedent case study & sources for this chapter',
    },
    es: {
      chapter: 'CAPÍTULO',
      readTime: 'min de lectura',
      compactTime: 'min (Compacto)',
      save: 'Guardar',
      saved: 'Guardado',
      audio: 'Escuchar',
      doctrine: 'DOCTRINA CANÓNICA',
      precedent: 'PRECEDENTE REAL',
      ref: 'Referencia Legal',
      source: 'Fuente Primaria Oficial / Texto Legal',
      impact: 'Impacto Constitucional',
      memo: 'MEMORANDO DESCLASIFICADO',
      metrics: 'MÉTRICAS DE VIGILANCIA',
      allDossiers: '→ Ver Todos los Expedientes y Fuentes',
      prev: 'Capítulo Anterior',
      next: 'Capítulo Siguiente',
      verifiedSources: 'FUENTES Y DOCUMENTOS LEGALES VERIFICADOS',
      verifiedDesc: 'Investigaciones académicas, textos normativos y archivos civiles sobre este capítulo',
      modeFull: 'Ensayo Completo',
      modeCompact: 'Compacto / Esencia',
      mobileDossierToggle: 'Ver caso de estudio y fuentes de este capítulo',
    },
    fr: {
      chapter: 'CHAPITRE',
      readTime: 'min de lecture',
      compactTime: 'min (Compact)',
      save: 'Enregistrer',
      saved: 'Enregistré',
      audio: 'Écouter',
      doctrine: 'DOCTRINE CANONIQUE',
      precedent: 'PRÉCÉDENT RÉEL',
      ref: 'Référence Légale',
      source: 'Source Primaire Officielle / Texte de Loi',
      impact: 'Portée Constitutionnelle',
      memo: 'NOTE DÉCLASSIFIÉE',
      metrics: 'INDICATEURS DE SURVEILLANCE',
      allDossiers: '→ Voir Tous les Dossiers et Sources',
      prev: 'Chapitre Précédent',
      next: 'Chapitre Suivant',
      verifiedSources: 'SOURCES ET DOCUMENTS LÉGAUX VÉRIFIÉS',
      verifiedDesc: 'Études scientifiques, textes de loi et analyses juridiques rattachés à ce chapitre',
      modeFull: 'Essai Complet',
      modeCompact: 'Compact / Essentiel',
      mobileDossierToggle: 'Afficher l’étude de cas et les sources de ce chapitre',
    },
  }[lang];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Sticky Top Reading Progress Bar */}
      <div className="fixed top-[57px] left-0 right-0 z-30 h-0.5 bg-stone-800/40">
        <div
          className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Main Reading Column */}
          <article className="lg:col-span-8 max-w-prose mx-auto lg:mx-0 w-full">
            
            {/* Chapter Header */}
            <div className="pb-8 mb-8 border-b border-stone-800/60">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono-book uppercase tracking-widest text-red-500">
                <span>
                  {labels.chapter} {chapter.number}
                </span>

                <div className="flex items-center gap-2 sm:gap-3 text-stone-400">
                  {/* Reading Mode Switcher */}
                  <div className="inline-flex rounded-lg p-0.5 bg-black/40 border border-stone-800 text-[11px] font-sans-book">
                    <button
                      onClick={() => setReadingMode('compact')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        readingMode === 'compact'
                          ? 'bg-red-600 text-white font-medium shadow-xs'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {labels.modeCompact}
                    </button>
                    <button
                      onClick={() => setReadingMode('full')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        readingMode === 'full'
                          ? 'bg-red-600 text-white font-medium shadow-xs'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {labels.modeFull}
                    </button>
                  </div>

                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">
                    {readingMode === 'compact' ? 3 : chapter.readTimeMin}{' '}
                    {readingMode === 'compact' ? labels.compactTime : labels.readTime}
                  </span>

                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => onToggleBookmark(chapter.id)}
                    className={`flex items-center gap-1 hover:text-red-400 transition-colors ${
                      isBookmarked ? 'text-amber-400 font-semibold' : ''
                    }`}
                    title={isBookmarked ? labels.save : labels.saved}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="hidden md:inline">
                      {isBookmarked ? labels.saved : labels.save}
                    </span>
                  </button>

                  <span aria-hidden="true">·</span>
                  <button
                    onClick={onStartAudio}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                    title={labels.audio}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{labels.audio}</span>
                  </button>

                  <span aria-hidden="true">·</span>
                  <button
                    onClick={copyShareLink}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                    title="Share / Link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display-book font-bold tracking-tight mb-4 ${themeClasses.heading}`}>
                {chapter.title[lang]}
              </h1>

              {/* Theme Kicker */}
              <p className={`text-sm sm:text-base font-medium italic ${themeClasses.muted}`}>
                {chapter.theme[lang]}
              </p>
            </div>

            {/* Canonical Quote Card */}
            <div className={`p-6 sm:p-8 rounded-xl border ${themeClasses.border} ${themeClasses.quoteBg} mb-10 shadow-sm`}>
              <div className="text-xs font-mono-book uppercase tracking-wider text-red-500 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{labels.doctrine}</span>
              </div>
              <blockquote className="text-lg sm:text-xl font-display-book italic leading-relaxed text-stone-100">
                "{chapter.quote[lang]}"
              </blockquote>
            </div>

            {/* Mobile / Tablet Inline Precedent Drawer Toggle (< lg) */}
            <div className="block lg:hidden mb-10">
              <button
                onClick={() => setMobileDossierOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-900/40 bg-red-950/20 text-stone-200 hover:bg-red-950/30 transition-colors text-left"
              >
                <div className="flex items-center gap-2 text-xs font-mono-book text-red-400 uppercase tracking-wider">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>{labels.mobileDossierToggle}</span>
                </div>
                {mobileDossierOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
              </button>

              {mobileDossierOpen && (
                <div className="mt-3 p-5 rounded-xl border border-stone-800 bg-[#121926] space-y-4 shadow-lg">
                  <div>
                    <div className="text-[11px] font-mono-book uppercase text-red-400 mb-1">
                      {labels.precedent} · {chapter.dossier.caseStudy.year}
                    </div>
                    <div className="font-semibold text-stone-100 text-sm">
                      {chapter.dossier.caseStudy.title[lang]}
                    </div>
                    <div className="text-xs font-mono-book text-stone-400 mb-2">
                      {chapter.dossier.caseStudy.jurisdiction}
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      {chapter.dossier.caseStudy.summary[lang]}
                    </p>
                    <a
                      href={chapter.dossier.caseStudy.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/60 border border-stone-700 text-red-400 hover:text-red-300 text-xs font-mono-book transition-colors"
                    >
                      <span>{chapter.dossier.caseStudy.sourceName}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80">
                    <div className="text-[10px] font-mono-book uppercase text-stone-400 mb-1">
                      {labels.impact}
                    </div>
                    <p className="text-xs italic text-stone-300">
                      "{chapter.dossier.caseStudy.significance[lang]}"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Essay Sections */}
            <div className={`space-y-12 ${fontFamilyClass} ${fontSizeClass}`}>
              {chapter.sections.map((section, sIdx) => {
                const paragraphsToRender =
                  readingMode === 'compact'
                    ? section.paragraphs[lang].slice(0, 2)
                    : section.paragraphs[lang];

                return (
                  <section key={section.id} id={section.id} className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-display-book font-semibold tracking-tight text-stone-100 pt-2 pb-1 border-b border-stone-800/40">
                      {section.heading[lang]}
                    </h2>

                    {paragraphsToRender.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''}
                      >
                        {p}
                      </p>
                    ))}
                  </section>
                );
              })}
            </div>

            {/* Dedicated Verified Sources & Legal Links Section (Visible on ALL devices) */}
            <div className="mt-16 pt-8 border-t border-stone-800/80">
              <div className="flex items-center gap-2 text-xs font-mono-book uppercase tracking-wider text-red-500 mb-2">
                <Link2 className="w-4 h-4" />
                <span>{labels.verifiedSources}</span>
              </div>
              <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                {labels.verifiedDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Primary statutory source */}
                <a
                  href={chapter.dossier.caseStudy.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-red-600/70 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono-book uppercase text-red-400 font-semibold px-2 py-0.5 rounded bg-red-950/60 border border-red-900/40">
                        {chapter.dossier.caseStudy.jurisdiction}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-red-400 transition-colors" />
                    </div>
                    <div className="text-xs font-semibold text-stone-100 group-hover:text-red-300 transition-colors line-clamp-2">
                      {chapter.dossier.caseStudy.title[lang]}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-mono-book text-stone-400 flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <span className="truncate">{chapter.dossier.caseStudy.sourceName}</span>
                    <span className="text-stone-500">{chapter.dossier.caseStudy.year}</span>
                  </div>
                </a>

                {/* Additional external sources */}
                {chapter.dossier.externalSources &&
                  chapter.dossier.externalSources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-red-600/70 transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono-book uppercase text-stone-400 px-2 py-0.5 rounded bg-stone-800/80">
                            {source.type}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-red-400 transition-colors" />
                        </div>
                        <div className="text-xs font-semibold text-stone-200 group-hover:text-red-300 transition-colors line-clamp-2">
                          {source.title}
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] font-mono-book text-red-400 pt-2 border-t border-stone-800/60 flex items-center justify-between">
                        <span className="truncate">{source.organization}</span>
                        <span className="text-[10px] text-stone-500 group-hover:text-red-400 transition-colors">↗</span>
                      </div>
                    </a>
                  ))}
              </div>
            </div>

            {/* Bottom Chapter Pager Navigation */}
            <nav className="mt-16 pt-8 border-t border-stone-800 flex items-center justify-between gap-4">
              {prevChapter ? (
                <button
                  onClick={() => onSelectChapter(prevChapter.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-stone-800 hover:border-red-600 bg-stone-900/60 hover:text-stone-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-mono-book text-stone-400">
                      {labels.prev}
                    </div>
                    <div className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                      {prevChapter.number}. {prevChapter.title[lang]}
                    </div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextChapter ? (
                <button
                  onClick={() => onSelectChapter(nextChapter.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-stone-800 hover:border-red-600 bg-stone-900/60 hover:text-stone-100 transition-colors ml-auto text-right"
                >
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-mono-book text-stone-400">
                      {labels.next}
                    </div>
                    <div className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                      {nextChapter.number}. {nextChapter.title[lang]}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </nav>
          </article>

          {/* Desktop Asymmetric Margin Rail (30% width) with verified sources */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
            
            {/* Case Study Card */}
            <div className={`p-5 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} shadow-sm space-y-4`}>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-mono-book uppercase tracking-wider text-red-500">
                  <Scale className="w-3.5 h-3.5" />
                  <span>{labels.precedent}</span>
                </div>
                <span className="text-[11px] font-mono-book text-stone-400">
                  {chapter.dossier.caseStudy.year}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-100 leading-snug mb-1">
                  {chapter.dossier.caseStudy.title[lang]}
                </h3>
                <div className="text-[11px] font-mono-book text-stone-400 mb-3">
                  {chapter.dossier.caseStudy.jurisdiction}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {chapter.dossier.caseStudy.summary[lang]}
                </p>
              </div>

              {/* Verified External Source Link */}
              <div className="pt-2 border-t border-stone-800/60 space-y-1.5">
                <div className="text-stone-400 font-mono-book uppercase text-[10px]">
                  {labels.source}
                </div>
                <a
                  href={chapter.dossier.caseStudy.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded bg-black/40 border border-stone-800 hover:border-red-600/70 text-red-400 hover:text-red-300 text-xs transition-colors group"
                >
                  <span className="font-mono-book truncate max-w-[210px]">
                    {chapter.dossier.caseStudy.sourceName}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="pt-2 border-t border-stone-800/60 text-[11px]">
                <div className="text-stone-400 font-mono-book uppercase text-[10px] mb-0.5">
                  {labels.ref}
                </div>
                <code className="text-stone-200 font-mono-book block truncate text-[11px]">
                  {chapter.dossier.caseStudy.legalReference}
                </code>
              </div>

              <div className="pt-2 border-t border-stone-800/60">
                <div className="text-stone-400 font-mono-book uppercase text-[10px] mb-1">
                  {labels.impact}
                </div>
                <p className="text-xs italic text-stone-300">
                  "{chapter.dossier.caseStudy.significance[lang]}"
                </p>
              </div>
            </div>

            {/* Declassified Note Box */}
            <div className="p-4 rounded-xl border border-red-950/60 bg-red-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono-book uppercase tracking-wider text-red-400">
                <FileText className="w-3 h-3" />
                <span>{labels.memo}</span>
              </div>
              <p className="text-xs font-mono-book text-stone-300 italic leading-relaxed">
                "{chapter.dossier.declassifiedNote[lang]}"
              </p>
            </div>

            {/* Key Telemetry Metrics */}
            <div className={`p-4 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg}`}>
              <div className="text-[10px] font-mono-book uppercase tracking-wider text-stone-400 mb-3">
                {labels.metrics}
              </div>
              <div className="space-y-2.5">
                {chapter.dossier.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">{metric.label[lang]}</span>
                    <span className="font-mono-book font-semibold text-red-400">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Archive link */}
            <button
              onClick={() => onOpenDossierDetail(chapter.id)}
              className="w-full py-2.5 px-3 text-xs font-mono-book text-stone-400 hover:text-stone-100 hover:bg-stone-800/40 border border-stone-800 rounded-lg text-center transition-colors block"
            >
              {labels.allDossiers}
            </button>

          </aside>
        </div>
      </main>
    </div>
  );
}
