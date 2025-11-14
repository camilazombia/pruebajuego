import React, { useRef } from 'react';
import styles from './WorldsMapPage.module.css';

type World = { id: string; name: string; stars: number; locked?: boolean };

const WORLDS: World[] = [
	{ id: 'w1', name: 'Mundo 1', stars: 3 },
	{ id: 'w2', name: 'Mundo 2', stars: 2 },
	{ id: 'w3', name: 'Mundo 3', stars: 0, locked: true },
	{ id: 'w4', name: 'Mundo 4', stars: 1 },
	{ id: 'w5', name: 'Mundo 5', stars: 0, locked: true },
	{ id: 'w6', name: 'Mundo 6', stars: 3 },
	{ id: 'w7', name: 'Mundo 7', stars: 2 },
	{ id: 'w8', name: 'Mundo 8', stars: 1 },
	{ id: 'w9', name: 'Mundo 9', stars: 0, locked: true },
	{ id: 'w10', name: 'Mundo 10', stars: 0 },
];

const WorldsMapPage: React.FC = () => {
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

	return (
		<div className={styles.page}>
			<section className={styles.container} aria-label="Mundos disponibles">

				<div className={styles.carouselWrapper} tabIndex={0} onKeyDown={handleKeyDown}>
					<button className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Anterior" onClick={() => scrollByCard('prev')}>
						‹
					</button>

					<div className={styles.carousel} role="list" ref={carouselRef}>
						{WORLDS.map((w) => (
							<article
								key={w.id}
								role="listitem"
								className={`${styles.card} ${w.locked ? styles.locked : ''}`}
								data-card
								onClick={() => {
									if (w.locked) return;
									console.log('Seleccionado', w.id);
								}}
								tabIndex={w.locked ? -1 : 0}
							>
								<div className={styles.imagePlaceholder} aria-hidden />
								<div className={styles.namePill}>{w.name}</div>
								<div className={styles.stars} aria-hidden>
									{Array.from({ length: 3 }).map((_, i) => (
										<span key={i} className={`${styles.star} ${i < w.stars ? styles.filled : styles.empty}`}>★</span>
									))}
								</div>
							</article>
						))}
					</div>

					<button className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Siguiente" onClick={() => scrollByCard('next')}>
						›
					</button>
				</div>
			</section>
		</div>
	);
};

export default WorldsMapPage;
