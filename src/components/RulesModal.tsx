import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { BookOpen, X, Sparkles, CheckCircle2, Play, Flame, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface RulesModalProps {
  lang: 'ar' | 'en';
  onClose: () => void;
  onStartPlaying: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  lang,
  onClose,
  onStartPlaying,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.rulesModalTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar' ? 'دليلك السريع لتكون أشطر بياع وتكسب قلوب العيلة!' : 'Your guide to pitching like a TV sales legend!'}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 self-end sm:self-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 3 Step Rules Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {lang === 'ar' ? 'قواعد اللعبة باختصار شديد:' : 'Game Rules at a Glance:'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {lang === 'ar' ? 'سحب كروت الحظ' : 'Deal the Cards'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'كل جولة بينزل كارت مشكلة مستفزة ومكونين عجيبين. كل اللاعبين بيخترعوا حل لنفس المشكلة دي بنفس المكونات!'
                : 'Every round deals 1 problem card and 2 ingredient cards. Everyone invents their own solution!'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {lang === 'ar' ? '60 ثانية افتكاس' : '60 Seconds to Invent'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'على نفس الشاشة أو كل واحد في دوره: حط اسم فخم للمنتج، شعار بيعي يلزق في الودن، وسعر لا يقاوم بالجنيه!'
                : 'Pick a catchy product name, a memorable slogan, an outrageous price, and quick pitch notes.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {lang === 'ar' ? 'استوديو البيع والتصويت' : 'Pitch & Vote'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'كل مخترع يقف في الصالة أو على الكنبة ويبيع اختراعه بصوت إذاعي! بعدين تصويت سري.. وكل صوت بنقطة!'
                : 'Stand up and deliver your sales pitch! Then secret ballot voting: each vote earns 1 point.'}
            </p>
          </div>
        </div>
      </div>

      {/* The Salesperson Playbook (Egyptian Humor Pro Tips) */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            {t.rulesSalesSecretTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'ar' ? '1. جملة البداية الصادمة:' : '1. The Shock Hook:'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'ابدأ بصوت عالي: «يا مدام! يا أستاذ! زهقت من كراكيب الصالة؟ الحل السحري وصل أخيراً!»'
                : 'Open dramatically: "Ladies and gentlemen! Are you tired of disappearing socks? Behold!"'}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'ar' ? '2. الخصم الوهمي لأول 3 متصلين:' : '2. The Fake Limited Offer:'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? '«الجهاز ده في الساحل بـ 5000 دولار.. لكن النهاردة ولأول 3 هيصوتوا لي: بـ 99 جنيه وشكراً!»'
                : '"Normally $1,000,000, but for the first 3 voters today: only $19.99 plus free shipping!"'}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'ar' ? '3. الميزة الخيالية المستحيلة:' : '3. The Miracle Feature:'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? '«الموزة اللي في الاختراع مش للأكل.. دي شريحة ذكاء اصطناعي بتنور أول ما حد يمد إيده على التلاجة!»'
                : '"The banana is not fruit, it is a quantum bio-sensor that alarms when anyone touches your food!"'}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              {lang === 'ar' ? '4. الضمان العائلي الأبدي:' : '4. The Ultimate Guarantee:'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? '«لو المنتج منفّعكش خلال أسبوع.. هرجعلك فلوسك وهعملك شاي بلبن بإيدي!»'
                : '"If you are not 100% thrilled, we will personally bake you cookies!"'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            sound.playVictoryFanfare();
            onStartPlaying();
          }}
          className="px-8 py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all text-base shadow-md inline-flex items-center gap-2"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{lang === 'ar' ? 'فهمنا كل حاجة.. يلا نلعب!' : 'Understood.. Let’s Play!'}</span>
        </button>
      </div>
    </div>
  );
};
