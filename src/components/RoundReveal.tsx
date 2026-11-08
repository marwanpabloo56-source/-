import React, { useEffect, useState } from 'react';
import { Player, RoundInvention, SavedInvention } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { Trophy, Sparkles, ArrowRight, ArrowLeft, BookmarkPlus, Check, Star, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { STORAGE_KEYS } from '../data/cards';

interface RoundRevealProps {
  currentRound: number;
  totalRounds: number;
  players: Player[];
  inventions: RoundInvention[];
  lang: 'ar' | 'en';
  onNextRound: () => void;
  onFinishGame: () => void;
}

export const RoundReveal: React.FC<RoundRevealProps> = ({
  currentRound,
  totalRounds,
  players,
  inventions,
  lang,
  onNextRound,
  onFinishGame,
}) => {
  const t = TRANSLATIONS[lang];
  const [saved, setSaved] = useState(false);

  // Determine winner (highest votes)
  const sortedInventions = [...inventions].sort((a, b) => b.votesCount - a.votesCount);
  const winner = sortedInventions[0] || inventions[0];

  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (_) {}
    sound.playVictoryFanfare();
  }, []);

  const handleSaveToGallery = () => {
    try {
      sound.playCashRegister();
      const existingStr = localStorage.getItem(STORAGE_KEYS.GALLERY);
      const existing: SavedInvention[] = existingStr ? JSON.parse(existingStr) : [];
      
      const newSavedItem: SavedInvention = {
        ...winner,
        savedAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US'),
        stars: 5,
      };

      const updated = [newSavedItem, ...existing.filter((item) => item.id !== winner.id)];
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  const isFinalRound = currentRound >= totalRounds;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Winner Spotlight */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{t.roundWinnerHeading}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {winner.playerName} {winner.playerAvatar}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t.roundWinnerSubtitle}
        </p>
      </div>

      {/* Winning Invention Presentation Card */}
      <div className="bg-gradient-to-br from-amber-500/15 via-white to-orange-500/15 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 dark:border-amber-600/80 shadow-xl space-y-5 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-slate-700">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
              {lang === 'ar' ? 'افتكاسة الجولة المتوجة 🏆' : 'Round Winning Invention 🏆'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              «{winner.name}»
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-base shadow-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-current text-yellow-200" />
              <span>
                {winner.votesCount} {lang === 'ar' ? 'أصوات' : 'Votes'}
              </span>
            </div>

            <button
              onClick={handleSaveToGallery}
              disabled={saved}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                saved
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              <span>{saved ? t.alreadySavedText : t.saveToGalleryBtn}</span>
            </button>
          </div>
        </div>

        <div className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200 italic text-center py-2">
          "{winner.slogan}"
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            💰 {winner.price}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            ⚠️ {lang === 'ar' ? winner.problemCard.textAr : winner.problemCard.textEn}
          </span>
        </div>
      </div>

      {/* Round Leaderboard / Standings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {lang === 'ar' ? 'جدول ترتيب الحريفة حتى الآن:' : 'Current Standings:'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            {lang === 'ar' ? `الجولة ${currentRound} من ${totalRounds}` : `Round ${currentRound} of ${totalRounds}`}
          </span>
        </div>

        <div className="space-y-2">
          {players.map((p, idx) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-4 tabular-nums">
                  #{idx + 1}
                </span>
                <span className="text-xl">{p.avatar}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {p.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-extrabold text-amber-600 dark:text-amber-400">
                <span className="text-lg tabular-nums">{p.score}</span>
                <span className="text-xs font-sans font-medium text-slate-400">
                  {lang === 'ar' ? 'نقطة' : 'pts'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action: Next Round or Finish Tournament */}
      <div className="flex justify-center pt-2">
        {isFinalRound ? (
          <button
            onClick={() => {
              sound.playVictoryFanfare();
              onFinishGame();
            }}
            className="w-full sm:w-auto px-10 py-4 text-base font-black text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.seeFinalResultsBtn}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playCardFlip();
              onNextRound();
            }}
            className="w-full sm:w-auto px-10 py-4 text-base font-black text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.nextRoundBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
};
