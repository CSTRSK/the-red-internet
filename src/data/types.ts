export type SupportedLang = 'de' | 'en' | 'es' | 'fr';

export interface LocalizedString {
  de: string;
  en: string;
  es: string;
  fr: string;
}

export interface Section {
  id: string;
  heading: LocalizedString;
  paragraphs: {
    de: string[];
    en: string[];
    es: string[];
    fr: string[];
  };
}

export interface DossierCaseStudy {
  title: LocalizedString;
  jurisdiction: string;
  year: string;
  summary: LocalizedString;
  legalReference: string;
  significance: LocalizedString;
  sourceUrl: string;
  sourceName: string;
  documentType: string;
}

export interface ExternalSource {
  title: string;
  url: string;
  organization: string;
  type: string;
}

export interface Chapter {
  id: number;
  slug: string;
  number: string;
  title: LocalizedString;
  theme: LocalizedString;
  quote: LocalizedString;
  readTimeMin: number;
  sections: Section[];
  dossier: {
    caseStudy: DossierCaseStudy;
    declassifiedNote: LocalizedString;
    keyMetrics: Array<{ label: LocalizedString; value: string }>;
    externalSources: ExternalSource[];
  };
}
