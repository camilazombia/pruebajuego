export interface Level {
	id: string;
	number: number;
	title: string;
	isCompleted: boolean;
	stars: number; // 0-3
	chapterId?: string; // Added for easy navigation
}

export interface Chapter {
	id: string;
	number: number;
	title: string;
	description?: string;
	levels: Level[];
}

export interface World {
	id: string;
	number: number;
	title: string;
	description: string;
	chapters: Chapter[];
	isUnlocked: boolean;
	progress: number; // 0-100
}

const createLevels = (worldNum: number, chapterNum: number, chapterId: string): Level[] => {
	return Array.from({ length: 6 }, (_, i) => ({
		id: `world_${worldNum}_chapter_${chapterNum}_level_${i + 1}`,
		number: i + 1,
		title: `Level ${i + 1}`,
		isCompleted: false,
		stars: 0,
		chapterId: chapterId,
	}));
};

// Descripciones de capítulos por mundo
const CHAPTER_DESCRIPTIONS: Record<number, string[]> = {
	1: [
		'First Sound — El primer intento. El mundo reacciona por primera vez.',
		'Names Appear — Las palabras empiezan a identificar a las personas.',
		'Friendly Gestures — Las interacciones se vuelven amables y completas.',
		'Waiting Turns — Aprender que hablar también implica esperar.',
		'Closer Voices — Las palabras funcionan distinto según la distancia.',
		'Small Groups — Hablar con más de una persona a la vez.',
		'New Faces — Personas nuevas requieren iniciar otra vez.',
		'Many Beginnings — El jugador inicia interacciones sin guía.',
		'The Flow — Las interacciones fluyen naturalmente.',
		'The First Weave — El mundo se reconecta por completo.',
	],
};

const createChapters = (worldNum: number): Chapter[] => {
	const descriptions = CHAPTER_DESCRIPTIONS[worldNum] || [];
	return Array.from({ length: 10 }, (_, i) => {
		const descText = descriptions[i] || `Chapter ${i + 1}`;
		const [title, ...descParts] = descText.split(' — ');
		const chapterId = `world_${worldNum}_chapter_${i + 1}`;
		return {
			id: chapterId,
			number: i + 1,
			title: title.trim(),
			description: descParts.join(' — ').trim() || undefined,
			levels: createLevels(worldNum, i + 1, chapterId),
		};
	});
};

export const WORLDS: World[] = [
	{
		id: 'world_1',
		number: 1,
		title: 'The Silent Arrival',
		description: 'El mundo donde nada comienza.',
		chapters: createChapters(1),
		isUnlocked: true,
		progress: 0,
	},
	{
		id: 'world_2',
		number: 2,
		title: 'The Broken Bodies',
		description: 'El mundo donde los movimientos no obedecen.',
		chapters: createChapters(2),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_3',
		number: 3,
		title: 'The Forgotten Rooms',
		description: 'El mundo donde los espacios perdieron su sentido.',
		chapters: createChapters(3),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_4',
		number: 4,
		title: 'The Hungry City',
		description: 'El mundo que no sabe elegir.',
		chapters: createChapters(4),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_5',
		number: 5,
		title: 'The Frozen Clock',
		description: 'El mundo donde el tiempo se detuvo.',
		chapters: createChapters(5),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_6',
		number: 6,
		title: 'The Lost Bonds',
		description: 'El mundo donde nadie reconoce a nadie.',
		chapters: createChapters(6),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_7',
		number: 7,
		title: 'The Colorless Land',
		description: 'El mundo que olvidó sentir.',
		chapters: createChapters(7),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_8',
		number: 8,
		title: 'The Endless Paths',
		description: 'El mundo sin dirección.',
		chapters: createChapters(8),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_9',
		number: 9,
		title: 'The Echo World',
		description: 'El mundo donde las voces no se conectan.',
		chapters: createChapters(9),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_10',
		number: 10,
		title: 'The Memory Fields',
		description: 'El mundo que olvidó su pasado.',
		chapters: createChapters(10),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_11',
		number: 11,
		title: 'The World of Choices',
		description: 'El mundo donde las decisiones no funcionan.',
		chapters: createChapters(11),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_12',
		number: 12,
		title: 'The Whispering Forest',
		description: 'El mundo que habla en silencio.',
		chapters: createChapters(12),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_13',
		number: 13,
		title: 'The Storm City',
		description: 'El mundo que vive con prisa.',
		chapters: createChapters(13),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_14',
		number: 14,
		title: 'The Dream World',
		description: 'El mundo donde nada es literal.',
		chapters: createChapters(14),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_15',
		number: 15,
		title: 'The Helping Hands',
		description: 'El mundo que olvidó pedir ayuda.',
		chapters: createChapters(15),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_16',
		number: 16,
		title: 'The Rules That Broke',
		description: 'El mundo donde las reglas se rompieron.',
		chapters: createChapters(16),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_17',
		number: 17,
		title: 'The Traveling Fair',
		description: 'El mundo donde todos se cruzan.',
		chapters: createChapters(17),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_18',
		number: 18,
		title: 'The Open Lands',
		description: 'El mundo sin camino fijo.',
		chapters: createChapters(18),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_19',
		number: 19,
		title: 'The Conflict Zone',
		description: 'El mundo del desacuerdo.',
		chapters: createChapters(19),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_20',
		number: 20,
		title: 'The Story Builders',
		description: 'El mundo que crea historias.',
		chapters: createChapters(20),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_21',
		number: 21,
		title: 'The World Without Help',
		description: 'El mundo donde estás solo.',
		chapters: createChapters(21),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_22',
		number: 22,
		title: 'The Great Weave',
		description: 'El mundo donde todo se conecta.',
		chapters: createChapters(22),
		isUnlocked: false,
		progress: 0,
	},
];

/**
 * Obtener mundo por ID
 */
export const getWorldById = (id: string) => WORLDS.find((w) => w.id === id);

/**
 * Obtener capítulo por ID
 */
export const getChapterById = (id: string) => {
	for (const world of WORLDS) {
		const chapter = world.chapters.find((c) => c.id === id);
		if (chapter) return chapter;
	}
	return undefined;
};

/**
 * Obtener nivel por ID
 */
export const getLevelById = (id: string) => {
	for (const world of WORLDS) {
		for (const chapter of world.chapters) {
			const level = chapter.levels.find((l) => l.id === id);
			if (level) return level;
		}
	}
	return undefined;
};

/**
 * Obtener capítulos de un mundo
 */
export const getChaptersForWorld = (worldId: string) => getWorldById(worldId)?.chapters || [];

/**
 * Obtener niveles de un capítulo
 */
export const getLevelsForChapter = (chapterId: string) => getChapterById(chapterId)?.levels || [];
