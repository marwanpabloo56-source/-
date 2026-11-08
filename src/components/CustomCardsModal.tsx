import React, { useState } from 'react';
import { CardItem } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { Layers, Plus, Trash2, X, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface CustomCardsModalProps {
  customProblems: CardItem[];
  customIngredients: CardItem[];
  onAddProblem: (card: CardItem) => void;
  onAddIngredient: (card: CardItem) => void;
  onRemoveProblem: (id: string) => void;
  onRemoveIngredient: (id: string) => void;
  lang: 'ar' | 'en';
  onClose: () => void;
}

export const CustomCardsModal: React.FC<CustomCardsModalProps> = ({
  customProblems,
  customIngredients,
  onAddProblem,
  onAddIngredient,
  onRemoveProblem,
  onRemoveIngredient,
  lang,
  onClose,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'problem' | 'ingredient'>('problem');
  const [cardText, setCardText] = useState('');
  const [cardEmoji, setCardEmoji] = useState('💥');
  const [cardCategory, setCardCategory] = useState<'easy' | 'normal' | 'crazy'>('normal');

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const text = cardText.trim();
    if (!text) return;

    sound.playCashRegister();
    const newCard: CardItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      textAr: text,
      textEn: text,
      category: cardCategory,
      icon: cardEmoji || (activeTab === 'problem' ? '⚠️' : '🧪'),
      isCustom: true,
    };

    if (activeTab === 'problem') {
      onAddProblem(newCard);
    } else {
      onAddIngredient(newCard);
    }

    setCardText('');
  };

  const sampleEmojis = activeTab === 'problem' 
    ? ['⚠️', '💥', '🤦‍♂️', '😱', '🔥', '🧦', '⏰', '🚗', '🐱', '🍕']
    : ['🧪', '🚀', '🍌', '🩴', '⚡', '🪢', '🥫', '💡', '🤖', '🍿'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.customCardsTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.customCardsSubtitle}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 self-end sm:self-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs: Problem or Ingredient */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-md">
        <button
          onClick={() => {
            sound.playCardFlip();
            setActiveTab('problem');
            setCardEmoji('⚠️');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'problem'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {lang === 'ar' ? 'كروت الورطة والمشاكل' : 'Problem Cards'} ({customProblems.length})
        </button>

        <button
          onClick={() => {
            sound.playCardFlip();
            setActiveTab('ingredient');
            setCardEmoji('🧪');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'ingredient'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {lang === 'ar' ? 'كروت المكونات العجيبة' : 'Ingredient Cards'} ({customIngredients.length})
        </button>
      </div>

      {/* Add Card Form */}
      <form onSubmit={handleSaveCard} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-wider">
          <Plus className="w-4 h-4" />
          <span>
            {activeTab === 'problem' ? t.addProblemBtn : t.addIngredientBtn}
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t.customCardTextLabel}
          </label>
          <textarea
            rows={2}
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
            placeholder={
              activeTab === 'problem'
                ? (lang === 'ar' ? 'مثلاً: طنط بتنسى شاحنها كل أسبوع وتتهم العمارة كلها بالسرقة!' : 'e.g., Uncle forgets his keys and blames the dog!')
                : (lang === 'ar' ? 'مثلاً: فردة شراب صوف مخروقة ومعاها بطارية ريموت فاضية' : 'e.g., A dead TV battery and a leaky coffee mug')
            }
            maxLength={140}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
          />
        </div>

        {/* Emoji Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {lang === 'ar' ? 'اختار إيموجي يعبر عن الكارت:' : 'Choose card emoji:'}
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {sampleEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setCardEmoji(emoji)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                  cardEmoji === emoji
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 scale-110 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!cardText.trim()}
          className="w-full sm:w-auto px-6 py-3 font-extrabold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 rounded-xl shadow-xs transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t.saveCardBtn}</span>
        </button>
      </form>

      {/* Existing Custom Cards List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {t.existingCustomCards}
        </h3>

        {activeTab === 'problem' ? (
          customProblems.length === 0 ? (
            <p className="text-xs text-slate-400 italic p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              {t.noCustomCardsYet}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customProblems.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl">{c.icon || '⚠️'}</span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {c.textAr}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playCardFlip();
                      onRemoveProblem(c.id);
                    }}
                    title={t.deleteCard}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          customIngredients.length === 0 ? (
            <p className="text-xs text-slate-400 italic p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              {t.noCustomCardsYet}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customIngredients.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl">{c.icon || '🧪'}</span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {c.textAr}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playCardFlip();
                      onRemoveIngredient(c.id);
                    }}
                    title={t.deleteCard}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
