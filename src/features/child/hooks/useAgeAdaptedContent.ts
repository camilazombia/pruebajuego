import { useChild } from '../context/ChildContext';
import { WORLDS, getChaptersForWorld, getLevelsForChapter, type Chapter, type Level, type AgeVariant } from '../../../shared/data/worlds';

/**
 * Hook para obtener contenido adaptado por edad
 */
export const useAgeAdaptedContent = () => {
	const { ageRange } = useChild();

	// Mapear ageRange a AgeVariant
	const getVariant = (range: string | null): AgeVariant => {
		switch (range) {
			case '3-6':
				return 'beginner';
			case '7-10':
				return 'intermediate';
			case '11+':
				return 'advanced';
			default:
				return 'beginner';
		}
	};

	const variant = getVariant(ageRange);

	if (!ageRange) {
		return {
			worlds: [],
			getChapters: () => [],
			getLevels: () => [],
		};
	}

	// Todos los mundos están disponibles para todas las edades con variantes diferentes
	const worlds = WORLDS;

	const getChapters = (worldId: string): Chapter[] => {
		return getChaptersForWorld(worldId);
	};

	const getLevels = (chapterId: string): Level[] => {
		return getLevelsForChapter(chapterId);
	};

	return {
		worlds,
		variant, // Exportar la variante actual
		getChapters,
		getLevels,
	};
};
