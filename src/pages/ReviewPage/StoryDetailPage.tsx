import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoryById } from '../../shared/data/stories';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './StoriesPage.module.css';

const StoryDetailPage: React.FC = () => {
	const { storyId } = useParams<{ storyId: string }>();
	const navigate = useNavigate();
	const story = storyId ? getStoryById(storyId) : undefined;
	const [slideIndex, setSlideIndex] = useState(0);

	const currentSlide = story?.slides[slideIndex];
	const hasNext = story && slideIndex < story.slides.length - 1;
	const hasPrev = slideIndex > 0;

	useEffect(() => {
		setSlideIndex(0);
	}, [storyId]);

	if (!story) {
		return (
			<>
				<OrientationAlert />
				<div className={styles.page}>
					<button className={styles.backButton} onClick={() => navigate('/review/stories')}>
						← Volver
					</button>
					<p>Historia no encontrada</p>
				</div>
			</>
		);
	}

	const handleNext = () => {
		if (hasNext) setSlideIndex((i) => i + 1);
		else navigate('/review/stories');
	};

	const handlePrev = () => {
		if (hasPrev) setSlideIndex((i) => i - 1);
	};

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<button className={styles.backButton} onClick={() => navigate('/review/stories')}>
					← Volver
				</button>

				<section className={styles.storyDetail}>
					<h2 className={styles.storyTitle}>{story.title}</h2>
					<p className={styles.slideCounter}>
						{slideIndex + 1} / {story.slides.length}
					</p>

					<AnimatePresence mode="wait">
						{currentSlide && (
							<motion.div
								key={slideIndex}
								className={styles.slideContent}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<div
									className={styles.slideImage}
									style={{
										backgroundImage: `url(${currentSlide.imageUrl})`,
									}}
								/>
								<p className={styles.slideTextEs}>{currentSlide.textEs}</p>
								<p className={styles.slideTextEn}>{currentSlide.textEn}</p>
							</motion.div>
						)}
					</AnimatePresence>

					<div className={styles.slideNav}>
						<button
							className={styles.navButton}
							onClick={handlePrev}
							disabled={!hasPrev}
							aria-label="Anterior"
						>
							←
						</button>
						<button
							className={styles.navButton}
							onClick={handleNext}
							aria-label={hasNext ? 'Siguiente' : 'Terminar'}
						>
							{hasNext ? '→' : '✓ Terminar'}
						</button>
					</div>
				</section>
			</div>
		</>
	);
};

export default StoryDetailPage;
