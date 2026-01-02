import React from 'react';
import type { Character } from '../model/character';
import styles from './CharacterPreview.module.css';

interface CharacterPreviewProps {
	character: Character;
	size?: 'small' | 'medium' | 'large';
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ character, size = 'medium' }) => {
	const sizeMap = {
		small: 120,
		medium: 180,
		large: 280,
	};

	const viewBoxSize = sizeMap[size];

	return (
		<div className={`${styles.characterContainer} ${styles[`size-${size}`]}`}>
			<svg
				className={styles.character}
				viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Cuerpo base */}
				<ellipse cx={viewBoxSize / 2} cy={viewBoxSize * 0.6} rx={viewBoxSize * 0.25} ry={viewBoxSize * 0.3} fill={character.baseColor} />

				{/* Cabeza base */}
				<circle cx={viewBoxSize / 2} cy={viewBoxSize * 0.25} r={viewBoxSize * 0.2} fill={character.baseColor} />

				{/* Ojos */}
				<circle cx={viewBoxSize / 2 - viewBoxSize * 0.08} cy={viewBoxSize * 0.2} r={viewBoxSize * 0.04} fill="#000000" />
				<circle cx={viewBoxSize / 2 + viewBoxSize * 0.08} cy={viewBoxSize * 0.2} r={viewBoxSize * 0.04} fill="#000000" />

				{/* Boca sonriente */}
				<path
					d={`M ${viewBoxSize / 2 - viewBoxSize * 0.06} ${viewBoxSize * 0.3} Q ${viewBoxSize / 2} ${viewBoxSize * 0.35} ${viewBoxSize / 2 + viewBoxSize * 0.06} ${viewBoxSize * 0.3}`}
					stroke="#000000"
					strokeWidth={viewBoxSize * 0.02}
					fill="none"
					strokeLinecap="round"
				/>

				{/* Brazos */}
				<line
					x1={viewBoxSize / 2 - viewBoxSize * 0.26}
					y1={viewBoxSize * 0.5}
					x2={viewBoxSize / 2 - viewBoxSize * 0.45}
					y2={viewBoxSize * 0.65}
					stroke={character.baseColor}
					strokeWidth={viewBoxSize * 0.08}
					strokeLinecap="round"
				/>
				<line
					x1={viewBoxSize / 2 + viewBoxSize * 0.26}
					y1={viewBoxSize * 0.5}
					x2={viewBoxSize / 2 + viewBoxSize * 0.45}
					y2={viewBoxSize * 0.65}
					stroke={character.baseColor}
					strokeWidth={viewBoxSize * 0.08}
					strokeLinecap="round"
				/>

				{/* Piernas */}
				<line
					x1={viewBoxSize / 2 - viewBoxSize * 0.1}
					y1={viewBoxSize * 0.85}
					x2={viewBoxSize / 2 - viewBoxSize * 0.1}
					y2={viewBoxSize * 1.0}
					stroke={character.baseColor}
					strokeWidth={viewBoxSize * 0.08}
					strokeLinecap="round"
				/>
				<line
					x1={viewBoxSize / 2 + viewBoxSize * 0.1}
					y1={viewBoxSize * 0.85}
					x2={viewBoxSize / 2 + viewBoxSize * 0.1}
					y2={viewBoxSize * 1.0}
					stroke={character.baseColor}
					strokeWidth={viewBoxSize * 0.08}
					strokeLinecap="round"
				/>

				{/* Decoraciones de equipamiento */}

				{/* Head equipment - Sombrero/Corona */}
				{character.equipped.head && (
					<g className={styles.equipment}>
						<path
							d={`M ${viewBoxSize / 2 - viewBoxSize * 0.22} ${viewBoxSize * 0.08} Q ${viewBoxSize / 2} ${viewBoxSize * 0.02} ${viewBoxSize / 2 + viewBoxSize * 0.22} ${viewBoxSize * 0.08} L ${viewBoxSize / 2 + viewBoxSize * 0.2} ${viewBoxSize * 0.15} Q ${viewBoxSize / 2} ${viewBoxSize * 0.05} ${viewBoxSize / 2 - viewBoxSize * 0.2} ${viewBoxSize * 0.15} Z`}
							fill="#FFD700"
							stroke="#FFA500"
							strokeWidth={viewBoxSize * 0.015}
						/>
					</g>
				)}

				{/* Body equipment - Capa/Ropa */}
				{character.equipped.body && (
					<g className={styles.equipment}>
						<path
							d={`M ${viewBoxSize / 2 - viewBoxSize * 0.27} ${viewBoxSize * 0.45} L ${viewBoxSize / 2 - viewBoxSize * 0.35} ${viewBoxSize * 0.85} L ${viewBoxSize / 2 + viewBoxSize * 0.35} ${viewBoxSize * 0.85} L ${viewBoxSize / 2 + viewBoxSize * 0.27} ${viewBoxSize * 0.45} Z`}
							fill="#FF1493"
							stroke="#FF69B4"
							strokeWidth={viewBoxSize * 0.015}
							opacity="0.8"
						/>
					</g>
				)}

				{/* Feet equipment - Zapatillas */}
				{character.equipped.feet && (
					<g className={styles.equipment}>
						<ellipse
							cx={viewBoxSize / 2 - viewBoxSize * 0.1}
							cy={viewBoxSize * 1.0}
							rx={viewBoxSize * 0.09}
							ry={viewBoxSize * 0.06}
							fill="#00FF00"
							stroke="#00AA00"
							strokeWidth={viewBoxSize * 0.015}
						/>
						<ellipse
							cx={viewBoxSize / 2 + viewBoxSize * 0.1}
							cy={viewBoxSize * 1.0}
							rx={viewBoxSize * 0.09}
							ry={viewBoxSize * 0.06}
							fill="#00FF00"
							stroke="#00AA00"
							strokeWidth={viewBoxSize * 0.015}
						/>
					</g>
				)}

				{/* Accessory - Accesorios */}
				{character.equipped.accessory && (
					<g className={styles.equipment}>
						<circle
							cx={viewBoxSize / 2 - viewBoxSize * 0.22}
							cy={viewBoxSize * 0.2}
							r={viewBoxSize * 0.07}
							fill="none"
							stroke="#8B008B"
							strokeWidth={viewBoxSize * 0.03}
						/>
						<circle
							cx={viewBoxSize / 2 + viewBoxSize * 0.22}
							cy={viewBoxSize * 0.2}
							r={viewBoxSize * 0.07}
							fill="none"
							stroke="#8B008B"
							strokeWidth={viewBoxSize * 0.03}
						/>
					</g>
				)}
			</svg>
		</div>
	);
};

export default CharacterPreview;
