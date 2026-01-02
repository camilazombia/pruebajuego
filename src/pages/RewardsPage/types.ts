export interface CustomizationItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  allowsColor?: boolean;
  defaultColor?: string;
}

export interface AvatarState {
  [key: string]: string; // category -> itemId
}

export interface ColorPaletteItem {
  id: string;
  name: string;
  hex: string;
}

export const CATEGORY_INFO: Record<string, { name: string; icon: string; allowsColor: boolean }> = {
  skin: { name: 'Piel', icon: '👶', allowsColor: true },
  body: { name: 'Cuerpo', icon: '🫀', allowsColor: true },
  hair: { name: 'Cabello', icon: '💇', allowsColor: true },
  hairAcc: { name: 'Accs. Pelo', icon: '🎀', allowsColor: true },
  eyes: { name: 'Ojos', icon: '👀', allowsColor: true },
  eyebrows: { name: 'Cejas', icon: '🤨', allowsColor: true },
  mouth: { name: 'Boca', icon: '👄', allowsColor: true },
  top: { name: 'Camiseta', icon: '👕', allowsColor: true },
  jacket: { name: 'Chaqueta', icon: '🧥', allowsColor: true },
  bottom: { name: 'Pantalón', icon: '👖', allowsColor: true },
  shoes: { name: 'Zapatos', icon: '👟', allowsColor: true },
  socks: { name: 'Calcetines', icon: '🧦', allowsColor: true },
  hat: { name: 'Sombrero', icon: '🎩', allowsColor: true },
  glasses: { name: 'Gafas', icon: '🥽', allowsColor: true },
  jewelry: { name: 'Joyas', icon: '💎', allowsColor: true },
  accessories: { name: 'Accesorios', icon: '✨', allowsColor: true },
  special: { name: 'Especiales', icon: '⭐', allowsColor: true },
  effects: { name: 'Efectos', icon: '🌟', allowsColor: true },
};

export const COLOR_PALETTE: ColorPaletteItem[] = [
  // Rojos
  { id: 'red-light', name: 'Rojo Claro', hex: '#fca5a5' },
  { id: 'red', name: 'Rojo', hex: '#ef4444' },
  { id: 'red-dark', name: 'Rojo Oscuro', hex: '#991b1b' },
  // Rosas
  { id: 'pink-light', name: 'Rosa Claro', hex: '#fbcfe8' },
  { id: 'pink', name: 'Rosa', hex: '#ec4899' },
  { id: 'pink-dark', name: 'Rosa Oscuro', hex: '#9d174d' },
  // Púrpuras
  { id: 'purple-light', name: 'Púrpura Claro', hex: '#e9d5ff' },
  { id: 'purple', name: 'Púrpura', hex: '#a855f7' },
  { id: 'purple-dark', name: 'Púrpura Oscuro', hex: '#6b21a8' },
  // Azules
  { id: 'blue-light', name: 'Azul Claro', hex: '#93c5fd' },
  { id: 'blue', name: 'Azul', hex: '#2c47d5' },
  { id: 'blue-dark', name: 'Azul Oscuro', hex: '#1e3a8a' },
  // Cyans
  { id: 'cyan-light', name: 'Cyan Claro', hex: '#67e8f9' },
  { id: 'cyan', name: 'Cyan', hex: '#06b6d4' },
  { id: 'cyan-dark', name: 'Cyan Oscuro', hex: '#0c4a6e' },
  // Verdes
  { id: 'green-light', name: 'Verde Claro', hex: '#86efac' },
  { id: 'green', name: 'Verde', hex: '#10b981' },
  { id: 'green-dark', name: 'Verde Oscuro', hex: '#065f46' },
  // Amarillos y Naranjas
  { id: 'yellow', name: 'Amarillo', hex: '#f7c62f' },
  { id: 'orange-light', name: 'Naranja Claro', hex: '#fed7aa' },
  { id: 'orange', name: 'Naranja', hex: '#f97316' },
  { id: 'orange-dark', name: 'Naranja Oscuro', hex: '#92400e' },
  // Neutrales
  { id: 'gray', name: 'Gris', hex: '#6b7280' },
  { id: 'black', name: 'Negro', hex: '#1f2937' },
  { id: 'white', name: 'Blanco', hex: '#ffffff' },
];
