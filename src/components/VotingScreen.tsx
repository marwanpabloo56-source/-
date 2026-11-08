import React, { useState } from 'react';
import { Player, RoundInvention } from '../types/game';
import { TRANSLATIONS } from '../data/translations';
import { Vote, CheckCircle2, ShieldAlert, Sparkles, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface VotingScreenProps {
  players: Player[];
  inventions: RoundInvention[];
  lang: 'ar' | 'en';
  onVotingCompleted: (updatedInventions: RoundInvention[]) => void;
}

export const VotingScreen: React.FC<VotingScreenProps> = ({
  players,
  inventions,
  lang,
  onVotingCompleted,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentVoterIdx, setCurrentVoterIdx] = useState(0);
  // Map voterId -> selected inventionId
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [selectedInventionId, setSelectedInventionId] = useState<string | null>(null);

  const activeVoter = players[currentVoterIdx] || players[0];

  const handleSelectInvention = (invId: string) => {
    sound.playBoing();
    setSelectedInventionId(invId);
  };

  const handleCastVote = () => {
    if (!selectedInventionId) return;

    sound.playCashRegister();
    const updatedVotes = {
      ...votes,
      [activeVoter.id]: selectedInventionId,
    };
    setVotes(updatedVotes);
    setSelectedInventionId(null);

    if (currentVoterIdx < players.length - 1) {
      setCurrentVoterIdx((prev) => prev + 1);
    } else {
      // All voters done! Tally up votes
      const talliedInventions = inventions.map((inv) => {
        const votersForThisInv = Object.entries(updatedVotes)
          .filter(([_, votedId]) => votedId === inv.id)
          .map(([voterId]) => voterId);

        return {
          ...inv,
          votesCount: votersForThisInv.length,
          votedBy: votersForThisInv,
        };
      });

      sound.playVictoryFanfare();
      onVotingCompleted(talliedInventions);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <Vote className="w-4 h-4 text-orange-500" />
          <span>{lang === 'ar' ? 'صندوق الانتخابات العائلية' : 'Family Secret Ballot'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.votingHeading}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.votingSubtitle}
        </p>
      </div>

      {/* Current Voter Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t.voterPrompt}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl">{activeVoter.avatar}</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {activeVoter.name}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                ({currentVoterIdx + 1} / {players.length})
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{t.cantVoteSelfNotice}</span>
          </div>
        </div>

        {/* Invention Cards to vote on */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'اختار أحسن افتكاسة بضمير:' : 'Select the best invention:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventions.map((inv) => {
              const isOwnInvention = inv.playerId === activeVoter.id;
              const isSelected = selectedInventionId === inv.id;

              return (
                <div
                  key={inv.id}
                  onClick={() => {
                    if (!isOwnInvention) handleSelectInvention(inv.id);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all select-none relative ${
                    isOwnInvention
                      ? 'opacity-40 bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-md transform -translate-y-0.5 cursor-pointer'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-slate-600 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs"
                        style={{ backgroundColor: `${inv.playerColor}20` }}
                      >
                        {inv.playerAvatar}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-semibold block">
                          {inv.playerName}
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                          «{inv.name}»
                        </h4>
                      </div>
                    </div>

                    {isOwnInvention ? (
                      <span className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded-md">
                        {lang === 'ar' ? 'اختراعك' : 'Yours'}
                      </span>
                    ) : isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0" />
                    ) : null}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                    "{inv.slogan}"
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>💰 {inv.price}</span>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      {isSelected ? (lang === 'ar' ? '✓ تم الاختيار' : '✓ Selected') : (lang === 'ar' ? 'اضغط للاختيار' : 'Tap to select')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cast Vote Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            disabled={!selectedInventionId}
            onClick={handleCastVote}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 disabled:pointer-events-none rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Vote className="w-4 h-4" />
            <span>
              {currentVoterIdx < players.length - 1
                ? (lang === 'ar' ? 'اعتمد صوتي وسلم للي بعده 🗳️' : 'Cast Vote & Pass Device 🗳️')
                : (lang === 'ar' ? 'اعتماد آخر صوت وكشف البطل! 🏆' : 'Final Vote & Reveal Champion! 🏆')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
