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
// Nota: estos textos están alineados con la pedagogía infantil del proyecto
// y se usan solo para contenido frontend (no hay lógica de backend asociada).
const CHAPTER_DESCRIPTIONS: Record<number, string[]> = {
	// Mundo 1 – Fundamentos Mágicos (4–6 años)
	1: [
		'Magic Greetings — Aprende a decir hi, hello y goodbye con tu varita mágica.',
		'Color Spells — Colores básicos que se encienden cuando dices el nombre en inglés.',
		'Magic Toys — Juguetes que cobran vida cuando pronuncias sus nombres.',
		'Family Charms — Mamá, papá y amigos aparecen con palabras sencillas.',
		'Cozy Room — Objetos de tu habitación que responden a tu voz.',
		'Happy Snacks — Comidas favoritas que brillan cuando dices la palabra correcta.',
		'Animal Friends — Animales tiernos que saludan en inglés.',
		'Feelings Potions — Caritas felices y tristes para hablar de emociones.',
		'Little Actions — Saltar, correr y bailar con verbos muy simples.',
		'Mini Review Quest — Pequeña misión para repasar todo lo aprendido.',
	],
	// Mundo 2 – Aventuras en la Ciudad (6–8 años)
	2: [
		'At the Park — Juegos, columpios y amigos en el parque.',
		'On the Street — Coches, buses y señales para moverte con seguridad.',
		'At School — Aulas, materiales y amigos de clase.',
		'At the Store — Frutas, precios y pequeñas compras.',
		'In the House — Habitaciones y tareas cotidianas.',
		'Transport Mix — Medios de transporte para ir de un lugar a otro.',
		'City Jobs — Personas y profesiones de la ciudad.',
		'Daily Routine — Mañana, tarde y noche en tu día a día.',
		'Directions — Girar a la izquierda, derecha y seguir recto.',
		'City Review Quest — Aventura rápida para repasar la ciudad.',
	],
	// Mundo 3 – Exploradores Globales (9–10 años)
	3: [
		'Countries & Flags — Descubre países y sus banderas.',
		'World Foods — Platos típicos de distintos lugares.',
		'Travel Gear — Maletas, mapas y objetos para viajar.',
		'Transport Around — Aviones, trenes y barcos por el mundo.',
		'Weather Zones — Climas diferentes en cada región.',
		'Landscapes — Montañas, playas y desiertos increíbles.',
		'People & Cultures — Formas básicas de saludar en otros países.',
		'City vs Nature — Diferencias entre ciudad y campo.',
		'Travel Phrases — Frases útiles para un viaje sencillo.',
		'Explorer Review Quest — Misión final para explorar el mapa completo.',
	],
};

// Número de capítulos por mundo (para los mundos infantiles principales usamos 5)
const CHAPTER_COUNT: Record<number, number> = {
	1: 5,
	2: 5,
	3: 5,
};

const createChapters = (worldNum: number): Chapter[] => {
	const descriptions = CHAPTER_DESCRIPTIONS[worldNum] || [];
	const chapterCount = CHAPTER_COUNT[worldNum] ?? 10;

	return Array.from({ length: chapterCount }, (_, i) => {
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
		title: 'Fundamentos Mágicos',
		description: 'Tu primera aventura mágica para aprender palabras básicas en inglés.',
		chapters: createChapters(1),
		isUnlocked: true,
		progress: 0,
	},
	{
		id: 'world_2',
		number: 2,
		title: 'Aventuras en la Ciudad',
		description: 'Explora parques, escuelas y calles de la ciudad usando inglés sencillo.',
		chapters: createChapters(2),
		isUnlocked: false,
		progress: 0,
	},
	{
		id: 'world_3',
		number: 3,
		title: 'Exploradores Globales',
		description: 'Viaja por el mundo descubriendo países, comidas y paisajes en inglés.',
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
