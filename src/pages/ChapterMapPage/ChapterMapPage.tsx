import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { useProgressAdaptedContent } from '../../features/child/hooks/useProgressAdaptedContent';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { DialogueBox } from '../../shared/ui/DialogueBox/DialogueBox';
import { getNarrativeForChapter } from '../../shared/data/narrative';
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

type SequencePhase = 'idle' | 'walk' | 'celebrate' | 'dialogue' | 'done';

const ChapterMapPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { worldId } = useParams<{ worldId: string }>();
	const { getChaptersWithProgress, getLevelsWithProgress } = useProgressAdaptedContent();

	const state = location.state as { justCompletedLevel?: string; fromChapterId?: string } | undefined;
	const justCompletedLevel = state?.justCompletedLevel;
	const fromChapterId = state?.fromChapterId;

	const [currentChapterNumber, setCurrentChapterNumber] = useState(1);

	const [sequencePhase, setSequencePhase] = useState<SequencePhase>('idle');
	const [avatarPos, setAvatarPos] = useState<{ x: number; y: number } | null>(null);
	const [showDialogue, setShowDialogue] = useState(false);
	const [dialogueNarrative, setDialogueNarrative] = useState<{
		characterName: string;
		text: string;
		audioUrl: string;
	} | null>(null);
	const hasRunSequence = useRef(false);

	// Sincronizar capítulo mostrado cuando llegamos tras completar un nivel
	useEffect(() => {
		if (!fromChapterId || !worldId) return;
		const chs = getChaptersWithProgress(worldId);
		if (chs.length === 0) return;
		const idx = chs.findIndex((c) => c.id === fromChapterId);
		if (idx >= 0) setCurrentChapterNumber(idx + 1);
	}, [worldId, fromChapterId, getChaptersWithProgress]);

	// Secuencia: walk → celebrate → DialogueBox
	useEffect(() => {
		if (!worldId || !justCompletedLevel || !fromChapterId || hasRunSequence.current) return;
		const chs = getChaptersWithProgress(worldId);
		const ch = chs.find((c) => c.id === fromChapterId);
		if (!ch) return;
		const lvls = getLevelsWithProgress(ch.id);
		const completedIdx = lvls.findIndex((l) => l.id === justCompletedLevel);
		if (completedIdx < 0) return;

		hasRunSequence.current = true;
		const origPos = STANDARD_LEVEL_POSITIONS[completedIdx];
		const destIdx = Math.min(completedIdx + 1, lvls.length - 1);
		const destPos = STANDARD_LEVEL_POSITIONS[destIdx];
		const targetChapterId = completedIdx + 1 < lvls.length ? ch.id : chs[chs.findIndex((c) => c.id === ch.id) + 1]?.id || ch.id;

		// Fase 1: walk
		setAvatarPos({ x: origPos.x, y: origPos.y });
		setSequencePhase('walk');
		setCurrentChapterNumber(chs.findIndex((c) => c.id === ch.id) + 1);

		const t1 = setTimeout(() => {
			setAvatarPos({ x: destPos.x, y: destPos.y });
		}, 100);

		const t2 = setTimeout(() => {
			setSequencePhase('celebrate');
		}, 1600);

		const t3 = setTimeout(() => {
			setSequencePhase('dialogue');
			const narrative = getNarrativeForChapter(worldId, targetChapterId);
			if (narrative) {
				setDialogueNarrative({
					characterName: narrative.characterName,
					text: narrative.dialogueEs ?? narrative.dialogueEn,
					audioUrl: narrative.audioUrl,
				});
				setShowDialogue(true);
			} else {
				setSequencePhase('done');
				setAvatarPos(null);
				navigate(`/chapters/${worldId}`, { replace: true, state: {} });
			}
		}, 2400);

		const cleanup = () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};

		return cleanup;
	}, [worldId, justCompletedLevel, fromChapterId, getChaptersWithProgress, getLevelsWithProgress]);

	const handleDialogueClose = () => {
		setShowDialogue(false);
		setDialogueNarrative(null);
		setSequencePhase('done');
		setAvatarPos(null);
		if (worldId) navigate(`/chapters/${worldId}`, { replace: true, state: {} });
	};

	if (!worldId) {
		return <div className={styles.page}>Mundo no encontrado</div>;
	}

	const chapters = getChaptersWithProgress(worldId);
	const chapter = chapters[currentChapterNumber - 1];
	if (chapters.length === 0) {
		return <div className={styles.page}>Capítulos no encontrados</div>;
	}
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
				<button
					className={styles.missionsButton}
					onClick={() => navigate(`/missions/${worldId}`)}
					aria-label="Ver misiones"
				>
					Misiones
				</button>
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

				{avatarPos && (
					<motion.div
						className={styles.avatarOnMap}
						initial={false}
						animate={{
							left: `${avatarPos.x}%`,
							top: `${avatarPos.y}%`,
						}}
						transition={{ duration: sequencePhase === 'walk' ? 1.5 : 0 }}
					>
						<ChibiAvatar
							size="sm"
							animationMode={sequencePhase === 'walk' ? 'walk' : sequencePhase === 'celebrate' ? 'celebrate' : 'idle'}
							mouthState={sequencePhase === 'celebrate' || sequencePhase === 'dialogue' ? 'smile' : 'neutral'}
						/>
					</motion.div>
				)}
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
									<div className={styles.tooltipName}>{level.title}</div>
									{level.locked && <div className={styles.lockedText}>Bloqueado</div>}
									{level.completed && <div className={styles.completedText}>✓ Completado</div>}
								</div>
							</article>
						);
					})}
				</div>
			</div>

			<AnimatePresence>
				{showDialogue && dialogueNarrative && (
					<motion.div
						className={styles.dialogueOverlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<DialogueBox
							characterName={dialogueNarrative.characterName}
							text={dialogueNarrative.text}
							audioUrl={dialogueNarrative.audioUrl}
							onClose={handleDialogueClose}
							autoCloseDelayMs={5000}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
		</>
	);
};

export default ChapterMapPage;
