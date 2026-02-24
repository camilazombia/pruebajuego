import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAvatar } from '../../../app/providers/AvatarProvider';

/** Clave única para localStorage; prefijo evita colisiones con otras apps en el mismo dominio */
export const PROGRESS_STORAGE_KEY = 'mundo_magico_user_progress';

/** Versión del schema para migraciones futuras */
const STORAGE_SCHEMA_VERSION = 1;

// Define la forma del estado que se guardará en localStorage
const DEFAULT_UNLOCKED_ITEMS = [
	'skin_light', 'skin_medium', 'skin_dark', 'skin_olive',
	'body_slim', 'body_average', 'body_athletic',
	'hair_short', 'hair_long', 'hair_curly', 'hair_wavy',
	'hairAcc_bow', 'hairAcc_ribbon', 'hairAcc_flower',
	'eyes_open', 'eyes_sparkle', 'eyes_stars',
	'eyebrows_normal', 'eyebrows_thick', 'eyebrows_angry',
	'mouth_smile', 'mouth_laugh', 'mouth_kiss',
	'top_tshirt', 'top_shirt', 'top_sweater', 'top_striped', 'top_hoodie', 'top_red_shirt',
	'jacket_denim', 'jacket_leather', 'jacket_windbreaker',
	'bottom_pants', 'bottom_jeans', 'bottom_shorts', 'bottom_skirt', 'bottom_overalls',
	'shoes_sneakers', 'shoes_boots', 'shoes_sandals', 'shoes_heels',
	'socks_plain', 'socks_striped',
	'hat_beanie', 'hat_cap', 'hat_crown',
	'glasses_sunglasses', 'glasses_nerd',
	'jewelry_necklace', 'jewelry_pendant', 'jewelry_bracelet',
	'acc_scarf', 'acc_bag', 'acc_belt',
	'effects_sparkle', 'effects_hearts',
];

interface StoredProgress {
	version?: number;
	unlockedWorlds: string[];
	unlockedChapters: string[];
	completedWorlds: string[];
	completedChapters: string[];
	completedLevels: string[];
	completedMissions: string[];
	levelStars: Record<string, number>;
	magicCoins: number;
	unlockedItems: string[];
}

export interface ProgressState extends StoredProgress {
	unlockWorld: (worldId: string) => void;
	unlockChapter: (chapterId: string) => void;
	completeWorld: (worldId: string) => void;
	completeChapter: (chapterId: string) => void;
	completeLevel: (levelId: string, stars?: number) => void;
	completeMission: (missionId: string) => void;
	setLevelStars: (levelId: string, stars: number) => void;
	getLevelStars: (levelId: string) => number;
	addMagicCoins: (amount: number) => void;
	spendMagicCoins: (amount: number) => boolean;
	unlockItem: (itemId: string) => void;
	isItemUnlocked: (itemId: string) => boolean;

	isWorldUnlocked: (worldId: string) => boolean;
	isChapterUnlocked: (chapterId: string) => boolean;
	isWorldCompleted: (worldId: string) => boolean;
	isChapterCompleted: (chapterId: string) => boolean;
	isLevelCompleted: (levelId: string) => boolean;
	isMissionCompleted: (missionId: string) => boolean;

	isAllChaptersCompleted: (worldId: string, chapters: string[]) => boolean;
	isAllLevelsCompleted: (chapterId: string, levels: string[]) => boolean;

