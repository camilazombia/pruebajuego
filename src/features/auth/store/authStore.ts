// src/features/auth/store/authStore.ts
interface AuthState {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (code: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  checkSession: () => Promise<void>;
}

// src/features/progress/store/progressStore.ts
interface ProgressState {
  worlds: Map<string, WorldProgress>;
  missions: Map<string, MissionProgress>;
  currentMission: Mission | null;
  
  // Actions
  loadProgress: (userId: string) => Promise<void>;
  updateMissionProgress: (missionId: string, result: MissionResult) => Promise<void>;
  unlockWorld: (worldId: string) => Promise<void>;
  getWorldProgress: (worldId: string) => WorldProgress | undefined;
  getMissionStatus: (missionId: string) => MissionStatus;
}

// src/features/missions/store/missionStore.ts
interface MissionState {
  currentMission: Mission | null;
  currentActivityIndex: number;
  answers: Map<string, any>;
  timeStarted: Date | null;
  isPaused: boolean;
  
  // Actions
  startMission: (mission: Mission) => void;
  submitActivity: (activityId: string, answer: any) => void;
  nextActivity: () => void;
  pauseMission: () => void;
  resumeMission: () => void;
  completeMission: () => Promise<MissionResult>;
  resetMission: () => void;
}

// src/features/rewards/store/rewardsStore.ts
interface RewardsState {
  userRewards: UserReward[];
  availableRewards: Reward[];
  
  // Actions
  loadRewards: (userId: string) => Promise<void>;
  checkNewRewards: () => Promise<void>;
  claimReward: (rewardId: string) => Promise<void>;
}