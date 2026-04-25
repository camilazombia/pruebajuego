/**
 * Imágenes de Unsplash para cada mundo.
 * Usadas como fallback cuando los assets locales no existen.
 * Licencia Unsplash: https://unsplash.com/license (uso libre)
 */

const UNSPLASH = 'https://images.unsplash.com';
const W = '?auto=format&fit=crop&w=1280&q=80';

export interface WorldImageSet {
	worldId: string;
	/** Imagen principal del mundo */
	main: string;
	/** Gradiente CSS de respaldo si Unsplash también falla */
	gradient: string;
	/** Emoji decorativo del mundo */
	emoji: string;
}

export const WORLD_IMAGES: Record<string, WorldImageSet> = {
	world_1: {
		worldId: 'world_1',
		main: `${UNSPLASH}/photo-1518531933037-91b2f5f229cc${W}`,
		gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
		emoji: '✨',
	},
	world_2: {
		worldId: 'world_2',
		main: `${UNSPLASH}/photo-1448375240519-3edcc42f11a5${W}`,
		gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
		emoji: '🌳',
	},
	world_3: {
		worldId: 'world_3',
		main: `${UNSPLASH}/photo-1555939594-58d7cb561ad1${W}`,
		gradient: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 40%, #f39c12 100%)',
		emoji: '🍎',
	},
	world_4: {
		worldId: 'world_4',
		main: `${UNSPLASH}/photo-1500595046743-cd271d694d30${W}`,
		gradient: 'linear-gradient(135deg, #5d4037 0%, #8d6e63 50%, #c9a96e 100%)',
		emoji: '🐄',
	},
	world_5: {
		worldId: 'world_5',
		main: `${UNSPLASH}/photo-1501139083538-0139583c060f${W}`,
		gradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #4ecdc4 100%)',
		emoji: '⏰',
	},
	world_6: {
		worldId: 'world_6',
		main: `${UNSPLASH}/photo-1467269204594-9661b134dd2b${W}`,
		gradient: 'linear-gradient(135deg, #2c003e 0%, #6a0572 50%, #a66cff 100%)',
		emoji: '🏰',
	},
	world_7: {
		worldId: 'world_7',
		main: `${UNSPLASH}/photo-1464822759023-fed622ff2c3b${W}`,
		gradient: 'linear-gradient(135deg, #1c3a6e 0%, #74b9ff 60%, #b2e0ff 100%)',
		emoji: '⛅',
	},
	world_8: {
		worldId: 'world_8',
		main: `${UNSPLASH}/photo-1518020382113-a7e8fc38eac9${W}`,
		gradient: 'linear-gradient(135deg, #006994 0%, #0abde3 50%, #48dbfb 100%)',
		emoji: '🌊',
	},
	world_9: {
		worldId: 'world_9',
		main: `${UNSPLASH}/photo-1484154218962-a197022b5858${W}`,
		gradient: 'linear-gradient(135deg, #2d1b69 0%, #fd79a8 60%, #fdcb6e 100%)',
		emoji: '🪞',
	},
	world_10: {
		worldId: 'world_10',
		main: `${UNSPLASH}/photo-1507842217343-583bb7270b66${W}`,
		gradient: 'linear-gradient(135deg, #1a0533 0%, #6c5ce7 60%, #a29bfe 100%)',
		emoji: '🎓',
	},
	world_11: {
		worldId: 'world_11',
		main: `${UNSPLASH}/photo-1436491865332-7a61a109cc05${W}`,
		gradient: 'linear-gradient(135deg, #00524d 0%, #00b894 50%, #55efc4 100%)',
		emoji: '🗺️',
	},
	world_12: {
		worldId: 'world_12',
		main: `${UNSPLASH}/photo-1513364776144-60967b0f800f${W}`,
		gradient: 'linear-gradient(135deg, #6b2737 0%, #e17055 50%, #fdcb6e 100%)',
		emoji: '🎨',
	},
};

/** Saca el worldId desde un chapterId  (ej: "world_3_chapter_2" → "world_3") */
export const getWorldIdFromChapter = (chapterId: string): string => {
	const parts = chapterId.split('_chapter_');
	return parts[0] ?? chapterId;
};

/** Devuelve la URL de imagen de Unsplash para un capítulo */
export const getChapterBgUrl = (chapterId: string): string => {
	const worldId = getWorldIdFromChapter(chapterId);
	return WORLD_IMAGES[worldId]?.main ?? WORLD_IMAGES.world_1.main;
};

/** Devuelve el gradiente CSS para un mundo */
export const getWorldGradient = (worldId: string): string =>
	WORLD_IMAGES[worldId]?.gradient ?? 'linear-gradient(135deg, #0f1f3d 0%, #0a1628 100%)';

/** Imagen cozy room para la página de misión */
export const COZY_ROOM_BG = `${UNSPLASH}/photo-1586023492125-27b2c045efd7${W}`;

/**
 * Mapa de fondos locales por capítulo.
 * Solo incluye los archivos que existen en /public/assets/images/backgrounds/
 */
