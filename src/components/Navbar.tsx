import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Globe, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { GamePhase } from '../types/game';

interface NavbarProps {
  phase: GamePhase;
  onNavigate: (phase: GamePhase) => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  phase,
  onNavigate,
  lang,
  onToggleLang,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  savedCount,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/50 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with icon) */}
        <button
          onClick={() => onNavigate('LANDING')}
          className="flex items-center gap-2.5 text-left rtl:text-right group focus:outline-none whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              {t.appName}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('LANDING')}
            className={`hover:text-orange-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              phase === 'LANDING' ? 'text-orange-600 dark:text-amber-400 font-bold' : ''
            }`}
          >
            {t.howToPlayNav}
          </button>
          <button
            onClick={() => onNavigate('RULES')}
            className={`flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              phase === 'RULES' ? 'text-orange-600 dark:text-amber-400 font-bold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.rulesModalTitle}</span>
          </button>
          <button
            onClick={() => onNavigate('GALLERY')}
            className={`flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              phase === 'GALLERY' ? 'text-orange-600 dark:text-amber-400 font-bold' : ''
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t.galleryNav}</span>
            {savedCount > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded font-semibold tabular-nums">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('CUSTOM_CARDS')}
            className={`flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              phase === 'CUSTOM_CARDS' ? 'text-orange-600 dark:text-amber-400 font-bold' : ''
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.customCardsNav}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            aria-label="Toggle Sound"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'الوضع الفاتح' : 'الوضع الليلي'}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title="تغيير اللغة / Change Language"
            aria-label="Toggle Language"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'English' : 'عربي (مصري)'}</span>
          </button>

          {/* Primary CTA: Play Now */}
          {phase === 'LANDING' || phase === 'RULES' || phase === 'GALLERY' || phase === 'CUSTOM_CARDS' ? (
            <button
              onClick={() => onNavigate('LOBBY')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
            >
              {t.playNow}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('LOBBY')}
              className="px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-amber-400 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg border border-orange-200 dark:border-slate-700 transition-colors whitespace-nowrap"
            >
              {t.newGameNav}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
