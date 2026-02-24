import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { getMissionById } from '../../shared/data/missions';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import styles from './MissionPage.module.css';

type GameObject = {
	id: string;
	name: string;
	color: string;
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
	const { completeMission, isMissionCompleted } = useProgressStore();

	const mission = missionId ? getMissionById(missionId) : undefined;

	const [gameState, setGameState] = useState<GameState>('intro');
	const [objects, setObjects] = useState<GameObject[]>([]);
	const [targetColorIndex, setTargetColorIndex] = useState(0);

	const colors = useMemo(() => mission?.config?.colors ?? ['Red', 'Blue', 'Yellow'], [mission]);
	const gameObjects = useMemo(
		() => mission?.config?.objects ?? [
			{ id: 'obj1', name: 'Ball', color: 'Red' },
			{ id: 'obj2', name: 'Car', color: 'Blue' },
			{ id: 'obj3', name: 'Duck', color: 'Yellow' },
		],
		[mission]
	);
	const currentTargetColor = useMemo(() => colors[targetColorIndex], [colors, targetColorIndex]);

	// Inicializar objetos cuando cambia la misión
	useEffect(() => {
		setObjects(gameObjects.map((obj) => ({ ...obj, isColored: false })));
		setTargetColorIndex(0);
		setGameState('intro');
	}, [missionId, gameObjects]);

	// Intro audio
	useEffect(() => {
		const introAudio = new Audio('/assets/audio/voices/audioRoomIntro.mp3');
		introAudio.play().catch(() => {});
		const timer = setTimeout(() => setGameState('playing'), 2500);
		return () => {
			clearTimeout(timer);
			introAudio.pause();
		};
	}, [missionId]);

	// Color prompt audio
	useEffect(() => {
		if (gameState === 'playing' && currentTargetColor) {
			const audio = new Audio(`/assets/audio/voices/colors/${currentTargetColor.toLowerCase()}.mp3`);
			audio.play().catch(() => {});
		}
	}, [gameState, currentTargetColor]);

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
				setTimeout(() => {
					new Audio('/assets/audio/sfx/victory.mp3').play().catch(() => {});
				}, 500);
			} else {
				setTargetColorIndex((i) => i + 1);
			}
		} else {
			new Audio('/assets/audio/sfx/wrong.mp3').play().catch(() => {});
		}
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
					<p>Misión no encontrada</p>
					<button className={styles.mapButton} onClick={() => navigate('/worlds')}>
						Volver
					</button>
				</div>
			</div>
		);
	}

	if (mission.type !== 'color_guess') {
		return (
			<div className={styles.pageContainer}>
				<div className={styles.missionContent}>
					<p>Tipo de misión «{mission.type}» aún no implementado</p>
					<button className={styles.mapButton} onClick={() => navigate(`/missions/${mission.worldId}`)}>
						Volver
					</button>
				</div>
			</div>
		);
	}

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
							whileHover={{ scale: gameState === 'playing' && !obj.isColored ? 1.1 : 1 }}
							onClick={() => handleObjectClick(obj)}
						>
							<div
								className={`${styles.object} ${styles[`object${obj.color}`] || styles.objectRed}`}
								style={{ filter: obj.isColored ? 'grayscale(0%)' : 'grayscale(100%)' }}
							/>
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
						<h2>Well Done!</h2>
						<button className={styles.mapButton} onClick={handleBackToMap}>
							Back to Map
						</button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default MissionPage;
