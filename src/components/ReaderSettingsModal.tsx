import { X, Sliders, Type, Palette, Monitor } from 'lucide-react';
import { SupportedLang } from '../data/types';

export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type FontFamily = 'serif' | 'sans';
export type ReadingTheme = 'obsidian' | 'crimson' | 'parchment';

export interface ReaderSettings {
  fontSize: FontSize;
  fontFamily: FontFamily;
  theme: ReadingTheme;
  scanlines: boolean;
}

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  lang: SupportedLang;
}

export function ReaderSettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  lang,
}: ReaderSettingsModalProps) {
  if (!isOpen) return null;

  const labels = {
    de: {
      heading: 'Lese-Einstellungen',
      fontSize: 'Schriftgröße',
      typeface: 'Typografie',
      readingSurface: 'Farbschema & Lesefläche',
      crtTitle: 'CRT-Scanlines & Dystopie-Modus',
      crtDesc: 'Subtiler analoger Röhrenmonitor-Effekt',
    },
    en: {
      heading: 'Reader Settings',
      fontSize: 'Font Size',
      typeface: 'Typeface',
      readingSurface: 'Reading Surface & Theme',
      crtTitle: 'CRT Scanlines & Glitch Atmosphere',
      crtDesc: 'Subtle phosphor scanlines overlay',
    },
    es: {
      heading: 'Ajustes de Lectura',
      fontSize: 'Tamaño de Fuente',
      typeface: 'Tipografía',
      readingSurface: 'Superficie de Lectura',
      crtTitle: 'Líneas CRT y Atmósfera Glitch',
      crtDesc: 'Superposición sutil de fósforo analógico',
    },
    fr: {
      heading: 'Paramètres de Lecture',
      fontSize: 'Taille de Police',
      typeface: 'Typographie',
      readingSurface: 'Surface de Lecture',
      crtTitle: 'Lignes CRT et Ambiance Glitch',
      crtDesc: 'Superposition cathodique subtile',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-[#131b26] border border-stone-800 rounded-2xl shadow-2xl text-stone-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-500" />
            <h3 className="text-base font-semibold text-stone-100">
              {labels.heading}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 pt-5">
          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono-book uppercase tracking-wider text-stone-400">
              <Type className="w-3.5 h-3.5" />
              <span>{labels.fontSize}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: 'sm', label: '15px' },
                  { id: 'base', label: '17px' },
                  { id: 'lg', label: '19px' },
                  { id: 'xl', label: '22px' },
                ] as const
              ).map((size) => (
                <button
                  key={size.id}
                  onClick={() => onUpdateSettings({ fontSize: size.id })}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                    settings.fontSize === size.id
                      ? 'bg-red-950/80 text-red-300 border-red-700'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono-book uppercase tracking-wider text-stone-400">
              <Type className="w-3.5 h-3.5" />
              <span>{labels.typeface}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
                className={`py-2 px-3 text-xs font-serif-book rounded-lg border text-left transition-colors ${
                  settings.fontFamily === 'serif'
                    ? 'bg-red-950/80 text-red-300 border-red-700'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-sm">Editorial Serif</div>
                <div className="text-[11px] text-stone-400">Lora Book Face</div>
              </button>
              <button
                onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
                className={`py-2 px-3 text-xs font-sans-book rounded-lg border text-left transition-colors ${
                  settings.fontFamily === 'sans'
                    ? 'bg-red-950/80 text-red-300 border-red-700'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-sm">Modern Sans</div>
                <div className="text-[11px] text-stone-400">Plus Jakarta Sans</div>
              </button>
            </div>
          </div>

          {/* Theme Palette */}
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono-book uppercase tracking-wider text-stone-400">
              <Palette className="w-3.5 h-3.5" />
              <span>{labels.readingSurface}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'obsidian' })}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  settings.theme === 'obsidian'
                    ? 'border-red-600 bg-black/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'border-stone-800 bg-[#0b0f17] hover:border-stone-700'
                }`}
              >
                <div className="w-full h-4 rounded bg-[#0b0f17] border border-stone-700 mb-1.5" />
                <div className="text-xs font-medium text-stone-200">Obsidian</div>
                <div className="text-[10px] text-stone-500">Dark Slate</div>
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'crimson' })}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  settings.theme === 'crimson'
                    ? 'border-red-600 bg-[#16080a] shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'border-stone-800 bg-[#13080a] hover:border-stone-700'
                }`}
              >
                <div className="w-full h-4 rounded bg-[#1f0a0d] border border-red-950 mb-1.5" />
                <div className="text-xs font-medium text-stone-200">Blood Noir</div>
                <div className="text-[10px] text-stone-500">Crimson Dark</div>
              </button>

              <button
                onClick={() => onUpdateSettings({ theme: 'parchment' })}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  settings.theme === 'parchment'
                    ? 'border-red-600 bg-stone-200 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'border-stone-800 bg-[#fbf9f5] hover:border-stone-400'
                }`}
              >
                <div className="w-full h-4 rounded bg-[#f5f2ea] border border-stone-300 mb-1.5" />
                <div className="text-xs font-medium text-stone-900">Parchment</div>
                <div className="text-[10px] text-stone-600">Light Paper</div>
              </button>
            </div>
          </div>

          {/* CRT Scanline Toggle */}
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-stone-400" />
              <div>
                <div className="text-xs font-medium text-stone-200">
                  {labels.crtTitle}
                </div>
                <div className="text-[11px] text-stone-500">
                  {labels.crtDesc}
                </div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ scanlines: !settings.scanlines })}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.scanlines ? 'bg-red-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.scanlines ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