export const LOCAL_CHAPTER_BACKGROUNDS: Record<string, string> = {
  // Mundo 1
  world_1_chapter_1: '/assets/images/backgrounds/world_1_chapter_1.jpg',
  world_1_chapter_2: '/assets/images/backgrounds/world_1_chapter_2.png',
  world_1_chapter_3: '/assets/images/backgrounds/world_1_chapter_3.png',
  world_1_chapter_4: '/assets/images/backgrounds/world_1_chapter_4.png',
  world_1_chapter_5: '/assets/images/backgrounds/world_1_chapter_5.png',
  // Mundo 2
  world_2_chapter_1: '/assets/images/backgrounds/world_2_chapter_1.png',
  world_2_chapter_2: '/assets/images/backgrounds/world_2_chapter_2.png',
  world_2_chapter_3: '/assets/images/backgrounds/world_2_chapter_3.png',
  world_2_chapter_4: '/assets/images/backgrounds/world_2_chapter_4.png',
  world_2_chapter_5: '/assets/images/backgrounds/world_2_chapter_5.png',
  // Mundo 3
  world_3_chapter_1: '/assets/images/backgrounds/world_3_chapter_1.png',
  world_3_chapter_2: '/assets/images/backgrounds/world_3_chapter_2.png',
  world_3_chapter_3: '/assets/images/backgrounds/world_3_chapter_3.png',
  world_3_chapter_4: '/assets/images/backgrounds/world_3_chapter_4.png',
  world_3_chapter_5: '/assets/images/backgrounds/world_3_chapter_5.png',
  // Mundo 4
  world_4_chapter_1: '/assets/images/backgrounds/world_4_chapter_1.jpg',
  world_4_chapter_2: '/assets/images/backgrounds/world_4_chapter_2.png',
  world_4_chapter_3: '/assets/images/backgrounds/world_4_chapter_3.png',
  world_4_chapter_4: '/assets/images/backgrounds/world_4_chapter_4.png',
  world_4_chapter_5: '/assets/images/backgrounds/world_4_chapter_5.png',
  // Mundo 5
  world_5_chapter_1: '/assets/images/backgrounds/world_5_chapter_1.png',
  world_5_chapter_2: '/assets/images/backgrounds/world_5_chapter_2.png',
  world_5_chapter_3: '/assets/images/backgrounds/world_5_chapter_3.png',
  world_5_chapter_4: '/assets/images/backgrounds/world_5_chapter_4.png',
  world_5_chapter_5: '/assets/images/backgrounds/world_5_chapter_5.png',
  // Mundo 6
  world_6_chapter_1: '/assets/images/backgrounds/world_6_chapter_1.png',
  world_6_chapter_2: '/assets/images/backgrounds/world_6_chapter_2.png',
  world_6_chapter_3: '/assets/images/backgrounds/world_6_chapter_3.png',
  world_6_chapter_4: '/assets/images/backgrounds/world_6_chapter_4.png',
  world_6_chapter_5: '/assets/images/backgrounds/world_6_chapter_5.png',
  // Mundo 7 (parcial)
  world_7_chapter_1: '/assets/images/backgrounds/world_7_chapter_1.png',
  world_7_chapter_2: '/assets/images/backgrounds/world_7_chapter_2.png',
  world_7_chapter_3: '/assets/images/backgrounds/world_7_chapter_3.png',
};

/**
 * Devuelve la URL del fondo local del capítulo si existe,
 * o null si hay que usar el fallback de Unsplash.
 */
export const getLocalChapterBg = (chapterId: string): string | null =>
  LOCAL_CHAPTER_BACKGROUNDS[chapterId] ?? null;

/**
 * Dado el array de capítulos desbloqueados, determina el capítulo actual
 * (el más avanzado dentro del mundo más avanzado).
 */
export const getCurrentChapterId = (unlockedChapters: string[]): string => {
  if (!unlockedChapters.length) return 'world_1_chapter_1';
  // Ordena por mundo y capítulo numéricamente y devuelve el último
  const sorted = [...unlockedChapters].sort((a, b) => {
    const [, wA, , cA] = a.split('_');
    const [, wB, , cB] = b.split('_');
    const wDiff = parseInt(wA) - parseInt(wB);
    if (wDiff !== 0) return wDiff;
    return parseInt(cA) - parseInt(cB);
  });
  return sorted[sorted.length - 1];
};

/**
 * Devuelve el fondo que debe mostrar el layout según el progreso del estudiante.
 * Prioridad: imagen local → Unsplash del mundo → gradiente.
 */
export const getProgressBackground = (unlockedChapters: string[]): {
  imageUrl: string;
  gradient: string;
  worldId: string;
} => {
  const chapterId = getCurrentChapterId(unlockedChapters);
  const worldId = getWorldIdFromChapter(chapterId);
  const localUrl = getLocalChapterBg(chapterId);
  const worldData = WORLD_IMAGES[worldId] ?? WORLD_IMAGES.world_1;
  return {
    imageUrl: localUrl ?? worldData.main,
    gradient: worldData.gradient,
    worldId,
  };
};
