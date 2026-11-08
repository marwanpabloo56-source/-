import React, { useState, useEffect, useRef } from 'react';
import { CardItem, Player, GameSettings, InventionDraft, RoundInvention } from '../types/game';
import { CardItemView } from './CardItemView';
import { TRANSLATIONS } from '../data/translations';
import { Clock, Play, Pause, RotateCcw, Sparkles, Send, Lightbulb, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { sound } from '../utils/sound';

interface GameScreenProps {
  currentRound: number;
  totalRounds: number;
  problemCard: CardItem;
  ingredientCards: [CardItem, CardItem];
  players: Player[];
  settings: GameSettings;
  lang: 'ar' | 'en';
  onAllInventionsReady: (inventions: RoundInvention[]) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  currentRound,
  totalRounds,
  problemCard,
  ingredientCards,
  players,
  settings,
  lang,
  onAllInventionsReady,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, InventionDraft>>({});

  // Current active draft
  const activePlayer = players[currentPlayerIdx] || players[0];
  const currentDraft: InventionDraft = drafts[activePlayer.id] || {
    playerId: activePlayer.id,
    name: '',
    slogan: '',
    price: '',
    features: '',
  };

  // 60-Second Timer state
  const [timeLeft, setTimeLeft] = useState(settings.inventTimeSeconds);
  const [timerRunning, setTimerRunning] = useState(true);
  const timerRef = useRef<number | null>(null);

  // Play card flip on load
  useEffect(() => {
    sound.playCardFlip();
  }, [currentRound]);

  // Reset timer on player turn change
  useEffect(() => {
    setTimeLeft(settings.inventTimeSeconds);
    setTimerRunning(true);
  }, [currentPlayerIdx, settings.inventTimeSeconds]);

  // Timer interval
  useEffect(() => {
    if (!timerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          sound.playTimeUp();
          return 0;
        }
        if (prev <= 6) {
          sound.playUrgentTick();
        } else if (prev % 10 === 0 || prev <= 15) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const handleUpdateDraft = (field: keyof InventionDraft, value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [activePlayer.id]: {
        ...currentDraft,
        [field]: value,
      },
    }));
  };

  // Quick funny Egyptian brainstorm suggestions for players stuck
  const funnySuggestions = [
    {
      name: lang === 'ar' ? 'البلاص الذكي 3000' : 'Smart Clay Urn 3000',
      slogan: lang === 'ar' ? 'هيريح بالك وينقذك من أي ورطة!' : 'Saves the day when everything fails!',
      price: lang === 'ar' ? '99 جنيه وشكراً' : '$19.99 only',
    },
    {
      name: lang === 'ar' ? 'جهاز فك الزنقة اللاسلكي' : 'Wireless Problem Solver',
      slogan: lang === 'ar' ? 'معانا المشكلة هتبقى ذكرى مضحكة!' : 'Turning chaos into pure laughter!',
      price: lang === 'ar' ? '3 أكياس شيبسي وكولا' : '$9.50 and a soda',
    },
    {
      name: lang === 'ar' ? 'صاروخ الراحة الفورية' : 'Instant Comfort Rocket',
      slogan: lang === 'ar' ? 'مش هتصدق عينك.. بس هتصدق جيبك!' : 'Believe your eyes, spare your wallet!',
      price: lang === 'ar' ? '250 جنيه مع التوصيل' : '$49.99 with free shipping',
    },
  ];

  const applySuggestion = (s: typeof funnySuggestions[0]) => {
    sound.playBoing();
    setDrafts((prev) => ({
      ...prev,
      [activePlayer.id]: {
        ...currentDraft,
        name: s.name,
        slogan: s.slogan,
        price: s.price,
      },
    }));
  };

  const handleNextPlayerOrFinish = () => {
    sound.playCashRegister();
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx((prev) => prev + 1);
    } else {
      // All players done! Convert drafts to RoundInventions
      const roundInventions: RoundInvention[] = players.map((p) => {
        const d = drafts[p.id] || {
          playerId: p.id,
          name: lang === 'ar' ? 'اختراع سري خارق' : 'Secret Wacky Gadget',
          slogan: lang === 'ar' ? 'أحسن حاجة في الدنيا!' : 'The best thing ever invented!',
          price: lang === 'ar' ? '100 جنيه' : '$50',
          features: lang === 'ar' ? 'بيحل المشكلة بالحب والمكونات' : 'Miraculously solves the problem',
        };
        return {
          id: `inv_${Date.now()}_${p.id}`,
          playerId: p.id,
          playerName: p.name,
          playerAvatar: p.avatar,
          playerColor: p.color,
          name: d.name.trim() || (lang === 'ar' ? 'اختراع سري خارق' : 'Secret Wacky Gadget'),
          slogan: d.slogan.trim() || (lang === 'ar' ? 'هتدعيلي طول عمرك!' : 'You will thank me forever!'),
          price: d.price.trim() || (lang === 'ar' ? '99 جنيه' : '$20'),
          features: d.features.trim() || (lang === 'ar' ? 'حل عبقري هيصدم العالم!' : 'Mind-blowing features!'),
          problemCard,
          ingredientCards,
          votesCount: 0,
          votedBy: [],
          timestamp: Date.now(),
        };
      });

      onAllInventionsReady(roundInventions);
    }
  };

  // Timer circular progress
  const timerPercent = (timeLeft / settings.inventTimeSeconds) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Bar: Round & Current Player Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-black text-sm">
            {t.roundNum} {currentRound} / {totalRounds}
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">
              {lang === 'ar' ? 'دور اللاعب الحالي في الافتكاس:' : 'Current Player Inventing:'}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl">{activePlayer.avatar}</span>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                {activePlayer.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                ({currentPlayerIdx + 1}/{players.length})
              </span>
            </div>
          </div>
        </div>

        {/* 60s Countdown Timer Widget */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-black text-lg transition-all ${
              isUrgent
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
            }`}
          >
            <Clock className={`w-5 h-5 ${isUrgent ? 'animate-spin' : ''}`} />
            <span className="tabular-nums">{timeLeft}</span>
            <span className="text-xs font-sans font-bold">{lang === 'ar' ? 'ثانية' : 's'}</span>
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            title={timerRunning ? 'إيقاف مؤقت' : 'استئناف'}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setTimeLeft(settings.inventTimeSeconds);
              setTimerRunning(true);
            }}
            title="إعادة ضبط الوقت"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The 3 Dealt Cards Row */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {lang === 'ar' ? 'خامات الجولة دي (اجمعهم واخترع حل!):' : 'Round Materials (Combine into an invention):'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardItemView
            card={problemCard}
            type="problem"
            lang={lang}
            indexLabel={t.problemCardLabel}
          />
          <CardItemView
            card={ingredientCards[0]}
            type="ingredient"
            lang={lang}
            indexLabel={`${t.ingredientCardLabel} #1`}
          />
          <CardItemView
            card={ingredientCards[1]}
            type="ingredient"
            lang={lang}
            indexLabel={`${t.ingredientCardLabel} #2`}
          />
        </div>
      </div>

      {/* Invention Drafting Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-amber-400 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{t.inventingHeading}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {lang === 'ar' ? `يا ${activePlayer.name}.. اخترع الفنكوش واقنعنا!` : `${activePlayer.name}, craft your pitch!`}
            </h2>
          </div>

          {/* Quick funny inspirations */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'ar' ? 'أفكار سريعة:' : 'Quick ideas:'}</span>
            </span>
            {funnySuggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applySuggestion(s)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors border border-amber-200/60 dark:border-amber-800/40"
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Invention Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {t.inventionNameLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={currentDraft.name}
              onChange={(e) => handleUpdateDraft('name', e.target.value)}
              placeholder={t.inventionNamePlaceholder}
              maxLength={60}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {t.priceLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={currentDraft.price}
              onChange={(e) => handleUpdateDraft('price', e.target.value)}
              placeholder={t.pricePlaceholder}
              maxLength={40}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold"
            />
          </div>

          {/* Slogan */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {t.sloganLabel} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={currentDraft.slogan}
              onChange={(e) => handleUpdateDraft('slogan', e.target.value)}
              placeholder={t.sloganPlaceholder}
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold"
            />
          </div>

          {/* Features / Pitch Notes */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {t.featuresLabel}
            </label>
            <textarea
              rows={2}
              value={currentDraft.features}
              onChange={(e) => handleUpdateDraft('features', e.target.value)}
              placeholder={t.featuresPlaceholder}
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
            />
          </div>
        </div>

        {/* Turn Progression Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left rtl:sm:text-right">
            {currentPlayerIdx < players.length - 1 ? (
              <span>
                {t.nextPlayerTurn}{' '}
                <strong className="text-slate-900 dark:text-white">
                  {players[currentPlayerIdx + 1]?.name} {players[currentPlayerIdx + 1]?.avatar}
                </strong>
              </span>
            ) : (
              <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.allDoneReadyToPitch}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextPlayerOrFinish}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>
              {currentPlayerIdx < players.length - 1
                ? (lang === 'ar' ? 'سجل وسلم للي بعده ➡️' : 'Save & Pass Device ➡️')
                : (lang === 'ar' ? 'جاهزين للبيع في الاستوديو! 📺' : 'Start TV Pitch Mode! 📺')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
