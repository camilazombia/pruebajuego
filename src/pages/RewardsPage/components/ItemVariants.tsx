import React from 'react';
import { getPreviewUrl, type DiceBearAvatarOptions } from '../../../shared/utils/dicebearAvatar';
import styles from './ItemVariants.module.css';
import type { CustomizationItem } from '../types';

const DICEBEAR_CATEGORIES = new Set([
  'skin', 'hair', 'eyes', 'eyebrows', 'mouth', 'glasses', 'special',
]);

interface ItemVariantsProps {
  items: CustomizationItem[];
  equippedItemId: string | null;
  currentAvatarOpts?: DiceBearAvatarOptions;
  onItemSelect: (item: CustomizationItem) => void;
  onItemRemove: (itemId: string) => void;
  onBuyClick: (item: CustomizationItem) => void;
}

export const ItemVariants: React.FC<ItemVariantsProps> = ({
  items,
  equippedItemId,
  currentAvatarOpts,
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
        const hasDiceBearPreview = DICEBEAR_CATEGORIES.has(item.category) && currentAvatarOpts;

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
              {hasDiceBearPreview ? (
                <img
                  className={styles.previewImg}
                  src={getPreviewUrl(item.category, item.id, currentAvatarOpts!, 96)}
                  alt={item.name}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span className={styles.itemLabel}>{item.name}</span>
                </div>
              )}
            </div>

            {isLocked && (
              <div className={styles.priceOverlay}>
                <div className={styles.priceIcon}>&#129689;</div>
                <div className={styles.priceAmount}>{item.price}</div>
              </div>
            )}

            {isOwned && isEquipped && (
              <div className={styles.statusBadge + ' ' + styles.badgeEquipped}>
                &#10003; Puesto
              </div>
            )}

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
