import { useState } from 'react';
import { Scale, FileText, Globe, ArrowRight, ShieldAlert, BarChart3, ExternalLink, Link2 } from 'lucide-react';
import { CHAPTERS, Chapter } from '../data/chapters';
import { SupportedLang } from '../data/types';

interface DossierDrawerProps {
  onSelectChapter: (id: number) => void;
  lang: SupportedLang;
  initialChapterId?: number | null;
}

export function DossierDrawer({ onSelectChapter, lang, initialChapterId }: DossierDrawerProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialChapterId || 1);
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const selectedChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];

  const filteredChapters = CHAPTERS.filter((c) => {
    if (filterRegion === 'all') return true;
    return c.dossier.caseStudy.jurisdiction.toLowerCase().includes(filterRegion.toLowerCase());
  });

  const labels = {
    de: {
      tag: 'RECHTLICHE & POLITISCHE FALLSTUDIEN',
      heading: 'Reales Überwachungs-Archiv & Primärquellen',
      description: 'Vergleichende Analyse realer Gesetzgebungen, Gerichtsentscheidungen und biometrischer Überwachungsinfrastrukturen mit verifizierten Primärquellen-Links.',
      allRegions: 'Alle Regionen',
      caseSummary: 'ZUSAMMENFASSUNG DER PRAXIS',
      statutory: 'GESETZLICHE GRUNDLAGE / DOKUMENT',
      officialSource: 'Offizielle Primärquelle öffnen',
      impact: 'VERFASSUNGSRECHTLICHE BEDEUTUNG',
      memo: 'PROTOKOLLAUSZUG / INTERNES MEMO',
      metrics: 'EMPIRISCHE KENNZAHLEN',
      readChapter: `Kapitel ${selectedChapter.number} im Buch lesen`,
      additionalSources: 'WEITERE VERIFIZIERTE QUELLEN & STUDIEN',
    },
    en: {
      tag: 'LEGAL & POLICY DOSSIERS',
      heading: 'Surveillance Archive & Primary Sources',
      description: 'Comparative analysis of actual legislation, landmark court decisions, and biometric surveillance infrastructure with verified primary source links.',
      allRegions: 'All Regions',
      caseSummary: 'CASE SUMMARY',
      statutory: 'STATUTORY BASE / DOCUMENT',
      officialSource: 'Open Official Primary Source',
      impact: 'CONSTITUTIONAL SIGNIFICANCE',
      memo: 'INTERNAL MEMO / EXCERPT',
      metrics: 'EMPIRICAL METRICS',
      readChapter: `Read Chapter ${selectedChapter.number} in Book`,
      additionalSources: 'ADDITIONAL VERIFIED SOURCES & STUDIES',
    },
    es: {
      tag: 'EXPEDIENTES LEGALES Y POLÍTICOS',
      heading: 'Archivo de Vigilancia y Fuentes Primarias',
      description: 'Análisis comparativo de legislaciones reales, sentencias históricas e infraestructuras biométricas con enlaces verificados a fuentes primarias.',
      allRegions: 'Todas las Regiones',
      caseSummary: 'RESUMEN DEL CASO',
      statutory: 'BASE JURÍDICA / DOCUMENTO',
      officialSource: 'Abrir Fuente Oficial Primaria',
      impact: 'SIGNIFICADO CONSTITUCIONAL',
      memo: 'MEMORANDO INTERNO / EXTRACTO',
      metrics: 'MÉTRICAS EMPÍRICAS',
      readChapter: `Leer Capítulo ${selectedChapter.number} en el Libro`,
      additionalSources: 'FUENTES Y ESTUDIOS ADICIONALES VERIFICADOS',
    },
    fr: {
      tag: 'DOSSIERS JURIDIQUES ET POLITIQUES',
      heading: 'Archives de la Surveillance et Sources Primaires',
      description: 'Analyse comparative des législations réelles, des décisions de justice et des infrastructures biométriques avec liens vérifiés vers les sources officielles.',
      allRegions: 'Toutes les Régions',
      caseSummary: 'RÉSUMÉ DU CAS',
      statutory: 'BASE LÉGALE / DOCUMENT',
      officialSource: 'Consulter la Source Primaire Officielle',
      impact: 'PORTÉE CONSTITUTIONNELLE',
      memo: 'NOTE INTERNE / EXTRAIT',
      metrics: 'INDICATEURS EMPIRIQUES',
      readChapter: `Lire le Chapitre ${selectedChapter.number} dans le Livre`,
      additionalSources: 'SOURCES ET ÉTUDES COMPLÉMENTAIRES VÉRIFIÉES',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-stone-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono-book uppercase tracking-widest text-red-500 mb-2">
            <Scale className="w-4 h-4" />
            <span>{labels.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display-book font-bold text-stone-100">
            {labels.heading}
          </h1>
          <p className="text-sm text-stone-400 mt-2 max-w-3xl leading-relaxed">
            {labels.description}
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: labels.allRegions },
            { id: 'european union', label: 'European Union (EU)' },
            { id: 'united states', label: 'United States (US)' },
            { id: 'india', label: 'Global South / Asia' },
            { id: 'transatlantic', label: 'Transatlantic / Global' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRegion(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono-book rounded-lg border transition-colors ${
                filterRegion === tab.id
                  ? 'bg-red-950/80 text-red-300 border-red-700'
                  : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-Column Dossier Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Index Selector */}
          <div className="lg:col-span-5 space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredChapters.map((chapter: Chapter) => {
              const isSelected = chapter.id === selectedChapterId;
              return (
                <div
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#182333] border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                      : 'bg-[#121926] border-stone-800/80 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-book mb-1">
                    <span className="text-red-400 font-semibold">CH. {chapter.number}</span>
                    <span className="text-stone-400">{chapter.dossier.caseStudy.year}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-100 line-clamp-1 mb-1">
                    {chapter.dossier.caseStudy.title[lang]}
                  </h4>
                  <div className="text-[11px] text-stone-400 font-mono-book flex items-center gap-1.5 truncate">
                    <Globe className="w-3 h-3 text-stone-500 shrink-0" />
                    <span className="truncate">{chapter.dossier.caseStudy.jurisdiction}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full Dossier Detail Inspector */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121926] border border-stone-800 space-y-6">
            
            {/* Header */}
            <div className="pb-5 border-b border-stone-800">
              <div className="flex items-center justify-between text-xs font-mono-book uppercase text-red-500 mb-2">
                <span>CH. {selectedChapter.number}</span>
                <span>{selectedChapter.dossier.caseStudy.year}</span>
              </div>
              <h2 className="text-2xl font-display-book font-bold text-stone-100 mb-2">
                {selectedChapter.dossier.caseStudy.title[lang]}
              </h2>
              <div className="text-xs font-mono-book text-stone-400">
                {selectedChapter.dossier.caseStudy.jurisdiction}
              </div>
            </div>

            {/* Case Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono-book uppercase tracking-wider text-stone-400">
                {labels.caseSummary}
              </h4>
              <p className="text-sm font-serif-book leading-relaxed text-stone-300">
                {selectedChapter.dossier.caseStudy.summary[lang]}
              </p>
            </div>

            {/* Official Primary Source Action Box */}
            <div className="p-4 rounded-xl bg-black/60 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-book uppercase text-stone-400">
                  {labels.statutory}
                </span>
                <span className="text-[10px] font-mono-book text-amber-400/90">
                  {selectedChapter.dossier.caseStudy.documentType}
                </span>
              </div>

              <code className="text-xs font-mono-book text-stone-200 block break-all">
                {selectedChapter.dossier.caseStudy.legalReference}
              </code>

              <a
                href={selectedChapter.dossier.caseStudy.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono-book font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors group"
              >
                <span>{labels.officialSource}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Constitutional Significance */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-book uppercase tracking-wider text-red-400">
                <ShieldAlert className="w-4 h-4" />
                <span>{labels.impact}</span>
              </div>
              <p className="text-sm italic font-serif-book text-stone-300 bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                "{selectedChapter.dossier.caseStudy.significance[lang]}"
              </p>
            </div>

            {/* Additional Sources List */}
            {selectedChapter.dossier.externalSources && selectedChapter.dossier.externalSources.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-mono-book uppercase text-stone-400">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{labels.additionalSources}</span>
                </div>
                <div className="space-y-2">
                  {selectedChapter.dossier.externalSources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-stone-700 text-xs transition-colors group"
                    >
                      <div>
                        <div className="font-semibold text-stone-200 group-hover:text-red-400 transition-colors">
                          {source.title}
                        </div>
                        <div className="text-[11px] font-mono-book text-stone-500">
                          {source.organization} · {source.type}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-red-400 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Leaked Memorandum */}
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-book uppercase text-amber-400">
                <FileText className="w-3.5 h-3.5" />
                <span>{labels.memo}</span>
              </div>
              <p className="text-xs font-mono-book text-stone-300 italic">
                "{selectedChapter.dossier.declassifiedNote[lang]}"
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-3 pt-3 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs font-mono-book uppercase text-stone-400">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{labels.metrics}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedChapter.dossier.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-stone-800 text-center">
                    <div className="text-[10px] font-mono-book text-stone-500 mb-1">
                      {metric.label[lang]}
                    </div>
                    <div className="text-base font-bold font-mono-book text-red-400">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jump to Chapter */}
            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => onSelectChapter(selectedChapter.id)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
              >
                <span>{labels.readChapter}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
