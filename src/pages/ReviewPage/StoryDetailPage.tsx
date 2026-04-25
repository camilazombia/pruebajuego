import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoryById } from '../../shared/data/stories';
import { getWorldGradient } from '../../shared/data/worldImages';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './StoriesPage.module.css';

/** One slide's image with emoji fallback */
const SlideImage: React.FC<{ imageUrl: string; emoji?: string; worldId?: string }> = ({
	imageUrl,
	emoji,
	worldId,
}) => {
	const [failed, setFailed] = useState(!imageUrl);

	useEffect(() => {
		setFailed(!imageUrl);
	}, [imageUrl]);

	if (failed) {
		const bg = worldId ? getWorldGradient(worldId) : 'linear-gradient(135deg,#1a1a2e,#0f3460)';
		return (
			<div
				className={styles.slideImage}
				style={{ background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<span style={{ fontSize: '5rem' }}>{emoji ?? '📖'}</span>
			</div>
		);
	}

	// Hidden img to detect load errors; visual shown as background-image div
	return (
		<>
			<img
				src={imageUrl}
				alt=""
				style={{ display: 'none' }}
				onError={() => setFailed(true)}
			/>
			<div className={styles.slideImage} style={{ backgroundImage: `url(${imageUrl})` }} />
		</>
	);
};

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
								<SlideImage
									imageUrl={currentSlide.imageUrl}
									emoji={currentSlide.emoji ?? story.coverEmoji}
									worldId={story.worldId}
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
