import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './ReviewPage.module.css';

interface Activity {
	id: string;
	title: string;
	titleEn: string;
	description: string;
	emoji: string;
	path: string;
	color: string;
}

const activities: Activity[] = [
	{
		id: 'flashcards',
		title: 'Tarjetas de Palabras',
		titleEn: 'Flashcards',
		description: 'Escucha y aprende cada palabra',
		emoji: '🃏',
		path: '/review/flashcards',
		color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
	},
	{
		id: 'stories',
		title: 'Cuentos en Inglés',
		titleEn: 'English Stories',
		description: 'Lee y escucha frases en inglés',
		emoji: '📖',
		path: '/review/stories',
		color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
	},
	{
		id: 'karaoke',
		title: 'Canciones',
		titleEn: 'Sing in English',
		description: 'Canta y pronuncia en inglés',
		emoji: '🎤',
		path: '/review/karaoke',
		color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
	},
	{
		id: 'memory',
		title: 'Memory Match',
		titleEn: 'Find the Pair',
		description: 'Empareja la palabra con su imagen',
		emoji: '🧩',
		path: '/review/memory',
		color: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
	},
];

const ReviewPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<div className={styles.pageHeader}>
					<h1 className={styles.pageTitle}>¡A Repasar!</h1>
					<p className={styles.pageSubtitle}>Review Time 🌟</p>
				</div>

				<section className={styles.activitiesSection} aria-label="Actividades de Repaso">
					<div className={styles.cardsContainer}>
						{activities.map((activity, index) => (
							<motion.article
								key={activity.id}
								className={styles.activityCard}
								role="button"
								tabIndex={0}
								onClick={() => navigate(activity.path)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										navigate(activity.path);
									}
								}}
								aria-label={activity.title}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.08, type: 'spring', stiffness: 280, damping: 22 }}
								whileTap={{ scale: 0.96 }}
								whileHover={{ scale: 1.04, y: -4 }}
								style={{ '--card-gradient': activity.color } as React.CSSProperties}
							>
								<div className={styles.cardIconWrap}>
									<span className={styles.cardEmoji}>{activity.emoji}</span>
								</div>
								<div className={styles.cardContent}>
									<h2 className={styles.cardTitle}>{activity.title}</h2>
									<p className={styles.cardTitleEn}>{activity.titleEn}</p>
									<p className={styles.cardDescription}>{activity.description}</p>
								</div>
								<div className={styles.cardArrow}>›</div>
							</motion.article>
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default ReviewPage;
