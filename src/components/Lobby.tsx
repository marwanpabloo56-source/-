import React, { useState } from 'react';
import { Player, GameSettings, GameDifficulty } from '../types/game';
import { PRESET_AVATARS } from '../data/cards';
import { TRANSLATIONS } from '../data/translations';
import { Plus, Trash2, Play, Users, Sparkles, Sliders, Clock, Flame, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/sound';

interface LobbyProps {
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
  onStartGame: () => void;
  lang: 'ar' | 'en';
}

export const Lobby: React.FC<LobbyProps> = ({
  players,
  onUpdatePlayers,
  settings,
  onUpdateSettings,
  onStartGame,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);

  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name = newPlayerName.trim();
    if (!name) return;
    if (players.length >= 8) return;

    const av = PRESET_AVATARS[selectedAvatarIdx % PRESET_AVATARS.length];
    const newPlayer: Player = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      avatar: av.emoji,
      color: av.color,
      score: 0,
    };

    sound.playBoing();
    onUpdatePlayers([...players, newPlayer]);
    setNewPlayerName('');
    setSelectedAvatarIdx((prev) => (prev + 1) % PRESET_AVATARS.length);
  };

  const handleRemovePlayer = (id: string) => {
    sound.playCardFlip();
    onUpdatePlayers(players.filter((p) => p.id !== id));
  };

  const handleQuickAddPreset = (av: typeof PRESET_AVATARS[0]) => {
    if (players.length >= 8) return;
    const name = lang === 'ar' ? av.nameAr : av.nameEn;
    const newPlayer: Player = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      avatar: av.emoji,
      color: av.color,
      score: 0,
    };
    sound.playBoing();
    onUpdatePlayers([...players, newPlayer]);
  };

  const canStart = players.length >= 3;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'غرفة تجهيز الحريفة' : 'Party Room Setup'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.lobbyTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          {t.lobbySubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Players List (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {t.playersCount} ({players.length}/8)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {lang === 'ar' ? 'من 3 لـ 8 لاعبين' : '3 to 8 players'}
              </span>
            </div>

            {/* Players Roster */}
            <div className="space-y-2.5">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 transition-all hover:border-amber-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-4 tabular-nums">
                      {idx + 1}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs"
                      style={{ backgroundColor: `${p.color}20`, borderColor: p.color, borderWidth: 1 }}
                    >
                      {p.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {p.name}
                      </p>
                      <span className="text-xs text-slate-400 font-medium">
                        {lang === 'ar' ? 'مخترع جاهز للتسويق' : 'Ready to Pitch'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemovePlayer(p.id)}
                    title={lang === 'ar' ? 'حذف اللاعب' : 'Remove player'}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Player Input */}
            {players.length < 8 ? (
              <form onSubmit={handleAddPlayer} className="pt-2 space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder={t.playerPlaceholder}
                      maxLength={24}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newPlayerName.trim()}
                    className="px-5 py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addPlayer}</span>
                  </button>
                </div>

                {/* Quick Add Presets pills */}
                <div>
                  <div className="text-xs font-semibold text-slate-400 mb-2">
                    {lang === 'ar' ? 'أو اختار شخصية مصرية جاهزة بضغطة واحدة:' : 'Or tap a quick preset avatar:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => handleQuickAddPreset(av)}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <span>{av.emoji}</span>
                        <span>{lang === 'ar' ? av.nameAr : av.nameEn}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-3 text-center text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-xl">
                {lang === 'ar' ? 'القعدة اكتملت بـ 8 لاعبين! يلا نبدأ اللعب!' : 'Room is full at 8 players! Time to play!'}
              </div>
            )}

            {!canStart && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{t.minPlayersNotice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Game Settings & Rules Control (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Sliders className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {lang === 'ar' ? 'إعدادات الجولة' : 'Game Options'}
              </h3>
            </div>

            {/* Difficulty Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                {t.difficultyTitle}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'normal', 'crazy'] as GameDifficulty[]).map((diff) => {
                  const active = settings.difficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        sound.playCardFlip();
                        onUpdateSettings({ ...settings, difficulty: diff });
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        active
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-sm">
                        {diff === 'easy' ? '👶 أطفال' : diff === 'normal' ? '👨‍👩‍👧 عائلي' : '🤪 جنان'}
                      </div>
                      <div className="text-[10px] mt-0.5 opacity-90 truncate">
                        {diff === 'easy' ? t.diffEasy : diff === 'normal' ? t.diffNormal : t.diffCrazy}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rounds Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <span>{t.roundsTitle}</span>
                <span className="text-orange-600 dark:text-amber-400 font-extrabold text-sm">
                  {settings.totalRounds} {t.roundsCount}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10].map((rounds) => (
                  <button
                    key={rounds}
                    type="button"
                    onClick={() => {
                      sound.playCardFlip();
                      onUpdateSettings({ ...settings, totalRounds: rounds });
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      settings.totalRounds === rounds
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                    }`}
                  >
                    {rounds} {t.roundsCount}
                  </button>
                ))}
              </div>
            </div>

            {/* Invent Timer Per Player */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  <span>{t.inventTimeTitle}</span>
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-extrabold text-sm">
                  {settings.inventTimeSeconds} {lang === 'ar' ? 'ثانية' : 'sec'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[45, 60, 90].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => {
                      sound.playCardFlip();
                      onUpdateSettings({ ...settings, inventTimeSeconds: sec });
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      settings.inventTimeSeconds === sec
                        ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
                    }`}
                  >
                    {sec} {lang === 'ar' ? 'ثانية' : 's'}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Game Action */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!canStart}
                onClick={() => {
                  sound.playVictoryFanfare();
                  onStartGame();
                }}
                className="w-full py-4 text-base font-black text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:pointer-events-none rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{t.startGameBtn}</span>
              </button>
              <div className="text-center text-[11px] text-slate-400 mt-2">
                {lang === 'ar' ? 'اخترع وسوّق وصوّت.. اللعبة كلها على الشاشة دي!' : 'One shared phone or TV for all players!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
