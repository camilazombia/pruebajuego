import React, { useState, useEffect } from 'react';
import { getChapterBgUrl, getWorldGradient, getWorldIdFromChapter } from '../../data/worldImages';

interface BackgroundImageProps {
	chapterId: string;
	className?: string;
	alt?: string;
}

const BG_BASE = '/assets/images/backgrounds';

type LoadState = 'png' | 'jpg' | 'unsplash' | 'gradient';

/**
 * Fondo de capítulo con fallback PNG -> JPG -> Unsplash -> gradiente CSS.
 */
export const BackgroundImage: React.FC<BackgroundImageProps> = ({
	chapterId,
	className,
	alt = '',
}) => {
	const [state, setState] = useState<LoadState>('png');

	useEffect(() => {
		setState('png');
	}, [chapterId]);

	const handleError = () => {
		setState((prev) => {
			if (prev === 'png') return 'jpg';
			if (prev === 'jpg') return 'unsplash';
			return 'gradient';
		});
	};

	if (state === 'gradient') {
		const worldId = getWorldIdFromChapter(chapterId);
		return (
			<div
				className={className}
				aria-hidden="true"
				style={{ background: getWorldGradient(worldId), width: '100%', height: '100%' }}
			/>
		);
	}

	const src =
		state === 'unsplash'
			? getChapterBgUrl(chapterId)
			: `${BG_BASE}/${chapterId}.${state === 'png' ? 'png' : 'jpg'}`;

	return (
		<img
			className={className}
			src={src}
			alt={alt}
			aria-hidden="true"
			onError={handleError}
		/>
	);
};
