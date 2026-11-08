import React, { useState } from 'react';
import { CardItem } from '../types/game';
import { AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

interface CardItemViewProps {
  card: CardItem;
  type: 'problem' | 'ingredient';
  lang: 'ar' | 'en';
  indexLabel?: string;
  isFlippedInitial?: boolean;
}

export const CardItemView: React.FC<CardItemViewProps> = ({
  card,
  type,
  lang,
  indexLabel,
  isFlippedInitial = true,
}) => {
  const [flipped, setFlipped] = useState(isFlippedInitial);

  const isProblem = type === 'problem';

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="relative perspective-1000 w-full min-h-[200px] sm:min-h-[230px] cursor-pointer group select-none"
    >
      <div
        className={`w-full h-full duration-500 transform-style-3d transition-transform ${
          flipped ? '' : 'rotate-y-180'
        }`}
      >
        {/* Card Front */}
        <div
          className={`w-full h-full backface-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md border transition-all ${
            isProblem
              ? 'bg-gradient-to-br from-rose-50 via-orange-50/80 to-amber-50 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 border-rose-200 dark:border-rose-900/60 shadow-rose-500/5'
              : 'bg-gradient-to-br from-teal-50 via-emerald-50/80 to-cyan-50 dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-900 border-teal-200 dark:border-teal-900/60 shadow-teal-500/5'
          } group-hover:-translate-y-1 group-hover:shadow-lg`}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{card.icon || (isProblem ? '⚠️' : '🧪')}</span>
              <span
                className={`text-xs font-bold tracking-wider uppercase ${
                  isProblem ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                }`}
              >
                {indexLabel || (isProblem ? (lang === 'ar' ? 'كارت المشكلة والورطة' : 'Problem Card') : (lang === 'ar' ? 'مكون إجباري' : 'Ingredient Card'))}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <RefreshCw className="w-3.5 h-3.5 opacity-60" />
            </div>
          </div>

          {/* Card Body */}
          <div className="py-3 flex-1 flex flex-col justify-center">
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed text-right rtl:text-right ltr:text-left">
              {lang === 'ar' ? card.textAr : card.textEn}
            </p>
            {/* Secondary translation preview */}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic text-right rtl:text-right ltr:text-left">
              {lang === 'ar' ? card.textEn : card.textAr}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">
              {card.category === 'easy' ? (lang === 'ar' ? 'أطفال / خفيف' : 'Kids') : card.category === 'crazy' ? (lang === 'ar' ? 'جنان رسمي' : 'Crazy') : (lang === 'ar' ? 'عائلي' : 'Normal')}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{lang === 'ar' ? 'اخترعها!' : 'Invent It!'}</span>
            </span>
          </div>
        </div>

        {/* Card Back */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md border border-amber-300 dark:border-slate-700 bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 text-white"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-2 shadow-inner">
            💡
          </div>
          <h4 className="font-extrabold text-lg text-white drop-shadow-sm">
            {isProblem ? (lang === 'ar' ? 'كارت الورطة' : 'Problem') : (lang === 'ar' ? 'كارت المكون' : 'Ingredient')}
          </h4>
          <p className="text-xs text-amber-100 mt-1">
            {lang === 'ar' ? 'اضغط لكشف الكارت' : 'Click to flip'}
          </p>
        </div>
      </div>
    </div>
  );
};
