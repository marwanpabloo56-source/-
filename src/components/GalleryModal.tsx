import React, { useState, useEffect } from 'react';
import { SavedInvention } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { STORAGE_KEYS } from '../data/cards';
import { Award, Trash2, ArrowRight, ArrowLeft, Star, Sparkles, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface GalleryModalProps {
  lang: 'ar' | 'en';
  onClose: () => void;
  onStartPlaying: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  lang,
  onClose,
  onStartPlaying,
}) => {
  const t = TRANSLATIONS[lang];
  const [inventions, setInventions] = useState<SavedInvention[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (stored) {
        setInventions(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  const handleDelete = (id: string) => {
    sound.playCardFlip();
    const updated = inventions.filter((inv) => inv.id !== id);
    setInventions(updated);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm(lang === 'ar' ? 'متأكد إنك عايز تفضي كل المعرض؟' : 'Clear all saved inventions?')) {
      sound.playBoing();
      setInventions([]);
      localStorage.removeItem(STORAGE_KEYS.GALLERY);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.galleryTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.gallerySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {inventions.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900"
            >
              {t.clearAllGallery}
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Inventions Grid */}
      {inventions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
            💡
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.emptyGalleryText}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t.emptyGallerySub}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playCashRegister();
                onStartPlaying();
              }}
              className="px-6 py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all text-sm shadow-sm"
            >
              {t.playNow}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventions.map((inv) => (
            <div
              key={inv.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative group hover:border-amber-400 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs"
                    style={{ backgroundColor: `${inv.playerColor || '#F97316'}20` }}
                  >
                    {inv.playerAvatar}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block">
                      {inv.playerName} · {inv.savedAt}
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                      «{inv.name}»
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(inv.id)}
                  title={t.deleteInvention}
                  className="opacity-60 hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 text-amber-900 dark:text-amber-200 text-sm font-semibold italic">
                "{inv.slogan}"
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  💰 {inv.price}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1 font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{inv.votesCount} {lang === 'ar' ? 'أصوات' : 'votes'}</span>
                </span>
              </div>

              {inv.features && (
                <p className="text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2 leading-relaxed">
                  {inv.features}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
