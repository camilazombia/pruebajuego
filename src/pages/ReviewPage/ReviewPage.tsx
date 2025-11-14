import React from 'react';
import styles from './ReviewPage.module.css';

const ReviewPage: React.FC = () => {
	return (
		<div className={styles.page}>
			<section className={styles.card} aria-label="Repaso">
				<h1 className={styles.title}>Repaso</h1>
				<p className={styles.subtitle}>Aquí encontrarás actividades para repasar lo aprendido.</p>
			</section>
		</div>
	);
};

export default ReviewPage;
