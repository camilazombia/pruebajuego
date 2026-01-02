import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PurchaseModal.module.css';
import type { CustomizationItem } from '../types';

interface PurchaseModalProps {
  item: CustomizationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: CustomizationItem) => void;
  coins: number;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
  coins,
}) => {
  if (!item) return null;

  const canAfford = coins >= item.price;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={onClose}
              title="Cerrar"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className={styles.modal}>
              {/* Item Image */}
              <div className={styles.imageSection}>
                <div className={styles.imagePlaceholder}>
                  <span>🖼️</span>
                </div>
              </div>

              {/* Item Info */}
              <div className={styles.infoSection}>
                <h2 className={styles.title}>{item.name}</h2>

                {/* Price */}
                <div className={styles.priceSection}>
                  <span className={styles.priceIcon}>💰</span>
                  <span className={styles.priceAmount}>{item.price}</span>
                </div>

                {/* Balance Check */}
                {!canAfford && (
                  <div className={styles.insufficientBalance}>
                    <span>💸 Monedas insuficientes</span>
                    <span className={styles.balanceText}>
                      Tienes: {coins} | Necesitas: {item.price - coins} más
                    </span>
                  </div>
                )}

                {/* Buy Button */}
                <button
                  className={`${styles.buyButton} ${!canAfford ? styles.disabled : ''}`}
                  onClick={() => {
                    if (canAfford) {
                      onConfirm(item);
                      onClose();
                    }
                  }}
                  disabled={!canAfford}
                >
                  <span className={styles.buyIcon}>🛒</span>
                  {canAfford ? 'COMPRAR' : 'SIN MONEDAS'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
