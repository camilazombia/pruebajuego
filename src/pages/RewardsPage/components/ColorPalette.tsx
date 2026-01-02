import React from 'react';
import styles from './ColorPalette.module.css';
import { COLOR_PALETTE } from '../types';

interface ColorPaletteProps {
  onColorSelect: (colorHex: string) => void;
  selectedColor: string;
  isVisible: boolean;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  onColorSelect,
  selectedColor,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Colores</h3>
      <div className={styles.palette}>
        {COLOR_PALETTE.map((color) => (
          <button
            key={color.id}
            className={`${styles.colorButton} ${selectedColor === color.hex ? styles.selected : ''}`}
            data-color={color.hex}
            onClick={() => onColorSelect(color.hex)}
            title={color.name}
            aria-label={`Seleccionar color ${color.name}`}
          >
            {selectedColor === color.hex && <span className={styles.checkmark}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
