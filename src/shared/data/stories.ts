/**
 * Estructura de datos para Cuentos Musicales
 * Alineado con ART_DIRECTION_SYSTEM narrativa entre capítulos
 */

export interface StorySlide {
	imageUrl: string;
	textEs: string;
	textEn: string;
	audioUrl?: string;
	duration?: number; // ms
}

export interface Story {
	id: string;
	title: string;
	titleEn?: string;
	worldId?: string;
	chapterId?: string;
	coverImage: string;
	audioUrl?: string;
	slides: StorySlide[];
}

const STORIES: Story[] = [
	{
		id: 'story_magic_greetings',
		title: 'El bosque mágico de los saludos',
		titleEn: 'The Magic Forest of Greetings',
		worldId: 'world_1',
		chapterId: 'world_1_chapter_1',
		coverImage: '/assets/backgrounds/world_1/chapter_1.png',
		audioUrl: '/assets/audio/stories/magic_greetings.mp3',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				textEs: 'Había una vez un bosque mágico donde todos saludaban con palabras especiales.',
				textEn: 'Once upon a time, there was a magic forest where everyone greeted with special words.',
				duration: 6000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				textEs: 'Cuando el sol salía, decían: Hello! Hi!',
				textEn: 'When the sun rose, they said: Hello! Hi!',
				audioUrl: '/assets/audio/voices/audioWordHello.mp3',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_1.png',
				textEs: 'Y cuando la luna aparecía, decían: Good night!',
				textEn: 'And when the moon appeared, they said: Good night!',
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
		coverImage: '/assets/backgrounds/world_1/chapter_2.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_2.png',
				textEs: 'En el taller mágico, cada color tenía un poder.',
				textEn: 'In the magic workshop, each color had a power.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_2.png',
				textEs: 'Rojo brillaba con Red, azul con Blue, y amarillo con Yellow.',
				textEn: 'Red glowed with Red, blue with Blue, and yellow with Yellow.',
				duration: 6000,
			},
		],
	},
	{
		id: 'story_magic_toys',
		title: 'Los juguetes que cobran vida',
		titleEn: 'The Toys That Come to Life',
		worldId: 'world_1',
		chapterId: 'world_1_chapter_3',
		coverImage: '/assets/backgrounds/world_1/chapter_3.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				textEs: 'Cuando pronuncias Ball, la pelota brinca.',
				textEn: 'When you say Ball, the ball bounces.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				textEs: 'Cuando dices Doll, la muñeca sonríe.',
				textEn: 'When you say Doll, the doll smiles.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_1/chapter_3.png',
				textEs: 'Y el Car rueda cuando lo llamas.',
				textEn: 'And the Car rolls when you call it.',
				duration: 5000,
			},
		],
	},
	{
		id: 'story_park_adventure',
		title: 'Aventura en el parque',
		titleEn: 'Adventure at the Park',
		worldId: 'world_2',
		chapterId: 'world_2_chapter_1',
		coverImage: '/assets/backgrounds/world_2/chapter_1.png',
		slides: [
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_1.png',
				textEs: 'En el Park hay un Swing y un Slide.',
				textEn: 'In the Park there is a Swing and a Slide.',
				duration: 5000,
			},
			{
				imageUrl: '/assets/backgrounds/world_2/chapter_1.png',
				textEs: 'Los amigos juegan y se divierten.',
				textEn: 'Friends play and have fun.',
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
