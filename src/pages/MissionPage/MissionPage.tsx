import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { getMissionById, type ListenRound } from '../../shared/data/missions';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { useAvatar } from '../../app/providers/AvatarProvider';
import styles from './MissionPage.module.css';

type GameObject = {
	id: string;
	name: string;
	color: string;
	emoji: string;
	isColored: boolean;
};

type GameState = 'intro' | 'playing' | 'finished';

const triggerConfetti = () => {
	const duration = 2 * 1000;
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
	const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
	const interval = window.setInterval(() => {
		const timeLeft = animationEnd - Date.now();
		if (timeLeft <= 0) return clearInterval(interval);
		const particleCount = 50 * (timeLeft / duration);
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
	}, 250);
};

export const MissionPage: React.FC = () => {
	const navigate = useNavigate();
	const { missionId } = useParams<{ missionId: string }>();
	const { avatarState } = useAvatar();
	const { completeMission, isMissionCompleted } = useProgressStore();

	const mission = missionId ? getMissionById(missionId) : undefined;

	// ── color_guess state ────────────────────────────────────────────────────
	const [gameState, setGameState] = useState<GameState>('intro');
	const [objects, setObjects] = useState<GameObject[]>([]);
	const [targetColorIndex, setTargetColorIndex] = useState(0);

	// ── listen_choose state ──────────────────────────────────────────────────
	const [roundIndex, setRoundIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [correctCount, setCorrectCount] = useState(0);
	const [showFeedback, setShowFeedback] = useState(false);

	const colors = useMemo(() => mission?.config?.colors ?? ['Red', 'Blue', 'Yellow'], [mission]);
	const gameObjects = useMemo(
		() => (mission?.config?.objects ?? [
			{ id: 'obj1', name: 'Ball', color: 'Red', emoji: '🔴' },
			{ id: 'obj2', name: 'Car', color: 'Blue', emoji: '🔵' },
			{ id: 'obj3', name: 'Duck', color: 'Yellow', emoji: '🟡' },
		]),
		[mission]
	);
	const rounds: ListenRound[] = useMemo(() => mission?.config?.rounds ?? [], [mission]);
	const currentTargetColor = useMemo(() => colors[targetColorIndex], [colors, targetColorIndex]);
	const currentRound = useMemo(() => rounds[roundIndex], [rounds, roundIndex]);

	// Init color_guess
	useEffect(() => {
		if (mission?.type !== 'color_guess') return;
		setObjects(gameObjects.map((obj) => ({ ...obj, isColored: false })));
		setTargetColorIndex(0);
		setGameState('intro');
	}, [missionId, gameObjects, mission?.type]);

	// Init listen_choose
	useEffect(() => {
		if (mission?.type !== 'listen_choose') return;
		setRoundIndex(0);
		setSelectedOption(null);
		setCorrectCount(0);
		setShowFeedback(false);
		setGameState('intro');
	}, [missionId, mission?.type]);

	// Intro → playing
	useEffect(() => {
		const introAudio = new Audio('/assets/audio/voices/audioRoomIntro.mp3');
		introAudio.play().catch(() => {});
		const timer = setTimeout(() => setGameState('playing'), 2200);
		return () => {
			clearTimeout(timer);
			introAudio.pause();
		};
	}, [missionId]);

	// Play color audio for color_guess
	useEffect(() => {
		if (mission?.type !== 'color_guess') return;
		if (gameState === 'playing' && currentTargetColor) {
			const audio = new Audio(`/assets/audio/voices/colors/${currentTargetColor.toLowerCase()}.mp3`);
			audio.play().catch(() => {});
		}
	}, [gameState, currentTargetColor, mission?.type]);

	// Play word audio for listen_choose
	const playWordAudio = useCallback((word: string) => {
		const audio = new Audio(`/assets/audio/voices/words/${word.toLowerCase()}.mp3`);
		audio.play().catch(() => {});
	}, []);

	useEffect(() => {
		if (mission?.type !== 'listen_choose') return;
		if (gameState === 'playing' && currentRound) {
			const timer = setTimeout(() => playWordAudio(currentRound.word), 400);
			return () => clearTimeout(timer);
		}
	}, [gameState, currentRound, mission?.type, playWordAudio]);

	const handleObjectClick = (clickedObject: GameObject) => {
		if (gameState !== 'playing' || clickedObject.isColored) return;

		if (clickedObject.color === currentTargetColor) {
			setObjects((prev) =>
				prev.map((obj) => (obj.id === clickedObject.id ? { ...obj, isColored: true } : obj))
			);
			new Audio('/assets/audio/sfx/success.mp3').play().catch(() => {});

			if (targetColorIndex === colors.length - 1) {
				setGameState('finished');
				triggerConfetti();
				setTimeout(() => new Audio('/assets/audio/sfx/victory.mp3').play().catch(() => {}), 500);
			} else {
				setTargetColorIndex((i) => i + 1);
			}
		} else {
			new Audio('/assets/audio/sfx/wrong.mp3').play().catch(() => {});
		}
	};

	const handleOptionClick = (optionIdx: number) => {
		if (selectedOption !== null || !currentRound) return;
		setSelectedOption(optionIdx);
		setShowFeedback(true);
		const isCorrect = optionIdx === currentRound.correctIndex;
		if (isCorrect) {
			new Audio('/assets/audio/sfx/success.mp3').play().catch(() => {});
			setCorrectCount((c) => c + 1);
		} else {
			new Audio('/assets/audio/sfx/wrong.mp3').play().catch(() => {});
		}

		setTimeout(() => {
			setShowFeedback(false);
			setSelectedOption(null);
			if (roundIndex + 1 >= rounds.length) {
				setGameState('finished');
				triggerConfetti();
				setTimeout(() => new Audio('/assets/audio/sfx/victory.mp3').play().catch(() => {}), 500);
			} else {
				setRoundIndex((r) => r + 1);
			}
		}, 1200);
	};

	const handleBackToMap = () => {
		if (missionId && !isMissionCompleted(missionId)) {
			completeMission(missionId);
		}
		navigate(mission ? `/missions/${mission.worldId}` : '/worlds', {
			state: missionId ? { justCompletedMission: missionId } : undefined,
		});
	};

	if (!missionId || !mission) {
		return (
			<div className={styles.pageContainer}>
				<div className={styles.missionContent}>
					<p style={{ color: '#fff', fontSize: '1.2rem' }}>Misión no encontrada 😅</p>
					<button className={styles.mapButton} onClick={() => navigate('/worlds')}>
						Volver al inicio
					</button>
				</div>
			</div>
		);
	}

	// ── RENDER: listen_choose ────────────────────────────────────────────────
	if (mission.type === 'listen_choose') {
		return (
			<motion.div
				className={styles.pageContainer}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<div className={styles.missionContent}>
					{/* Avatar */}
					<div className={styles.characterArea}>
						<ChibiAvatar
							eyeState={gameState === 'intro' ? 'closed' : 'open'}
							mouthState={gameState === 'finished' ? 'smile' : 'neutral'}
							skinId={avatarState.skin}
							hairId={avatarState.hair}
							eyesId={avatarState.eyes}
							eyebrowsId={avatarState.eyebrows}
							mouthId={avatarState.mouth}
							glassesId={avatarState.glasses}
							specialId={avatarState.special}
							size="sm"
						/>
					</div>

					<AnimatePresence mode="wait">
						{gameState === 'intro' && (
							<motion.div
								key="intro"
								className={styles.listenIntro}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
							>
								<span className={styles.listenIntroIcon}>👂</span>
								<p>¡Escucha y toca la imagen correcta!</p>
								<p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Listen and tap the right picture!</p>
							</motion.div>
						)}

						{gameState === 'playing' && currentRound && (
							<motion.div
								key={`round-${roundIndex}`}
								className={styles.listenGame}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
							>
								{/* Progress dots */}
								<div className={styles.roundDots}>
									{rounds.map((_, i) => (
										<div
											key={i}
											className={`${styles.roundDot} ${i < roundIndex ? styles.roundDotDone : ''} ${i === roundIndex ? styles.roundDotActive : ''}`}
										/>
									))}
								</div>

								{/* Word to find */}
								<div className={styles.listenWordBox}>
									<p className={styles.listenLabel}>¿Cuál es...?</p>
									<h2 className={styles.listenWord}>{currentRound.word}</h2>
									<button
										className={styles.repeatBtn}
										onClick={() => playWordAudio(currentRound.word)}
										aria-label="Repetir palabra"
									>
										🔊 Escuchar
									</button>
								</div>

								{/* Options */}
								<div className={styles.optionsGrid}>
									{currentRound.options.map((emoji, idx) => {
										const isSelected = selectedOption === idx;
										const isCorrect = idx === currentRound.correctIndex;
										let optClass = styles.optionBtn;
										if (showFeedback && isSelected) {
											optClass += isCorrect ? ` ${styles.optionCorrect}` : ` ${styles.optionWrong}`;
										} else if (showFeedback && isCorrect) {
											optClass += ` ${styles.optionCorrect}`;
										}
										return (
											<motion.button
												key={idx}
												className={optClass}
												onClick={() => handleOptionClick(idx)}
												disabled={selectedOption !== null}
												whileTap={{ scale: 0.92 }}
												whileHover={{ scale: selectedOption === null ? 1.08 : 1 }}
											>
												{emoji}
											</motion.button>
										);
									})}
								</div>

								{/* Feedback */}
								<AnimatePresence>
									{showFeedback && (
										<motion.div
											className={`${styles.feedbackMsg} ${selectedOption === currentRound.correctIndex ? styles.feedbackOk : styles.feedbackBad}`}
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0, opacity: 0 }}
										>
											{selectedOption === currentRound.correctIndex ? '🌟 ¡Correcto!' : '💪 ¡Casi! Intenta de nuevo'}
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						)}

						{gameState === 'finished' && (
							<motion.div
								key="done"
								className={styles.completionContainer}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5, type: 'spring' }}
							>
								<div className={styles.finishedEmoji}>🏆</div>
								<h2>¡Misión cumplida!</h2>
								<p className={styles.scoreText}>{correctCount} / {rounds.length} correctas</p>
								<button className={styles.mapButton} onClick={handleBackToMap}>
									Volver al mapa
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		);
	}

	// ── RENDER: color_guess ──────────────────────────────────────────────────
	return (
		<motion.div
			className={styles.pageContainer}
			initial={{ filter: 'grayscale(100%)' }}
			animate={{ filter: gameState === 'finished' ? 'grayscale(0%)' : 'grayscale(100%)' }}
			transition={{ duration: 1.5, ease: 'easeInOut' }}
		>
			<div className={styles.missionContent}>
				<div className={styles.characterArea}>
					<ChibiAvatar
						eyeState={gameState === 'intro' ? 'closed' : 'open'}
						mouthState={gameState === 'finished' ? 'smile' : 'neutral'}
						skinId={avatarState.skin}
						hairId={avatarState.hair}
						eyesId={avatarState.eyes}
						eyebrowsId={avatarState.eyebrows}
						mouthId={avatarState.mouth}
						glassesId={avatarState.glasses}
						specialId={avatarState.special}
						size="md"
					/>
					{gameState === 'playing' && (
						<div className={styles.speechBubble}>
							Find the color: <strong>{currentTargetColor}</strong>
						</div>
					)}
				</div>

				<div className={styles.objectsArea}>
					{objects.map((obj) => (
						<motion.div
							key={obj.id}
							className={styles.objectWrapper}
							whileHover={{ scale: gameState === 'playing' && !obj.isColored ? 1.12 : 1 }}
							whileTap={{ scale: gameState === 'playing' && !obj.isColored ? 0.95 : 1 }}
							onClick={() => handleObjectClick(obj)}
						>
							<div
								className={`${styles.object} ${styles[`object${obj.color}`] ?? styles.objectRed} ${obj.isColored ? styles.objectColored : styles.objectGray}`}
							>
								<span className={styles.objectEmoji}>{obj.emoji}</span>
							</div>
							<div className={styles.objectName}>{obj.name}</div>
						</motion.div>
					))}
				</div>

				{gameState === 'finished' && (
					<motion.div
						className={styles.completionContainer}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1 }}
					>
						<div className={styles.finishedEmoji}>🎉</div>
						<h2>Well Done! 🌟</h2>
						<button className={styles.mapButton} onClick={handleBackToMap}>
							Volver al mapa
						</button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default MissionPage;
