import React, { useState, useEffect, useRef } from 'react';
import { RoundInvention, GameSettings } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { Tv, Play, Pause, RotateCcw, Volume2, Sparkles, ChevronRight, Award, Mic } from 'lucide-react';
import { sound } from '../utils/sound';

interface PitchModeProps {
  inventions: RoundInvention[];
  settings: GameSettings;
  lang: 'ar' | 'en';
  onPitchesCompleted: () => void;
}

export const PitchMode: React.FC<PitchModeProps> = ({
  inventions,
  settings,
  lang,
  onPitchesCompleted,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentPitchIdx, setCurrentPitchIdx] = useState(0);
  const [pitchTimerLeft, setPitchTimerLeft] = useState(settings.pitchTimeSeconds || 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentInv = inventions[currentPitchIdx] || inventions[0];

  // Sound effects on step load
  useEffect(() => {
    sound.playApplause();
    setPitchTimerLeft(settings.pitchTimeSeconds || 60);
    setIsTimerRunning(false);
  }, [currentPitchIdx, settings.pitchTimeSeconds]);

  // Pitch countdown timer
  useEffect(() => {
    if (!isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setPitchTimerLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          sound.playTimeUp();
          return 0;
        }
        if (prev <= 5) {
          sound.playUrgentTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const handleNextPitcher = () => {
    sound.playCardFlip();
    if (currentPitchIdx < inventions.length - 1) {
      setCurrentPitchIdx((prev) => prev + 1);
    } else {
      sound.playCashRegister();
      onPitchesCompleted();
    }
  };

  const isLastPitcher = currentPitchIdx === inventions.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* TV Studio Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>{lang === 'ar' ? 'بث مباشر · ستوديو التسوق المنزلي' : 'LIVE ON AIR · TV Shopping Channel'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.pitchHeading}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.pitchSubtitle}
        </p>
      </div>

      {/* Main Pitch Stage Card */}
      <div className="bg-gradient-to-b from-amber-500/10 via-white to-orange-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 dark:border-slate-700 shadow-xl relative overflow-hidden pitch-spotlight">
        {/* Salesperson Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2"
              style={{ backgroundColor: `${currentInv.playerColor}20`, borderColor: currentInv.playerColor }}
            >
              {currentInv.playerAvatar}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                {t.currentPitcher}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {currentInv.playerName}
              </h2>
              <span className="text-xs text-slate-400 font-semibold">
                ({currentPitchIdx + 1} / {inventions.length})
              </span>
            </div>
          </div>

          {/* Pitch Timer */}
          <div className="flex items-center gap-3 self-end sm:self-auto bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="text-center px-3">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                {lang === 'ar' ? 'وقت البيع' : 'Pitch Time'}
              </span>
              <span className={`text-2xl font-black font-mono tabular-nums ${pitchTimerLeft <= 10 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                {pitchTimerLeft}s
              </span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all active:scale-95 shadow-xs"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setPitchTimerLeft(settings.pitchTimeSeconds || 60);
                setIsTimerRunning(false);
              }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teleprompter Pitch Card */}
        <div className="my-6 space-y-4">
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-6 border border-amber-200/80 dark:border-slate-700 shadow-sm text-center space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-widest">
                {lang === 'ar' ? 'المنتج المعروض للبيع حالياً' : 'Featured Invention'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                «{currentInv.name}»
              </h3>
            </div>

            <div className="inline-block px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-base sm:text-lg font-bold italic">
              "{currentInv.slogan}"
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold pt-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300">
                💰 {lang === 'ar' ? 'السعر الصادم:' : 'Price:'} <strong>{currentInv.price}</strong>
              </div>
            </div>

            {currentInv.features && (
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-700/60">
                {currentInv.features}
              </p>
            )}

            {/* Solves problem using ingredients tags */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'المشكلة:' : 'Problem:'}
              </span>
              <span>{lang === 'ar' ? currentInv.problemCard.textAr : currentInv.problemCard.textEn}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'المكونات:' : 'Ingredients:'}
              </span>
              <span>
                {lang === 'ar' ? currentInv.ingredientCards[0].textAr : currentInv.ingredientCards[0].textEn} +{' '}
                {lang === 'ar' ? currentInv.ingredientCards[1].textAr : currentInv.ingredientCards[1].textEn}
              </span>
            </div>
          </div>
        </div>

        {/* Studio Soundboard (interactive buttons for family laughs!) */}
        <div className="pt-2 pb-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-orange-500" />
              <span>{t.soundboardTitle}</span>
            </span>
            <span className="text-[11px] font-normal">
              {lang === 'ar' ? 'العيلة تدوس وتتفاعل أثناء البيع!' : 'Audience sound effects!'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => sound.playApplause()}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              {t.applauseBtn}
            </button>
            <button
              onClick={() => sound.playCashRegister()}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              {t.kachingBtn}
            </button>
            <button
              onClick={() => sound.playTimeUp()}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              {t.bellBtn}
            </button>
            <button
              onClick={() => sound.playBoing()}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              {t.boingBtn}
            </button>
          </div>
        </div>

        {/* Next Pitcher Action */}
        <div className="pt-4 border-t border-amber-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleNextPitcher}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{isLastPitcher ? t.goToVotingBtn : t.nextPitcherBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
