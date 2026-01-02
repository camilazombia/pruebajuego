import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';

const MissionPage: React.FC = () => {
	const navigate = useNavigate();

	React.useEffect(() => {
		// Redirigir a worlds si se intenta acceder a misiones
		navigate('/worlds', { replace: true });
	}, [navigate]);

	return (
		<>
		<OrientationAlert />
		<div></div>
		</>
	);
};

export default MissionPage;
