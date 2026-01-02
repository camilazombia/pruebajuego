import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';

const MissionsMapPage: React.FC = () => {
	const navigate = useNavigate();
	const { worldId } = useParams<{ worldId: string }>();

	React.useEffect(() => {
		if (worldId) {
			navigate(`/chapters/${worldId}`, { replace: true });
		}
	}, [worldId, navigate]);

	return (
		<>
		<OrientationAlert />
		<div></div>
		</>
	);
};

export default MissionsMapPage;
