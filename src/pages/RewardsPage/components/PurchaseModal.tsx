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
  const coinsNeeded = item.price - coins;

  const handleConfirm = () => {
    onConfirm(item);
    onClose();
  };

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
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={onClose}
              title="Cerrar"
              aria-label="Cerrar modal"
            >
              &#10005;
            </button>

            <div className={styles.modal}>
              <div className={styles.imageSection}>
                <div className={styles.imagePlaceholder}>
                  <span>&#128444;&#65039;</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.title}>{item.name}</h2>

                <div className={styles.priceSection}>
                  <span className={styles.priceIcon}>&#129689;</span>
                  <span className={styles.priceAmount}>{item.price}</span>
                </div>

                {canAfford ? (
                  <div className={styles.bookMessage}>
                    <span className={styles.bookEmoji}>&#128214;</span>
                    <p className={styles.bookText}>
                      Te va a quedar genial, pequeno mago!
                    </p>
                  </div>
                ) : (
                  <div className={styles.insufficientBalance}>
                    <div className={styles.bookMessageError}>
                      <span className={styles.bookEmoji}>&#128214;</span>
                      <p className={styles.bookText}>
                        Necesitamos {coinsNeeded} monedas mas. Vamos a jugar unos niveles!
                      </p>
                    </div>
                    <span className={styles.balanceText}>
                      Tienes: {coins} &#129689; | Necesitas: {item.price} &#129689;
                    </span>
                  </div>
                )}

                <button
                  className={`${styles.buyButton} ${!canAfford ? styles.disabled : ''}`}
                  onClick={canAfford ? handleConfirm : undefined}
                  disabled={!canAfford}
                >
                  {canAfford ? (
                    <>
                      <span className={styles.buyIcon}>&#10024;</span>
                      COMPRAR
                    </>
                  ) : (
                    <>
                      <span className={styles.buyIcon}>&#128274;</span>
                      MONEDAS INSUFICIENTES
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
