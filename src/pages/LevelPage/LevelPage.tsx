import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { getLevelById, getChapterById, getWorldById } from '../../shared/data/worlds';
import { useUnlockLogic } from '../../features/progress/hooks/useUnlockLogic';
import { AwakeningLevel } from './AwakeningLevel';
import styles from './LevelPage.module.css';

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

	// Placeholder for other levels
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
						<div className={styles.activityPlaceholder}>
							<p>Próximamente: Nivel {level.number}</p>
						</div>
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
