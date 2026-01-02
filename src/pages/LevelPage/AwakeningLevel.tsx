import React, { useState, useRef } from 'react';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import styles from './AwakeningLevel.module.css';

interface AwakeningLevelProps {
	onInteractionComplete: () => void;
}

interface Coin {
	id: string;
	x: number;
	y: number;
}

export const AwakeningLevel: React.FC<AwakeningLevelProps> = ({ onInteractionComplete }) => {
	const [interactionCount, setInteractionCount] = useState(0);
	const [showPulse, setShowPulse] = useState(false);
	const [npcReactions, setNpcReactions] = useState({ npc1: false, npc2: false, npc3: false });
	const [coins, setCoins] = useState<Coin[]>([]);
	const [totalCoins, setTotalCoins] = useState(0);
	const [levelComplete, setLevelComplete] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	// Constants for level progression
	const MAX_INTERACTIONS = 5; // Need 5 interactions to complete level
	const COINS_PER_INTERACTION = 10;

	// Determine stars based on exploration (interactions)
	const getStarRating = (interactions: number): number => {
		if (interactions < 2) return 1; // 1-2 interactions = 1 star
		if (interactions < 4) return 2; // 3-4 interactions = 2 stars
		return 3; // 5+ interactions = 3 stars
	};

	// Generate random coin positions around the avatar
	const generateCoins = (count: number, centerX: number = 50, centerY: number = 50) => {
		const newCoins: Coin[] = Array.from({ length: count }, (_, i) => ({
			id: `coin-${Date.now()}-${i}`,
			x: centerX + (Math.random() - 0.5) * 200,
			y: centerY + (Math.random() - 0.5) * 200,
		}));
		setCoins((prev) => [...prev, ...newCoins]);

		// Remove coins after animation
		setTimeout(() => {
			setCoins((prev) => prev.filter((coin) => !newCoins.find((nc) => nc.id === coin.id)));
		}, 1500);
	};

	const playSound = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play().catch(() => {
				// Silently fail if audio can't play
			});
		}
	};

	const handleAvatarInteraction = () => {
		if (levelComplete) return;

		const nextCount = interactionCount + 1;
		setInteractionCount(nextCount);

		// Mostrar pulso de luz
		setShowPulse(true);

		// Trigger NPC reactions
		setNpcReactions({ npc1: true, npc2: true, npc3: true });

		// Play sound
		playSound();

		// Generate reward coins
		const coinsToGenerate = nextCount <= 3 ? 1 : nextCount <= 4 ? 2 : 3;
		generateCoins(coinsToGenerate);
		setTotalCoins((prev) => prev + coinsToGenerate * COINS_PER_INTERACTION);

		// Remove pulse after animation
		setTimeout(() => setShowPulse(false), 800);

		// Reset NPC reactions
		setTimeout(() => {
			setNpcReactions({ npc1: false, npc2: false, npc3: false });
		}, 600);

		// Check if level is complete
		if (nextCount >= MAX_INTERACTIONS) {
			setLevelComplete(true);

			// Wait a bit before advancing
			setTimeout(() => {
				// TODO: Pass star rating to completion handler
				onInteractionComplete();
			}, 2000);
		}
	};

	return (
		<>
			<OrientationAlert />
			<div className={`${styles.container} ${interactionCount > 0 ? styles.active : ''} ${levelComplete ? styles.complete : ''}`}>
				{/* UI Overlay */}
			<div className={styles.uiOverlay}>
				{/* Progress indicator */}
				<div className={styles.progressSection}>
					<div className={styles.progressLabel}>Mundo Despertando</div>
					<div className={styles.progressBar}>
						{Array.from({ length: MAX_INTERACTIONS }).map((_, i) => (
							<div
								key={i}
								className={`${styles.progressPip} ${i < interactionCount ? styles.active : ''}`}
							/>
						))}
					</div>
				</div>

				{/* Coins display */}
				<div className={styles.coinsDisplay}>
					<span className={styles.coinIcon}>💰</span>
					<span className={styles.coinCount}>{totalCoins}</span>
				</div>
			</div>

			{/* Background plaza */}
			<div className={styles.plaza}>
				{/* Sky gradient */}
				<div className={styles.sky} />

				{/* Ground */}
				<div className={styles.ground} />

				{/* NPCs in background */}
				<div className={styles.npcsContainer}>
					<div className={`${styles.npc} ${styles.npc1} ${npcReactions.npc1 ? styles.reacting : ''}`}>
						<div className={styles.npcBody}>🧑</div>
					</div>
					<div className={`${styles.npc} ${styles.npc2} ${npcReactions.npc2 ? styles.reacting : ''}`}>
						<div className={styles.npcBody}>👨</div>
					</div>
					<div className={`${styles.npc} ${styles.npc3} ${npcReactions.npc3 ? styles.reacting : ''}`}>
						<div className={styles.npcBody}>👦</div>
					</div>
				</div>

				{/* Floating coins */}
				{coins.map((coin) => (
					<div
						key={coin.id}
						className={styles.floatingCoin}
						style={{
							'--coin-x': `${coin.x}%`,
							'--coin-y': `${coin.y}%`,
						} as React.CSSProperties}
					>
						💰
					</div>
				))}

				{/* Pulse effects */}
				{showPulse && (
					<>
						<div className={styles.pulse1} />
						<div className={styles.pulse2} />
						<div className={styles.pulse3} />
					</>
				)}

				{/* Central avatar */}
				<div
					className={`${styles.avatarContainer} ${interactionCount > 0 ? styles.interacted : ''} ${levelComplete ? styles.levelComplete : ''}`}
					onClick={handleAvatarInteraction}
					onKeyDown={(e) => {
						if ((e.key === 'Enter' || e.key === ' ') && !levelComplete) {
							e.preventDefault();
							handleAvatarInteraction();
						}
					}}
					role="button"
					tabIndex={levelComplete ? -1 : 0}
					aria-label={levelComplete ? "Nivel completado" : "Toca el avatar para interactuar"}
				>
					<ChibiAvatar
						eyeState="open"
						mouthState={interactionCount > 0 ? "smile" : "neutral"}
						isBlinking={true}
						isBreathing={true}
						size="lg"
					/>

					{/* Interaction hint */}
					{interactionCount === 0 && (
						<div className={styles.interactionHint}>Tócame</div>
					)}

					{/* Completion message */}
					{levelComplete && (
						<div className={styles.completionMessage}>
							<div className={styles.stars}>
								{Array.from({ length: getStarRating(interactionCount) }).map((_, i) => (
									<span key={i}>⭐</span>
								))}
							</div>
							<div className={styles.completionText}>¡Nivel Completado!</div>
						</div>
					)}
				</div>
			</div>

			{/* Audio element for greeting sound */}
			<audio
				ref={audioRef}
				preload="auto"
			>
				<source
					src="data:audio/wav;base64,UklGRiIAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
					type="audio/wav"
				/>
			</audio>
		</div>
		</>
	);
};
