import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAvatar } from '../../../app/providers/AvatarProvider';

// Define la forma del estado que se guardará en localStorage
interface StoredProgress {
	unlockedWorlds: string[];
	unlockedChapters: string[];
	completedWorlds: string[];
	completedChapters: string[];
	completedLevels: string[];
}

export interface ProgressState extends StoredProgress {
	// Acciones de desbloqueo
	unlockWorld: (worldId: string) => void;
	unlockChapter: (chapterId: string) => void;
	completeWorld: (worldId: string) => void;
	completeChapter: (chapterId: string) => void;
	completeLevel: (levelId: string) => void;

	// Acciones de consulta
	isWorldUnlocked: (worldId: string) => boolean;
	isChapterUnlocked: (chapterId: string) => boolean;
	isWorldCompleted: (worldId: string) => boolean;
	isChapterCompleted: (chapterId: string) => boolean;
	isLevelCompleted: (levelId: string) => boolean;

	// Helpers para verificar completitud
	isAllChaptersCompleted: (worldId: string, chapters: string[]) => boolean;
	isAllLevelsCompleted: (chapterId: string, levels: string[]) => boolean;

	// Reset
	resetProgress: () => void;
}

const PROGRESS_STORAGE_KEY = 'user_progress';

const ProgressContext = createContext<ProgressState | undefined>(undefined);

// Estado inicial por defecto
const defaultInitialState: StoredProgress = {
	unlockedWorlds: ['world_1'],
	unlockedChapters: ['world_1_chapter_1'],
	completedWorlds: [],
	completedChapters: [],
	completedLevels: [],
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
	const { unlockTop } = useAvatar();

	// Cargar el estado inicial desde localStorage
	const [progressState, setProgressState] = useState<StoredProgress>(() => {
		try {
			const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
			if (savedProgress) {
				return JSON.parse(savedProgress) as StoredProgress;
			}
		} catch (error) {
			console.error("Error loading progress from localStorage", error);
		}
		return defaultInitialState;
	});

	// useEffect para guardar el estado en localStorage cada vez que cambie
	useEffect(() => {
		try {
			localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressState));
		} catch (error) {
			console.error("Error saving progress to localStorage", error);
		}
	}, [progressState]);


	const unlockWorld = useCallback((worldId: string) => {
		setProgressState(prev => ({ ...prev, unlockedWorlds: [...new Set([...prev.unlockedWorlds, worldId])] }));
	}, []);

	const unlockChapter = useCallback((chapterId: string) => {
		setProgressState(prev => ({ ...prev, unlockedChapters: [...new Set([...prev.unlockedChapters, chapterId])] }));
	}, []);

	const completeWorld = useCallback((worldId: string) => {
		setProgressState(prev => ({ ...prev, completedWorlds: [...new Set([...prev.completedWorlds, worldId])] }));
	}, []);

	const completeChapter = useCallback((chapterId: string) => {
		setProgressState(prev => ({ ...prev, completedChapters: [...new Set([...prev.completedChapters, chapterId])] }));
	}, []);

	const completeLevel = useCallback((levelId: string) => {
		setProgressState(prev => ({ ...prev, completedLevels: [...new Set([...prev.completedLevels, levelId])] }));
		
		// Integración con Avatar: Desbloquear camiseta al completar el primer nivel
		if (levelId === 'world_1_chapter_1_level_1') {
			unlockTop('top_red_shirt');
		}
	}, [unlockTop]);

	const isWorldUnlocked = useCallback(
		(worldId: string) => progressState.unlockedWorlds.includes(worldId),
		[progressState.unlockedWorlds]
	);

	const isChapterUnlocked = useCallback(
		(chapterId: string) => progressState.unlockedChapters.includes(chapterId),
		[progressState.unlockedChapters]
	);

	const isWorldCompleted = useCallback(
		(worldId: string) => progressState.completedWorlds.includes(worldId),
		[progressState.completedWorlds]
	);

	const isChapterCompleted = useCallback(
		(chapterId: string) => progressState.completedChapters.includes(chapterId),
		[progressState.completedChapters]
	);

	const isLevelCompleted = useCallback(
		(levelId: string) => progressState.completedLevels.includes(levelId),
		[progressState.completedLevels]
	);

	const isAllChaptersCompleted = useCallback(
		(_worldId: string, chapters: string[]) => chapters.every((chId) => progressState.completedChapters.includes(chId)),
		[progressState.completedChapters]
	);

	const isAllLevelsCompleted = useCallback(
		(_chapterId: string, levels: string[]) => levels.every((lvlId) => progressState.completedLevels.includes(lvlId)),
		[progressState.completedLevels]
	);

	const resetProgress = useCallback(() => {
		setProgressState(defaultInitialState);
	}, []);

	const value: ProgressState = {
		...progressState,
		unlockWorld,
		unlockChapter,
		completeWorld,
		completeChapter,
		completeLevel,
		isWorldUnlocked,
		isChapterUnlocked,
		isWorldCompleted,
		isChapterCompleted,
		isLevelCompleted,
		isAllChaptersCompleted,
		isAllLevelsCompleted,
		resetProgress,
	};

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
};

export const useProgressStore = (): ProgressState => {
	const context = useContext(ProgressContext);
	if (!context) {
		throw new Error('useProgressStore must be used within ProgressProvider');
	}
	return context;
};
