import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { getMissionsForWorld } from '../../shared/data/missions';
import { getWorldById } from '../../shared/data/worlds';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { useAvatar } from '../../app/providers/AvatarProvider';
import { DialogueBox } from '../../shared/ui/DialogueBox/DialogueBox';
import { getNarrativeForMission } from '../../shared/data/narrative';
import styles from './MissionsMapPage.module.css';

const MISSION_POSITIONS = [
	{ x: 20, y: 30 },
	{ x: 50, y: 25 },
	{ x: 80, y: 40 },
	{ x: 25, y: 45 },
	{ x: 50, y: 50 },
	{ x: 75, y: 35 },
];

type SequencePhase = 'idle' | 'walk' | 'celebrate' | 'dialogue' | 'done';

const MissionsMapPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { worldId } = useParams<{ worldId: string }>();
	const { avatarState } = useAvatar();
	const { isChapterUnlocked, isMissionCompleted } = useProgressStore();

	const state = location.state as { justCompletedMission?: string } | undefined;
	const justCompletedMission = state?.justCompletedMission;

	const [sequencePhase, setSequencePhase] = useState<SequencePhase>('idle');
	const [avatarPos, setAvatarPos] = useState<{ x: number; y: number } | null>(null);
	const [showDialogue, setShowDialogue] = useState(false);
	const [dialogueNarrative, setDialogueNarrative] = useState<{
		characterName: string;
		text: string;
		audioUrl: string;
	} | null>(null);
	const hasRunSequence = useRef(false);

	// Secuencia: walk → celebrate → DialogueBox (si hay narrativa)
	useEffect(() => {
		if (!worldId || !justCompletedMission || hasRunSequence.current) return;
		const missions = getMissionsForWorld(worldId);
		const completedIdx = missions.findIndex((m) => m.id === justCompletedMission);
		if (completedIdx < 0) return;

		hasRunSequence.current = true;
		const origPos = MISSION_POSITIONS[completedIdx % MISSION_POSITIONS.length];
		const nextUnlockedIdx = missions.findIndex((m, i) => i > completedIdx && isChapterUnlocked(m.chapterId));
		const destIdx = nextUnlockedIdx >= 0 ? nextUnlockedIdx : completedIdx;
		const destPos = MISSION_POSITIONS[destIdx % MISSION_POSITIONS.length];

		setAvatarPos({ x: origPos.x, y: origPos.y });
		setSequencePhase('walk');

		const t1 = setTimeout(() => setAvatarPos({ x: destPos.x, y: destPos.y }), 100);
		const t2 = setTimeout(() => setSequencePhase('celebrate'), 1600);
		const t3 = setTimeout(() => {
			setSequencePhase('dialogue');
			const narrative = getNarrativeForMission(justCompletedMission, worldId);
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
				navigate(`/missions/${worldId}`, { replace: true, state: {} });
			}
		}, 2400);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, [worldId, justCompletedMission, isChapterUnlocked, navigate]);

	const handleDialogueClose = () => {
		setShowDialogue(false);
		setDialogueNarrative(null);
		setSequencePhase('done');
		setAvatarPos(null);
		if (worldId) navigate(`/missions/${worldId}`, { replace: true, state: {} });
	};

	if (!worldId) {
		return <div className={styles.page}>Mundo no encontrado</div>;
	}

	const world = getWorldById(worldId);
	const missions = getMissionsForWorld(worldId);

	if (!world) {
		return <div className={styles.page}>Mundo no encontrado</div>;
	}

	const handleMissionClick = (missionId: string, locked: boolean) => {
		if (locked) return;
		navigate(`/mission/${missionId}`);
	};

	const handleBackToChapters = () => {
		navigate(`/chapters/${worldId}`);
	};

	// Clase para fondo por mundo (world-w1, world-w2, etc.)
	const worldClass = `world-w${world.number}`;

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<header className={styles.header}>
					<button className={styles.backButton} onClick={handleBackToChapters} aria-label="Volver a capítulos">
						← Volver
					</button>
					<h1 className={styles.title}>Misiones — {world.title}</h1>
				</header>

				<div className={`${styles.mapContainer} ${worldClass}`}>
					<div className={styles.mapBackground} aria-hidden="true" />
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
								skinId={avatarState.skin}
								hairId={avatarState.hair}
								eyesId={avatarState.eyes}
								eyebrowsId={avatarState.eyebrows}
								mouthId={avatarState.mouth}
								glassesId={avatarState.glasses}
								specialId={avatarState.special}
							/>
						</motion.div>
					)}
					<div className={styles.mapContent}>
						{missions.length === 0 ? (
							<div className={styles.emptyState}>
								<p>No hay misiones disponibles en este mundo aún.</p>
								<button className={styles.backButton} onClick={handleBackToChapters}>
									Volver a capítulos
								</button>
							</div>
						) : (
							missions.map((mission, index) => {
								const pos = MISSION_POSITIONS[index % MISSION_POSITIONS.length];
								const chapterUnlocked = isChapterUnlocked(mission.chapterId);
								const completed = isMissionCompleted(mission.id);
								const locked = !chapterUnlocked;

								return (
									<article
										key={mission.id}
										className={`${styles.missionMarker} ${completed ? styles.completed : ''} ${locked ? styles.locked : ''}`}
										data-x={pos.x}
										data-y={pos.y}
										onClick={() => handleMissionClick(mission.id, locked)}
										role="button"
										tabIndex={locked ? -1 : 0}
										onKeyDown={(e) => {
											if ((e.key === 'Enter' || e.key === ' ') && !locked) {
												handleMissionClick(mission.id, locked);
											}
										}}
									>
										<div className={styles.markerPulse} aria-hidden="true" />
										<div className={styles.markerPin}>
											{locked ? (
												<span className={styles.missionNumber}>🔒</span>
											) : completed ? (
												<span className={styles.missionNumber}>✓</span>
											) : (
												<span className={styles.missionNumber}>{index + 1}</span>
											)}
										</div>
										<div className={styles.tooltip}>
											<div className={styles.tooltipName}>{mission.title}</div>
											{mission.description && (
												<div className={styles.tooltipDescription}>{mission.description}</div>
											)}
											{completed && <div className={styles.tooltipBadge}>Completada</div>}
											{locked && <div className={styles.tooltipLocked}>Desbloquea el capítulo primero</div>}
										</div>
									</article>
								);
							})
						)}
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

export default MissionsMapPage;
