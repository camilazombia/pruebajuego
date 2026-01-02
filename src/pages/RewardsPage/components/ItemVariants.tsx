import React from 'react';
import styles from './ItemVariants.module.css';
import type { CustomizationItem } from '../types';

interface ItemVariantsProps {
  items: CustomizationItem[];
  equippedItemId: string | null;
  onItemSelect: (item: CustomizationItem) => void;
  onItemRemove: (itemId: string) => void;
  onBuyClick: (item: CustomizationItem) => void;
}

export const ItemVariants: React.FC<ItemVariantsProps> = ({
  items,
  equippedItemId,
  onItemSelect,
  onItemRemove,
  onBuyClick,
}) => {
  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay items disponibles en esta categoría</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const isEquipped = equippedItemId === item.id;
        const isFree = item.price === 0;
        const isPurchased = item.isUnlocked;

        return (
          <div
            key={item.id}
            className={`${styles.card} ${isEquipped ? styles.equipped : ''}`}
            onClick={() => {
              // If item is purchased or free, select it
              if (isPurchased || isFree) {
                onItemSelect(item);
              } else {
                // If not purchased, show buy modal
                onBuyClick(item);
              }
            }}
          >
            {/* Close/Remove Button */}
            {isEquipped && (
              <button
                className={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemRemove(item.id);
                }}
                title="Quitar"
                aria-label={`Quitar ${item.name}`}
              >
                ✕
              </button>
            )}

            {/* Item Image Placeholder */}
            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.icon}>🖼️</span>
              </div>
            </div>

            {/* Price Overlay - Only for locked (not purchased) items */}
            {!isPurchased && !isFree && (
              <div className={styles.priceOverlay}>
                <div className={styles.priceIcon}>💰</div>
                <div className={styles.priceAmount}>{item.price}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
