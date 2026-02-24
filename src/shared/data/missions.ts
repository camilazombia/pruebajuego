/**
 * Estructura de misiones — actividades adicionales por capítulo
 */

export type MissionType = 'color_guess' | 'listen_choose' | 'drag_drop';

export interface MissionConfig {
	/** Para color_guess: objetos con nombre y color */
	objects?: { id: string; name: string; color: string }[];
	/** Para color_guess: colores a adivinar en orden */
	colors?: string[];
	/** Para listen_choose / drag_drop: configuración futura */
	[key: string]: unknown;
}

export interface Mission {
	id: string;
	chapterId: string;
	worldId: string;
	title: string;
	description?: string;
	type: MissionType;
	config: MissionConfig;
	order: number; // Orden dentro del capítulo
}

const MISSIONS: Mission[] = [
	{
		id: 'mission_color_spells_1',
		chapterId: 'world_1_chapter_2',
		worldId: 'world_1',
		title: 'Find the Colors',
		description: 'Escucha el color y toca el objeto correcto',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Ball', color: 'Red' },
				{ id: 'obj2', name: 'Car', color: 'Blue' },
				{ id: 'obj3', name: 'Duck', color: 'Yellow' },
			],
			colors: ['Red', 'Blue', 'Yellow'],
		},
		order: 1,
	},
	{
		id: 'mission_color_spells_2',
		chapterId: 'world_1_chapter_2',
		worldId: 'world_1',
		title: 'More Colors',
		description: 'Encuentra rojo, verde y naranja',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Apple', color: 'Red' },
				{ id: 'obj2', name: 'Leaf', color: 'Green' },
				{ id: 'obj3', name: 'Orange', color: 'Orange' },
			],
			colors: ['Red', 'Green', 'Orange'],
		},
		order: 2,
	},
	{
		id: 'mission_magic_toys_1',
		chapterId: 'world_1_chapter_3',
		worldId: 'world_1',
		title: 'Toy Colors',
		description: '¿De qué color es cada juguete?',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Ball', color: 'Red' },
				{ id: 'obj2', name: 'Doll', color: 'Pink' },
				{ id: 'obj3', name: 'Car', color: 'Blue' },
			],
			colors: ['Red', 'Pink', 'Blue'],
		},
		order: 1,
	},
];

export const getMissionsForWorld = (worldId: string): Mission[] =>
	MISSIONS.filter((m) => m.worldId === worldId).sort((a, b) => a.order - b.order);

export const getMissionsForChapter = (chapterId: string): Mission[] =>
	MISSIONS.filter((m) => m.chapterId === chapterId).sort((a, b) => a.order - b.order);

export const getMissionById = (missionId: string): Mission | undefined =>
	MISSIONS.find((m) => m.id === missionId);
