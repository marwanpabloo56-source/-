export type GameDifficulty = 'easy' | 'normal' | 'crazy';

export type GamePhase = 
  | 'LANDING'
  | 'LOBBY'
  | 'ROUND_DEAL'
  | 'INVENTING'
  | 'PITCH_TIME'
  | 'VOTING'
  | 'ROUND_REVEAL'
  | 'GAME_OVER'
  | 'GALLERY'
  | 'RULES'
  | 'CUSTOM_CARDS';

export interface CardItem {
  id: string;
  textAr: string;
  textEn: string;
  category: 'easy' | 'normal' | 'crazy';
  icon?: string;
  isCustom?: boolean;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number;
}

export interface InventionDraft {
  playerId: string;
  name: string;
  slogan: string;
  price: string;
  features: string;
}

export interface RoundInvention {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  playerColor: string;
  name: string;
  slogan: string;
  price: string;
  features: string;
  problemCard: CardItem;
  ingredientCards: [CardItem, CardItem];
  votesCount: number;
  votedBy: string[]; // player IDs
  timestamp: number;
}

export interface GameSettings {
  difficulty: GameDifficulty;
  totalRounds: number;
  inventTimeSeconds: number;
  pitchTimeSeconds: number;
  soundEnabled: boolean;
  language: 'ar' | 'en';
}

export interface SavedInvention extends RoundInvention {
  savedAt: string;
  stars?: number;
}
