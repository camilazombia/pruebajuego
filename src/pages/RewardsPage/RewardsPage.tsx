import React, { useState, useMemo, useCallback } from 'react';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ColorPalette, CategoryPanel, ItemVariants, PurchaseModal } from './components';
import { CATEGORY_INFO, type CustomizationItem, type AvatarState } from './types';
import { useAvatar } from '../../app/providers/AvatarProvider';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { PurchaseConfetti } from './components/PurchaseConfetti';
import styles from './RewardsPage.module.css';

const MOCK_ITEMS: CustomizationItem[] = [
  { id: 'skin_light', name: 'Piel Clara', category: 'skin', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#fdbcb4' },
  { id: 'skin_medium', name: 'Piel Media', category: 'skin', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#d4a574' },
  { id: 'skin_dark', name: 'Piel Oscura', category: 'skin', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#8b6f47' },
  { id: 'skin_teal', name: 'Piel Alien', category: 'skin', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#06b6d4' },
  { id: 'skin_olive', name: 'Piel Oliva', category: 'skin', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#7c9c59' },
  { id: 'skin_peach', name: 'Piel Durazno', category: 'skin', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffa07a' },
  { id: 'skin_rose', name: 'Piel Rosada', category: 'skin', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffb3ba' },
  { id: 'skin_golden', name: 'Piel Dorada', category: 'skin', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },
  { id: 'skin_purple', name: 'Piel Purpura', category: 'skin', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#d8b3ff' },
  { id: 'skin_blue', name: 'Piel Azul', category: 'skin', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#87ceeb' },

  { id: 'body_slim', name: 'Cuerpo Delgado', category: 'body', price: 0, isUnlocked: true, isEquipped: true, allowsColor: false },
  { id: 'body_average', name: 'Cuerpo Normal', category: 'body', price: 25, isUnlocked: true, isEquipped: false, allowsColor: false },
  { id: 'body_athletic', name: 'Cuerpo Atletico', category: 'body', price: 50, isUnlocked: true, isEquipped: false, allowsColor: false },
  { id: 'body_curvy', name: 'Cuerpo Curvi', category: 'body', price: 50, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_chubby', name: 'Cuerpo Redondeado', category: 'body', price: 40, isUnlocked: false, isEquipped: false, allowsColor: false },
  { id: 'body_muscular', name: 'Cuerpo Musculoso', category: 'body', price: 75, isUnlocked: false, isEquipped: false, allowsColor: false },

  { id: 'hair_short', name: 'Cabello Corto', category: 'hair', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'hair_long', name: 'Cabello Largo', category: 'hair', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'hair_curly', name: 'Cabello Rizado', category: 'hair', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#b45309' },
  { id: 'hair_wavy', name: 'Cabello Ondulado', category: 'hair', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#d97706' },
  { id: 'hair_spiky', name: 'Cabello Puntiagudo', category: 'hair', price: 80, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'hair_braid', name: 'Trenza', category: 'hair', price: 75, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'hair_pigtails', name: 'Coletas', category: 'hair', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fbbf24' },
  { id: 'hair_afro', name: 'Cabello Afro', category: 'hair', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#8b4513' },

  { id: 'eyes_open', name: 'Ojos Abiertos', category: 'eyes', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'eyes_sparkle', name: 'Ojos Brillantes', category: 'eyes', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#0ea5e9' },
  { id: 'eyes_stars', name: 'Ojos Estrellas', category: 'eyes', price: 100, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'eyes_hearts', name: 'Ojos Corazones', category: 'eyes', price: 120, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },

  { id: 'eyebrows_normal', name: 'Cejas Normales', category: 'eyebrows', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'eyebrows_thick', name: 'Cejas Gruesas', category: 'eyebrows', price: 25, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#3b2414' },
  { id: 'eyebrows_angry', name: 'Cejas Enfadadas', category: 'eyebrows', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },

  { id: 'mouth_smile', name: 'Sonrisa', category: 'mouth', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'mouth_laugh', name: 'Risa Grande', category: 'mouth', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'mouth_kiss', name: 'Beso', category: 'mouth', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'mouth_tongue', name: 'Sacando Lengua', category: 'mouth', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },

  { id: 'top_tshirt', name: 'Camiseta Basica', category: 'top', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'top_red_shirt', name: 'Camiseta Roja', category: 'top', price: 0, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'top_shirt', name: 'Camisa Elegante', category: 'top', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'top_sweater', name: 'Sueter', category: 'top', price: 60, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'top_hoodie', name: 'Sudadera con Capucha', category: 'top', price: 80, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'top_crop', name: 'Top Corto', category: 'top', price: 45, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'top_sports', name: 'Top Deportivo', category: 'top', price: 55, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#059669' },
  { id: 'top_sequin', name: 'Top Lentejuelas', category: 'top', price: 95, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  { id: 'bottom_pants', name: 'Pantalones', category: 'bottom', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#3b82f6' },
  { id: 'bottom_jeans', name: 'Jeans', category: 'bottom', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1e3a8a' },
  { id: 'bottom_shorts', name: 'Shorts', category: 'bottom', price: 25, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },
  { id: 'bottom_skirt', name: 'Falda', category: 'bottom', price: 45, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'bottom_leggings', name: 'Leggings', category: 'bottom', price: 40, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'bottom_tutu', name: 'Tutu', category: 'bottom', price: 85, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ec4899' },

  { id: 'shoes_sneakers', name: 'Zapatillas', category: 'shoes', price: 0, isUnlocked: true, isEquipped: true, allowsColor: true, defaultColor: '#ffffff' },
  { id: 'shoes_boots', name: 'Botas', category: 'shoes', price: 50, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'shoes_sandals', name: 'Sandalias', category: 'shoes', price: 30, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#f97316' },
  { id: 'shoes_ballet', name: 'Zapatillas Ballet', category: 'shoes', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#fca5a5' },
  { id: 'shoes_sparkly', name: 'Zapatos Brillantes', category: 'shoes', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffd700' },

  { id: 'hat_beanie', name: 'Gorro Invierno', category: 'hat', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'hat_cap', name: 'Gorra', category: 'hat', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#2c47d5' },
  { id: 'hat_crown', name: 'Corona Real', category: 'hat', price: 150, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'hat_witch', name: 'Sombrero de Bruja', category: 'hat', price: 100, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'hat_viking', name: 'Casco Vikingo', category: 'hat', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#c0c0c0' },

  { id: 'glasses_sunglasses', name: 'Gafas de Sol', category: 'glasses', price: 40, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#1f2937' },
  { id: 'glasses_nerd', name: 'Gafas Nerd', category: 'glasses', price: 35, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#6b7280' },
  { id: 'glasses_heart', name: 'Gafas Corazon', category: 'glasses', price: 60, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'glasses_star', name: 'Gafas Estrella', category: 'glasses', price: 70, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },

  { id: 'special_wings', name: 'Alas de Angel', category: 'special', price: 150, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#ffffff' },
  { id: 'special_horns', name: 'Cuernos de Demonio', category: 'special', price: 140, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'special_halo', name: 'Halo Sagrado', category: 'special', price: 160, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#f7c62f' },
  { id: 'special_fox_ears', name: 'Orejas de Zorro', category: 'special', price: 125, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'special_cat_ears', name: 'Orejas de Gato', category: 'special', price: 115, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#92400e' },
  { id: 'special_fairy_wings', name: 'Alas de Hada', category: 'special', price: 145, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },

  { id: 'acc_staff', name: 'Baston Magico', category: 'accessories', price: 200, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
  { id: 'acc_cape', name: 'Capa Heroica', category: 'accessories', price: 110, isUnlocked: false, isEquipped: false, allowsColor: true, defaultColor: '#dc2626' },
  { id: 'acc_scarf', name: 'Bufanda', category: 'accessories', price: 45, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#ef4444' },
  { id: 'acc_bag', name: 'Mochila', category: 'accessories', price: 75, isUnlocked: true, isEquipped: false, allowsColor: true, defaultColor: '#a855f7' },
];

const RewardsPage: React.FC = () => {
  const { avatarState: globalAvatarState, setAvatarState: setGlobalAvatarState } = useAvatar();
  const { magicCoins, spendMagicCoins, unlockItem, isItemUnlocked } = useProgressStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#1f2937');
  const [showConfetti, setShowConfetti] = useState(false);
  const [purchaseToast, setPurchaseToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [avatarState, setAvatarState] = useState<AvatarState>(() => ({
    skin: globalAvatarState.skin || 'skin_light',
    body: globalAvatarState.body || 'body_slim',
    hair: globalAvatarState.hair || 'hair_short',
    hairAcc: globalAvatarState.hairAcc || '',
    eyes: globalAvatarState.eyes || 'eyes_open',
    eyebrows: globalAvatarState.eyebrows || 'eyebrows_normal',
    mouth: globalAvatarState.mouth || 'mouth_smile',
    top: globalAvatarState.top || 'top_tshirt',
    jacket: globalAvatarState.jacket || '',
    bottom: globalAvatarState.bottom || 'bottom_pants',
    shoes: globalAvatarState.shoes || 'shoes_sneakers',
    socks: globalAvatarState.socks || 'socks_plain',
    hat: globalAvatarState.hat || '',
    glasses: globalAvatarState.glasses || '',
    jewelry: globalAvatarState.jewelry || '',
    accessories: globalAvatarState.accessories || '',
    special: globalAvatarState.special || '',
    effects: globalAvatarState.effects || '',
  }));

  const [savedAvatarState, setSavedAvatarState] = useState<AvatarState>(avatarState);

  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    item: CustomizationItem | null;
  }>({ isOpen: false, item: null });

  React.useEffect(() => {
    const firstCategory = Object.keys(CATEGORY_INFO)[0];
    setSelectedCategory(firstCategory);
  }, []);

  const availableCategories = useMemo(
    () => Array.from(new Set(MOCK_ITEMS.map((item) => item.category))),
    []
  );

  const categoryItems = useMemo(
    () => selectedCategory
      ? MOCK_ITEMS
          .filter((item) => item.category === selectedCategory)
          .map((item) => ({
            ...item,
            isUnlocked: isItemUnlocked(item.id),
          }))
      : [],
    [selectedCategory, isItemUnlocked]
  );

  const equippedItemId = selectedCategory ? avatarState[selectedCategory] : null;

  const currentCategoryAllowsColor = selectedCategory
    ? CATEGORY_INFO[selectedCategory]?.allowsColor ?? false
    : false;

  const currentSelectedItem = selectedCategory && equippedItemId
    ? MOCK_ITEMS.find(item => item.id === equippedItemId)
    : null;

  const showColorPalette = currentCategoryAllowsColor && currentSelectedItem?.allowsColor;

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setPurchaseToast({ message, type });
    setTimeout(() => setPurchaseToast(null), 3000);
  }, []);

  const handleItemSelect = (item: CustomizationItem) => {
    if (selectedCategory) {
      setAvatarState((prev) => ({ ...prev, [selectedCategory]: item.id }));
      if (item.allowsColor && item.defaultColor) {
        setSelectedColor(item.defaultColor);
      }
    }
  };

  const handleItemRemove = (_itemId: string) => {
    if (selectedCategory) {
      setAvatarState((prev) => ({ ...prev, [selectedCategory]: '' }));
    }
  };

  const handleBuyClick = (item: CustomizationItem) => {
    setPurchaseModal({ isOpen: true, item });
  };

  const handlePurchaseConfirm = (item: CustomizationItem) => {
    const success = spendMagicCoins(item.price);

    if (success) {
      unlockItem(item.id);

      if (selectedCategory) {
        const newState = { ...avatarState, [selectedCategory]: item.id };
        setAvatarState(newState);
        setSavedAvatarState(newState);
        setGlobalAvatarState(newState);
        if (item.allowsColor && item.defaultColor) {
          setSelectedColor(item.defaultColor);
        }
      }

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
      showToast('Nuevo item desbloqueado!', 'success');
    } else {
      showToast('Necesitamos mas monedas. A jugar!', 'error');
    }
  };

  const handleSave = () => {
    setSavedAvatarState(avatarState);
    setGlobalAvatarState(avatarState);
    showToast('Cambios guardados!', 'success');
  };

  const handleDiscard = () => {
    setAvatarState(savedAvatarState);
  };

  return (
    <>
      <OrientationAlert />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <div className={styles.avatarSection}>
              <div className={styles.coinsDisplay}>
                <span className={styles.coinsIcon}>&#129689;</span>
                <span className={styles.coinsAmount}>{magicCoins}</span>
              </div>

              <div className={styles.avatarContainer}>
                {showConfetti && <PurchaseConfetti />}
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

              <div className={styles.actionButtons}>
                <button
                  className={styles.saveButton}
                  onClick={handleSave}
                  title="Guardar cambios"
                  aria-label="Guardar cambios"
                >
                  &#10003;
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleDiscard}
                  title="Descartar cambios"
                  aria-label="Descartar cambios"
                >
                  &#128465;
                </button>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            {showColorPalette && (
              <div className={styles.colorSection}>
                <ColorPalette
                  onColorSelect={setSelectedColor}
                  selectedColor={selectedColor}
                  isVisible={showColorPalette}
                />
              </div>
            )}

            <div className={styles.categorySection}>
              <CategoryPanel
                categories={availableCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

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

        {/* Toast de compra */}
        {purchaseToast && (
          <div className={`${styles.purchaseToast} ${purchaseToast.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
            <span className={styles.toastIcon}>
              {purchaseToast.type === 'success' ? '\u2728' : '\uD83D\uDCD6'}
            </span>
            <p className={styles.toastText}>{purchaseToast.message}</p>
          </div>
        )}
      </div>

      <PurchaseModal
        item={purchaseModal.item}
        isOpen={purchaseModal.isOpen}
        onClose={() => setPurchaseModal({ isOpen: false, item: null })}
        onConfirm={handlePurchaseConfirm}
        coins={magicCoins}
      />
    </>
  );
};

export default RewardsPage;
