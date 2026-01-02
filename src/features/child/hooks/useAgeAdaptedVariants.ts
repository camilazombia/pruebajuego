import { useChild } from '../context/ChildContext';
import {
	WORLDS,
	getChaptersForWorld,
	getLevelsForChapter,
	type World,
	type Chapter,
	type Level,
} from '../../../shared/data/worlds';

/**
 * Versión del contenido adaptado sin variantes
 */
export interface AdaptedWorld extends World {
	id: string;
	number: number;
	title: string;
	description: string;
}

export interface AdaptedChapter extends Chapter {
	id: string;
	number: number;
	title: string;
}

export interface AdaptedLevel extends Level {
	id: string;
	number: number;
	title: string;
	completed: boolean;
	stars: number;
	locked?: boolean;
}

/**
 * Hook para obtener contenido sin variantes de edad
 */
export const useAgeAdaptedVariants = () => {
	/**
	 * Obtener todos los mundos
	 */
	const worlds: AdaptedWorld[] = WORLDS.map((world) => ({
		...world,
		id: world.id,
		number: world.number,
		title: world.title,
		description: world.description,
	}));

	/**
	 * Obtener capítulos de un mundo
	 */
	const getAdaptedChapters = (worldId: string): AdaptedChapter[] => {
		const chapters = getChaptersForWorld(worldId);
		return chapters.map((chapter) => ({
			...chapter,
			id: chapter.id,
			number: chapter.number,
			title: chapter.title,
		}));
	};

	/**
	 * Obtener niveles de un capítulo
	 */
	const getAdaptedLevels = (chapterId: string): AdaptedLevel[] => {
		const levels = getLevelsForChapter(chapterId);
		return levels.map((level) => ({
			...level,
			id: level.id,
			number: level.number,
			title: level.title,
			completed: level.isCompleted,
			stars: level.stars,
		}));
	};

	return {
		worlds,
		getAdaptedChapters,
		getAdaptedLevels,
	};
};
