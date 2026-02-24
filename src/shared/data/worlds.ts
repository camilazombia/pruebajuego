export interface Level {
	id: string;
	number: number;
	title: string;
	isCompleted: boolean;
	stars: number; // 0-3
	chapterId?: string;
}

export interface Chapter {
	id: string;
	number: number;
	title: string;
	icon: string;
	description?: string;
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

const createLevels = (worldNum: number, chapterNum: number, chapterId: string): Level[] => {
	return Array.from({ length: 6 }, (_, i) => ({
		id: `world_${worldNum}_chapter_${chapterNum}_level_${i + 1}`,
		number: i + 1,
		title: `Level ${i + 1}`,
		isCompleted: false,
		stars: 0,
		chapterId,
	}));
};

const CHAPTER_THEMES: Record<string, { icon: string; data: string }> = {
	// Mundo 1 - Fundamentos Mágicos (Saludos/Colores)
	'1-1': { icon: 'greetings', data: 'Magic Greetings — Aprende a decir hi, hello y goodbye con tu varita mágica.' },
	'1-2': { icon: 'colors', data: 'Color Spells — Colores básicos que se encienden cuando dices el nombre en inglés.' },
	'1-3': { icon: 'toys', data: 'Magic Toys — Juguetes que cobran vida cuando pronuncias sus nombres.' },
	'1-4': { icon: 'family', data: 'Family Charms — Mamá, papá y amigos aparecen con palabras sencillas.' },
	'1-5': { icon: 'room', data: 'Cozy Room — Objetos de tu habitación que responden a tu voz.' },

	// Mundo 2 - El Bosque de las Formas (Figuras/Números)
	'2-1': { icon: 'shapes', data: 'Shape Forest — Círculos, cuadrados y triángulos mágicos entre los árboles.' },
	'2-2': { icon: 'numbers', data: 'Number Trees — Cuenta los árboles y animales del bosque.' },
	'2-3': { icon: 'sizes', data: 'Big & Small — Compara tamaños de las criaturas del bosque.' },
	'2-4': { icon: 'patterns', data: 'Pattern Paths — Sigue los patrones para encontrar el camino.' },
	'2-5': { icon: 'quest', data: 'Forest Quest — Misión final para restaurar el orden del bosque.' },

	// Mundo 3 - La Ciudad Hambrienta (Comida)
	'3-1': { icon: 'fruits', data: 'Fruit Market — Manzanas, plátanos y frutas mágicas.' },
	'3-2': { icon: 'vegetables', data: 'Veggie Garden — Zanahorias, tomates y verduras encantadas.' },
	'3-3': { icon: 'meals', data: 'Meal Time — Desayuno, almuerzo y cena para alimentar la ciudad.' },
	'3-4': { icon: 'drinks', data: 'Drink Potions — Agua, jugo y leche para las pociones.' },
	'3-5': { icon: 'quest', data: 'Chef Quest — Cocina el banquete final para curar al Chef Mágico.' },

	// Mundo 4 - La Granja Ruidosa (Animales)
	'4-1': { icon: 'farm_animals', data: 'Farm Friends — Vacas, cerdos y gallinas de la granja.' },
	'4-2': { icon: 'wild_animals', data: 'Wild Animals — Leones, elefantes y animales salvajes.' },
	'4-3': { icon: 'pets', data: 'My Pets — Perros, gatos y mascotas que te acompañan.' },
	'4-4': { icon: 'sounds', data: 'Animal Sounds — ¿Qué sonido hace cada animal?' },
	'4-5': { icon: 'quest', data: 'Farm Quest — Devuelve cada animal a su lugar en la granja.' },

	// Mundo 5 - El Reloj Congelado (Rutinas)
	'5-1': { icon: 'morning', data: 'Good Morning — Rutinas de la mañana para empezar el día.' },
	'5-2': { icon: 'afternoon', data: 'Afternoon Fun — Actividades de la tarde y juegos.' },
	'5-3': { icon: 'night', data: 'Good Night — La hora de dormir y los sueños.' },
	'5-4': { icon: 'days', data: 'Days of the Week — Los días de la semana en orden.' },
	'5-5': { icon: 'quest', data: 'Clock Quest — Descongela el reloj del Señor Tiempo.' },

	// Mundo 6 - El Castillo de las Emociones (Sentimientos)
	'6-1': { icon: 'happy', data: 'Happy Room — Sonrisas, risas y alegría.' },
	'6-2': { icon: 'sad', data: 'Sad Room — Lágrimas y cómo sentirse mejor.' },
	'6-3': { icon: 'angry', data: 'Angry Room — Enojo y cómo calmarse.' },
	'6-4': { icon: 'scared', data: 'Brave Room — Miedos y valentía para superarlos.' },
	'6-5': { icon: 'quest', data: 'Emotion Quest — Ilumina todas las habitaciones del castillo.' },

	// Mundo 7 - La Montaña del Clima (Clima/Ropa)
	'7-1': { icon: 'weather', data: 'Weather Watch — Soleado, lluvioso, nevado y más.' },
	'7-2': { icon: 'clothes', data: 'Closet Magic — Camisas, pantalones, zapatos y gorros.' },
	'7-3': { icon: 'seasons', data: 'Four Seasons — Primavera, verano, otoño e invierno.' },
	'7-4': { icon: 'dress_up', data: 'Dress the Yeti — Viste al Yeti según el clima.' },
	'7-5': { icon: 'quest', data: 'Mountain Quest — Llega a la cima de la Montaña del Clima.' },

	// Mundo 8 - El Océano de los Colores (Animales Marinos)
	'8-1': { icon: 'fish', data: 'Colorful Fish — Peces de todos los colores del arcoíris.' },
	'8-2': { icon: 'ocean', data: 'Deep Sea — Pulpos, medusas y criaturas del fondo.' },
	'8-3': { icon: 'shells', data: 'Shell Shore — Conchas, estrellas de mar y tesoros.' },
	'8-4': { icon: 'coral', data: 'Coral Reef — El arrecife mágico necesita color.' },
	'8-5': { icon: 'quest', data: 'Ocean Quest — Devuelve los colores a la Sirena Descolorida.' },

	// Mundo 9 - La Casa de los Espejos (Cuerpo/Familia)
	'9-1': { icon: 'body', data: 'My Body — Cabeza, brazos, piernas y más.' },
	'9-2': { icon: 'face', data: 'My Face — Ojos, nariz, boca y orejas.' },
	'9-3': { icon: 'family', data: 'My Family — Mamá, papá, abuelos y hermanos.' },
	'9-4': { icon: 'describe', data: 'Describe Me — Alto, bajo, grande, pequeño.' },
	'9-5': { icon: 'quest', data: 'Mirror Quest — Devuelve el reflejo a cada espejo.' },

	// Mundo 10 - La Academia Suprema (Verbos/Repaso)
	'10-1': { icon: 'verbs', data: 'Action Verbs — Correr, saltar, bailar y volar.' },
	'10-2': { icon: 'review_words', data: 'Word Review — Repasa las palabras de todos los mundos.' },
	'10-3': { icon: 'sentences', data: 'Magic Sentences — Forma oraciones completas.' },
	'10-4': { icon: 'challenge', data: 'Final Challenge — Demuestra todo lo que has aprendido.' },
	'10-5': { icon: 'graduation', data: 'Graduation — Recibe tu título de Mago del Inglés.' },
};

const CHAPTER_COUNT: Record<number, number> = {
	1: 5, 2: 5, 3: 5, 4: 5, 5: 5,
	6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
};

const createChapters = (worldNum: number): Chapter[] => {
	const chapterCount = CHAPTER_COUNT[worldNum] ?? 5;

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
		description: 'Saludos y Colores para despertar la magia.',
		storyDescription: 'El Sol Dormilón no puede despertar porque olvidó las palabras mágicas. Aprende saludos y colores en inglés para devolverle su brillo al mundo.',
		guardianName: 'Sol Dormilón',
		guardianEmoji: '☀️',
		themeColor: '#FFD93D',
		chapters: createChapters(1),
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
		chapters: createChapters(2),
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
		chapters: createChapters(3),
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
		chapters: createChapters(4),
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
		chapters: createChapters(5),
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
		chapters: createChapters(6),
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
		chapters: createChapters(7),
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
		chapters: createChapters(8),
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
		chapters: createChapters(9),
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
		chapters: createChapters(10),
		isUnlocked: false,
		isLocked: true,
		progress: 0,
	},
];

export const getWorldById = (id: string) => WORLDS.find((w) => w.id === id);

export const getChapterById = (id: string) => {
	for (const world of WORLDS) {
		const chapter = world.chapters.find((c) => c.id === id);
		if (chapter) return chapter;
	}
	return undefined;
};

export const getLevelById = (id: string) => {
	for (const world of WORLDS) {
		for (const chapter of world.chapters) {
			const level = chapter.levels.find((l) => l.id === id);
			if (level) return level;
		}
	}
	return undefined;
};

export const getChaptersForWorld = (worldId: string) => getWorldById(worldId)?.chapters || [];

export const getLevelsForChapter = (chapterId: string) => getChapterById(chapterId)?.levels || [];
