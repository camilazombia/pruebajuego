export type Level = {
	id: string;
	chapterId: string;
	number: number;
	name: string;
	completed: boolean;
	stars: number; // 0-3
	locked?: boolean;
};

export type Chapter = {
	id: string;
	number: number;
	name: string;
	description?: string;
	levels: Level[];
};

export const CHAPTERS: Chapter[] = [
	{
		id: 'ch1',
		number: 1,
		name: 'The Alphabet & Numbers',
		description: 'Aprende el alfabeto y los números básicos',
		levels: [
			{ id: 'l1-1', chapterId: 'ch1', number: 1, name: 'Letras A-F', completed: true, stars: 3 },
			{ id: 'l1-2', chapterId: 'ch1', number: 2, name: 'Letras G-L', completed: true, stars: 3 },
			{ id: 'l1-3', chapterId: 'ch1', number: 3, name: 'Letras M-R', completed: true, stars: 2 },
			{ id: 'l1-4', chapterId: 'ch1', number: 4, name: 'Letras S-Z', completed: true, stars: 1 },
			{ id: 'l1-5', chapterId: 'ch1', number: 5, name: 'Números 1-10', completed: false, stars: 0 },
			{ id: 'l1-6', chapterId: 'ch1', number: 6, name: 'Números 11-20', completed: false, stars: 0, locked: true },
		],
	},
	{
		id: 'ch2',
		number: 2,
		name: 'Colors & Shapes',
		description: 'Descubre los colores y las formas',
		levels: [
			{ id: 'l2-1', chapterId: 'ch2', number: 1, name: 'Colores Primarios', completed: true, stars: 3 },
			{ id: 'l2-2', chapterId: 'ch2', number: 2, name: 'Colores Secundarios', completed: true, stars: 2 },
			{ id: 'l2-3', chapterId: 'ch2', number: 3, name: 'Formas Básicas', completed: false, stars: 0 },
			{ id: 'l2-4', chapterId: 'ch2', number: 4, name: 'Formas Complejas', completed: false, stars: 0, locked: true },
			{ id: 'l2-5', chapterId: 'ch2', number: 5, name: 'Combinaciones', completed: false, stars: 0, locked: true },
			{ id: 'l2-6', chapterId: 'ch2', number: 6, name: 'Desafío Final', completed: false, stars: 0, locked: true },
		],
	},
	{
		id: 'ch3',
		number: 3,
		name: 'Family & Friends',
		description: 'Conoce la familia y los amigos',
		levels: [
			{ id: 'l3-1', chapterId: 'ch3', number: 1, name: 'Miembros de la Familia', completed: false, stars: 0 },
			{ id: 'l3-2', chapterId: 'ch3', number: 2, name: 'Relaciones', completed: false, stars: 0, locked: true },
			{ id: 'l3-3', chapterId: 'ch3', number: 3, name: 'Amigos', completed: false, stars: 0, locked: true },
			{ id: 'l3-4', chapterId: 'ch3', number: 4, name: 'Presentaciones', completed: false, stars: 0, locked: true },
			{ id: 'l3-5', chapterId: 'ch3', number: 5, name: 'Actividades Juntos', completed: false, stars: 0, locked: true },
			{ id: 'l3-6', chapterId: 'ch3', number: 6, name: 'Proyecto Grupal', completed: false, stars: 0, locked: true },
		],
	},
	{
		id: 'ch4',
		number: 4,
		name: 'Animals & Nature',
		description: 'Explora animales y la naturaleza',
		levels: [
			{ id: 'l4-1', chapterId: 'ch4', number: 1, name: 'Animales Domésticos', completed: false, stars: 0 },
			{ id: 'l4-2', chapterId: 'ch4', number: 2, name: 'Animales Salvajes', completed: false, stars: 0, locked: true },
			{ id: 'l4-3', chapterId: 'ch4', number: 3, name: 'Aves y Insectos', completed: false, stars: 0, locked: true },
			{ id: 'l4-4', chapterId: 'ch4', number: 4, name: 'Plantas', completed: false, stars: 0, locked: true },
			{ id: 'l4-5', chapterId: 'ch4', number: 5, name: 'Hábitats', completed: false, stars: 0, locked: true },
			{ id: 'l4-6', chapterId: 'ch4', number: 6, name: 'Ecosistemas', completed: false, stars: 0, locked: true },
		],
	},
	{
		id: 'ch5',
		number: 5,
		name: 'Food & Drinks',
		description: 'Aprende sobre comidas y bebidas',
		levels: [
			{ id: 'l5-1', chapterId: 'ch5', number: 1, name: 'Frutas', completed: false, stars: 0, locked: true },
			{ id: 'l5-2', chapterId: 'ch5', number: 2, name: 'Verduras', completed: false, stars: 0, locked: true },
			{ id: 'l5-3', chapterId: 'ch5', number: 3, name: 'Proteínas', completed: false, stars: 0, locked: true },
			{ id: 'l5-4', chapterId: 'ch5', number: 4, name: 'Bebidas', completed: false, stars: 0, locked: true },
			{ id: 'l5-5', chapterId: 'ch5', number: 5, name: 'Comidas', completed: false, stars: 0, locked: true },
			{ id: 'l5-6', chapterId: 'ch5', number: 6, name: 'Nutrición', completed: false, stars: 0, locked: true },
		],
	},
	{
		id: 'ch6',
		number: 6,
		name: 'School & Learning',
		description: 'Descubre la escuela y el aprendizaje',
		levels: [
			{ id: 'l6-1', chapterId: 'ch6', number: 1, name: 'Lugares de la Escuela', completed: false, stars: 0, locked: true },
			{ id: 'l6-2', chapterId: 'ch6', number: 2, name: 'Materias', completed: false, stars: 0, locked: true },
			{ id: 'l6-3', chapterId: 'ch6', number: 3, name: 'Útiles Escolares', completed: false, stars: 0, locked: true },
			{ id: 'l6-4', chapterId: 'ch6', number: 4, name: 'Profesores', completed: false, stars: 0, locked: true },
			{ id: 'l6-5', chapterId: 'ch6', number: 5, name: 'Rutina Escolar', completed: false, stars: 0, locked: true },
			{ id: 'l6-6', chapterId: 'ch6', number: 6, name: 'Proyecto Final', completed: false, stars: 0, locked: true },
		],
	},
];

export const getChapterById = (id: string) => CHAPTERS.find((c) => c.id === id);
export const getChapterByNumber = (number: number) => CHAPTERS.find((c) => c.number === number);
export const getLevelById = (id: string) => CHAPTERS.flatMap((c) => c.levels).find((l) => l.id === id);
export const getLevelsForChapter = (chapterId: string) => getChapterById(chapterId)?.levels || [];
