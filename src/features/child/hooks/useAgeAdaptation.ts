import { useChild } from '../context/ChildContext';

/**
 * Hook personalizado para acceder a las configuraciones adaptadas por edad
 * Retorna las propiedades de UI/UX que deben variar según la edad del niño
 */
export const useAgeAdaptation = () => {
	const { ageGroup, contentPreferences } = useChild();

	if (!ageGroup || !contentPreferences) {
		return {
			fontSize: 1,
			animationSpeed: 1,
			hintLevel: 'medium' as const,
			wordCount: 5,
			difficulty: 'intermediate' as const,
			sessionLimit: 20,
			dailyLimit: 60,
			soundEnabled: true,
		};
	}

	// Convertir string animationSpeed a número
	const speedMap: Record<'slow' | 'normal' | 'fast', number> = {
		slow: 0.8,
		normal: 1,
		fast: 1.2,
	};

	return {
		fontSize: ageGroup.fontSize,
		animationSpeed: speedMap[ageGroup.animationSpeed],
		hintLevel: ageGroup.hintLevel,
		wordCount: ageGroup.wordsPerLesson,
		difficulty: ageGroup.difficulty,
		sessionLimit: ageGroup.sessionLimit,
		dailyLimit: ageGroup.dailyLimit,
		soundEnabled: contentPreferences.soundEnabled ?? true,
	};
};

/**
 * Hook para calcular estilos CSS basados en la edad
 */
export const useAgeStyles = () => {
	const { fontSize, animationSpeed, soundEnabled } = useAgeAdaptation();

	return {
		fontSize: `${1 + (fontSize - 1) * 0.25}rem`,
		transitionDuration: `${1 / animationSpeed}s`,
		animationPlayState: soundEnabled ? 'running' : 'paused',
	};
};
