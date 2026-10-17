import { Chapter, LocalizedString } from './types';
import { CHAPTERS_PART_1 } from './chapters/part1';
import { CHAPTERS_PART_2 } from './chapters/part2';
import { CHAPTERS_PART_3 } from './chapters/part3';

export * from './types';

export const BOOK_METADATA: {
  title: LocalizedString;
  subtitle: LocalizedString;
  author: string;
  year: string;
  edition: string;
  totalChapters: number;
  epigraph: LocalizedString;
} = {
  title: {
    en: "The Red Internet",
    de: "Das Rote Internet",
    es: "La Red Roja",
    fr: "L'Internet Rouge",
  },
  subtitle: {
    en: "The Architecture of the Algorithmic State and the Death of Digital Anonymity",
    de: "Die Architektur des algorithmischen Staates und der Tod digitaler Anonymität",
    es: "La arquitectura del Estado algorítmico y la muerte del anonimato digital",
    fr: "L'architecture de l'État algorithmique et la mort de l'anonymat numérique",
  },
  author: "Investigative Research Collective",
  year: "2026",
  edition: "First Uncensored Edition",
  totalChapters: 12,
  epigraph: {
    en: "When the net becomes the air we breathe, the power to switch off the oxygen is the ultimate sovereign act.",
    de: "Wenn das Netz zur Luft wird, die wir atmen, ist die Macht, den Sauerstoff abzudrehen, der ultimative Akt der Souveränität.",
    es: "Cuando la red se convierte en el aire que respiramos, el poder de cortar el oxígeno es el acto supremo de soberanía.",
    fr: "Lorsque le réseau devient l'air que nous respirons, le pouvoir de couper l'oxygène constitue l'acte souverain ultime.",
  },
};

export const CHAPTERS: Chapter[] = [
  ...CHAPTERS_PART_1,
  ...CHAPTERS_PART_2,
  ...CHAPTERS_PART_3,
];
