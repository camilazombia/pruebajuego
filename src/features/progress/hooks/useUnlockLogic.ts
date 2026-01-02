import { useProgressStore } from '../context/ProgressContext';
import { WORLDS, type World, type Chapter } from '../../../shared/data/worlds';

/**
 * Hook para manejar la lógica de desbloqueos
 */
export const useUnlockLogic = () => {
	const {
		unlockWorld,
		unlockChapter,
		completeWorld,
		completeChapter,
		completeLevel,
		isAllLevelsCompleted,
	} = useProgressStore();

	/**
	 * Completar un nivel y verificar si desbloquea capítulo/mundo
	 */
	const handleCompleteLevel = (levelId: string, chapterId: string, worldId: string) => {
		completeLevel(levelId);

		// Obtener el capítulo completo
		const world = WORLDS.find((w: World) => w.id === worldId);
		if (!world) return;

		const chapter = world.chapters.find((ch: Chapter) => ch.id === chapterId);
		if (!chapter) return;

		// Verificar si se completaron todos los niveles del capítulo
		const levelIds = chapter.levels.map((l) => l.id);
		if (isAllLevelsCompleted(chapterId, levelIds)) {
			completeChapter(chapterId);

			// Desbloquear el siguiente capítulo si existe
			const nextChapterIndex = world.chapters.findIndex((ch: Chapter) => ch.id === chapterId) + 1;
			if (nextChapterIndex < world.chapters.length) {
				const nextChapter = world.chapters[nextChapterIndex];
				unlockChapter(nextChapter.id);
			} else {
				// Si no hay más capítulos, completar el mundo
				completeWorld(worldId);

				// Desbloquear el siguiente mundo
				const nextWorldIndex = WORLDS.findIndex((w: World) => w.id === worldId) + 1;
				if (nextWorldIndex < WORLDS.length) {
					const nextWorld = WORLDS[nextWorldIndex];
					unlockWorld(nextWorld.id);

					// Desbloquear el primer capítulo del siguiente mundo
					if (nextWorld.chapters.length > 0) {
						unlockChapter(nextWorld.chapters[0].id);
					}
				}
			}
		}
	};

	return {
		handleCompleteLevel,
	};
};
