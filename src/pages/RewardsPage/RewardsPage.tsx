import React, { useState, useMemo } from 'react';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ColorPalette, CategoryPanel, ItemVariants, PurchaseModal } from './components';
import { CATEGORY_INFO, CustomizationItem, AvatarState } from './types';
import { useAvatar } from '../../app/providers/AvatarProvider';
import styles from './RewardsPage.module.css';

// Sample data - in a real app this would come from an API or database
const MOCK_ITEMS: CustomizationItem[] = [
  // Skin - Piel (10 items)
  { id: 'skin_light', name: 'Piel Clara', category: 'skin', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#fdbcb4' },
  { id: 'skin_medium', name: 'Piel Media', category: 'skin', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#d4a574' },
  { id: 'skin_dark', name: 'Piel Oscura', category: 'skin', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#8b6f47' },
  { id: 'skin_teal', name: 'Piel Alienígena', category: 'skin', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'skin_olive', name: 'Piel Oliva', category: 'skin', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#7c9c59' },
  { id: 'skin_peach', name: 'Piel Durazno', category: 'skin', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffa07a' },
  { id: 'skin_rose', name: 'Piel Rosada', category: 'skin', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffb3ba' },
  { id: 'skin_golden', name: 'Piel Dorada', category: 'skin', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },
  { id: 'skin_purple', name: 'Piel Púrpura', category: 'skin', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#d8b3ff' },
  { id: 'skin_blue', name: 'Piel Azul', category: 'skin', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#87ceeb' },

  // Body - Cuerpo (10 items)
  { id: 'body_slim', name: 'Cuerpo Delgado', category: 'body', price: 0, isUnlocked: true, isEquipped: true, allowsColor: false },
  { id: 'body_average', name: 'Cuerpo Normal', category: 'body', price: 25, isUnlocked: true, isEquipped: false, allowsColor: false },
  { id: 'body_athletic', name: 'Cuerpo Atlético', category: 'body', price: 50, isUnlocked: true, isEquipped: false, allowsColor: false },
  { id: 'body_curvy', name: 'Cuerpo Curvilíneo', category: 'body', price: 50, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_chubby', name: 'Cuerpo Redondeado', category: 'body', price: 40, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_muscular', name: 'Cuerpo Musculoso', category: 'body', price: 75, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_petite', name: 'Cuerpo Pequeño', category: 'body', price: 35, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_tall', name: 'Cuerpo Alto', category: 'body', price: 60, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_hourglass', name: 'Cuerpo Arena', category: 'body', price: 70, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_rectangular', name: 'Cuerpo Rectangular', category: 'body', price: 65, isUnlocked: false, isEquipped: false, allowsColor: false },

  // Hair - Cabello (10 items)
  { id: 'hair_short', name: 'Cabello Corto', category: 'hair', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'hair_long', name: 'Cabello Largo', category: 'hair', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'hair_curly', name: 'Cabello Rizado', category: 'hair', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#b45309' },
  { id: 'hair_wavy', name: 'Cabello Ondulado', category: 'hair', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#d97706' },
  { id: 'hair_spiky', name: 'Cabello Puntiagudo', category: 'hair', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'hair_braid', name: 'Trenza', category: 'hair', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'hair_pigtails', name: 'Coletas', category: 'hair', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'hair_bob', name: 'Bob Corto', category: 'hair', price: 65, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'hair_afro', name: 'Cabello Afro', category: 'hair', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#8b4513' },
  { id: 'hair_dreadlock', name: 'Rastas', category: 'hair', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#654321' },

  // Hair Accessories - Accesorios de Pelo (10 items)
  { id: 'hairAcc_bow', name: 'Lazo Rojo', category: 'hairAcc', price: 20, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'hairAcc_ribbon', name: 'Cinta Rosa', category: 'hairAcc', price: 25, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'hairAcc_flower', name: 'Flor Amarilla', category: 'hairAcc', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'hairAcc_clip', name: 'Pasador Brillante', category: 'hairAcc', price: 35, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'hairAcc_crown', name: 'Corona Dorada', category: 'hairAcc', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f59e0b' },
  { id: 'hairAcc_tiara', name: 'Tiara Cristal', category: 'hairAcc', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#e879f9' },
  { id: 'hairAcc_pins', name: 'Pasadores Dorados', category: 'hairAcc', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },
  { id: 'hairAcc_pearl', name: 'Perla de Pelo', category: 'hairAcc', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fffacd' },
  { id: 'hairAcc_vine', name: 'Corona de Flores', category: 'hairAcc', price: 65, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#98fb98' },
  { id: 'hairAcc_sparkle', name: 'Horquilla Brillante', category: 'hairAcc', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  // Eyes - Ojos (10 items)
  { id: 'eyes_open', name: 'Ojos Abiertos', category: 'eyes', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'eyes_sparkle', name: 'Ojos Brillantes', category: 'eyes', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#0ea5e9' },
  { id: 'eyes_stars', name: 'Ojos Estrellas', category: 'eyes', price: 100, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'eyes_hearts', name: 'Ojos Corazones', category: 'eyes', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'eyes_wink', name: 'Guiño', category: 'eyes', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#10b981' },
  { id: 'eyes_sleepy', name: 'Ojos Somnolientos', category: 'eyes', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6366f1' },
  { id: 'eyes_mysterious', name: 'Ojos Misteriosos', category: 'eyes', price: 90, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#8b5cf6' },
  { id: 'eyes_angry', name: 'Ojos Enfadados', category: 'eyes', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'eyes_sleek', name: 'Ojos Felinos', category: 'eyes', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'eyes_glitter', name: 'Ojos Brillo', category: 'eyes', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  // Eyebrows - Cejas (10 items)
  { id: 'eyebrows_normal', name: 'Cejas Normales', category: 'eyebrows', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'eyebrows_thick', name: 'Cejas Gruesas', category: 'eyebrows', price: 25, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#3b2414' },
  { id: 'eyebrows_angry', name: 'Cejas Enfadadas', category: 'eyebrows', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'eyebrows_happy', name: 'Cejas Felices', category: 'eyebrows', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'eyebrows_curved', name: 'Cejas Curvadas', category: 'eyebrows', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c2d12' },
  { id: 'eyebrows_arch', name: 'Cejas Arqueadas', category: 'eyebrows', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#b91c1c' },
  { id: 'eyebrows_slim', name: 'Cejas Finas', category: 'eyebrows', price: 30, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'eyebrows_wild', name: 'Cejas Salvajes', category: 'eyebrows', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#3b3b3b' },
  { id: 'eyebrows_shocked', name: 'Cejas Sorprendidas', category: 'eyebrows', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#000000' },
  { id: 'eyebrows_gentle', name: 'Cejas Suaves', category: 'eyebrows', price: 35, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },

  // Mouth - Boca (10 items)
  { id: 'mouth_smile', name: 'Sonrisa', category: 'mouth', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'mouth_laugh', name: 'Risa Grande', category: 'mouth', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'mouth_kiss', name: 'Beso', category: 'mouth', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'mouth_surprised', name: 'Sorprendido', category: 'mouth', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'mouth_tongue', name: 'Sacando Lengua', category: 'mouth', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'mouth_neutral', name: 'Boca Neutral', category: 'mouth', price: 20, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#992211' },
  { id: 'mouth_sad', name: 'Boca Triste', category: 'mouth', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
  { id: 'mouth_annoyed', name: 'Boca Molesta', category: 'mouth', price: 35, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'mouth_excited', name: 'Boca Emocionada', category: 'mouth', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f59e0b' },
  { id: 'mouth_smug', name: 'Boca Burlona', category: 'mouth', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },

  // Top - Camiseta (10 items)
  { id: 'top_tshirt', name: 'Camiseta Básica', category: 'top', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'top_shirt', name: 'Camisa Elegante', category: 'top', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'top_sweater', name: 'Suéter', category: 'top', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'top_striped', name: 'Camiseta Rayada', category: 'top', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#10b981' },
  { id: 'top_hoodie', name: 'Sudadera con Capucha', category: 'top', price: 80, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'top_crop', name: 'Top Corto', category: 'top', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'top_tank', name: 'Camiseta sin Mangas', category: 'top', price: 35, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'top_mesh', name: 'Top Transparente', category: 'top', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'top_sports', name: 'Top Deportivo', category: 'top', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#059669' },
  { id: 'top_sequin', name: 'Top con Lentejuelas', category: 'top', price: 95, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  // Jacket - Chaqueta (10 items)
  { id: 'jacket_denim', name: 'Chaqueta Vaquera', category: 'jacket', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1e40af' },
  { id: 'jacket_leather', name: 'Chaqueta de Cuero', category: 'jacket', price: 100, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'jacket_windbreaker', name: 'Cortavientos', category: 'jacket', price: 70, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'jacket_blazer', name: 'Blazer Formal', category: 'jacket', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'jacket_puffer', name: 'Chaqueta Plumifera', category: 'jacket', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#10b981' },
  { id: 'jacket_cardigan', name: 'Cardigan', category: 'jacket', price: 65, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'jacket_anime', name: 'Chaqueta Anime', category: 'jacket', price: 150, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f59e0b' },
  { id: 'jacket_fur', name: 'Abrigo de Pelaje', category: 'jacket', price: 180, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#8b7355' },
  { id: 'jacket_biker', name: 'Chaqueta Motociclista', category: 'jacket', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'jacket_bomber', name: 'Chaqueta Bomber', category: 'jacket', price: 130, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },

  // Bottom - Pantalón (10 items)
  { id: 'bottom_pants', name: 'Pantalones', category: 'bottom', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#3b82f6' },
  { id: 'bottom_jeans', name: 'Jeans', category: 'bottom', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1e3a8a' },
  { id: 'bottom_shorts', name: 'Shorts', category: 'bottom', price: 25, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'bottom_skirt', name: 'Falda', category: 'bottom', price: 45, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'bottom_overalls', name: 'Overol', category: 'bottom', price: 80, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'bottom_leggings', name: 'Leggings', category: 'bottom', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'bottom_capri', name: 'Capris', category: 'bottom', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
  { id: 'bottom_flared', name: 'Pantalón Acampanado', category: 'bottom', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'bottom_cargo', name: 'Pantalón Cargo', category: 'bottom', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'bottom_tutu', name: 'Tutú', category: 'bottom', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },

  // Shoes - Zapatos (10 items)
  { id: 'shoes_sneakers', name: 'Zapatillas', category: 'shoes', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#ffffff' },
  { id: 'shoes_boots', name: 'Botas', category: 'shoes', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'shoes_sandals', name: 'Sandalias', category: 'shoes', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'shoes_heels', name: 'Tacones', category: 'shoes', price: 90, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'shoes_ballet', name: 'Zapatillas de Ballet', category: 'shoes', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fca5a5' },
  { id: 'shoes_loafers', name: 'Mocasines', category: 'shoes', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'shoes_platforms', name: 'Plataformas', category: 'shoes', price: 95, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6366f1' },
  { id: 'shoes_crocs', name: 'Crocs', category: 'shoes', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#10b981' },
  { id: 'shoes_flip', name: 'Chanclas', category: 'shoes', price: 25, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'shoes_sparkly', name: 'Zapatos Brillantes', category: 'shoes', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  // Socks - Calcetines (10 items)
  { id: 'socks_plain', name: 'Calcetines Lisos', category: 'socks', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#ffffff' },
  { id: 'socks_striped', name: 'Calcetines Rayados', category: 'socks', price: 15, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'socks_dots', name: 'Calcetines Lunares', category: 'socks', price: 20, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'socks_fuzzy', name: 'Calcetines Esponjosos', category: 'socks', price: 30, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'socks_thigh', name: 'Calcetines Largos', category: 'socks', price: 35, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'socks_knee', name: 'Calcetines Rodillera', category: 'socks', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'socks_glitter', name: 'Calcetines Brillo', category: 'socks', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },
  { id: 'socks_argyle', name: 'Calcetines Rombos', category: 'socks', price: 25, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#3b82f6' },
  { id: 'socks_character', name: 'Calcetines Personaje', category: 'socks', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'socks_thermal', name: 'Calcetines Térmicos', category: 'socks', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },

  // Hat - Sombrero (10 items)
  { id: 'hat_beanie', name: 'Gorro de Invierno', category: 'hat', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'hat_cap', name: 'Gorra', category: 'hat', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'hat_crown', name: 'Corona Real', category: 'hat', price: 150, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'hat_party', name: 'Gorro de Fiesta', category: 'hat', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'hat_cowboy', name: 'Sombrero Vaquero', category: 'hat', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'hat_tophat', name: 'Chistera', category: 'hat', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'hat_beret', name: 'Boina', category: 'hat', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
  { id: 'hat_bucket', name: 'Sombrero de Pescador', category: 'hat', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'hat_viking', name: 'Casco Vikingo', category: 'hat', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#c0c0c0' },
  { id: 'hat_witch', name: 'Sombrero de Bruja', category: 'hat', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },

  // Glasses - Gafas (10 items)
  { id: 'glasses_sunglasses', name: 'Gafas de Sol', category: 'glasses', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'glasses_nerd', name: 'Gafas Nerd', category: 'glasses', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'glasses_cat', name: 'Gafas de Gato', category: 'glasses', price: 50, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'glasses_heart', name: 'Gafas Corazón', category: 'glasses', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'glasses_star', name: 'Gafas Estrella', category: 'glasses', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'glasses_monocle', name: 'Monóculo', category: 'glasses', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#d4af37' },
  { id: 'glasses_oversized', name: 'Gafas Grandes', category: 'glasses', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'glasses_aviator', name: 'Gafas Aviador', category: 'glasses', price: 65, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#c0c0c0' },
  { id: 'glasses_pixel', name: 'Gafas Pixel', category: 'glasses', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#000000' },
  { id: 'glasses_round', name: 'Gafas Redondas', category: 'glasses', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },

  // Jewelry - Joyas (10 items)
  { id: 'jewelry_necklace', name: 'Collar', category: 'jewelry', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'jewelry_pendant', name: 'Colgante', category: 'jewelry', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'jewelry_bracelet', name: 'Pulsera', category: 'jewelry', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'jewelry_ring', name: 'Anillo', category: 'jewelry', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f59e0b' },
  { id: 'jewelry_earrings', name: 'Aretes', category: 'jewelry', price: 30, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'jewelry_choker', name: 'Gargantilla', category: 'jewelry', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#b91c1c' },
  { id: 'jewelry_chain', name: 'Cadena de Oro', category: 'jewelry', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f59e0b' },
  { id: 'jewelry_tiara', name: 'Tiara', category: 'jewelry', price: 95, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'jewelry_locket', name: 'Guardapelo', category: 'jewelry', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#c0c0c0' },
  { id: 'jewelry_crown', name: 'Corona', category: 'jewelry', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },

  // Accessories - Accesorios (10 items)
  { id: 'acc_scarf', name: 'Bufanda', category: 'accessories', price: 45, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'acc_bag', name: 'Mochila', category: 'accessories', price: 75, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'acc_belt', name: 'Cinturón', category: 'accessories', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'acc_purse', name: 'Bolso', category: 'accessories', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'acc_suitcase', name: 'Maleta', category: 'accessories', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
  { id: 'acc_feather', name: 'Boa de Plumas', category: 'accessories', price: 90, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fca5a5' },
  { id: 'acc_umbrella', name: 'Paraguas', category: 'accessories', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'acc_cane', name: 'Bastón Elegante', category: 'accessories', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'acc_staff', name: 'Bastón Mágico', category: 'accessories', price: 200, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'acc_cape', name: 'Capa Heroica', category: 'accessories', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },

  // Special - Especiales (10 items)
  { id: 'special_wings', name: 'Alas de Ángel', category: 'special', price: 150, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffffff' },
  { id: 'special_horns', name: 'Cuernos de Demonio', category: 'special', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'special_tail', name: 'Cola Mágica', category: 'special', price: 130, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'special_halo', name: 'Halo Sagrado', category: 'special', price: 160, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'special_aura', name: 'Aura Luminosa', category: 'special', price: 180, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'special_smoke', name: 'Efecto Humo', category: 'special', price: 170, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'special_fox_ears', name: 'Orejas de Zorro', category: 'special', price: 125, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'special_cat_ears', name: 'Orejas de Gato', category: 'special', price: 115, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'special_fairy_wings', name: 'Alas de Hada', category: 'special', price: 145, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'special_demon_tail', name: 'Cola de Demonio', category: 'special', price: 135, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b21a8' },

  // Effects - Efectos (15 items)
  { id: 'effects_sparkle', name: 'Chispas Mágicas', category: 'effects', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'effects_hearts', name: 'Lluvia de Corazones', category: 'effects', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'effects_stars', name: 'Lluvia de Estrellas', category: 'effects', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'effects_rainbow', name: 'Arco Iris', category: 'effects', price: 90, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
  { id: 'effects_fire', name: 'Fuego Místico', category: 'effects', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'effects_ice', name: 'Efecto Hielo', category: 'effects', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'effects_glow', name: 'Brillo Celestial', category: 'effects', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'effects_shadow', name: 'Sombra Oscura', category: 'effects', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'effects_aurora', name: 'Aurora Boreal', category: 'effects', price: 130, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#10b981' },
  { id: 'effects_lightning', name: 'Relámpago', category: 'effects', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'effects_bubble', name: 'Burbujas Mágicas', category: 'effects', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'effects_smoke_purple', name: 'Humo Púrpura', category: 'effects', price: 95, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'effects_snowflake', name: 'Copos de Nieve', category: 'effects', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#e0f2fe' },
  { id: 'effects_flower', name: 'Flores Volantes', category: 'effects', price: 105, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'effects_cosmic', name: 'Efecto Cósmico', category: 'effects', price: 150, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#7c3aed' },
];

const RewardsPage: React.FC = () => {
  const { avatarState: globalAvatarState, setAvatarState: setGlobalAvatarState } = useAvatar();
  const [coins, setCoins] = useState(250);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#1f2937');
  const [unlockedItems, setUnlockedItems] = useState<Set<string>>(
    new Set(MOCK_ITEMS.filter((item) => item.isUnlocked).map((item) => item.id))
  );
  const [avatarState, setAvatarState] = useState<AvatarState>({
    skin: 'skin_light',
    body: 'body_slim',
    hair: 'hair_short',
    hairAcc: '',
    eyes: 'eyes_open',
    eyebrows: 'eyebrows_normal',
    mouth: 'mouth_smile',
    top: 'top_tshirt',
    jacket: '',
    bottom: 'bottom_pants',
    shoes: 'shoes_sneakers',
    socks: 'socks_plain',
    hat: '',
    glasses: '',
    jewelry: '',
    accessories: '',
    special: '',
    effects: '',
  });
  // Saved state - this is what gets persisted
  const [savedAvatarState, setSavedAvatarState] = useState<AvatarState>(avatarState);
  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    item: CustomizationItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  // Initialize first category
  React.useEffect(() => {
    const firstCategory = Object.keys(CATEGORY_INFO)[0];
    setSelectedCategory(firstCategory);
  }, []);

  // Get available categories from items
  const availableCategories = useMemo(
    () => Array.from(new Set(MOCK_ITEMS.map((item) => item.category))),
    []
  );

  // Get items for selected category with unlocked status
  const categoryItems = useMemo(
    () => selectedCategory 
      ? MOCK_ITEMS
          .filter((item) => item.category === selectedCategory)
          .map((item) => ({
            ...item,
            isUnlocked: unlockedItems.has(item.id),
          }))
      : [],
    [selectedCategory, unlockedItems]
  );

  // Get equipped item for current category
  const equippedItemId = selectedCategory ? avatarState[selectedCategory] : null;

  // Get selected category info to check if it allows colors
  const currentCategoryAllowsColor = selectedCategory
    ? CATEGORY_INFO[selectedCategory]?.allowsColor ?? false
    : false;

  // Get currently selected item to check if it allows color
  const currentSelectedItem = selectedCategory && equippedItemId
    ? MOCK_ITEMS.find(item => item.id === equippedItemId)
    : null;

  // Only show color palette if both category and selected item allow color
  const showColorPalette = currentCategoryAllowsColor && currentSelectedItem?.allowsColor;

  // Handle item selection (free or already owned)
  const handleItemSelect = (item: CustomizationItem) => {
    if (selectedCategory) {
      setAvatarState((prev) => ({
        ...prev,
        [selectedCategory]: item.id,
      }));
      // If the item allows color and has a default, set it
      if (item.allowsColor && item.defaultColor) {
        setSelectedColor(item.defaultColor);
      }
    }
  };

  // Handle item removal
  const handleItemRemove = (itemId: string) => {
    if (selectedCategory) {
      // Remove the item by setting to null or default
      setAvatarState((prev) => ({
        ...prev,
        [selectedCategory]: '',
      }));
    }
  };

  // Handle buy click
  const handleBuyClick = (item: CustomizationItem) => {
    setPurchaseModal({
      isOpen: true,
      item,
    });
  };

  // Handle purchase confirmation
  const handlePurchaseConfirm = (item: CustomizationItem) => {
    if (coins >= item.price) {
      // Deduct coins
      setCoins((prev) => prev - item.price);
      
      // Mark item as unlocked
      setUnlockedItems((prev) => new Set([...prev, item.id]));
      
      // Equip the item
      if (selectedCategory) {
        setAvatarState((prev) => ({
          ...prev,
          [selectedCategory]: item.id,
        }));
        if (item.allowsColor && item.defaultColor) {
          setSelectedColor(item.defaultColor);
        }
      }
    }
  };

  // Handle save button - saves current changes to persistent state
  const handleSave = () => {
    setSavedAvatarState(avatarState);
    // Also save to global context for use in other pages
    setGlobalAvatarState(avatarState);
  };

  // Handle delete button - reverts to last saved state
  const handleDiscard = () => {
    setAvatarState(savedAvatarState);
  };

  return (
    <>
      <OrientationAlert />
      <div className={styles.page}>
        <div className={styles.container}>
          {/* Left Column: Avatar Display */}
          <div className={styles.leftColumn}>
            {/* Avatar Display */}
            <div className={styles.avatarSection}>
              {/* Coins Display - Floating Top */}
              <div className={styles.coinsDisplay}>
                <span className={styles.coinsIcon}>💰</span>
                <span className={styles.coinsAmount}>{coins}</span>
              </div>

              <div className={styles.avatarContainer}>
                <ChibiAvatar
                  eyeState="open"
                  mouthState="smile"
                  topId={avatarState.top}
                  bottomId={avatarState.bottom}
                  shoesId={avatarState.shoes}
                  size="lg"
                  isBlinking={true}
                  isBreathing={true}
                />
              </div>

              {/* Action Buttons - Floating Bottom */}
              <div className={styles.actionButtons}>
                {/* Save Button - Green with Checkmark */}
                <button
                  className={styles.saveButton}
                  onClick={handleSave}
                  title="Guardar cambios"
                  aria-label="Guardar cambios"
                >
                  ✓
                </button>

                {/* Delete Button - Red with Trash */}
                <button
                  className={styles.deleteButton}
                  onClick={handleDiscard}
                  title="Descartar cambios"
                  aria-label="Descartar cambios"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Colors, Categories, Items */}
          <div className={styles.rightPanel}>
            {/* Color Palette - Only show if selected item allows color */}
            {showColorPalette && (
              <div className={styles.colorSection}>
                <ColorPalette
                  onColorSelect={setSelectedColor}
                  selectedColor={selectedColor}
                  isVisible={showColorPalette}
                />
              </div>
            )}

            {/* Category Panel */}
            <div className={styles.categorySection}>
              <CategoryPanel
                categories={availableCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* Item Variants */}
            <div className={styles.itemsSection}>
              <ItemVariants
                items={categoryItems}
                equippedItemId={equippedItemId}
                onItemSelect={handleItemSelect}
                onItemRemove={handleItemRemove}
                onBuyClick={handleBuyClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        item={purchaseModal.item}
        isOpen={purchaseModal.isOpen}
        onClose={() => setPurchaseModal({ isOpen: false, item: null })}
        onConfirm={handlePurchaseConfirm}
        coins={coins}
      />
    </>
  );
};

export default RewardsPage;
