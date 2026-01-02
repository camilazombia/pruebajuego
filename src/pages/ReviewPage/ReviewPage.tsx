import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './ReviewPage.module.css';

const ReviewPage: React.FC = () => {
	const navigate = useNavigate();

	const activities = [
		{
			id: 'flashcards',
			title: 'Tarjetas de Repaso',
			description: 'Repasa con tarjetas interactivas',
			path: '/review/flashcards',
		},
		{
			id: 'stories',
			title: 'Cuentos Musicales',
			description: 'Aprende historias con canciones',
			path: '/review/stories',
		},
		{
			id: 'coloring',
			title: 'Dibujos para Colorear',
			description: 'Colorea mientras aprendes',
			path: '/review/coloring',
		},
	];

	const handleActivityClick = (path: string) => {
		navigate(path);
	};

	const handleKeyDown = (e: React.KeyboardEvent, path: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navigate(path);
		}
	};

	return (
		<>
		<OrientationAlert />
		<div className={styles.page}>
			{/* Activities Grid */}
			<section className={styles.activitiesSection} aria-label="Actividades de Repaso">
				<div className={styles.cardsContainer}>
					{activities.map((activity) => (
						<article
							key={activity.id}
							className={styles.activityCard}
							role="button"
							tabIndex={0}
							onClick={() => handleActivityClick(activity.path)}
							onKeyDown={(e) => handleKeyDown(e, activity.path)}
							aria-label={activity.title}
						>
							<div className={styles.cardIcon}></div>
							<div className={styles.cardContent}>
								<h2 className={styles.cardTitle}>{activity.title}</h2>
								<p className={styles.cardDescription}>{activity.description}</p>
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
		</>
	);
};

export default ReviewPage;
