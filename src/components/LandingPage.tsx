import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, Users, Clock, Smile, Play, HelpCircle, ArrowRight, ArrowLeft, Lightbulb, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CardItemView } from './CardItemView';
import { INITIAL_PROBLEM_CARDS, INITIAL_INGREDIENT_CARDS } from '../data/cards';
import { sound } from '../utils/sound';

interface LandingPageProps {
  lang: 'ar' | 'en';
  onStartPlaying: () => void;
  onOpenRules: () => void;
  onOpenGallery: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onStartPlaying,
  onOpenRules,
  onOpenGallery,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Interactive sample cards for visitor fun
  const [sampleIdx, setSampleIdx] = useState(0);
  const sampleProblem = INITIAL_PROBLEM_CARDS[sampleIdx % INITIAL_PROBLEM_CARDS.length];
  const sampleIng1 = INITIAL_INGREDIENT_CARDS[(sampleIdx * 2) % INITIAL_INGREDIENT_CARDS.length];
  const sampleIng2 = INITIAL_INGREDIENT_CARDS[(sampleIdx * 2 + 1) % INITIAL_INGREDIENT_CARDS.length];

  const handleShufflePreview = () => {
    sound.playCardFlip();
    setSampleIdx((prev) => prev + 1);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text & Primary Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right rtl:lg:text-right ltr:lg:text-left">
              {/* Egyptian dialect kicker banner */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>{lang === 'ar' ? 'أقوى لعبة عائلية لبيع الهوا في إزايز والضحك من القلب!' : 'The #1 Hilarious Family Invention Pitch Party Game!'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight">
                {t.heroTitle1}{' '}
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent underline decoration-amber-400 decoration-wavy decoration-2">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>

              {/* Quick specs banner */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium pt-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span>{t.quickStatPlayers}</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-amber-500" />
                  <span>{t.quickStatAge}</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span>{t.quickStatTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playCashRegister();
                    onStartPlaying();
                  }}
                  className="w-full sm:w-auto px-8 py-4 text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{t.heroCtaPrimary}</span>
                </button>

                <button
                  onClick={onOpenRules}
                  className="w-full sm:w-auto px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-amber-50/50 dark:hover:bg-slate-800/80"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.heroCtaRules}</span>
                </button>
              </div>
            </div>

            {/* Visual Hero Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-gradient-to-b from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-900 group">
                <img
                  src="/src/assets/images/hero_invent_it_1794167780061.jpg"
                  alt="Invent It! Family Board Game Artwork"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating mascot badge */}
                <div className="absolute -bottom-2 -left-2 rtl:-left-auto rtl:-right-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl bg-amber-400">
                  <img
                    src="/src/assets/images/mascot_inventor_1794167780971.jpg"
                    alt="Professor Brainy Mascot"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{lang === 'ar' ? 'لعبة الحفلات #1' : '#1 Party Game'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Card Reveal Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-amber-200/60 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'ar' ? 'جرب بنفسك قبل ما تبدأ' : 'Try a sample round right now'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {lang === 'ar' ? 'إزاي بتتركب الافتكاسة؟ جرب اسحب وشوف!' : 'How do cards match? Draw a sample hand!'}
              </h3>
            </div>

            <button
              onClick={handleShufflePreview}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-orange-600 dark:text-amber-400 bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 rounded-xl border border-orange-200 dark:border-slate-700 transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'اسحب كروت تانية عشوائياً' : 'Draw New Sample Cards'}</span>
            </button>
          </div>

          {/* 3 Sample Cards in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardItemView
              card={sampleProblem}
              type="problem"
              lang={lang}
              indexLabel={lang === 'ar' ? 'كارت المشكلة المستفزة ⚠️' : 'Problem Card ⚠️'}
            />
            <CardItemView
              card={sampleIng1}
              type="ingredient"
              lang={lang}
              indexLabel={lang === 'ar' ? 'المكون الأول 🧪' : 'Ingredient #1 🧪'}
            />
            <CardItemView
              card={sampleIng2}
              type="ingredient"
              lang={lang}
              indexLabel={lang === 'ar' ? 'المكون التاني 🚀' : 'Ingredient #2 🚀'}
            />
          </div>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            {lang === 'ar'
              ? '💡 مهمتك: تخترع منتج يحل المشكلة دي باستخدام المكونين دول.. وتبيعه للعيلة بأعلى سعر!'
              : '💡 Your mission: Invent a product solving this problem using both ingredients, and pitch it!'}
          </div>
        </div>
      </section>

      {/* How It Works Section (3 steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {lang === 'ar' ? 'القواعد في دقيقة واحدة' : 'Simple 3-Step Flow'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl font-black mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.step1Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-black mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.step2Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-teal-400 dark:hover:border-teal-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-black mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.step3Title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.step3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Why Families Love It Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-8 sm:p-12 border border-amber-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-wider">
              {lang === 'ar' ? 'اللمة الحلوة' : 'Family Nights'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t.whyLoveTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {t.whyLove1Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.whyLove1Desc}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {t.whyLove2Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.whyLove2Desc}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {t.whyLove3Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.whyLove3Desc}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {t.whyLove4Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.whyLove4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Quotes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h3 className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
          {t.quoteTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic">
              {t.quote1}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              {t.quote1Author}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic">
              {t.quote2}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              {t.quote2Author}
            </div>
          </div>
        </div>
      </section>

      {/* Big Bottom CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black">
            {lang === 'ar' ? 'جاهز تبيع الهوا في إزايز وتكسب أصوات العيلة؟' : 'Ready to pitch wacky contraptions and win the family crown?'}
          </h2>
          <p className="text-sm sm:text-base text-amber-100 max-w-xl mx-auto">
            {lang === 'ar' ? 'اجمع الحبايب، اختاروا أساميكم، وسيبوا الباقي على كروت الجنان والافتكاسات!' : 'Gather everyone around one phone or TV and let the laughter begin!'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playVictoryFanfare();
                onStartPlaying();
              }}
              className="px-8 py-4 bg-white text-orange-600 font-black text-base sm:text-lg rounded-xl shadow-lg hover:bg-amber-50 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t.playNow}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
