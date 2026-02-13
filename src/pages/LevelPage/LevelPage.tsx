import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { getLevelById, getChapterById, getWorldById } from '../../shared/data/worlds';
import { useUnlockLogic } from '../../features/progress/hooks/useUnlockLogic';
import { AwakeningLevel } from './AwakeningLevel';
import styles from './LevelPage.module.css';
import { DragAndDropWords } from './minigames/DragAndDropWords';
import { MultipleChoice } from './minigames/MultipleChoice';
import { SelectWords } from './minigames/SelectWords';

const LevelPage: React.FC = () => {
	const { levelId } = useParams<{ levelId: string }>();
	const navigate = useNavigate();
	const { handleCompleteLevel } = useUnlockLogic();

	if (!levelId) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}

	const level = getLevelById(levelId);
	if (!level) {
		return <div className={styles.page}>Nivel no encontrado</div>;
	}

	const chapter = getChapterById(level.chapterId);
	if (!chapter) {
		return <div className={styles.page}>Capítulo no encontrado</div>;
	}

	const worldId = chapter.id.split('_')[1].replace('chapter', '').split('_')[0];
	const world = getWorldById(`world_${worldId}`);

	const handleInteractionComplete = () => {
		// Efecto de sonido positivo usando audio existente del proyecto
		try {
			const audio = new Audio('/assets/audio/sfx/orientation/rotate.mp3');
			void audio.play();
		} catch {
			// ignorar errores de reproducción (autoplay bloqueado, etc.)
		}

		if (world) {
			handleCompleteLevel(levelId, chapter.id, world.id);
			navigate(`/chapters/${world.id}`);
		}
	};

	// Check if this is the first level of chapter 1 - Awakening level
	const isAwakeningLevel = levelId === 'world_1_chapter_1_level_1';

	if (isAwakeningLevel) {
		return <AwakeningLevel onInteractionComplete={handleInteractionComplete} />;
	}

	// Mapear algunos niveles de los mundos 1–3 a mini‑juegos frontend sencillos.
	// Esto es una capa de demo y puede ser reemplazada por misiones completas más adelante.
	const dragAndDropLevels = new Set<string>([
		'world_1_chapter_1_level_2',
		'world_1_chapter_2_level_1',
	]);

	const multipleChoiceLevels = new Set<string>([
		'world_2_chapter_1_level_1',
		'world_2_chapter_1_level_2',
	]);

	const selectWordsLevels = new Set<string>([
		'world_3_chapter_1_level_1',
		'world_3_chapter_1_level_2',
	]);

	const dragWords = [
		{ english: 'cat', spanish: 'gato', emoji: '🐱' },
		{ english: 'dog', spanish: 'perro', emoji: '🐶' },
		{ english: 'sun', spanish: 'sol', emoji: '☀️' },
	];

	const cityWords = [
		{ english: 'park', spanish: 'parque', emoji: '🏞️' },
		{ english: 'school', spanish: 'escuela', emoji: '🏫' },
		{ english: 'bus', spanish: 'autobús', emoji: '🚌' },
	];

	const travelWords = [
		{ english: 'train', spanish: 'tren', emoji: '🚆' },
		{ english: 'plane', spanish: 'avión', emoji: '✈️' },
		{ english: 'beach', spanish: 'playa', emoji: '🏖️' },
	];

	// Placeholder / mini‑juegos para otros niveles
	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<header className={styles.header}>
					<button className={styles.backButton} onClick={() => navigate(`/chapters/${world?.id}`)}>
						← Volver
					</button>
					<div>
						<h2 className={styles.chapterName}>{chapter.title}</h2>
						<h1 className={styles.levelTitle}>{level.title}</h1>
					</div>
				</header>

				<div className={styles.content}>
					<section className={styles.activityContainer}>
						{dragAndDropLevels.has(levelId) && (
							<DragAndDropWords words={dragWords} onComplete={handleInteractionComplete} />
						)}
						{multipleChoiceLevels.has(levelId) && (
							<MultipleChoice words={cityWords} onComplete={handleInteractionComplete} />
						)}
						{selectWordsLevels.has(levelId) && (
							<SelectWords words={travelWords} onComplete={handleInteractionComplete} />
						)}
						{!dragAndDropLevels.has(levelId) &&
							!multipleChoiceLevels.has(levelId) &&
							!selectWordsLevels.has(levelId) && (
								<div className={styles.activityPlaceholder}>
									<p>Próximamente: Nivel {level.number}</p>
								</div>
							)}
					</section>
				</div>

				<footer className={styles.footer}>
					<button className={styles.completeButton} onClick={handleInteractionComplete}>
						Continuar
					</button>
				</footer>
			</div>
		</>
	);
};

export default LevelPage;
