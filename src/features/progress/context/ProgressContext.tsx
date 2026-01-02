import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

export interface ProgressState {
	// Worlds tracking
	unlockedWorlds: string[]; // Array de world IDs desbloqueados
	unlockedChapters: string[]; // Array de chapter IDs desbloqueados
	completedWorlds: string[]; // Array de world IDs completados
	completedChapters: string[]; // Array de chapter IDs completados
	completedLevels: string[]; // Array de level IDs completados

	// Unlock actions
	unlockWorld: (worldId: string) => void;
	unlockChapter: (chapterId: string) => void;
	completeWorld: (worldId: string) => void;
	completeChapter: (chapterId: string) => void;
	completeLevel: (levelId: string) => void;

	// Query actions
	isWorldUnlocked: (worldId: string) => boolean;
	isChapterUnlocked: (chapterId: string) => boolean;
	isWorldCompleted: (worldId: string) => boolean;
	isChapterCompleted: (chapterId: string) => boolean;
	isLevelCompleted: (levelId: string) => boolean;

	// Helper to check if all chapters of a world are completed
	isAllChaptersCompleted: (worldId: string, chapters: string[]) => boolean;

	// Helper to check if all levels of a chapter are completed
	isAllLevelsCompleted: (chapterId: string, levels: string[]) => boolean;

	// Reset
	resetProgress: () => void;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
	const [unlockedWorlds, setUnlockedWorlds] = useState<string[]>(['w1']);
	const [unlockedChapters, setUnlockedChapters] = useState<string[]>(['w1-ch1']);
	const [completedWorlds, setCompletedWorlds] = useState<string[]>([]);
	const [completedChapters, setCompletedChapters] = useState<string[]>([]);
	const [completedLevels, setCompletedLevels] = useState<string[]>([]);

	const unlockWorld = useCallback((worldId: string) => {
		setUnlockedWorlds((prev) => [...new Set([...prev, worldId])]);
	}, []);

	const unlockChapter = useCallback((chapterId: string) => {
		setUnlockedChapters((prev) => [...new Set([...prev, chapterId])]);
	}, []);

	const completeWorld = useCallback((worldId: string) => {
		setCompletedWorlds((prev) => [...new Set([...prev, worldId])]);
	}, []);

	const completeChapter = useCallback((chapterId: string) => {
		setCompletedChapters((prev) => [...new Set([...prev, chapterId])]);
	}, []);

	const completeLevel = useCallback((levelId: string) => {
		setCompletedLevels((prev) => [...new Set([...prev, levelId])]);
	}, []);

	const isWorldUnlocked = useCallback(
		(worldId: string) => unlockedWorlds.includes(worldId),
		[unlockedWorlds]
	);

	const isChapterUnlocked = useCallback(
		(chapterId: string) => unlockedChapters.includes(chapterId),
		[unlockedChapters]
	);

	const isWorldCompleted = useCallback(
		(worldId: string) => completedWorlds.includes(worldId),
		[completedWorlds]
	);

	const isChapterCompleted = useCallback(
		(chapterId: string) => completedChapters.includes(chapterId),
		[completedChapters]
	);

	const isLevelCompleted = useCallback(
		(levelId: string) => completedLevels.includes(levelId),
		[completedLevels]
	);

	const isAllChaptersCompleted = useCallback(
		(_worldId: string, chapters: string[]) => chapters.every((chId) => completedChapters.includes(chId)),
		[completedChapters]
	);

	const isAllLevelsCompleted = useCallback(
		(_chapterId: string, levels: string[]) => levels.every((lvlId) => completedLevels.includes(lvlId)),
		[completedLevels]
	);

	const resetProgress = useCallback(() => {
		setUnlockedWorlds(['w1']);
		setUnlockedChapters(['w1-ch1']);
		setCompletedWorlds([]);
		setCompletedChapters([]);
		setCompletedLevels([]);
	}, []);

	const value: ProgressState = {
		unlockedWorlds,
		unlockedChapters,
		completedWorlds,
		completedChapters,
		completedLevels,
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
