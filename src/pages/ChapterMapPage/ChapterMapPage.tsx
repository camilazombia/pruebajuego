import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { useProgressAdaptedContent } from '../../features/child/hooks/useProgressAdaptedContent';
import styles from './ChapterMapPage.module.css';

type LevelPosition = {
	levelId: string;
	x: number;
	y: number;
};

// Posiciones estándar para los 6 niveles de cualquier capítulo
const STANDARD_LEVEL_POSITIONS: LevelPosition[] = [
	{ levelId: '', x: 15, y: 60 },
	{ levelId: '', x: 35, y: 40 },
	{ levelId: '', x: 50, y: 20 },
	{ levelId: '', x: 65, y: 40 },
	{ levelId: '', x: 80, y: 60 },
	{ levelId: '', x: 85, y: 75 },
];

const ChapterMapPage: React.FC = () => {
	const navigate = useNavigate();
	const { worldId } = useParams<{ worldId: string }>();
	const [currentChapterNumber, setCurrentChapterNumber] = useState(1);
	const { getChaptersWithProgress, getLevelsWithProgress } = useProgressAdaptedContent();

	if (!worldId) {
		return <div className={styles.page}>Mundo no encontrado</div>;
	}

	const chapters = getChaptersWithProgress(worldId);
	if (chapters.length === 0) {
		return <div className={styles.page}>Capítulos no encontrados</div>;
	}

	const chapter = chapters[currentChapterNumber - 1];
	if (!chapter) {
		return <div className={styles.page}>Capítulo no encontrado</div>;
	}

	const levels = getLevelsWithProgress(chapter.id);
	
	// Mapear los niveles a las posiciones estándar
	const positions = levels.map((level, index) => ({
		levelId: level.id,
		x: STANDARD_LEVEL_POSITIONS[index]?.x || 50,
		y: STANDARD_LEVEL_POSITIONS[index]?.y || 50,
	}));

	const handlePrevChapter = () => {
		if (currentChapterNumber > 1) {
			setCurrentChapterNumber(currentChapterNumber - 1);
		}
	};

	const handleNextChapter = () => {
		if (currentChapterNumber < chapters.length) {
			setCurrentChapterNumber(currentChapterNumber + 1);
		}
	};

	const handleLevelClick = (levelId: string, locked?: boolean) => {
		if (locked) return;
		navigate(`/level/${levelId}`);
	};

	const getLevelPosition = (levelId: string) => {
		return positions.find((p: any) => p.levelId === levelId);
	};

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
			<header className={styles.header}>
				<ArrowButton
					direction="left"
					size={60}
					onClick={handlePrevChapter}
					disabled={currentChapterNumber === 1}
					aria-label="Capítulo anterior"
				/>

				<div className={styles.headerContent}>
					<div className={styles.chapterNumber}>Capítulo {chapter.number}</div>
					<h1 className={styles.chapterName}>{chapter.title}</h1>
				</div>

				<ArrowButton
					direction="right"
					size={60}
					onClick={handleNextChapter}
					disabled={currentChapterNumber === chapters.length}
					aria-label="Capítulo siguiente"
				/>
			</header>

			<div className={styles.mapContainer}>
				<svg className={styles.connectionPath} viewBox="0 0 100 100" preserveAspectRatio="none">
					{levels.length > 1 &&
						levels.map((level, i) => {
							if (i === levels.length - 1) return null;
							const pos1 = getLevelPosition(level.id);
							const pos2 = getLevelPosition(levels[i + 1].id);
							if (!pos1 || !pos2) return null;

							// Determinar si la línea debe ser punteada o sólida
							const isCompleted = level.completed;

							return (
								<path
									key={`path-${level.id}`}
									d={`M ${pos1.x} ${pos1.y} Q ${(pos1.x + pos2.x) / 2} ${(pos1.y + pos2.y) / 2 - 10} ${pos2.x} ${pos2.y}`}
									className={isCompleted ? styles.pathLineFilled : styles.pathLineDashed}
								/>
							);
						})}
				</svg>

				<div className={styles.mapContent}>
					{levels.map((level) => {
						const position = getLevelPosition(level.id);
						if (!position) return null;

						return (
							<article
								key={level.id}
								className={`${styles.levelMarker} ${level.completed ? styles.completed : ''} ${
									level.locked ? styles.locked : ''
								}`}
								data-x={position.x}
								data-y={position.y}
								onClick={() => handleLevelClick(level.id, level.locked)}
								role="button"
								tabIndex={level.locked ? -1 : 0}
							>
								<div className={styles.levelPin}>
									{level.locked ? (
										<div className={styles.lockIcon}>🔒</div>
									) : (
										<div className={styles.levelNumber}>{level.number}</div>
									)}
								</div>

								<div className={styles.starsContainer}>
									{Array.from({ length: 3 }).map((_, i) => (
										<span key={i} className={`${styles.star} ${i < level.stars ? styles.filled : styles.empty}`}>
											★
										</span>
									))}
								</div>

								<div className={styles.tooltip}>
									<div className={styles.tooltipName}>{level.name}</div>
									{level.locked && <div className={styles.lockedText}>Bloqueado</div>}
									{level.completed && <div className={styles.completedText}>✓ Completado</div>}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</div>
		</>
	);
};

export default ChapterMapPage;
