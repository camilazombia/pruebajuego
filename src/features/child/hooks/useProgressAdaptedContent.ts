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
		levelStars,
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
	 * Obtener niveles de un capítulo con estado de progreso.
	 * Regla de desbloqueo FRONTEND:
	 * - Siempre se puede jugar el nivel 1.
	 * - Después de completar el nivel N, se desbloquea el nivel N+1.
	 * - Niveles posteriores siguen bloqueados hasta que se complete el anterior.
	 */
	const getLevelsWithProgress = (chapterId: string): LevelWithProgress[] => {
		const levels = getAdaptedLevels(chapterId);
		const completedSet = new Set(completedLevels);

		const completedInChapter = levels.filter((level) => completedSet.has(level.id));
		const maxCompletedNumber = completedInChapter.reduce(
			(max, level) => (level.number > max ? level.number : max),
			0
		);

		return levels.map((level) => {
			const completed = completedSet.has(level.id);
			let locked = false;

			if (maxCompletedNumber === 0) {
				locked = level.number > 1;
			} else {
				locked = level.number > maxCompletedNumber + 1;
			}

			const savedStars = levelStars[level.id] ?? 0;

			return {
				...level,
				locked,
				completed,
				stars: savedStars,
			};
		});
	};

	return {
		worlds,
		getChaptersWithProgress,
		getLevelsWithProgress,
	};
};
