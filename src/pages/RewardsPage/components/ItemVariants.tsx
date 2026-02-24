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
        <p>No hay items disponibles</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const isEquipped = equippedItemId === item.id;
        const isOwned = item.isUnlocked || item.price === 0;
        const isLocked = !isOwned;

        return (
          <div
            key={item.id}
            className={`${styles.card} ${isEquipped ? styles.equipped : ''} ${isLocked ? styles.locked : ''}`}
            onClick={() => {
              if (isOwned) {
                onItemSelect(item);
              } else {
                onBuyClick(item);
              }
            }}
          >
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

            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.icon}>&#128444;&#65039;</span>
              </div>
            </div>

            {/* Locked: overlay con precio */}
            {isLocked && (
              <div className={styles.priceOverlay}>
                <div className={styles.priceIcon}>&#129689;</div>
                <div className={styles.priceAmount}>{item.price}</div>
              </div>
            )}

            {/* Owned + equipped: badge "Puesto" */}
            {isOwned && isEquipped && (
              <div className={styles.statusBadge + ' ' + styles.badgeEquipped}>
                &#10003; Puesto
              </div>
            )}

            {/* Owned + not equipped: badge "Equipar" */}
            {isOwned && !isEquipped && (
              <div className={styles.statusBadge + ' ' + styles.badgeEquip}>
                Equipar
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
