/**
 * Cuentos Musicales — historias cortas para reforzar vocabulario
 */

export interface StorySlide {
	imageUrl: string;
	textEs: string;
	textEn: string;
	audioUrl?: string;
	duration?: number; // ms
	emoji?: string; // fallback visual si no hay imagen
}

export interface Story {
	id: string;
	title: string;
	titleEn?: string;
	worldId?: string;
	chapterId?: string;
	coverEmoji: string; // siempre presente como fallback visual
	coverImage: string;
	audioUrl?: string;
	slides: StorySlide[];
}

const STORIES: Story[] = [
	// ─── MUNDO 1 ─────────────────────────────────────────────────────────────
	{
		id: 'story_magic_greetings',
		title: 'El bosque mágico de los saludos',
		titleEn: 'The Magic Forest of Greetings',
		worldId: 'world_1',
		chapterId: 'world_1_chapter_1',
		coverEmoji: '🌳',
		coverImage: '/assets/backgrounds/world_1/chapter_1.png',
		audioUrl: '/assets/audio/stories/magic_greetings.mp3',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				emoji: '🌲✨🌲',
				textEs: 'Había una vez un bosque mágico donde todos saludaban con palabras especiales.',
				textEn: 'Once upon a time, there was a magic forest where everyone greeted with special words.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				emoji: '☀️👋',
				textEs: 'Cuando el sol salía, los amigos decían: Hello! Hi!',
				textEn: 'When the sun rose, friends said: Hello! Hi!',
				audioUrl: '/assets/audio/voices/audioWordHello.mp3',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				emoji: '🌙💤',
				textEs: 'Y cuando la luna aparecía, decían: Good night! Sweet dreams!',
				textEn: 'And when the moon appeared, they said: Good night! Sweet dreams!',
				audioUrl: '/assets/audio/voices/audioWordGoodbye.mp3',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_color_spells',
		title: 'Los hechizos de colores',
		titleEn: 'The Color Spells',
		worldId: 'world_1',
		chapterId: 'world_1_chapter_2',
		coverEmoji: '🎨',
		coverImage: '/assets/backgrounds/world_1/chapter_2.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_2.png',
				emoji: '🎨🌈',
				textEs: 'En el taller mágico, cada color tenía un poder especial.',
				textEn: 'In the magic workshop, each color had a special power.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_2.png',
				emoji: '🔴🔵🟡',
				textEs: 'Rojo era Red, azul era Blue, y amarillo era Yellow.',
				textEn: 'Red glowed with Red, blue with Blue, and yellow with Yellow.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_2.png',
				emoji: '🟢🟠🟣',
				textEs: 'Verde era Green, naranja era Orange, y morado era Purple.',
				textEn: 'Green was Green, orange was Orange, and purple was Purple.',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_magic_toys',
		title: 'Los juguetes que cobran vida',
		titleEn: 'The Toys That Come to Life',
		worldId: 'world_1',
		chapterId: 'world_1_chapter_3',
		coverEmoji: '🧸',
		coverImage: '/assets/backgrounds/world_1/chapter_3.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				emoji: '⚽',
				textEs: 'Cuando pronuncias Ball, la pelota brinca.',
				textEn: 'When you say Ball, the ball bounces.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				emoji: '🎎',
				textEs: 'Cuando dices Doll, la muñeca sonríe.',
				textEn: 'When you say Doll, the doll smiles.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				emoji: '🚗',
				textEs: 'Y el Car rueda cuando lo llamas.',
				textEn: 'And the Car rolls when you call it.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 2 ─────────────────────────────────────────────────────────────
	{
		id: 'story_park_adventure',
		title: 'Aventura en el parque',
		titleEn: 'Adventure at the Park',
		worldId: 'world_2',
		chapterId: 'world_2_chapter_1',
		coverEmoji: '🏞️',
		coverImage: '/assets/backgrounds/world_2/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_1.png',
				emoji: '🌳🛝',
				textEs: 'En el Park hay un Swing y un Slide.',
				textEn: 'In the Park there is a Swing and a Slide.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_1.png',
				emoji: '👫🌈',
				textEs: 'Los amigos juegan juntos y se divierten.',
				textEn: 'Friends play together and have fun.',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_city_explorer',
		title: 'El explorador de la ciudad',
		titleEn: 'The City Explorer',
		worldId: 'world_2',
		chapterId: 'world_2_chapter_2',
		coverEmoji: '🏙️',
		coverImage: '/assets/backgrounds/world_2/chapter_2.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_2.png',
				emoji: '🚦🚶',
				textEs: 'Benji cruza la calle. Mira a la izquierda, mira a la derecha.',
				textEn: 'Benji crosses the street. Look left, look right.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_2.png',
				emoji: '🚌🚂',
				textEs: 'El bus y el tren lo llevan a la escuela.',
				textEn: 'The bus and the train take him to school.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_2.png',
				emoji: '🏫📚',
				textEs: 'En la escuela aprende English con sus amigos.',
				textEn: 'At school he learns English with his friends.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 3 ─────────────────────────────────────────────────────────────
	{
		id: 'story_world_explorer',
		title: 'Exploradores del mundo',
		titleEn: 'World Explorers',
		worldId: 'world_3',
		chapterId: 'world_3_chapter_1',
		coverEmoji: '🌍',
		coverImage: '/assets/backgrounds/world_3/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_3/chapter_1.png',
				emoji: '🗺️✈️',
				textEs: 'Zoe viaja por el mundo con su mapa mágico.',
				textEn: 'Zoe travels the world with her magic map.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_3/chapter_1.png',
				emoji: '🗼🗽🏯',
				textEs: 'Ve la Torre Eiffel en France y la Estatua de la Libertad en America.',
				textEn: 'She sees the Eiffel Tower in France and the Statue of Liberty in America.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_3/chapter_1.png',
				emoji: '🌏🌎🌍',
				textEs: 'El mundo es grande y lleno de palabras en inglés.',
				textEn: 'The world is big and full of English words.',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_space_adventure',
		title: 'Aventura en el espacio',
		titleEn: 'Space Adventure',
		worldId: 'world_3',
		chapterId: 'world_3_chapter_3',
		coverEmoji: '🚀',
		coverImage: '/assets/backgrounds/world_3/chapter_3.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_3/chapter_3.png',
				emoji: '🚀⭐',
				textEs: 'El cohete sube al espacio. Hay estrellas por todos lados.',
				textEn: 'The rocket goes to space. There are stars everywhere.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_3/chapter_3.png',
				emoji: '🌙🪐',
				textEs: 'La Moon brilla y el Planet Saturno gira.',
				textEn: 'The Moon shines and Planet Saturn spins.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 4 ─────────────────────────────────────────────────────────────
	{
		id: 'story_noisy_farm',
		title: 'La granja ruidosa',
		titleEn: 'The Noisy Farm',
		worldId: 'world_4',
		chapterId: 'world_4_chapter_1',
		coverEmoji: '🐄',
		coverImage: '/assets/backgrounds/world_4/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_4/chapter_1.png',
				emoji: '🌅🐓',
				textEs: 'Por la mañana el gallo canta y despierta a todos.',
				textEn: 'In the morning the rooster crows and wakes everyone up.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_4/chapter_1.png',
				emoji: '🐄🐖🐑',
				textEs: 'La vaca dice MOO, el cerdo dice OINK, la oveja dice BAA.',
				textEn: 'The cow says MOO, the pig says OINK, the sheep says BAA.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_4/chapter_1.png',
				emoji: '🌾🏡',
				textEs: 'Al final del día, todos duermen felices en la granja.',
				textEn: 'At the end of the day, everyone sleeps happily on the farm.',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_wild_safari',
		title: 'Safari salvaje',
		titleEn: 'Wild Safari',
		worldId: 'world_4',
		chapterId: 'world_4_chapter_3',
		coverEmoji: '🦁',
		coverImage: '/assets/backgrounds/world_4/chapter_3.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_4/chapter_3.png',
				emoji: '🦁🐘',
				textEs: 'En el safari vemos el Lion y el Elephant.',
				textEn: 'On safari we see the Lion and the Elephant.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_4/chapter_3.png',
				emoji: '🦒🦓',
				textEs: 'La Giraffe es muy alta. La Zebra tiene rayas.',
				textEn: 'The Giraffe is very tall. The Zebra has stripes.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 5 ─────────────────────────────────────────────────────────────
	{
		id: 'story_frozen_clock',
		title: 'El reloj congelado',
		titleEn: 'The Frozen Clock',
		worldId: 'world_5',
		chapterId: 'world_5_chapter_1',
		coverEmoji: '⏰',
		coverImage: '/assets/backgrounds/world_5/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_5/chapter_1.png',
				emoji: '⏰❄️',
				textEs: 'El reloj mágico se congeló. No hay mañana ni tarde.',
				textEn: 'The magic clock froze. There is no morning or afternoon.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_5/chapter_1.png',
				emoji: '☀️🌅🌙',
				textEs: 'Di morning, afternoon y night para descongelarlo.',
				textEn: 'Say morning, afternoon and night to unfreeze it.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_5/chapter_1.png',
				emoji: '⏰✨',
				textEs: '¡El reloj vuelve a funcionar! ¡Gracias!',
				textEn: 'The clock works again! Thank you!',
				duration: 4000,
			},
		],
	},
	// ─── MUNDO 6 ─────────────────────────────────────────────────────────────
	{
		id: 'story_emotion_castle',
		title: 'El castillo de las emociones',
		titleEn: 'The Castle of Emotions',
		worldId: 'world_6',
		chapterId: 'world_6_chapter_1',
		coverEmoji: '🏰',
		coverImage: '/assets/backgrounds/world_6/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_6/chapter_1.png',
				emoji: '🏰😊',
				textEs: 'En el castillo vive Luna, que siente todas las emociones.',
				textEn: 'In the castle lives Luna, who feels all emotions.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_6/chapter_1.png',
				emoji: '😊😢😡😮',
				textEs: 'Happy, sad, angry, surprised. Cada emoción tiene su cuarto.',
				textEn: 'Happy, sad, angry, surprised. Each emotion has its own room.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_6/chapter_1.png',
				emoji: '🤗💕',
				textEs: 'Luna aprende que todas las emociones son válidas.',
				textEn: 'Luna learns that all emotions are valid.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 7 ─────────────────────────────────────────────────────────────
	{
		id: 'story_weather_mountain',
		title: 'La montaña del clima',
		titleEn: 'The Weather Mountain',
		worldId: 'world_7',
		chapterId: 'world_7_chapter_1',
		coverEmoji: '🏔️',
		coverImage: '/assets/backgrounds/world_7/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_7/chapter_1.png',
				emoji: '⛅🏔️',
				textEs: 'Cloud vive en la cima de la montaña donde controla el clima.',
				textEn: 'Cloud lives on top of the mountain where she controls the weather.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_7/chapter_1.png',
				emoji: '☀️🌧️❄️',
				textEs: 'Sunny es caliente, rainy es mojado, snowy es frío.',
				textEn: 'Sunny is warm, rainy is wet, snowy is cold.',
				duration: 6000,
			},
		],
	},
	// ─── MUNDO 8 ─────────────────────────────────────────────────────────────
	{
		id: 'story_color_ocean',
		title: 'El océano de los colores',
		titleEn: 'The Ocean of Colors',
		worldId: 'world_8',
		chapterId: 'world_8_chapter_1',
		coverEmoji: '🐬',
		coverImage: '/assets/backgrounds/world_8/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_8/chapter_1.png',
				emoji: '🌊🐠',
				textEs: 'Marina nada por el océano lleno de colores.',
				textEn: 'Marina swims through the ocean full of colors.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_8/chapter_1.png',
				emoji: '🐡🦈🐙',
				textEs: 'Ve fish, shark y octopus. ¡Nombra los animales marinos!',
				textEn: 'She sees fish, shark and octopus. Name the sea animals!',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_8/chapter_1.png',
				emoji: '🪸🐚⭐',
				textEs: 'El arrecife brilla con coral, shells y starfish.',
				textEn: 'The reef shines with coral, shells and starfish.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 9 ─────────────────────────────────────────────────────────────
	{
		id: 'story_mirror_house',
		title: 'La casa de los espejos',
		titleEn: 'The Mirror House',
		worldId: 'world_9',
		chapterId: 'world_9_chapter_1',
		coverEmoji: '🪞',
		coverImage: '/assets/backgrounds/world_9/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_9/chapter_1.png',
				emoji: '🪞👀',
				textEs: 'Mirror dice: Toca tu nariz. Toca tus ojos. Toca tus orejas.',
				textEn: 'Mirror says: Touch your nose. Touch your eyes. Touch your ears.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_9/chapter_1.png',
				emoji: '👨‍👩‍👧‍👦',
				textEs: 'Luego presenta a su familia: mom, dad, brother, sister.',
				textEn: 'Then she introduces her family: mom, dad, brother, sister.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 10 ─────────────────────────────────────────────────────────────
	{
		id: 'story_supreme_academy',
		title: 'La academia suprema',
		titleEn: 'The Supreme Academy',
		worldId: 'world_10',
		chapterId: 'world_10_chapter_1',
		coverEmoji: '🎓',
		coverImage: '/assets/backgrounds/world_10/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_10/chapter_1.png',
				emoji: '🎓🏆',
				textEs: 'Max llega a la Academia Suprema. Aquí se aprende todo en inglés.',
				textEn: 'Max arrives at the Supreme Academy. Here everything is learned in English.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_10/chapter_1.png',
				emoji: '🏃✈️🏊',
				textEs: 'Los verbos Run, Fly y Swim cobran vida aquí.',
				textEn: 'The verbs Run, Fly and Swim come to life here.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_10/chapter_1.png',
				emoji: '🏅🌟',
				textEs: 'Al graduarse, Max recibe su estrella de oro.',
				textEn: 'Upon graduating, Max receives his gold star.',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 11 ─────────────────────────────────────────────────────────────
	{
		id: 'story_world_trip',
		title: 'El gran viaje',
		titleEn: 'The Great Journey',
		worldId: 'world_11',
		chapterId: 'world_11_chapter_1',
		coverEmoji: '🗺️',
		coverImage: '/assets/backgrounds/world_11/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_11/chapter_1.png',
				emoji: '✈️🌏',
				textEs: 'Atlas tiene un boleto para volar alrededor del mundo.',
				textEn: 'Atlas has a ticket to fly around the world.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_11/chapter_1.png',
				emoji: '🗼🏯🗽',
				textEs: 'Paris, Tokyo, New York. ¡Cada ciudad habla inglés!',
				textEn: 'Paris, Tokyo, New York. Each city speaks English!',
				duration: 5000,
			},
		],
	},
	// ─── MUNDO 12 ─────────────────────────────────────────────────────────────
	{
		id: 'story_creator_kingdom',
		title: 'El reino creador',
		titleEn: 'The Creator Kingdom',
		worldId: 'world_12',
		chapterId: 'world_12_chapter_1',
		coverEmoji: '🐉',
		coverImage: '/assets/backgrounds/world_12/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_12/chapter_1.png',
				emoji: '🐉🧙✨',
				textEs: 'En el Reino Creador puedes inventar tu propia historia en inglés.',
				textEn: 'In the Creator Kingdom you can invent your own story in English.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_12/chapter_1.png',
				emoji: '🦸🛡️⭐',
				textEs: 'El héroe es brave, strong y kind. ¿Cuál es tu héroe?',
				textEn: 'The hero is brave, strong and kind. Who is your hero?',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_12/chapter_1.png',
				emoji: '🎉🌈🏆',
				textEs: '¡Felicitaciones! ¡Creaste una historia increíble en inglés!',
				textEn: 'Congratulations! You created an amazing story in English!',
				duration: 5000,
			},
		],
	},
];

export const getStoriesForChapter = (chapterId: string): Story[] =>
	STORIES.filter((s) => s.chapterId === chapterId);

export const getStoriesForWorld = (worldId: string): Story[] =>
	STORIES.filter((s) => s.worldId === worldId);

export const getStoryById = (storyId: string): Story | undefined =>
	STORIES.find((s) => s.id === storyId);

export const getAllStories = (): Story[] => [...STORIES];
