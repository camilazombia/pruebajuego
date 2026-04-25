export interface KaraokeSong {
	id: string;
	label: string;
	audioSrc: string;
	lrcSrc: string;
	available: boolean;
}

const makeSong = (worldNumber: number, baseName: string, suffix = ''): KaraokeSong => {
	const suffixText = suffix ? ` ${suffix}` : '';
	const filename = `Mundo ${worldNumber} - ${baseName}${suffixText}`;

	return {
		id: `${worldNumber}-${suffix || '1'}`,
		label: suffix ? `Cancion ${suffix}` : 'Cancion 1',
		audioSrc: `/assets/audio/Music/${filename}.mp3`,
		lrcSrc: `/assets/audio/Music/${filename}.lrc`,
		available: true,
	};
};

export interface RecursoTheme {
	id: string;
	label: string;
	subtitle: string;
	emoji: string;
	color: string;
	songs: KaraokeSong[];
}

export const RECURSOS_ADICIONALES: RecursoTheme[] = [
	{
		id: 'alphabet',
		label: 'El Abecedario',
		subtitle: 'Alphabet Parade',
		emoji: '🔤',
		color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
		songs: [
			{
				id: 'alphabet-1',
				label: 'Alphabet Parade',
				audioSrc: '/assets/audio/Music/Alphabet Parade.mp3',
				lrcSrc: '/assets/audio/Music/Alphabet Parade.lrc',
				available: true,
			},
			{
				id: 'alphabet-2',
				label: 'Alphabet Parade (v2)',
				audioSrc: '/assets/audio/Music/Alphabet Parade (1).mp3',
				lrcSrc: '/assets/audio/Music/Alphabet Parade (1).lrc',
				available: true,
			},
		],
	},
	{
		id: 'numbers',
		label: 'Los Números',
		subtitle: 'Count to Ten',
		emoji: '🔢',
		color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
		songs: [
			{
				id: 'numbers-1',
				label: 'Count to Ten',
				audioSrc: '/assets/audio/Music/Count to Ten.mp3',
				lrcSrc: '/assets/audio/Music/Count to Ten.lrc',
				available: true,
			},
			{
				id: 'numbers-2',
				label: 'Count to Ten (v2)',
				audioSrc: '/assets/audio/Music/Count to Ten (1).mp3',
				lrcSrc: '/assets/audio/Music/Count to Ten (1).lrc',
				available: true,
			},
		],
	},
	{
		id: 'school',
		label: 'En el Colegio',
		subtitle: 'School & Lunchbox',
		emoji: '🎒',
		color: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
		songs: [
			{
				id: 'school-1',
				label: 'Backpack On My Back',
				audioSrc: '/assets/audio/Music/Backpack On My Back.mp3',
				lrcSrc: '/assets/audio/Music/Backpack On My Back.lrc',
				available: true,
			},
			{
				id: 'lunchbox-1',
				label: 'Lunchbox Boogie',
				audioSrc: '/assets/audio/Music/Lunchbox Boogie.mp3',
				lrcSrc: '/assets/audio/Music/Lunchbox Boogie.lrc',
				available: true,
			},
			{
				id: 'lunchbox-2',
				label: 'Lunchbox Boogie (v2)',
				audioSrc: '/assets/audio/Music/Lunchbox Boogie (1).mp3',
				lrcSrc: '/assets/audio/Music/Lunchbox Boogie (1).lrc',
				available: true,
			},
		],
	},
];

export const KARAOKE_SONGS_BY_WORLD: Record<string, KaraokeSong[]> = {
	world_1: [
		makeSong(1, 'Fundamentos Magicos'),
		makeSong(1, 'Fundamentos Magicos', '2'),
	],
	world_2: [
		makeSong(2, 'Aventuras en la Ciudad'),
		makeSong(2, 'Aventuras en la Ciudad', '2'),
	],
	world_3: [
		makeSong(3, 'Exploradores Globales'),
		makeSong(3, 'Exploradores Globales', '2'),
	],
	world_4: [
		makeSong(4, 'La Granja Ruidosa'),
		makeSong(4, 'La Granja Ruidosa', '2'),
	],
	world_5: [
		makeSong(5, 'El Reloj Congelado'),
		makeSong(5, 'El Reloj Congelado', '2'),
	],
	world_6: [
		makeSong(6, 'El Castillo de las Emociones'),
		makeSong(6, 'El Castillo de las Emociones', '2'),
	],
	world_7: [
		makeSong(7, 'La Montana del Clima'),
		makeSong(7, 'La Montana del Clima', '2'),
	],
	world_8: [
		makeSong(8, 'El Oceano de los Colores'),
		makeSong(8, 'El Oceano de los Colores', '2'),
	],
	world_9: [
		makeSong(9, 'La Casa de los Espejos'),
		makeSong(9, 'La Casa de los Espejos', '2'),
	],
	world_10: [
		makeSong(10, 'La Academia Suprema'),
		makeSong(10, 'La Academia Suprema', '2'),
	],
	world_11: [
		makeSong(11, 'Viajes y Lugares'),
		makeSong(11, 'Viajes y Lugares', '2'),
	],
	world_12: [
		makeSong(12, 'Reino Creador'),
		{
			id: '12-2',
			label: 'Cancion 2',
			audioSrc: '',
			lrcSrc: '',
			available: false,
		},
	],
};
