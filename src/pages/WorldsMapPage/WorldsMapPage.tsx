import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { WORLDS } from '../../shared/data/worlds';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import styles from './WorldsMapPage.module.css';

const WorldsMapPage: React.FC = () => {
	const navigate = useNavigate();
	const carouselRef = useRef<HTMLDivElement | null>(null);
	const { isWorldUnlocked } = useProgressStore();

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

	const handleWorldClick = (worldId: string, locked?: boolean) => {
		if (locked) return;
		navigate(`/chapters/${worldId}`);
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

				<div className={styles.carousel} role="list" ref={carouselRef}>
					{WORLDS.map((world) => {
						const unlocked = isWorldUnlocked(world.id);
						return (
							<motion.article
								key={world.id}
								role="listitem"
								className={`${styles.card} ${!unlocked ? styles.locked : ''}`}
								data-card
								onClick={() => handleWorldClick(world.id, !unlocked)}
								onKeyDown={(e) => {
									if ((e.key === 'Enter' || e.key === ' ') && unlocked) {
										e.preventDefault();
										handleWorldClick(world.id, !unlocked);
									}
								}}
								tabIndex={!unlocked ? -1 : 0}
								whileHover={{ scale: 1.05, y: -10 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<div className={styles.imagePlaceholder} aria-hidden>
									<span className={styles.worldNumber}>{world.number}</span>
									{!unlocked && <div className={styles.lockOverlay}>🔒</div>}
								</div>
								<div className={styles.namePill}>{world.title}</div>
								<div className={styles.progressBar}>
									<div
										className={styles.progressFill}
										style={{ width: `${world.progress}%` }}
										aria-label={`Progreso: ${Math.round(world.progress)}%`}
									/>
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
		</div>
		</>
	);
};

export default WorldsMapPage;
