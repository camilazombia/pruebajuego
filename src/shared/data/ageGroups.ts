/**
 * Configuración de contenido por grupo de edad
 * Permite adaptar la dificultad, velocidad y tipo de contenido según la edad del niño
 */

export type AgeGroup = {
	id: string;
	label: string;
	minAge: number;
	maxAge: number;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	wordsPerLesson: number;
	lessonDuration: number; // en minutos
	repetitions: number; // repeticiones antes de pasar
	fontSize: number; // tamaño de fuente relativo
	animationSpeed: 'slow' | 'normal' | 'fast';
	soundEnabled: boolean;
	hintLevel: 'high' | 'medium' | 'low';
	dailyLimit: number; // minutos
	sessionLimit: number; // minutos por sesión
	rewardFrequency: 'high' | 'medium' | 'low';
	description: string;
	emoji: string;
};

export const AGE_GROUPS: AgeGroup[] = [
	{
		id: 'age-3-6',
		label: '3–6 años',
		minAge: 3,
		maxAge: 6,
		difficulty: 'beginner',
		wordsPerLesson: 3,
		lessonDuration: 5,
		repetitions: 4,
		fontSize: 1.2,
		animationSpeed: 'slow',
		soundEnabled: true,
		hintLevel: 'high',
		dailyLimit: 30,
		sessionLimit: 10,
		rewardFrequency: 'high',
		description: 'Contenido básico con animaciones lentas y muchas pistas visuales',
		emoji: '🎈',
	},
	{
		id: 'age-7-10',
		label: '7–10 años',
		minAge: 7,
		maxAge: 10,
		difficulty: 'intermediate',
		wordsPerLesson: 5,
		lessonDuration: 10,
		repetitions: 3,
		fontSize: 1,
		animationSpeed: 'normal',
		soundEnabled: true,
		hintLevel: 'medium',
		dailyLimit: 60,
		sessionLimit: 20,
		rewardFrequency: 'medium',
		description: 'Contenido intermedio con desafíos balanceados',
		emoji: '⭐',
	},
	{
		id: 'age-11-plus',
		label: '11+ años',
		minAge: 11,
		maxAge: 99,
		difficulty: 'advanced',
		wordsPerLesson: 8,
		lessonDuration: 15,
		repetitions: 2,
		fontSize: 0.95,
		animationSpeed: 'fast',
		soundEnabled: true,
		hintLevel: 'low',
		dailyLimit: 120,
		sessionLimit: 30,
		rewardFrequency: 'low',
		description: 'Contenido avanzado con pocas pistas y desafíos más complejos',
		emoji: '🚀',
	},
];

export const getAgeGroupByAge = (age: number): AgeGroup => {
	return (
		AGE_GROUPS.find((group) => age >= group.minAge && age <= group.maxAge) ||
		AGE_GROUPS[0]
	);
};

export const getAgeGroupById = (id: string): AgeGroup | undefined => {
	return AGE_GROUPS.find((group) => group.id === id);
};

export const getAgeGroupByRange = (range: string): AgeGroup | undefined => {
	if (range === '3-6') return AGE_GROUPS[0];
	if (range === '7-10') return AGE_GROUPS[1];
	if (range === '11+') return AGE_GROUPS[2];
	return undefined;
};

/**
 * Interfaz para almacenar preferencias de contenido según edad
 */
export type ContentPreferences = {
	ageGroupId: string;
	ageRange: string;
	childAge?: number;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	wordCount: number;
	hintLevel: 'high' | 'medium' | 'low';
	soundEnabled: boolean;
};

export const createDefaultContentPreferences = (
	ageRange: string
): ContentPreferences => {
	const ageGroup = getAgeGroupByRange(ageRange);
	if (!ageGroup)
		return {
			ageGroupId: AGE_GROUPS[1].id,
			ageRange: '7-10',
			difficulty: 'intermediate',
			wordCount: 5,
			hintLevel: 'medium',
			soundEnabled: true,
		};

	return {
		ageGroupId: ageGroup.id,
		ageRange,
		difficulty: ageGroup.difficulty,
		wordCount: ageGroup.wordsPerLesson,
		hintLevel: ageGroup.hintLevel,
		soundEnabled: ageGroup.soundEnabled,
	};
};
