export interface Level {
	id: string;
	number: number;
	title: string;
	isCompleted: boolean;
	stars: number; // 0-3
}

export interface Chapter {
	id: string;
	number: number;
	title: string;
	levels: Level[];
}

export interface World {
	id: string;
	number: number;
	title: string;
	description: string;
	storyDescription: string;
	guardianName: string;
	guardianEmoji: string;
	themeColor: string;
	chapters: Chapter[];
	isUnlocked: boolean;
	isLocked: boolean;
	progress: number; // 0-100
}

const createLevels = (worldNum: number, chapterNum: number): Level[] => {
	return Array.from({ length: 6 }, (_, i) => ({
		id: `world_${worldNum}_chapter_${chapterNum}_level_${i + 1}`,
		number: i + 1,
		title: `Level ${i + 1}`,
		isCompleted: false,
		stars: 0,
	}));
};

const createChapters = (worldNum: number, count = 5): Chapter[] => {
	return Array.from({ length: count }, (_, i) => ({
		id: `world_${worldNum}_chapter_${i + 1}`,
		number: i + 1,
		title: `Chapter ${i + 1}`,
		levels: createLevels(worldNum, i + 1),
	}));
};

export const WORLDS: World[] = [
	{
		id: 'world_1',
		number: 1,
		title: 'Fundamentos Mágicos',
		description: 'Saludos y Colores para despertar la magia.',
		storyDescription: 'El Sol Dormilón no puede despertar porque olvidó las palabras mágicas. Aprende saludos y colores en inglés para devolverle su brillo al mundo.',
		guardianName: 'Sol Dormilón',
		guardianEmoji: '☀️',
		themeColor: '#FFD93D',
		chapters: createChapters(1, 5),
		isUnlocked: true,
		isLocked: false,
		progress: 0,
	},
	{
		id: 'world_2',
		number: 2,
		title: 'El Bosque de las Formas',
		description: 'Figuras y Números escondidos entre los árboles.',
		storyDescription: 'El Búho Geométrico perdió sus figuras y números. Sin ellos, los árboles del bosque crecen desordenados. Usa hechizos de formas y números para restaurar el orden.',
		guardianName: 'Búho Geométrico',
		guardianEmoji: '🦉',
		themeColor: '#6BCB77',
		chapters: createChapters(2, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_3',
		number: 3,
		title: 'La Ciudad Hambrienta',
		description: 'Comida y bebidas para alimentar la ciudad.',
		storyDescription: 'El Chef Mágico olvidó los nombres de todos los ingredientes. La ciudad entera tiene hambre. Aprende vocabulario de comida para cocinar los platos mágicos.',
		guardianName: 'Chef Mágico',
		guardianEmoji: '👨‍🍳',
		themeColor: '#FF6B6B',
		chapters: createChapters(3, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_4',
		number: 4,
		title: 'La Granja Ruidosa',
		description: 'Animales que necesitan sus nombres de vuelta.',
		storyDescription: 'El Espantapájaros ya no recuerda qué animal hace cada sonido. Los animales están confundidos. Nombra cada animal en inglés para devolver la armonía a la granja.',
		guardianName: 'Espantapájaros',
		guardianEmoji: '🤠',
		themeColor: '#C9A96E',
		chapters: createChapters(4, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_5',
		number: 5,
		title: 'El Reloj Congelado',
		description: 'Rutinas diarias para descongelar el tiempo.',
		storyDescription: 'El Señor Tiempo se quedó dormido y su reloj se congeló. Nadie sabe si es de día o de noche. Aprende rutinas diarias en inglés para que el tiempo vuelva a correr.',
		guardianName: 'Señor Tiempo',
		guardianEmoji: '⏰',
		themeColor: '#4ECDC4',
		chapters: createChapters(5, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_6',
		number: 6,
		title: 'El Castillo de las Emociones',
		description: 'Sentimientos que iluminan el castillo.',
		storyDescription: 'El Fantasma Expresivo perdió todas sus emociones y ahora no siente nada. Las habitaciones del castillo están oscuras. Nombra cada sentimiento para devolver la luz.',
		guardianName: 'Fantasma Expresivo',
		guardianEmoji: '👻',
		themeColor: '#A66CFF',
		chapters: createChapters(6, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_7',
		number: 7,
		title: 'La Montaña del Clima',
		description: 'Clima y ropa para vestir a la montaña.',
		storyDescription: 'El Yeti Friolento no sabe qué ponerse porque olvidó las palabras del clima y la ropa. Ayúdalo a vestirse correctamente según el tiempo que haga.',
		guardianName: 'Yeti Friolento',
		guardianEmoji: '🏔️',
		themeColor: '#74B9FF',
		chapters: createChapters(7, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_8',
		number: 8,
		title: 'El Océano de los Colores',
		description: 'Animales marinos que perdieron sus colores.',
		storyDescription: 'La Sirena Descolorida perdió todos los colores del océano. Los peces, pulpos y estrellas de mar son transparentes. Nombra cada criatura marina para devolverle el color al mar.',
		guardianName: 'Sirena Descolorida',
		guardianEmoji: '🧜‍♀️',
		themeColor: '#0ABDE3',
		chapters: createChapters(8, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_9',
		number: 9,
		title: 'La Casa de los Espejos',
		description: 'Cuerpo y familia reflejados en los espejos.',
		storyDescription: 'El Reflejo Perdido no puede verse en ningún espejo. Aprender las partes del cuerpo y los miembros de la familia hará que los reflejos vuelvan a aparecer.',
		guardianName: 'Reflejo Perdido',
		guardianEmoji: '🪞',
		themeColor: '#FD79A8',
		chapters: createChapters(9, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
	{
		id: 'world_10',
		number: 10,
		title: 'La Academia Suprema',
		description: 'Verbos y repaso final para graduarse de mago.',
		storyDescription: 'El Gran Mago te espera en la Academia Suprema. Repasa todo lo aprendido y domina los verbos de acción para recibir tu título de Mago del Inglés.',
		guardianName: 'Gran Mago',
		guardianEmoji: '🧙‍♂️',
		themeColor: '#6C5CE7',
		chapters: createChapters(10, 5),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
];

export const getWorldById = (id: string) => WORLDS.find((w) => w.id === id);

export const getChapterById = (chapterId: string) => {
	for (const world of WORLDS) {
		const chapter = world.chapters.find((c) => c.id === chapterId);
		if (chapter) return chapter;
	}
	return undefined;
};

export const getLevelById = (levelId: string) => {
	for (const world of WORLDS) {
		for (const chapter of world.chapters) {
			const level = chapter.levels.find((l) => l.id === levelId);
			if (level) return level;
		}
	}
	return undefined;
};

export const getChaptersForWorld = (worldId: string) => {
	const world = getWorldById(worldId);
	return world?.chapters || [];
};

export const getLevelsForChapter = (chapterId: string) => {
	const chapter = getChapterById(chapterId);
	return chapter?.levels || [];
};
