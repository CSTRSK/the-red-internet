# The Red Internet — Das Rote Internet

Ein investigatives digitales Buch in **12 Kapiteln**, vollständig in **Deutsch, English, Español und Français**.

**Live lesen: https://cstrsk.github.io/the-red-internet/**

## Worum es geht

Die Architektur des algorithmischen Staates und das Ende digitaler Anonymität — erzählt entlang
konkreter Fälle: automatisierte Risikobewertung vor Gericht, biometrische Erfassung im öffentlichen
Raum, staatliche Cloud-Verträge, Netzsperren, Social-Scoring-Modelle, der „rote Schalter" für
Netzabschaltungen.

Jedes Kapitel hat ein **Dossier** mit Fallstudie (Gericht oder Behörde, Jahr, Aktenzeichen),
Kernkennzahlen und weiterführenden Quellen.

## Eigenschaften

- 12 Kapitel × 4 Sprachen (DE / EN / ES / FR)
- Lesemodus mit einstellbarer Typografie, Zeilenbreite und Themes
- Vorlesen über die im Browser vorhandene Sprachausgabe (kein Server, kein API-Key)
- Export-Funktion, Inhaltsverzeichnis, Dossier-Ansicht
- **Läuft vollständig im Browser** — kein Backend, keine Konten, kein Tracking, keine Cookies

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Build in dist/
```

## Aufbau

```
src/data/chapters/part1.ts   Kapitel 1–4
src/data/chapters/part2.ts   Kapitel 5–8
src/data/chapters/part3.ts   Kapitel 9–12
src/data/types.ts            Datenmodell (Kapitel, Dossier, Quellen)
src/components/              Reader, Inhaltsverzeichnis, Dossier, Audio, Export
```

Die Inhalte liegen als typisierte Datenstruktur vor (`LocalizedString` mit `de`, `en`, `es`, `fr`) —
ein Kapitel wird an genau einer Stelle gepflegt und erscheint in allen vier Sprachen.

## Einordnung

Der Text ist ein Recherche- und Meinungsbeitrag, keine Rechtsberatung. Fallstudien und
Gesetzesverweise sind mit Quellen hinterlegt; bei Behördenangaben gilt der zum Redaktionsstand
veröffentlichte Stand. Wer einzelne Aussagen nachprüfen will, findet die Belege im jeweiligen
Kapitel-Dossier.

## Lizenz

Code: AGPL-3.0 (siehe `LICENSE`).
