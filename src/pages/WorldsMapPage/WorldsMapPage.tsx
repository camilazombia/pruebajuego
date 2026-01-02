import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '../../shared/ui/ArrowButton/ArrowButton';
import { WORLDS } from '../../shared/data/worlds';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './WorldsMapPage.module.css';

const WorldsMapPage: React.FC = () => {
	const navigate = useNavigate();
	const carouselRef = useRef<HTMLDivElement | null>(null);

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
					{WORLDS.map((world) => (
						<article
								key={world.id}
								role="listitem"
								className={`${styles.card} ${!world.isUnlocked ? styles.locked : ''}`}
								data-card
								onClick={() => handleWorldClick(world.id, !world.isUnlocked)}
								onKeyDown={(e) => {
									if ((e.key === 'Enter' || e.key === ' ') && world.isUnlocked) {
										e.preventDefault();
										handleWorldClick(world.id, !world.isUnlocked);
									}
								}}
								tabIndex={!world.isUnlocked ? -1 : 0}
							>
								<div className={styles.imagePlaceholder} aria-hidden>
									<span className={styles.worldNumber}>{world.number}</span>
									{!world.isUnlocked && <div className={styles.lockOverlay}>🔒</div>}
								</div>
								<div className={styles.namePill}>{world.title}</div>
								<div className={styles.progressBar}>
									<div 
										className={styles.progressFill} 
										style={{ width: `${world.progress}%` }}
										aria-label={`Progreso: ${Math.round(world.progress)}%`}
									/>
								</div>
							</article>
						))}
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
