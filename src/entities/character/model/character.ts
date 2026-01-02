export type EquipmentSlot = 'head' | 'body' | 'feet' | 'accessory';

export type Character = {
	id: string;
	name: string;
	baseColor: string;
	equipped: {
		head?: string; // reward id
		body?: string;
		feet?: string;
		accessory?: string;
	};
};

export type RewardEquipmentInfo = {
	rewardId: string;
	slot: EquipmentSlot;
	icon: string;
	name: string;
};

// Mapeo de premios a slots de equipo
export const REWARD_EQUIPMENT_MAP: Record<string, EquipmentSlot> = {
	'reward-1': 'head', // Gorra Espacial Azul
	'reward-2': 'body', // Camiseta Arcoíris
	'reward-3': 'accessory', // Gafas de Aventurero
	'reward-4': 'head', // Corona Mágica
	'reward-5': 'body', // Bufanda Roja
	'reward-6': 'head', // Sombrero de Brujo
	'reward-7': 'accessory', // Auriculares Inalámbricos
	'reward-8': 'accessory', // Reloj Inteligente
	'reward-9': 'body', // Mochila Antigravedad
	'reward-10': 'feet', // Zapatillas Velocidad
	'reward-11': 'accessory', // Guantes de Hielo
	'reward-12': 'body', // Capa de Héroe
};

export const DEFAULT_CHARACTER: Character = {
	id: 'char-1',
	name: 'Mi Personaje',
	baseColor: '#FF69B4',
	equipped: {},
};

export const getEquipmentSlot = (rewardId: string): EquipmentSlot | undefined => {
	return REWARD_EQUIPMENT_MAP[rewardId];
};
