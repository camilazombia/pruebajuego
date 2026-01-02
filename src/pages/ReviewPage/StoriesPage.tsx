import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './StoriesPage.module.css';

const StoriesPage: React.FC = () => {
	const navigate = useNavigate();

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

				<div className={styles.placeholder}>
					<p>🎵 Los cuentos musicales estarán disponibles pronto</p>
				</div>
			</section>
		</div>
		</>
	);
};

export default StoriesPage;
