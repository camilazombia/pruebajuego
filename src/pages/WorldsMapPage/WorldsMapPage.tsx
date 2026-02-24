import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { WORLDS } from '../../shared/data/worlds';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { CelebrationModal } from '../../shared/ui/CelebrationModal/CelebrationModal';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import styles from './WorldsMapPage.module.css';

const WorldsMapPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const carouselRef = useRef<HTMLDivElement | null>(null);
	const { isWorldUnlocked } = useProgressStore();

	const locState = location.state as {
		guardianCured?: boolean;
		worldTitle?: string;
		guardianEmoji?: string;
		guardianName?: string;
	} | undefined;

	const [showCelebration, setShowCelebration] = useState(false);
	const [lockedToast, setLockedToast] = useState<string | null>(null);

	useEffect(() => {
		if (locState?.guardianCured) {
			setShowCelebration(true);
		}
	}, [locState?.guardianCured]);

	const scrollByCard = (direction: 'next' | 'prev') => {
		const el = carouselRef.current;
		if (!el) return;
		const firstCard = el.querySelector('[data-card]') as HTMLElement | null;
		const gap = parseFloat(getComputedStyle(el).gap || '18') || 18;
		const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : Math.round(el.clientWidth * 0.18);
		const scrollAmount = Math.round(cardWidth + gap);
		el.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'ArrowLeft') scrollByCard('prev');
		if (e.key === 'ArrowRight') scrollByCard('next');
	};

	const handleWorldClick = (worldId: string, isLocked: boolean) => {
		if (isLocked) {
			setLockedToast('Primero debemos ayudar al guardian anterior!');
			setTimeout(() => setLockedToast(null), 2800);
			return;
		}
		navigate(`/chapters/${worldId}`);
	};

	const handleCelebrationContinue = () => {
		setShowCelebration(false);
		navigate('/worlds', { replace: true, state: {} });
	};

	return (
		<>
		<OrientationAlert />
		<div className={styles.page}>
			<section className={styles.container} aria-label="Mundos disponibles">
				<div className={styles.carouselWrapper} tabIndex={0} onKeyDown={handleKeyDown}>
					<ArrowButton
						direction="left"
						size={60}
						aria-label="Anterior"
						onClick={() => scrollByCard('prev')}
					/>

				<div className={styles.carousel} ref={carouselRef}>
					{WORLDS.map((world) => {
						const unlocked = isWorldUnlocked(world.id);
						const cardVars = {
							'--world-theme': world.themeColor,
							'--world-progress': `${world.progress}%`,
						} as React.CSSProperties;
						return (
							<motion.article
								key={world.id}
								className={`${styles.card} ${!unlocked ? styles.lockedCard : ''}`}
								data-card
								onClick={() => handleWorldClick(world.id, !unlocked)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										handleWorldClick(world.id, !unlocked);
									}
								}}
								tabIndex={0}
								whileHover={unlocked ? { scale: 1.05, y: -10 } : { scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 300 }}
								style={cardVars}
							>
							<div
								className={`${styles.imagePlaceholder} ${!unlocked ? styles.imageLocked : ''}`}
							>
								<span className={styles.guardianEmoji}>{world.guardianEmoji}</span>
								<span className={styles.worldNumber}>{world.number}</span>
								{!unlocked && (
									<div className={styles.lockOverlay}>
										<span className={styles.lockIcon}>&#128274;</span>
									</div>
								)}
							</div>
							<div className={styles.namePill}>{world.title}</div>
							<div className={styles.guardianLabel}>
								{unlocked ? world.guardianName : '???'}
							</div>
							<div className={styles.progressBar}>
								<div className={styles.progressFill} />
							</div>
							</motion.article>
						);
					})}
					</div>

					<ArrowButton
						direction="right"
						size={60}
						aria-label="Siguiente"
						onClick={() => scrollByCard('next')}
					/>
				</div>
			</section>

			{/* Toast para mundos bloqueados */}
			<AnimatePresence>
				{lockedToast && (
					<motion.div
						className={styles.lockedToast}
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: 'spring', stiffness: 300, damping: 22 }}
					>
						<span className={styles.toastBookIcon}>&#128214;</span>
						<p className={styles.toastText}>{lockedToast}</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Celebration modal si venimos de completar un mundo */}
			{showCelebration && locState && (
				<CelebrationModal
					guardianEmoji={locState.guardianEmoji ?? '&#11088;'}
					guardianName={locState.guardianName ?? 'Guardian'}
					worldTitle={locState.worldTitle ?? 'Mundo'}
					isWorldComplete
					onContinue={handleCelebrationContinue}
				/>
			)}
		</div>
		</>
	);
};

export default WorldsMapPage;
