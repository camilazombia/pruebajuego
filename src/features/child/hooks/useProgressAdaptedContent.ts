import { useAgeAdaptedVariants } from './useAgeAdaptedVariants';
import { useProgressStore } from '../../../features/progress/context/ProgressContext';
import type { AdaptedWorld, AdaptedChapter, AdaptedLevel } from './useAgeAdaptedVariants';

export interface WorldWithProgress extends AdaptedWorld {
	locked: boolean;
	completed: boolean;
}

export interface ChapterWithProgress extends AdaptedChapter {
	locked: boolean;
	completed: boolean;
}

export interface LevelWithProgress extends AdaptedLevel {
	locked: boolean;
	completed: boolean;
}

/**
 * Hook para obtener contenido adaptado con estado de progreso (bloqueado/completado)
 */
export const useProgressAdaptedContent = () => {
	const { worlds: adaptedWorlds, getAdaptedChapters, getAdaptedLevels } = useAgeAdaptedVariants();
	const {
		unlockedWorlds,
		completedWorlds,
		unlockedChapters,
		completedChapters,
		completedLevels,
	} = useProgressStore();

	/**
	 * Obtener mundos con estado de progreso
	 */
	const worlds: WorldWithProgress[] = adaptedWorlds.map((world) => ({
		...world,
		locked: !unlockedWorlds.includes(world.id),
		completed: completedWorlds.includes(world.id),
	}));

	/**
	 * Obtener capítulos de un mundo con estado de progreso
	 */
	const getChaptersWithProgress = (worldId: string): ChapterWithProgress[] => {
		return getAdaptedChapters(worldId).map((chapter) => ({
			...chapter,
			locked: !unlockedChapters.includes(chapter.id),
			completed: completedChapters.includes(chapter.id),
		}));
	};

	/**
	 * Obtener niveles de un capítulo con estado de progreso
	 */
	const getLevelsWithProgress = (chapterId: string): LevelWithProgress[] => {
		return getAdaptedLevels(chapterId).map((level) => ({
			...level,
			locked: completedLevels.length > 0 ? !completedLevels.includes(level.id) : level.number > 1,
			completed: completedLevels.includes(level.id),
		}));
	};

	return {
		worlds,
		getChaptersWithProgress,
		getLevelsWithProgress,
	};
};
