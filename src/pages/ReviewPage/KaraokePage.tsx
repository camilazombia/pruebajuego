import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import KaraokeSection from './components/KaraokeSection';
import styles from './KaraokePage.module.css';

const KaraokePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<OrientationAlert />
			<div className={styles.page}>
				<button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Volver">
					← Volver
				</button>
				<KaraokeSection />
			</div>
		</>
	);
};

export default KaraokePage;
