// src/shared/lib/db/db.ts
import Dexie, { Table } from 'dexie';

interface User {
  id?: number;
  name: string;
  age: number;
  createdAt: number;
}

interface AuthSession {
  code: string;
  deviceId: string;
  userId: number;
  isActive: boolean;
}

interface WorldProgress {
  worldId: string;
  userId: number;
  completed: boolean;
}

interface MissionProgress {
  missionId: string;
  userId: number;
  status: 'pending' | 'started' | 'completed';
}

interface UserReward {
  rewardId: string;
  userId: number;
  isPurchased: boolean;
}

interface Flashcard {
  id?: number;
  word: string;
  category: string;
  worldId: string;
}

interface PlaySession {
  id?: number;
  userId: number;
  startTime: number;
}

interface AppSettings {
  id?: number;
}

export class AppDatabase extends Dexie {
  users!: Table<User>;
  sessions!: Table<AuthSession>;
  worldProgress!: Table<WorldProgress>;
  missionProgress!: Table<MissionProgress>;
  userRewards!: Table<UserReward>;
  flashcards!: Table<Flashcard>;
  playSessions!: Table<PlaySession>;
  settings!: Table<AppSettings>;

  constructor() {
    super('EnglishKidsDB');

    this.version(1).stores({
      users: 'id, name, age, createdAt',
      sessions: 'code, deviceId, userId, isActive',
      worldProgress: 'worldId, userId, [userId+worldId]',
      missionProgress: 'missionId, userId, status, [userId+missionId]',
      userRewards: 'rewardId, userId, [userId+rewardId]',
      flashcards: 'id, word, category, worldId',
      playSessions: 'id, userId, startTime',
      settings: 'id',
    });
  }
}

export const db = new AppDatabase();
