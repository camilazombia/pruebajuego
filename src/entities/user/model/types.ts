// src/entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  age: number;
  createdAt: Date;
  avatarId?: string;
  parentalConsent: {
    dataPolicy: boolean;
    localStorage: boolean;
    timestamp: Date;
  };
}

export interface AuthSession {
  code: string;
  deviceId: string;
  userId: string;
  isActive: boolean;
  rememberMe: boolean;
  expiresAt?: Date;
}

// src/entities/world/model/types.ts
export interface World {
  id: string;
  order: number;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  theme: 'forest' | 'ocean' | 'space' | 'city' | 'fantasy';
  backgroundImage: string;
  iconImage: string;
  missions: string[]; // Array de mission IDs
  requiredStars: number; // Estrellas necesarias para desbloquear
  isUnlocked: boolean;
}

export interface WorldProgress {
  worldId: string;
  completedMissions: number;
  totalMissions: number;
  averageStars: number;
  isCompleted: boolean;
  unlockedAt?: Date;
}

// src/entities/mission/model/types.ts
export enum MissionStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  COMPLETED = 'completed',
}

export enum ActivityType {
  MULTIPLE_CHOICE = 'multiple_choice',
  DRAG_AND_DROP = 'drag_and_drop',
  LISTENING = 'listening',
  SPEAKING = 'speaking',
  MATCH_PAIRS = 'match_pairs',
  FILL_BLANKS = 'fill_blanks',
}

export interface Mission {
  id: string;
  worldId: string;
  order: number;
  name: {
    es: string;
    en: string;
  };
  objective: {
    es: string;
    en: string;
  };
  activities: Activity[];
  requiredStars: number; // Mínimo para aprobar
  estimatedTime: number; // En minutos
  vocabulary: string[]; // Palabras clave
  grammar?: string[]; // Conceptos gramaticales
}

export interface Activity {
  id: string;
  type: ActivityType;
  instruction: {
    es: string;
    en: string;
  };
  content: ActivityContent;
  points: number;
  timeLimit?: number; // En segundos
}

export interface ActivityContent {
  // Contenido dinámico según el tipo
  question?: string;
  options?: Option[];
  correctAnswer?: string | string[];
  audioUrl?: string;
  imageUrl?: string;
  pairs?: Pair[];
  // etc.
}

export interface Option {
  id: string;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Pair {
  id: string;
  left: {
    text?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
  right: {
    text?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
}

export interface MissionProgress {
  missionId: string;
  userId: string;
  status: MissionStatus;
  attempts: number;
  bestStars: number;
  lastAttemptAt?: Date;
  completedAt?: Date;
  activityScores: {
    activityId: string;
    score: number;
    completed: boolean;
  }[];
}

export interface MissionResult {
  missionId: string;
  totalPoints: number;
  maxPoints: number;
  stars: 0 | 1 | 2 | 3;
  timeSpent: number;
  correctAnswers: number;
  totalAnswers: number;
  newVocabulary: string[];
}

// src/entities/reward/model/types.ts
export enum RewardType {
  TROPHY = 'trophy',
  RARE_ITEM = 'rare_item',
  BADGE = 'badge',
  AVATAR_ITEM = 'avatar_item',
}

export interface Reward {
  id: string;
  type: RewardType;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockCondition: {
    type: 'world_complete' | 'stars_total' | 'missions_complete' | 'streak_days';
    value: string | number;
  };
}

export interface UserReward {
  rewardId: string;
  userId: string;
  unlockedAt: Date;
  progress: number; // 0-100%
  isUnlocked: boolean;
}

// src/entities/review/model/types.ts
export interface Flashcard {
  id: string;
  word: string;
  translation: string;
  imageUrl: string;
  audioUrl: string;
  category: string;
  worldId?: string;
}

export interface KaraokeSong {
  id: string;
  title: string;
  artist?: string;
  audioUrl: string;
  lyrics: LyricLine[];
  thumbnailUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LyricLine {
  startTime: number; // En segundos
  endTime: number;
  text: string;
  words?: {
    text: string;
    startTime: number;
    endTime: number;
  }[];
}

export interface ColoringPage {
  id: string;
  name: string;
  svgUrl: string;
  thumbnailUrl: string;
  category: string;
}

// src/shared/lib/db/types.ts
export interface AppSettings {
  id: string; // Solo habrá un registro
  language: 'es' | 'en';
  volume: {
    master: number;
    music: number;
    sfx: number;
    voice: number;
  };
  nightMode: boolean;
  dailyTimeLimit: number; // En minutos
  parentalPin: string; // Hasheado
  notifications: boolean;
}

export interface PlaySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // En minutos
  missionsCompleted: string[];
  starsEarned: number;
}