	resetProgress: () => void;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

// Estado inicial por defecto
const COINS_PER_NEW_STAR = 10;

const defaultInitialState: StoredProgress = {
	unlockedWorlds: ['world_1'],
	unlockedChapters: ['world_1_chapter_1'],
	completedWorlds: [],
	completedChapters: [],
	completedLevels: [],
	completedMissions: [],
	levelStars: {},
	magicCoins: 0,
	unlockedItems: [...DEFAULT_UNLOCKED_ITEMS],
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
	const { unlockTop } = useAvatar();

	// Cargar el estado inicial desde localStorage (ejecuta antes del primer render)
	const [progressState, setProgressState] = useState<StoredProgress>(() => {
		try {
			const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as StoredProgress;
				// Migración futura: si version !== STORAGE_SCHEMA_VERSION, transformar
				if (parsed.version === STORAGE_SCHEMA_VERSION || !parsed.version) {
					const { version: _, ...rest } = parsed;
					return {
						...rest,
						completedMissions: rest.completedMissions ?? [],
						levelStars: rest.levelStars ?? {},
						magicCoins: rest.magicCoins ?? 0,
						unlockedItems: rest.unlockedItems ?? [...DEFAULT_UNLOCKED_ITEMS],
						version: STORAGE_SCHEMA_VERSION,
					};
				}
			}
		} catch (error) {
			console.error("Error loading progress from localStorage", error);
		}
		return { ...defaultInitialState, version: STORAGE_SCHEMA_VERSION };
	});

	// Guardar en localStorage tras cada cambio de estado
	useEffect(() => {
		try {
			const toStore = { ...progressState, version: STORAGE_SCHEMA_VERSION };
			localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(toStore));
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

	const setLevelStars = useCallback((levelId: string, stars: number) => {
		setProgressState(prev => {
			const currentStars = prev.levelStars[levelId] ?? 0;
			if (stars <= currentStars) return prev;
			return {
				...prev,
				levelStars: { ...prev.levelStars, [levelId]: Math.min(stars, 3) },
			};
		});
	}, []);

	const getLevelStars = useCallback(
		(levelId: string) => progressState.levelStars[levelId] ?? 0,
		[progressState.levelStars]
	);

	const completeLevel = useCallback((levelId: string, stars = 3) => {
		setProgressState(prev => {
			const clampedStars = Math.min(stars, 3);
			const previousStars = prev.levelStars[levelId] ?? 0;
			const newStars = Math.max(clampedStars - previousStars, 0);
			const coinsEarned = newStars * COINS_PER_NEW_STAR;

			return {
				...prev,
				completedLevels: [...new Set([...prev.completedLevels, levelId])],
				levelStars: {
					...prev.levelStars,
					[levelId]: Math.max(previousStars, clampedStars),
				},
				magicCoins: prev.magicCoins + coinsEarned,
			};
		});

		if (levelId === 'world_1_chapter_1_level_1') {
			unlockTop('top_red_shirt');
		}
	}, [unlockTop]);

	const addMagicCoins = useCallback((amount: number) => {
		if (amount <= 0) return;
		setProgressState(prev => ({ ...prev, magicCoins: prev.magicCoins + amount }));
	}, []);

	const spendMagicCoins = useCallback((amount: number): boolean => {
		let success = false;
		setProgressState(prev => {
			if (prev.magicCoins < amount) return prev;
			success = true;
			return { ...prev, magicCoins: prev.magicCoins - amount };
		});
		return success;
	}, []);

	const unlockItem = useCallback((itemId: string) => {
		setProgressState(prev => ({
			...prev,
			unlockedItems: [...new Set([...prev.unlockedItems, itemId])],
		}));
	}, []);

	const isItemUnlocked = useCallback(
		(itemId: string) => progressState.unlockedItems.includes(itemId),
		[progressState.unlockedItems]
	);

	const completeMission = useCallback((missionId: string) => {
		setProgressState(prev => ({
			...prev,
			completedMissions: [...new Set([...prev.completedMissions, missionId])],
		}));
	}, []);

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

	const isMissionCompleted = useCallback(
		(missionId: string) => progressState.completedMissions.includes(missionId),
		[progressState.completedMissions]
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
		completeMission,
		setLevelStars,
		getLevelStars,
		addMagicCoins,
		spendMagicCoins,
		unlockItem,
		isItemUnlocked,
		isWorldUnlocked,
		isChapterUnlocked,
		isWorldCompleted,
		isChapterCompleted,
		isLevelCompleted,
		isMissionCompleted,
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
