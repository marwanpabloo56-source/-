import React, { useState, useEffect } from 'react';
import { GamePhase, Player, GameSettings, CardItem, RoundInvention, SavedInvention } from './types/game';
import { INITIAL_PROBLEM_CARDS, INITIAL_INGREDIENT_CARDS, PRESET_AVATARS, STORAGE_KEYS } from './data/cards';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Lobby } from './components/Lobby';
import { GameScreen } from './components/GameScreen';
import { PitchMode } from './components/PitchMode';
import { VotingScreen } from './components/VotingScreen';
import { RoundReveal } from './components/RoundReveal';
import { GameOverScreen } from './components/GameOverScreen';
import { GalleryModal } from './components/GalleryModal';
import { CustomCardsModal } from './components/CustomCardsModal';
import { RulesModal } from './components/RulesModal';
import { sound } from './utils/sound';

export default function App() {
  // App settings & UI state
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [phase, setPhase] = useState<GamePhase>('LANDING');

  // Game configuration
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'normal',
    totalRounds: 5,
    inventTimeSeconds: 60,
    pitchTimeSeconds: 60,
    soundEnabled: true,
    language: 'ar',
  });

  // Default initial friendly players
  const [players, setPlayers] = useState<Player[]>([
    { id: 'p1', name: 'البروفيسور فتك', avatar: '🧐', color: '#F97316', score: 0 },
    { id: 'p2', name: 'طنط فوزية', avatar: '👵', color: '#EC4899', score: 0 },
    { id: 'p3', name: 'الواد حمادة', avatar: '🤓', color: '#3B82F6', score: 0 },
    { id: 'p4', name: 'كابتن برعي', avatar: '😎', color: '#EAB308', score: 0 },
  ]);

  // Custom cards saved in storage
  const [customProblems, setCustomProblems] = useState<CardItem[]>([]);
  const [customIngredients, setCustomIngredients] = useState<CardItem[]>([]);
  const [savedGalleryCount, setSavedGalleryCount] = useState<number>(0);

  // Active round state
  const [currentRound, setCurrentRound] = useState(1);
  const [currentProblem, setCurrentProblem] = useState<CardItem>(INITIAL_PROBLEM_CARDS[0]);
  const [currentIngredients, setCurrentIngredients] = useState<[CardItem, CardItem]>([
    INITIAL_INGREDIENT_CARDS[0],
    INITIAL_INGREDIENT_CARDS[1],
  ]);
  const [currentRoundInventions, setCurrentRoundInventions] = useState<RoundInvention[]>([]);
  const [allRoundWinners, setAllRoundWinners] = useState<SavedInvention[]>([]);

  // Track drawn card IDs in this session to prevent repeats
  const [usedProblemIds, setUsedProblemIds] = useState<Set<string>>(new Set());
  const [usedIngredientIds, setUsedIngredientIds] = useState<Set<string>>(new Set());

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync language attribute on document
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Load custom cards & gallery count from localStorage on mount
  useEffect(() => {
    try {
      const pStr = localStorage.getItem(STORAGE_KEYS.CUSTOM_PROBLEMS);
      if (pStr) setCustomProblems(JSON.parse(pStr));

      const iStr = localStorage.getItem(STORAGE_KEYS.CUSTOM_INGREDIENTS);
      if (iStr) setCustomIngredients(JSON.parse(iStr));

      const gStr = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (gStr) {
        const list = JSON.parse(gStr);
        setSavedGalleryCount(Array.isArray(list) ? list.length : 0);
      }
    } catch (_) {}
  }, []);

  const handleToggleSound = () => {
    const nextVal = sound.toggleSound();
    setSoundEnabled(nextVal);
  };

  const handleToggleLang = () => {
    sound.playCardFlip();
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);

    // Update preset player names if at defaults
    setPlayers((prev) =>
      prev.map((p, idx) => {
        const match = PRESET_AVATARS[idx % PRESET_AVATARS.length];
        if (match && (p.name === match.nameAr || p.name === match.nameEn)) {
          return {
            ...p,
            name: nextLang === 'ar' ? match.nameAr : match.nameEn,
          };
        }
        return p;
      })
    );
  };

  // Draw fresh cards for a round
  const drawCardsForRound = () => {
    const allProblems = [...INITIAL_PROBLEM_CARDS, ...customProblems];
    const allIngredients = [...INITIAL_INGREDIENT_CARDS, ...customIngredients];

    // Filter by difficulty preference if available
    let eligibleProblems = allProblems.filter((p) => {
      if (settings.difficulty === 'easy') return p.category === 'easy' || p.category === 'normal';
      if (settings.difficulty === 'crazy') return p.category === 'crazy' || p.category === 'normal';
      return true;
    });
    if (eligibleProblems.length === 0) eligibleProblems = allProblems;

    // Avoid recently used if possible
    let freshProblems = eligibleProblems.filter((p) => !usedProblemIds.has(p.id));
    if (freshProblems.length === 0) {
      usedProblemIds.clear();
      freshProblems = eligibleProblems;
    }

    const pickedProblem = freshProblems[Math.floor(Math.random() * freshProblems.length)];
    usedProblemIds.add(pickedProblem.id);

    // Pick 2 distinct ingredients
    let freshIngredients = allIngredients.filter((i) => !usedIngredientIds.has(i.id));
    if (freshIngredients.length < 2) {
      usedIngredientIds.clear();
      freshIngredients = allIngredients;
    }

    const shuffledIng = [...freshIngredients].sort(() => 0.5 - Math.random());
    const ing1 = shuffledIng[0];
    const ing2 = shuffledIng[1] || allIngredients[0];

    usedIngredientIds.add(ing1.id);
    usedIngredientIds.add(ing2.id);

    setCurrentProblem(pickedProblem);
    setCurrentIngredients([ing1, ing2]);
  };

  // Start a new game session
  const handleStartGame = () => {
    // Reset scores
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
    setCurrentRound(1);
    setAllRoundWinners([]);
    setUsedProblemIds(new Set());
    setUsedIngredientIds(new Set());
    drawCardsForRound();
    setPhase('INVENTING');
  };

  // All players finished drafting in active round
  const handleAllInventionsReady = (inventions: RoundInvention[]) => {
    setCurrentRoundInventions(inventions);
    setPhase('PITCH_TIME');
  };

  // Pitches finished -> Move to voting
  const handlePitchesCompleted = () => {
    setPhase('VOTING');
  };

  // Voting finished -> Award scores and show round winner
  const handleVotingCompleted = (talliedInventions: RoundInvention[]) => {
    setCurrentRoundInventions(talliedInventions);

    // Update player scores: 1 point per vote received
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        const playerInv = talliedInventions.find((inv) => inv.playerId === player.id);
        const votes = playerInv ? playerInv.votesCount : 0;
        return {
          ...player,
          score: player.score + votes,
        };
      })
    );

    // Save winner to tournament history
    const sorted = [...talliedInventions].sort((a, b) => b.votesCount - a.votesCount);
    const roundChamp = sorted[0];
    if (roundChamp) {
      const winnerRecord: SavedInvention = {
        ...roundChamp,
        savedAt: `${lang === 'ar' ? 'الجولة' : 'Round'} ${currentRound}`,
        stars: 5,
      };
      setAllRoundWinners((prev) => [...prev, winnerRecord]);
    }

    setPhase('ROUND_REVEAL');
  };

  // Next round
  const handleNextRound = () => {
    setCurrentRound((prev) => prev + 1);
    drawCardsForRound();
    setPhase('INVENTING');
  };

  // Finish Tournament
  const handleFinishGame = () => {
    setPhase('GAME_OVER');
  };

  // Rematch with same players
  const handlePlayAgainSame = () => {
    handleStartGame();
  };

  // New game from lobby
  const handleNewGame = () => {
    setPhase('LOBBY');
  };

  // Custom cards handlers
  const handleAddCustomProblem = (card: CardItem) => {
    const updated = [card, ...customProblems];
    setCustomProblems(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PROBLEMS, JSON.stringify(updated));
  };

  const handleAddCustomIngredient = (card: CardItem) => {
    const updated = [card, ...customIngredients];
    setCustomIngredients(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INGREDIENTS, JSON.stringify(updated));
  };

  const handleRemoveCustomProblem = (id: string) => {
    const updated = customProblems.filter((c) => c.id !== id);
    setCustomProblems(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PROBLEMS, JSON.stringify(updated));
  };

  const handleRemoveCustomIngredient = (id: string) => {
    const updated = customIngredients.filter((c) => c.id !== id);
    setCustomIngredients(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INGREDIENTS, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Universal Top Navigation */}
      <Navbar
        phase={phase}
        onNavigate={(newPhase) => {
          sound.playCardFlip();
          setPhase(newPhase);
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedCount={savedGalleryCount}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {phase === 'LANDING' && (
          <LandingPage
            lang={lang}
            onStartPlaying={() => setPhase('LOBBY')}
            onOpenRules={() => setPhase('RULES')}
            onOpenGallery={() => setPhase('GALLERY')}
          />
        )}

        {phase === 'LOBBY' && (
          <Lobby
            players={players}
            onUpdatePlayers={setPlayers}
            settings={settings}
            onUpdateSettings={setSettings}
            onStartGame={handleStartGame}
            lang={lang}
          />
        )}

        {phase === 'INVENTING' && (
          <GameScreen
            currentRound={currentRound}
            totalRounds={settings.totalRounds}
            problemCard={currentProblem}
            ingredientCards={currentIngredients}
            players={players}
            settings={settings}
            lang={lang}
            onAllInventionsReady={handleAllInventionsReady}
          />
        )}

        {phase === 'PITCH_TIME' && (
          <PitchMode
            inventions={currentRoundInventions}
            settings={settings}
            lang={lang}
            onPitchesCompleted={handlePitchesCompleted}
          />
        )}

        {phase === 'VOTING' && (
          <VotingScreen
            players={players}
            inventions={currentRoundInventions}
            lang={lang}
            onVotingCompleted={handleVotingCompleted}
          />
        )}

        {phase === 'ROUND_REVEAL' && (
          <RoundReveal
            currentRound={currentRound}
            totalRounds={settings.totalRounds}
            players={players}
            inventions={currentRoundInventions}
            lang={lang}
            onNextRound={handleNextRound}
            onFinishGame={handleFinishGame}
          />
        )}

        {phase === 'GAME_OVER' && (
          <GameOverScreen
            players={players}
            allRoundWinners={allRoundWinners}
            lang={lang}
            onPlayAgainSame={handlePlayAgainSame}
            onNewGame={handleNewGame}
            onOpenGallery={() => setPhase('GALLERY')}
          />
        )}

        {phase === 'GALLERY' && (
          <GalleryModal
            lang={lang}
            onClose={() => setPhase('LANDING')}
            onStartPlaying={() => setPhase('LOBBY')}
          />
        )}

        {phase === 'CUSTOM_CARDS' && (
          <CustomCardsModal
            customProblems={customProblems}
            customIngredients={customIngredients}
            onAddProblem={handleAddCustomProblem}
            onAddIngredient={handleAddCustomIngredient}
            onRemoveProblem={handleRemoveCustomProblem}
            onRemoveIngredient={handleRemoveCustomIngredient}
            lang={lang}
            onClose={() => setPhase('LANDING')}
          />
        )}

        {phase === 'RULES' && (
          <RulesModal
            lang={lang}
            onClose={() => setPhase('LANDING')}
            onStartPlaying={() => setPhase('LOBBY')}
          />
        )}
      </main>

      {/* Simple Clean Footer */}
      <footer className="border-t border-amber-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-extrabold text-slate-800 dark:text-slate-200">
            {lang === 'ar' ? 'اخترعها! — لعبة الحفلات العائلية الكوميدية 💡' : 'Invent It! — The Hilarious Family Party Game 💡'}
          </div>
          <div>
            {lang === 'ar'
              ? 'محتوى مصري 100% فرفوش ومحترم مناسب لكل العائلة'
              : 'Family-friendly clean humor for ages 8 to 108'}
          </div>
        </div>
      </footer>
    </div>
  );
}
