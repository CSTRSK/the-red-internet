#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Erzeugt aus /tmp/buch.json eine Markdown-Fassung des Buchs (alle vier Sprachen).

Ausgabe: content/<lang>/NN-slug.md je Kapitel + content/README.md als Index.
Reines Python (stdlib), keine Abhaengigkeiten.
"""
import json
import pathlib

QUELLE = pathlib.Path('/tmp/buch.json')
ZIEL = pathlib.Path('/root/red-internet/content')
SPRACHEN = [('de', 'Deutsch'), ('en', 'English'), ('es', 'Español'), ('fr', 'Français')]

KOPF = {
    'de': {'thema': 'Thema', 'lesezeit': 'Lesezeit', 'min': 'Minuten', 'dossier': 'Dossier',
           'fall': 'Fallstudie', 'jahr': 'Jahr', 'rechtsbezug': 'Rechtsbezug',
           'zusammenfassung': 'Zusammenfassung', 'bedeutung': 'Bedeutung',
           'kennzahlen': 'Kernkennzahlen', 'quellen': 'Weiterführende Quellen',
           'anmerkung': 'Deklassifizierte Anmerkung', 'quelle': 'Quelle'},
    'en': {'thema': 'Theme', 'lesezeit': 'Reading time', 'min': 'minutes', 'dossier': 'Dossier',
           'fall': 'Case study', 'jahr': 'Year', 'rechtsbezug': 'Legal reference',
           'zusammenfassung': 'Summary', 'bedeutung': 'Significance',
           'kennzahlen': 'Key metrics', 'quellen': 'Further sources',
           'anmerkung': 'Declassified note', 'quelle': 'Source'},
    'es': {'thema': 'Tema', 'lesezeit': 'Tiempo de lectura', 'min': 'minutos', 'dossier': 'Dosier',
           'fall': 'Caso práctico', 'jahr': 'Año', 'rechtsbezug': 'Referencia legal',
           'zusammenfassung': 'Resumen', 'bedeutung': 'Importancia',
           'kennzahlen': 'Métricas clave', 'quellen': 'Fuentes adicionales',
           'anmerkung': 'Nota desclasificada', 'quelle': 'Fuente'},
    'fr': {'thema': 'Thème', 'lesezeit': 'Temps de lecture', 'min': 'minutes', 'dossier': 'Dossier',
           'fall': 'Étude de cas', 'jahr': 'Année', 'rechtsbezug': 'Référence légale',
           'zusammenfassung': 'Résumé', 'bedeutung': 'Importance',
           'kennzahlen': 'Chiffres clés', 'quellen': 'Sources complémentaires',
           'anmerkung': 'Note déclassifiée', 'quelle': 'Source'},
}
KAPITEL_WORT = {'de': 'Kapitel', 'en': 'Chapter', 'es': 'Capítulo', 'fr': 'Chapitre'}
ABSCHNITT = {'de': 'Abschnitt', 'en': 'Section', 'es': 'Sección', 'fr': 'Section'}


def esc(text: str) -> str:
    return (text or '').strip()


def kapitel_md(k, lang, wort, kopf) -> str:
    t = k['title'][lang]
    zeilen = [f"# {wort} {k['number']} — {t}", '']
    zeilen.append(f"**{kopf['thema']}:** {esc(k['theme'][lang])}")
    zeilen.append(f"**{kopf['lesezeit']}:** {k['readTimeMin']} {kopf['min']}")
    zeilen.append('')
    if k['quote'] and k['quote'].get(lang):
        zeilen += ['> ' + esc(k['quote'][lang]).replace('\n', '\n> '), '']
    for sec in k['sections']:
        zeilen += [f"## {esc(sec['heading'][lang])}", '']
        for p in sec['paragraphs'][lang]:
            if esc(p):
                zeilen += [esc(p), '']
    d = k['dossier']
    cs = d['caseStudy']
    zeilen += [f"## {kopf['dossier']}: {kopf['fall']}", '']
    zeilen.append(f"**{esc(cs['title'][lang])}** — {cs['jurisdiction']}, {cs['year']}")
    zeilen.append('')
    zeilen.append(f"**{kopf['rechtsbezug']}:** {esc(cs['legalReference'])}")
    zeilen.append('')
    zeilen.append(f"**{kopf['zusammenfassung']}:** {esc(cs['summary'][lang])}")
    zeilen.append('')
    zeilen.append(f"**{kopf['bedeutung']}:** {esc(cs['significance'][lang])}")
    zeilen.append('')
    zeilen.append(f"**{kopf['quelle']}:** [{esc(cs['sourceName'])}]({cs['sourceUrl']}) "
                  f"({cs['documentType']})")
    zeilen.append('')
    if d.get('declassifiedNote', {}).get(lang):
        zeilen += [f"### {kopf['anmerkung']}", '', esc(d['declassifiedNote'][lang]), '']
    if d.get('keyMetrics'):
        zeilen += [f"### {kopf['kennzahlen']}", '']
        for m in d['keyMetrics']:
            zeilen.append(f"- **{esc(m['label'][lang])}:** {esc(m['value'])}")
        zeilen.append('')
    if d.get('externalSources'):
        zeilen += [f"### {kopf['quellen']}", '']
        for q in d['externalSources']:
            zeilen.append(f"- [{esc(q['title'])}]({q['url']}) — {esc(q['organization'])} ({q['type']})")
        zeilen.append('')
    return '\n'.join(zeilen).rstrip() + '\n'


def main():
    d = json.loads(QUELLE.read_text(encoding='utf-8'))
    meta, chapters = d['meta'], d['chapters']
    for lang, name in SPRACHEN:
        ordner = ZIEL / lang
        ordner.mkdir(parents=True, exist_ok=True)
        for k in chapters:
            nummer = k['number'].zfill(2) if str(k['number']).isdigit() else str(k['number'])
            pfad = ordner / f"{nummer}-{k['slug']}.md"
            pfad.write_text(kapitel_md(k, lang, KAPITEL_WORT[lang], KOPF[lang]), encoding='utf-8')
        print(f"   {lang}: {len(chapters)} Kapitel -> content/{lang}/")

    # Index
    idx = [f"# {meta['title']['de']} — Textfassung", '']
    idx += [f"_{meta['subtitle']['de']}_", '']
    idx += [f"Live-Fassung: https://cstrsk.github.io/the-red-internet/", '']
    idx += [f"Diese Markdown-Dateien sind der vollständige Buchtext, je Kapitel eine Datei, "
            f"in vier Sprachen. Sie werden aus den Quelldaten erzeugt "
            f"(`content/generate_md.py`) und dienen als lesbares Backup.", '']
    idx += ['## Kapitel', '']
    for k in chapters:
        nummer = str(k['number']).zfill(2)
        idx.append(f"| {k['number']} | {k['title']['de']} | {k['readTimeMin']} Min | "
                   f"[de](de/{nummer}-{k['slug']}.md) · [en](en/{nummer}-{k['slug']}.md) · "
                   f"[es](es/{nummer}-{k['slug']}.md) · [fr](fr/{nummer}-{k['slug']}.md) |")
    idx += ['', '| # | Titel | Lesezeit | Sprachen |', '|---|---|---|---|']
    ZIEL.joinpath('README.md').write_text('\n'.join(idx) + '\n', encoding='utf-8')
    print('   content/README.md (Index) geschrieben')

    # Gesamtumfang
    gesamt = sum(len(p.read_text(encoding='utf-8')) for p in ZIEL.rglob('*.md'))
    dateien = len(list(ZIEL.rglob('*.md')))
    print(f"   {dateien} Markdown-Dateien, {gesamt:,} Zeichen")


if __name__ == '__main__':
    main()
