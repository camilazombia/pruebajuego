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
	icon: string; // Icon name for UI
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

// --- Chapter Details ---
// This maps chapter numbers to their specific themes and icons.
const CHAPTER_THEMES: Record<string, { icon: string; data: string }> = {
	'1-1': { icon: 'greetings', data: 'Magic Greetings — Aprende a decir hi, hello y goodbye con tu varita mágica.' },
	'1-2': { icon: 'colors', data: 'Color Spells — Colores básicos que se encienden cuando dices el nombre en inglés.' },
	'1-3': { icon: 'toys', data: 'Magic Toys — Juguetes que cobran vida cuando pronuncias sus nombres.' },
	'1-4': { icon: 'family', data: 'Family Charms — Mamá, papá y amigos aparecen con palabras sencillas.' },
	'1-5': { icon: 'room', data: 'Cozy Room — Objetos de tu habitación que responden a tu voz.' },
	'1-6': { icon: 'food', data: 'Happy Snacks — Comidas favoritas que brillan cuando dices la palabra correcta.' },
	'1-7': { icon: 'animals', data: 'Animal Friends — Animales tiernos que saludan en inglés.' },
	'1-8': { icon: 'feelings', data: 'Feelings Potions — Caritas felices y tristes para hablar de emociones.' },
	'1-9': { icon: 'actions', data: 'Little Actions — Saltar, correr y bailar con verbos muy simples.' },
	'1-10': { icon: 'quest', data: 'Mini Review Quest — Pequeña misión para repasar todo lo aprendido.' },
	
	'2-1': { icon: 'park', data: 'At the Park — Juegos, columpios y amigos en el parque.' },
	'2-2': { icon: 'street', data: 'On the Street — Coches, buses y señales para moverte con seguridad.' },
	'2-3': { icon: 'school', data: 'At School — Aulas, materiales y amigos de clase.' },
	'2-4': { icon: 'store', data: 'At the Store — Frutas, precios y pequeñas compras.' },
	'2-5': { icon: 'house', data: 'In the House — Habitaciones y tareas cotidianas.' },
	'2-6': { icon: 'transport', data: 'Transport Mix — Medios de transporte para ir de un lugar a otro.' },
	'2-7': { icon: 'jobs', data: 'City Jobs — Personas y profesiones de la ciudad.' },
	'2-8': { icon: 'routine', data: 'Daily Routine — Mañana, tarde y noche en tu día a día.' },
	'2-9': { icon: 'directions', data: 'Directions — Girar a la izquierda, derecha y seguir recto.' },
	'2-10': { icon: 'quest', data: 'City Review Quest — Aventura rápida para repasar la ciudad.' },

	'3-1': { icon: 'globe', data: 'Maps & Places — Mapas, países y banderas para encontrar el camino.' },
	'3-2': { icon: 'jobs', data: 'Professions — Teacher, doctor, pilot. Las profesiones que arreglan el mundo.' },
	'3-3': { icon: 'science', data: 'Science — Sol, luna y estrellas. Descubre el cielo.' },
	'3-4': { icon: 'clock', data: 'Time — Mañana, mediodía y noche. El reloj necesita estas palabras.' },
	'3-5': { icon: 'quest', data: 'Fix the Clock — Junto con Zoe, reparas el Reloj Congelado.' },
	'3-6': { icon: 'landscape', data: 'Landscapes — Montañas, playas y desiertos increíbles.' },
	'3-7': { icon: 'culture', data: 'People & Cultures — Formas básicas de saludar en otros países.' },
	'3-8': { icon: 'city_nature', data: 'City vs Nature — Diferencias entre ciudad y campo.' },
	'3-9': { icon: 'phrases', data: 'Travel Phrases — Frases útiles para un viaje sencillo.' },
	'3-10': { icon: 'quest', data: 'Explorer Review Quest — Misión final para explorar el mapa completo.' },
};

// Número de capítulos por mundo (para los mundos infantiles principales usamos 5)
const CHAPTER_COUNT: Record<number, number> = {
	1: 5,
	2: 5,
	3: 5,
};

const createChapters = (worldNum: number): Chapter[] => {
	const chapterCount = CHAPTER_COUNT[worldNum] ?? 10;

	return Array.from({ length: chapterCount }, (_, i) => {
		const chapterKey = `${worldNum}-${i + 1}`;
		const theme = CHAPTER_THEMES[chapterKey] || { icon: 'default', data: `Chapter ${i + 1}` };
		
		const [title, ...descParts] = theme.data.split(' — ');
		const chapterId = `world_${worldNum}_chapter_${i + 1}`;

		return {
			id: chapterId,
			number: i + 1,
			title: title.trim(),
			icon: theme.icon,
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
		title: 'El Reloj Congelado',
		description: 'Zoe la hada digital necesita tu ayuda para arreglar el Reloj del Mundo.',
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
