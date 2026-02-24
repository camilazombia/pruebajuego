import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { getAllStories } from '../../shared/data/stories';
import styles from './StoriesPage.module.css';

const StoriesPage: React.FC = () => {
	const navigate = useNavigate();
	const stories = getAllStories();

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Volver">
					← Volver
				</button>

				<section className={styles.container} aria-label="Cuentos Musicales">
					<h1 className={styles.title}>Cuentos Musicales</h1>
					<p className={styles.subtitle}>Aprende historias con música</p>

					{stories.length === 0 ? (
						<div className={styles.placeholder}>
							<p>🎵 Los cuentos musicales estarán disponibles pronto</p>
						</div>
					) : (
						<div className={styles.storiesGrid}>
							{stories.map((story, index) => (
								<motion.article
									key={story.id}
									className={styles.storyCard}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
									onClick={() => navigate(`/review/stories/${story.id}`)}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											navigate(`/review/stories/${story.id}`);
										}
									}}
								>
									<div
										className={styles.storyCover}
										style={{ backgroundImage: `url(${story.coverImage})` }}
									/>
									<div className={styles.storyInfo}>
										<h3 className={styles.storyCardTitle}>{story.title}</h3>
										{story.titleEn && (
											<p className={styles.storyCardEn}>{story.titleEn}</p>
										)}
									</div>
								</motion.article>
							))}
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default StoriesPage;
