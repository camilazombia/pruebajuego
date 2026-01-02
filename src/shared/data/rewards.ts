export type Reward = {
	id: string;
	name: string;
	description: string;
	icon: string; // ruta de SVG o URL de imagen
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
	price: number; // precio en monedas
	isPurchased?: boolean;
};

export const REWARDS: Reward[] = [
	{
		id: 'reward-1',
		name: 'Gorra Espacial Azul',
		description: 'Gorra espacial azul que tu personaje puede usar en el Mundo 1.',
		icon: '#badge',
		rarity: 'common',
		price: 100,
		isPurchased: true,
	},
	{
		id: 'reward-2',
		name: 'Camiseta Arcoíris',
		description: 'Camiseta de colores brillantes para usar en cualquier mundo.',
		icon: '#gem',
		rarity: 'rare',
		price: 500,
		isPurchased: true,
	},
	{
		id: 'reward-3',
		name: 'Gafas de Aventurero',
		description: 'Gafas especiales que dan un aire aventurero a tu personaje.',
		icon: '#flower',
		rarity: 'rare',
		price: 450,
		isPurchased: true,
	},
	{
		id: 'reward-4',
		name: 'Corona Mágica',
		description: 'Una corona brillante que solo los campeones pueden usar.',
		icon: '#crown',
		rarity: 'epic',
		price: 2500,
		isPurchased: false,
	},
	{
		id: 'reward-5',
		name: 'Bufanda Roja',
		description: 'Bufanda cálida y acogedora para viajes fríos.',
		icon: '#ribbon',
		rarity: 'common',
		price: 150,
		isPurchased: true,
	},
	{
		id: 'reward-6',
		name: 'Sombrero de Brujo',
		description: 'Un sombrero puntiagudo lleno de magia y misterio.',
		icon: '#scroll',
		rarity: 'epic',
		price: 2000,
		isPurchased: false,
	},
	{
		id: 'reward-7',
		name: 'Auriculares Inalámbricos',
		description: 'Auriculares futuristas para escuchar música mientras aprendes.',
		icon: '#star',
		rarity: 'rare',
		price: 550,
		isPurchased: true,
	},
	{
		id: 'reward-8',
		name: 'Reloj Inteligente',
		description: 'Un reloj que brilla y te acompaña en todas tus aventuras.',
		icon: '#trophy',
		rarity: 'legendary',
		price: 5000,
		isPurchased: false,
	},
	{
		id: 'reward-9',
		name: 'Mochila Antigravedad',
		description: 'Mochila especial que flota sin peso.',
		icon: '#shield',
		rarity: 'epic',
		price: 2200,
		isPurchased: false,
	},
	{
		id: 'reward-10',
		name: 'Zapatillas Velocidad',
		description: 'Zapatillas que te permiten correr más rápido que nadie.',
		icon: '#diamond',
		rarity: 'rare',
		price: 600,
		isPurchased: false,
	},
	{
		id: 'reward-11',
		name: 'Guantes de Hielo',
		description: 'Guantes mágicos que controlan el frío.',
		icon: '#medal',
		rarity: 'epic',
		price: 2300,
		isPurchased: false,
	},
	{
		id: 'reward-12',
		name: 'Capa de Héroe',
		description: 'Una capa roja que te hace sentir como un verdadero héroe.',
		icon: '#wand',
		rarity: 'legendary',
		price: 5500,
		isPurchased: false,
	},
];

export const getRewardById = (id: string) => REWARDS.find((r) => r.id === id);
export const getPurchasedRewards = () => REWARDS.filter((r) => r.isPurchased);
export const getTotalCoinsCost = () => REWARDS.filter((r) => r.isPurchased).reduce((sum, r) => sum + r.price, 0);
export const getTotalCoinsEarned = () => {
	// Por ahora retornamos un valor fijo, pero esto se calcularía desde los niveles completados
	return 4500;
};
