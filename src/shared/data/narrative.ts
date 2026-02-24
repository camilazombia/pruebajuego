/**
 * Narrativa continua para storytelling entre capítulos
 * Personajes: Sparkle (Mundo 1), Benji (Mundo 2), Zoe (Mundo 3)
 */

export type NarrativeCharacter = 'sparkle' | 'benji' | 'zoe';

export interface NarrativeEntry {
	worldId: string;
	chapterId: string;
	character: NarrativeCharacter;
	characterName: string;
	dialogueEn: string;
	dialogueEs?: string;
	audioUrl: string;
}

const NARRATIVES: NarrativeEntry[] = [
	// Mundo 1 - Forest (Sparkle)
	{
		worldId: 'world_1',
		chapterId: 'world_1_chapter_1',
		character: 'sparkle',
		characterName: 'Sparkle',
		dialogueEn: 'Hello! Say hi and hello to wake the forest!',
		dialogueEs: '¡Hola! Di hi y hello para despertar el bosque.',
		audioUrl: '/assets/audio/voices/world_1/chapter_1.mp3',
	},
	{
		worldId: 'world_1',
		chapterId: 'world_1_chapter_2',
		character: 'sparkle',
		characterName: 'Sparkle',
		dialogueEn: 'Say red, blue, yellow and the colors will glow!',
		dialogueEs: 'Di red, blue, yellow y los colores brillarán.',
		audioUrl: '/assets/audio/voices/world_1/chapter_2.mp3',
	},
	{
		worldId: 'world_1',
		chapterId: 'world_1_chapter_3',
		character: 'sparkle',
		characterName: 'Sparkle',
		dialogueEn: 'Say ball, doll, car and the toys will play!',
		dialogueEs: 'Di ball, doll, car y los juguetes jugarán.',
		audioUrl: '/assets/audio/voices/world_1/chapter_3.mp3',
	},
	{
		worldId: 'world_1',
		chapterId: 'world_1_chapter_4',
		character: 'sparkle',
		characterName: 'Sparkle',
		dialogueEn: 'Call mom, dad, sister, brother with magic words!',
		dialogueEs: 'Llama a mamá, papá, hermana, hermano con palabras mágicas.',
		audioUrl: '/assets/audio/voices/world_1/chapter_4.mp3',
	},
	{
		worldId: 'world_1',
		chapterId: 'world_1_chapter_5',
		character: 'sparkle',
		characterName: 'Sparkle',
		dialogueEn: 'Name bed, chair, table. Your cozy room is waiting!',
		dialogueEs: 'Nombra cama, silla, mesa. Tu habitación acogedora te espera.',
		audioUrl: '/assets/audio/voices/world_1/chapter_5.mp3',
	},
	// Mundo 2 - City (Benji)
	{
		worldId: 'world_2',
		chapterId: 'world_2_chapter_1',
		character: 'benji',
		characterName: 'Benji',
		dialogueEn: 'We go to the park! Swings and slides. So fun!',
		dialogueEs: '¡Vamos al parque! Columpios y toboganes. ¡Qué divertido!',
		audioUrl: '/assets/audio/voices/world_2/chapter_1.mp3',
	},
	{
		worldId: 'world_2',
		chapterId: 'world_2_chapter_2',
		character: 'benji',
		characterName: 'Benji',
		dialogueEn: 'Cross the street. Cars and buses. Stay safe!',
		dialogueEs: 'Cruza la calle. Carros y buses. ¡Mantente seguro!',
		audioUrl: '/assets/audio/voices/world_2/chapter_2.mp3',
	},
	{
		worldId: 'world_2',
		chapterId: 'world_2_chapter_3',
		character: 'benji',
		characterName: 'Benji',
		dialogueEn: 'School! Books, teachers, pencils. We learn here!',
		dialogueEs: '¡Escuela! Libros, maestros, lápices. ¡Aprendemos aquí!',
		audioUrl: '/assets/audio/voices/world_2/chapter_3.mp3',
	},
	{
		worldId: 'world_2',
		chapterId: 'world_2_chapter_4',
		character: 'benji',
		characterName: 'Benji',
		dialogueEn: 'The store has apples and bananas. Let\'s buy!',
		dialogueEs: 'La tienda tiene manzanas y plátanos. ¡Compremos!',
		audioUrl: '/assets/audio/voices/world_2/chapter_4.mp3',
	},
	{
		worldId: 'world_2',
		chapterId: 'world_2_chapter_5',
		character: 'benji',
		characterName: 'Benji',
		dialogueEn: 'Home! Kitchen, bedroom, bathroom. Cozy!',
		dialogueEs: '¡Casa! Cocina, dormitorio, baño. ¡Acogedor!',
		audioUrl: '/assets/audio/voices/world_2/chapter_5.mp3',
	},
	// Mundo 3 - Clock (Zoe)
	{
		worldId: 'world_3',
		chapterId: 'world_3_chapter_1',
		character: 'zoe',
		characterName: 'Zoe',
		dialogueEn: 'We need maps! Countries and flags. Find the way!',
		dialogueEs: '¡Necesitamos mapas! Países y banderas. Encuentra el camino.',
		audioUrl: '/assets/audio/voices/world_3/chapter_1.mp3',
	},
	{
		worldId: 'world_3',
		chapterId: 'world_3_chapter_2',
		character: 'zoe',
		characterName: 'Zoe',
		dialogueEn: 'Teacher, doctor, pilot. Say the jobs that help!',
		dialogueEs: 'Maestro, doctor, piloto. Di los trabajos que ayudan.',
		audioUrl: '/assets/audio/voices/world_3/chapter_2.mp3',
	},
	{
		worldId: 'world_3',
		chapterId: 'world_3_chapter_3',
		character: 'zoe',
		characterName: 'Zoe',
		dialogueEn: 'Science! Sun, moon, stars. Discover the sky!',
		dialogueEs: '¡Ciencia! Sol, luna, estrellas. Descubre el cielo.',
		audioUrl: '/assets/audio/voices/world_3/chapter_3.mp3',
	},
	{
		worldId: 'world_3',
		chapterId: 'world_3_chapter_4',
		character: 'zoe',
		characterName: 'Zoe',
		dialogueEn: 'Morning, noon, night. The clock needs time words!',
		dialogueEs: 'Mañana, mediodía, noche. ¡El reloj necesita palabras de tiempo!',
		audioUrl: '/assets/audio/voices/world_3/chapter_4.mp3',
	},
	{
		worldId: 'world_3',
		chapterId: 'world_3_chapter_5',
		character: 'zoe',
		characterName: 'Zoe',
		dialogueEn: 'We fix the clock! Thank you! The world is happy!',
		dialogueEs: '¡Arreglamos el reloj! ¡Gracias! ¡El mundo está feliz!',
		audioUrl: '/assets/audio/voices/world_3/chapter_5.mp3',
	},
];

export const getNarrativeForChapter = (
	worldId: string,
	chapterId: string
): NarrativeEntry | null =>
	NARRATIVES.find((n) => n.worldId === worldId && n.chapterId === chapterId) ?? null;

export const getNarrativeForMission = (missionId: string, worldId: string): NarrativeEntry | null => {
	const missionToChapter: Record<string, string> = {
		mission_color_spells_1: 'world_1_chapter_2',
		mission_color_spells_2: 'world_1_chapter_2',
		mission_magic_toys_1: 'world_1_chapter_3',
	};
	const chapterId = missionToChapter[missionId];
	if (!chapterId) return null;
	return getNarrativeForChapter(worldId, chapterId);
};
