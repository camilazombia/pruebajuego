/**
 * Estructura de misiones — actividades adicionales por capítulo
 * Tipos: color_guess | listen_choose
 */

export type MissionType = 'color_guess' | 'listen_choose' | 'drag_drop';

export interface ListenRound {
	word: string;
	emoji: string;
	options: string[];
	correctIndex: number;
}

export interface MissionConfig {
	/** Para color_guess: objetos con nombre y color */
	objects?: { id: string; name: string; color: string; emoji: string }[];
	/** Para color_guess: colores a adivinar en orden */
	colors?: string[];
	/** Para listen_choose: rondas con palabra + opciones emoji */
	rounds?: ListenRound[];
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
	order: number;
}

const MISSIONS: Mission[] = [
	// ─── MUNDO 1 - Fundamentos Mágicos ───────────────────────────────────────
	{
		id: 'mission_w1_1',
		chapterId: 'world_1_chapter_2',
		worldId: 'world_1',
		title: 'Find the Colors',
		description: 'Toca el objeto del color correcto',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Ball', color: 'Red', emoji: '🔴' },
				{ id: 'obj2', name: 'Car', color: 'Blue', emoji: '🔵' },
				{ id: 'obj3', name: 'Duck', color: 'Yellow', emoji: '🟡' },
			],
			colors: ['Red', 'Blue', 'Yellow'],
		},
		order: 1,
	},
	{
		id: 'mission_w1_2',
		chapterId: 'world_1_chapter_2',
		worldId: 'world_1',
		title: 'More Colors',
		description: 'Encuentra rojo, verde y naranja',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Apple', color: 'Red', emoji: '🍎' },
				{ id: 'obj2', name: 'Leaf', color: 'Green', emoji: '🍃' },
				{ id: 'obj3', name: 'Orange', color: 'Orange', emoji: '🟠' },
			],
			colors: ['Red', 'Green', 'Orange'],
		},
		order: 2,
	},
	{
		id: 'mission_w1_3',
		chapterId: 'world_1_chapter_3',
		worldId: 'world_1',
		title: 'Listen & Find',
		description: 'Escucha la palabra y toca la imagen',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Ball', emoji: '⚽', options: ['⚽', '🚗', '🎎'], correctIndex: 0 },
				{ word: 'Car', emoji: '🚗', options: ['⚽', '🚗', '🧸'], correctIndex: 1 },
				{ word: 'Doll', emoji: '🎎', options: ['🎎', '🚗', '⚽'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 2 - Aventuras en la Ciudad ────────────────────────────────────
	{
		id: 'mission_w2_1',
		chapterId: 'world_2_chapter_1',
		worldId: 'world_2',
		title: 'Park Colors',
		description: 'Colorea el parque',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Tree', color: 'Green', emoji: '🌳' },
				{ id: 'obj2', name: 'Sky', color: 'Blue', emoji: '🔵' },
				{ id: 'obj3', name: 'Sun', color: 'Yellow', emoji: '☀️' },
			],
			colors: ['Green', 'Blue', 'Yellow'],
		},
		order: 1,
	},
	{
		id: 'mission_w2_2',
		chapterId: 'world_2_chapter_2',
		worldId: 'world_2',
		title: 'City Words',
		description: 'Escucha y encuentra el lugar',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'School', emoji: '🏫', options: ['🏫', '🏥', '🏪'], correctIndex: 0 },
				{ word: 'Hospital', emoji: '🏥', options: ['🏫', '🏥', '🏠'], correctIndex: 1 },
				{ word: 'Store', emoji: '🏪', options: ['🏠', '🚌', '🏪'], correctIndex: 2 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w2_3',
		chapterId: 'world_2_chapter_3',
		worldId: 'world_2',
		title: 'Transport',
		description: 'Escucha y elige el transporte',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Bus', emoji: '🚌', options: ['🚌', '🚂', '✈️'], correctIndex: 0 },
				{ word: 'Train', emoji: '🚂', options: ['🚌', '🚂', '🚗'], correctIndex: 1 },
				{ word: 'Airplane', emoji: '✈️', options: ['✈️', '🚢', '🚲'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 3 - Exploradores Globales ─────────────────────────────────────
	{
		id: 'mission_w3_1',
		chapterId: 'world_3_chapter_1',
		worldId: 'world_3',
		title: 'World Colors',
		description: 'Colorea el mapa del mundo',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Ocean', color: 'Blue', emoji: '🌊' },
				{ id: 'obj2', name: 'Forest', color: 'Green', emoji: '🌲' },
				{ id: 'obj3', name: 'Desert', color: 'Orange', emoji: '🏜️' },
			],
			colors: ['Blue', 'Green', 'Orange'],
		},
		order: 1,
	},
	{
		id: 'mission_w3_2',
		chapterId: 'world_3_chapter_2',
		worldId: 'world_3',
		title: 'Jobs',
		description: 'Escucha el trabajo y encuéntralo',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Doctor', emoji: '👨‍⚕️', options: ['👨‍⚕️', '👮', '🧑‍🍳'], correctIndex: 0 },
				{ word: 'Police', emoji: '👮', options: ['👨‍⚕️', '👮', '🧑‍🏫'], correctIndex: 1 },
				{ word: 'Cook', emoji: '🧑‍🍳', options: ['🧑‍🍳', '👨‍⚕️', '🧑‍🚀'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w3_3',
		chapterId: 'world_3_chapter_3',
		worldId: 'world_3',
		title: 'Space',
		description: 'Escucha y encuentra el objeto del espacio',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Star', emoji: '⭐', options: ['⭐', '🌙', '🌍'], correctIndex: 0 },
				{ word: 'Moon', emoji: '🌙', options: ['⭐', '🌙', '☀️'], correctIndex: 1 },
				{ word: 'Planet', emoji: '🪐', options: ['🪐', '⭐', '🌙'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 4 - La Granja Ruidosa ─────────────────────────────────────────
	{
		id: 'mission_w4_1',
		chapterId: 'world_4_chapter_1',
		worldId: 'world_4',
		title: 'Farm Colors',
		description: 'Colorea los animales de la granja',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Pig', color: 'Pink', emoji: '🐷' },
				{ id: 'obj2', name: 'Grass', color: 'Green', emoji: '🌿' },
				{ id: 'obj3', name: 'Chicken', color: 'Yellow', emoji: '🐥' },
			],
			colors: ['Pink', 'Green', 'Yellow'],
		},
		order: 1,
	},
	{
		id: 'mission_w4_2',
		chapterId: 'world_4_chapter_2',
		worldId: 'world_4',
		title: 'Farm Animals',
		description: 'Escucha y encuentra el animal',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Cow', emoji: '🐄', options: ['🐄', '🐖', '🐑'], correctIndex: 0 },
				{ word: 'Pig', emoji: '🐖', options: ['🐄', '🐖', '🐓'], correctIndex: 1 },
				{ word: 'Sheep', emoji: '🐑', options: ['🐑', '🐄', '🐖'], correctIndex: 0 },
				{ word: 'Horse', emoji: '🐴', options: ['🐓', '🐴', '🐑'], correctIndex: 1 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w4_3',
		chapterId: 'world_4_chapter_3',
		worldId: 'world_4',
		title: 'Wild Animals',
		description: 'Escucha y elige el animal salvaje',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Lion', emoji: '🦁', options: ['🦁', '🐘', '🦒'], correctIndex: 0 },
				{ word: 'Elephant', emoji: '🐘', options: ['🦁', '🐘', '🐆'], correctIndex: 1 },
				{ word: 'Giraffe', emoji: '🦒', options: ['🦒', '🐊', '🐘'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 5 - El Reloj Congelado ────────────────────────────────────────
	{
		id: 'mission_w5_1',
		chapterId: 'world_5_chapter_1',
		worldId: 'world_5',
		title: 'Time Colors',
		description: 'Colorea los momentos del día',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Sun', color: 'Yellow', emoji: '☀️' },
				{ id: 'obj2', name: 'Sky', color: 'Blue', emoji: '🔵' },
				{ id: 'obj3', name: 'Moon', color: 'Orange', emoji: '🌙' },
			],
			colors: ['Yellow', 'Blue', 'Orange'],
		},
		order: 1,
	},
	{
		id: 'mission_w5_2',
		chapterId: 'world_5_chapter_2',
		worldId: 'world_5',
		title: 'Time of Day',
		description: 'Escucha y elige el momento del día',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Morning', emoji: '🌅', options: ['🌅', '🌆', '🌙'], correctIndex: 0 },
				{ word: 'Afternoon', emoji: '🌆', options: ['🌅', '🌆', '🌑'], correctIndex: 1 },
				{ word: 'Night', emoji: '🌙', options: ['🌙', '🌅', '🌤️'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w5_3',
		chapterId: 'world_5_chapter_3',
		worldId: 'world_5',
		title: 'Days of the Week',
		description: 'Escucha el día y encuéntralo',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Monday', emoji: '1️⃣', options: ['1️⃣', '2️⃣', '3️⃣'], correctIndex: 0 },
				{ word: 'Wednesday', emoji: '3️⃣', options: ['1️⃣', '3️⃣', '5️⃣'], correctIndex: 1 },
				{ word: 'Friday', emoji: '5️⃣', options: ['5️⃣', '6️⃣', '7️⃣'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 6 - El Castillo de las Emociones ───────────────────────────────
	{
		id: 'mission_w6_1',
		chapterId: 'world_6_chapter_1',
		worldId: 'world_6',
		title: 'Emotion Colors',
		description: '¿De qué color son las emociones?',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Happy', color: 'Yellow', emoji: '😊' },
				{ id: 'obj2', name: 'Sad', color: 'Blue', emoji: '😢' },
				{ id: 'obj3', name: 'Angry', color: 'Red', emoji: '😡' },
			],
			colors: ['Yellow', 'Blue', 'Red'],
		},
		order: 1,
	},
	{
		id: 'mission_w6_2',
		chapterId: 'world_6_chapter_2',
		worldId: 'world_6',
		title: 'How Do You Feel?',
		description: 'Escucha la emoción y encuéntrala',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Happy', emoji: '😊', options: ['😊', '😢', '😡'], correctIndex: 0 },
				{ word: 'Sad', emoji: '😢', options: ['😊', '😢', '😮'], correctIndex: 1 },
				{ word: 'Angry', emoji: '😡', options: ['😡', '😊', '😢'], correctIndex: 0 },
				{ word: 'Surprised', emoji: '😮', options: ['😮', '😡', '😴'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w6_3',
		chapterId: 'world_6_chapter_3',
		worldId: 'world_6',
		title: 'Feelings',
		description: 'Escucha y elige cómo se siente',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Scared', emoji: '😨', options: ['😨', '🥰', '😂'], correctIndex: 0 },
				{ word: 'Excited', emoji: '🤩', options: ['😴', '🤩', '😐'], correctIndex: 1 },
				{ word: 'Tired', emoji: '😴', options: ['😴', '😊', '🤩'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 7 - La Montaña del Clima ──────────────────────────────────────
	{
		id: 'mission_w7_1',
		chapterId: 'world_7_chapter_1',
		worldId: 'world_7',
		title: 'Weather Colors',
		description: 'Colorea el cielo según el clima',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Sunny', color: 'Yellow', emoji: '☀️' },
				{ id: 'obj2', name: 'Rainy', color: 'Blue', emoji: '🌧️' },
				{ id: 'obj3', name: 'Snow', color: 'White', emoji: '❄️' },
			],
			colors: ['Yellow', 'Blue', 'Red'],
		},
		order: 1,
	},
	{
		id: 'mission_w7_2',
		chapterId: 'world_7_chapter_2',
		worldId: 'world_7',
		title: 'Weather',
		description: 'Escucha el clima y encuéntralo',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Sunny', emoji: '☀️', options: ['☀️', '🌧️', '⛄'], correctIndex: 0 },
				{ word: 'Rainy', emoji: '🌧️', options: ['☀️', '🌧️', '🌩️'], correctIndex: 1 },
				{ word: 'Snowy', emoji: '⛄', options: ['⛄', '☀️', '🌫️'], correctIndex: 0 },
				{ word: 'Windy', emoji: '💨', options: ['🌧️', '💨', '☀️'], correctIndex: 1 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w7_3',
		chapterId: 'world_7_chapter_3',
		worldId: 'world_7',
		title: 'Clothing',
		description: 'Escucha y elige la ropa correcta',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Coat', emoji: '🧥', options: ['🧥', '👒', '👗'], correctIndex: 0 },
				{ word: 'Hat', emoji: '👒', options: ['🧥', '👒', '🧤'], correctIndex: 1 },
				{ word: 'Gloves', emoji: '🧤', options: ['🧤', '🧥', '👗'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 8 - El Océano de los Colores ──────────────────────────────────
	{
		id: 'mission_w8_1',
		chapterId: 'world_8_chapter_1',
		worldId: 'world_8',
		title: 'Ocean Colors',
		description: 'Colorea el océano',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Fish', color: 'Orange', emoji: '🐠' },
				{ id: 'obj2', name: 'Octopus', color: 'Pink', emoji: '🐙' },
				{ id: 'obj3', name: 'Water', color: 'Blue', emoji: '🌊' },
			],
			colors: ['Orange', 'Pink', 'Blue'],
		},
		order: 1,
	},
	{
		id: 'mission_w8_2',
		chapterId: 'world_8_chapter_2',
		worldId: 'world_8',
		title: 'Sea Animals',
		description: 'Escucha y encuentra el animal marino',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Fish', emoji: '🐟', options: ['🐟', '🦀', '🐙'], correctIndex: 0 },
				{ word: 'Crab', emoji: '🦀', options: ['🐟', '🦀', '🦞'], correctIndex: 1 },
				{ word: 'Octopus', emoji: '🐙', options: ['🐙', '🐟', '🦈'], correctIndex: 0 },
				{ word: 'Shark', emoji: '🦈', options: ['🐬', '🐙', '🦈'], correctIndex: 2 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w8_3',
		chapterId: 'world_8_chapter_3',
		worldId: 'world_8',
		title: 'Coral Colors',
		description: 'Colorea el arrecife de coral',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Coral', color: 'Red', emoji: '🪸' },
				{ id: 'obj2', name: 'Shell', color: 'Pink', emoji: '🐚' },
				{ id: 'obj3', name: 'Starfish', color: 'Orange', emoji: '⭐' },
			],
			colors: ['Red', 'Pink', 'Orange'],
		},
		order: 3,
	},

	// ─── MUNDO 9 - La Casa de los Espejos ────────────────────────────────────
	{
		id: 'mission_w9_1',
		chapterId: 'world_9_chapter_1',
		worldId: 'world_9',
		title: 'Body Parts',
		description: 'Escucha la parte del cuerpo',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Head', emoji: '🗣️', options: ['🗣️', '🦷', '👁️'], correctIndex: 0 },
				{ word: 'Hand', emoji: '✋', options: ['🦶', '✋', '👂'], correctIndex: 1 },
				{ word: 'Foot', emoji: '🦶', options: ['🦶', '👁️', '✋'], correctIndex: 0 },
				{ word: 'Eye', emoji: '👁️', options: ['👁️', '🦶', '✋'], correctIndex: 0 },
			],
		},
		order: 1,
	},
	{
		id: 'mission_w9_2',
		chapterId: 'world_9_chapter_2',
		worldId: 'world_9',
		title: 'Face Features',
		description: 'Escucha y encuentra la parte de la cara',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Nose', emoji: '👃', options: ['👃', '👂', '👅'], correctIndex: 0 },
				{ word: 'Ear', emoji: '👂', options: ['👃', '👂', '👁️'], correctIndex: 1 },
				{ word: 'Mouth', emoji: '👅', options: ['👅', '👃', '👂'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w9_3',
		chapterId: 'world_9_chapter_3',
		worldId: 'world_9',
		title: 'Mirror Colors',
		description: 'Colorea la imagen en el espejo',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Hair', color: 'Yellow', emoji: '👱' },
				{ id: 'obj2', name: 'Eyes', color: 'Blue', emoji: '👁️' },
				{ id: 'obj3', name: 'Lips', color: 'Red', emoji: '💋' },
			],
			colors: ['Yellow', 'Blue', 'Red'],
		},
		order: 3,
	},

	// ─── MUNDO 10 - La Academia Suprema ──────────────────────────────────────
	{
		id: 'mission_w10_1',
		chapterId: 'world_10_chapter_1',
		worldId: 'world_10',
		title: 'Action Verbs',
		description: 'Escucha el verbo y encuéntralo',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Run', emoji: '🏃', options: ['🏃', '🤸', '🏊'], correctIndex: 0 },
				{ word: 'Jump', emoji: '🤸', options: ['🏃', '🤸', '🚶'], correctIndex: 1 },
				{ word: 'Swim', emoji: '🏊', options: ['🏊', '🏃', '🤸'], correctIndex: 0 },
				{ word: 'Fly', emoji: '🦅', options: ['🦅', '🏊', '🤸'], correctIndex: 0 },
			],
		},
		order: 1,
	},
	{
		id: 'mission_w10_2',
		chapterId: 'world_10_chapter_2',
		worldId: 'world_10',
		title: 'School Objects',
		description: 'Escucha y elige el objeto escolar',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Book', emoji: '📚', options: ['📚', '✏️', '📐'], correctIndex: 0 },
				{ word: 'Pencil', emoji: '✏️', options: ['📚', '✏️', '📏'], correctIndex: 1 },
				{ word: 'Ruler', emoji: '📏', options: ['📏', '📚', '🎒'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w10_3',
		chapterId: 'world_10_chapter_3',
		worldId: 'world_10',
		title: 'Academy Colors',
		description: 'Colorea los objetos de la academia',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Book', color: 'Blue', emoji: '📘' },
				{ id: 'obj2', name: 'Pencil', color: 'Yellow', emoji: '✏️' },
				{ id: 'obj3', name: 'Apple', color: 'Red', emoji: '🍎' },
			],
			colors: ['Blue', 'Yellow', 'Red'],
		},
		order: 3,
	},

	// ─── MUNDO 11 - Viajes y Lugares ─────────────────────────────────────────
	{
		id: 'mission_w11_1',
		chapterId: 'world_11_chapter_1',
		worldId: 'world_11',
		title: 'Places',
		description: 'Escucha y encuentra el lugar',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Beach', emoji: '🏖️', options: ['🏖️', '🏔️', '🏙️'], correctIndex: 0 },
				{ word: 'Mountain', emoji: '🏔️', options: ['🏖️', '🏔️', '🌲'], correctIndex: 1 },
				{ word: 'City', emoji: '🏙️', options: ['🏙️', '🏖️', '🏔️'], correctIndex: 0 },
			],
		},
		order: 1,
	},
	{
		id: 'mission_w11_2',
		chapterId: 'world_11_chapter_2',
		worldId: 'world_11',
		title: 'Transport Colors',
		description: 'Colorea los transportes',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Train', color: 'Red', emoji: '🚂' },
				{ id: 'obj2', name: 'Airplane', color: 'Blue', emoji: '✈️' },
				{ id: 'obj3', name: 'Bus', color: 'Yellow', emoji: '🚌' },
			],
			colors: ['Red', 'Blue', 'Yellow'],
		},
		order: 2,
	},
	{
		id: 'mission_w11_3',
		chapterId: 'world_11_chapter_3',
		worldId: 'world_11',
		title: 'Directions',
		description: 'Escucha y elige la dirección correcta',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Left', emoji: '⬅️', options: ['⬅️', '➡️', '⬆️'], correctIndex: 0 },
				{ word: 'Right', emoji: '➡️', options: ['⬅️', '➡️', '⬇️'], correctIndex: 1 },
				{ word: 'Straight', emoji: '⬆️', options: ['⬆️', '⬅️', '➡️'], correctIndex: 0 },
			],
		},
		order: 3,
	},

	// ─── MUNDO 12 - Reino Creador ─────────────────────────────────────────────
	{
		id: 'mission_w12_1',
		chapterId: 'world_12_chapter_1',
		worldId: 'world_12',
		title: 'Hero Colors',
		description: 'Colorea a tu héroe',
		type: 'color_guess',
		config: {
			objects: [
				{ id: 'obj1', name: 'Cape', color: 'Red', emoji: '🦸' },
				{ id: 'obj2', name: 'Shield', color: 'Blue', emoji: '🛡️' },
				{ id: 'obj3', name: 'Star', color: 'Yellow', emoji: '⭐' },
			],
			colors: ['Red', 'Blue', 'Yellow'],
		},
		order: 1,
	},
	{
		id: 'mission_w12_2',
		chapterId: 'world_12_chapter_2',
		worldId: 'world_12',
		title: 'Story Actions',
		description: 'Escucha la acción del cuento',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Save', emoji: '🦸', options: ['🦸', '😴', '🏃'], correctIndex: 0 },
				{ word: 'Fight', emoji: '🥊', options: ['🏃', '🥊', '🤝'], correctIndex: 1 },
				{ word: 'Help', emoji: '🤝', options: ['🤝', '🥊', '🦸'], correctIndex: 0 },
			],
		},
		order: 2,
	},
	{
		id: 'mission_w12_3',
		chapterId: 'world_12_chapter_3',
		worldId: 'world_12',
		title: 'Create Your Story',
		description: 'Escucha y elige los personajes',
		type: 'listen_choose',
		config: {
			rounds: [
				{ word: 'Dragon', emoji: '🐉', options: ['🐉', '🧙', '🧚'], correctIndex: 0 },
				{ word: 'Wizard', emoji: '🧙', options: ['🐉', '🧙', '🧜'], correctIndex: 1 },
				{ word: 'Fairy', emoji: '🧚', options: ['🧚', '🐉', '🧙'], correctIndex: 0 },
			],
		},
		order: 3,
	},
];

export const getMissionsForWorld = (worldId: string): Mission[] =>
	MISSIONS.filter((m) => m.worldId === worldId).sort((a, b) => a.order - b.order);

export const getMissionsForChapter = (chapterId: string): Mission[] =>
	MISSIONS.filter((m) => m.chapterId === chapterId).sort((a, b) => a.order - b.order);

export const getMissionById = (missionId: string): Mission | undefined =>
	MISSIONS.find((m) => m.id === missionId);
