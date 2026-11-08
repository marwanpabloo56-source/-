import React, { useEffect } from 'react';
import { Player, SavedInvention } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { Crown, Trophy, Sparkles, RotateCcw, Users, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface GameOverScreenProps {
  players: Player[];
  allRoundWinners: SavedInvention[];
  lang: 'ar' | 'en';
  onPlayAgainSame: () => void;
  onNewGame: () => void;
  onOpenGallery: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  players,
  allRoundWinners,
  lang,
  onPlayAgainSame,
  onNewGame,
  onOpenGallery,
}) => {
  const t = TRANSLATIONS[lang];

  // Rank players by total score
  const ranked = [...players].sort((a, b) => b.score - a.score);
  const grandChampion = ranked[0] || players[0];

  // Find Invention of the Night (highest votes across all rounds)
  const sortedInventions = [...allRoundWinners].sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0));
  const inventionOfTheNight = sortedInventions[0];

  useEffect(() => {
    sound.playVictoryFanfare();
    try {
      // Big celebratory fireworks
      const end = Date.now() + 3 * 1000;
      const interval: any = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }, 350);
    } catch (_) {}
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Crown Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
          <Crown className="w-4 h-4 text-amber-500 fill-current" />
          <span>{t.championTitle}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {grandChampion.name} {grandChampion.avatar}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {t.gameOverHeading}
        </p>
      </div>

      {/* Podium Showcase (Top 3) */}
      <div className="bg-gradient-to-b from-amber-500/10 via-white to-orange-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-slate-800 shadow-md">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-8 pb-4 max-w-lg mx-auto">
          {/* 2nd Place */}
          {ranked[1] && (
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-3xl sm:text-4xl">{ranked[1].avatar}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-full">
                {ranked[1].name}
              </span>
              <div className="w-full bg-slate-200 dark:bg-slate-700/80 rounded-t-2xl py-5 text-center font-black text-slate-600 dark:text-slate-300 shadow-inner">
                <span className="text-xl">🥈</span>
                <div className="text-xs mt-1 tabular-nums">{ranked[1].score} {lang === 'ar' ? 'نقط' : 'pts'}</div>
              </div>
            </div>
          )}

          {/* 1st Place Champion */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative">
              <Crown className="w-7 h-7 text-amber-500 fill-current absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce" />
              <span className="text-5xl sm:text-6xl">{grandChampion.avatar}</span>
            </div>
            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate max-w-full">
              {grandChampion.name}
            </span>
            <div className="w-full bg-gradient-to-b from-amber-400 to-orange-500 text-white rounded-t-2xl py-8 text-center font-black shadow-md">
              <span className="text-2xl">🥇</span>
              <div className="text-sm mt-1 tabular-nums font-extrabold">{grandChampion.score} {lang === 'ar' ? 'نقطة' : 'pts'}</div>
            </div>
          </div>

          {/* 3rd Place */}
          {ranked[2] && (
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-3xl sm:text-4xl">{ranked[2].avatar}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-full">
                {ranked[2].name}
              </span>
              <div className="w-full bg-amber-100 dark:bg-amber-950/60 rounded-t-2xl py-3 text-center font-black text-amber-800 dark:text-amber-300 shadow-inner">
                <span className="text-lg">🥉</span>
                <div className="text-xs mt-1 tabular-nums">{ranked[2].score} {lang === 'ar' ? 'نقط' : 'pts'}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invention of the Night Award */}
      {inventionOfTheNight && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-400 dark:border-amber-600 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              {t.hallOfFameTitle}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400">
                {lang === 'ar' ? 'صاحب الاختراع:' : 'Created by:'}{' '}
                <strong className="text-slate-900 dark:text-white">
                  {inventionOfTheNight.playerName} {inventionOfTheNight.playerAvatar}
                </strong>
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                «{inventionOfTheNight.name}»
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300 italic mt-1">
                "{inventionOfTheNight.slogan}"
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-amber-500 text-white font-extrabold text-sm self-start sm:self-auto flex items-center gap-1.5 shrink-0 shadow-xs">
              <Star className="w-4 h-4 fill-current text-yellow-200" />
              <span>{inventionOfTheNight.votesCount} {lang === 'ar' ? 'صوت عائلي' : 'votes'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          {t.leaderboardTitle}
        </h3>

        <div className="space-y-2">
          {ranked.map((p, idx) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-5 tabular-nums">
                  #{idx + 1}
                </span>
                <span className="text-xl">{p.avatar}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {p.name}
                </span>
              </div>
              <div className="font-black text-amber-600 dark:text-amber-400 text-base tabular-nums">
                {p.score} <span className="text-xs font-medium text-slate-400 font-sans">{lang === 'ar' ? 'نقطة' : 'pts'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => {
            sound.playVictoryFanfare();
            onPlayAgainSame();
          }}
          className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.playAgainSamePlayers}</span>
        </button>

        <button
          onClick={() => {
            sound.playCardFlip();
            onNewGame();
          }}
          className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>{t.startFreshGame}</span>
        </button>

        <button
          onClick={onOpenGallery}
          className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-orange-600 dark:text-amber-400 bg-orange-50 dark:bg-slate-800/80 hover:bg-orange-100 rounded-xl border border-orange-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>{t.galleryNav}</span>
        </button>
      </div>
    </div>
  );
};
