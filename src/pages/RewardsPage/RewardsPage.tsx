import React, { useState, useMemo, useCallback } from 'react';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ColorPalette, CategoryPanel, ItemVariants, PurchaseModal } from './components';
import { CATEGORY_INFO, type CustomizationItem, type AvatarState } from './types';
import { useAvatar } from '../../app/providers/AvatarProvider';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { PurchaseConfetti } from './components/PurchaseConfetti';
import type { DiceBearAvatarOptions } from '../../shared/utils/dicebearAvatar';
import styles from './RewardsPage.module.css';

const MOCK_ITEMS: CustomizationItem[] = [
  // ── Piel (skinColor en DiceBear) ──
  { id: 'skin_light', name: 'Piel Clara', category: 'skin', price: 0, isUnlocked: true, isEquipped: true },
  { id: 'skin_medium', name: 'Piel Media', category: 'skin', price: 30, isUnlocked: true, isEquipped: false },
  { id: 'skin_dark', name: 'Piel Oscura', category: 'skin', price: 30, isUnlocked: true, isEquipped: false },
  { id: 'skin_olive', name: 'Piel Oliva', category: 'skin', price: 35, isUnlocked: true, isEquipped: false },
  { id: 'skin_peach', name: 'Piel Durazno', category: 'skin', price: 40, isUnlocked: false, isEquipped: false },
  { id: 'skin_rose', name: 'Piel Rosada', category: 'skin', price: 45, isUnlocked: false, isEquipped: false },
  { id: 'skin_golden', name: 'Piel Dorada', category: 'skin', price: 80, isUnlocked: false, isEquipped: false },
  { id: 'skin_purple', name: 'Piel Purpura', category: 'skin', price: 120, isUnlocked: false, isEquipped: false },
  { id: 'skin_blue', name: 'Piel Azul', category: 'skin', price: 110, isUnlocked: false, isEquipped: false },
  { id: 'skin_teal', name: 'Piel Alien', category: 'skin', price: 100, isUnlocked: false, isEquipped: false },

  // ── Cabello (hair + hairColor en DiceBear) ──
  { id: 'hair_short', name: 'Cabello Corto', category: 'hair', price: 0, isUnlocked: true, isEquipped: true },
  { id: 'hair_long', name: 'Cabello Largo', category: 'hair', price: 40, isUnlocked: true, isEquipped: false },
  { id: 'hair_curly', name: 'Cabello Rizado', category: 'hair', price: 50, isUnlocked: true, isEquipped: false },
  { id: 'hair_wavy', name: 'Cabello Ondulado', category: 'hair', price: 60, isUnlocked: true, isEquipped: false },
  { id: 'hair_spiky', name: 'Cabello Puntiagudo', category: 'hair', price: 80, isUnlocked: false, isEquipped: false },
  { id: 'hair_braid', name: 'Trenza', category: 'hair', price: 75, isUnlocked: false, isEquipped: false },
  { id: 'hair_pigtails', name: 'Coletas', category: 'hair', price: 55, isUnlocked: false, isEquipped: false },
  { id: 'hair_afro', name: 'Cabello Afro', category: 'hair', price: 70, isUnlocked: false, isEquipped: false },

  // ── Ojos (eyes variant en DiceBear) ──
  { id: 'eyes_open', name: 'Ojos Abiertos', category: 'eyes', price: 0, isUnlocked: true, isEquipped: true },
  { id: 'eyes_sparkle', name: 'Ojos Brillantes', category: 'eyes', price: 40, isUnlocked: true, isEquipped: false },
  { id: 'eyes_stars', name: 'Ojos Estrellas', category: 'eyes', price: 100, isUnlocked: true, isEquipped: false },
  { id: 'eyes_hearts', name: 'Ojos Corazones', category: 'eyes', price: 120, isUnlocked: false, isEquipped: false },

  // ── Cejas (eyebrows variant en DiceBear) ──
  { id: 'eyebrows_normal', name: 'Cejas Normales', category: 'eyebrows', price: 0, isUnlocked: true, isEquipped: true },
  { id: 'eyebrows_thick', name: 'Cejas Gruesas', category: 'eyebrows', price: 25, isUnlocked: true, isEquipped: false },
  { id: 'eyebrows_angry', name: 'Cejas Enfadadas', category: 'eyebrows', price: 35, isUnlocked: true, isEquipped: false },

  // ── Boca (mouth variant en DiceBear) ──
  { id: 'mouth_smile', name: 'Sonrisa', category: 'mouth', price: 0, isUnlocked: true, isEquipped: true },
  { id: 'mouth_laugh', name: 'Risa Grande', category: 'mouth', price: 30, isUnlocked: true, isEquipped: false },
  { id: 'mouth_kiss', name: 'Beso', category: 'mouth', price: 50, isUnlocked: true, isEquipped: false },
  { id: 'mouth_tongue', name: 'Sacando Lengua', category: 'mouth', price: 70, isUnlocked: false, isEquipped: false },

  // ── Gafas (glasses variant en DiceBear) ──
  { id: 'glasses_sunglasses', name: 'Gafas de Sol', category: 'glasses', price: 40, isUnlocked: true, isEquipped: false },
  { id: 'glasses_nerd', name: 'Gafas Nerd', category: 'glasses', price: 35, isUnlocked: true, isEquipped: false },
  { id: 'glasses_heart', name: 'Gafas Corazon', category: 'glasses', price: 60, isUnlocked: false, isEquipped: false },
  { id: 'glasses_star', name: 'Gafas Estrella', category: 'glasses', price: 70, isUnlocked: false, isEquipped: false },

  // ── Especiales (earrings / features en DiceBear) ──
  { id: 'special_fox_ears', name: 'Orejas de Zorro', category: 'special', price: 125, isUnlocked: false, isEquipped: false },
  { id: 'special_cat_ears', name: 'Orejas de Gato', category: 'special', price: 115, isUnlocked: false, isEquipped: false },
  { id: 'special_halo', name: 'Halo Sagrado', category: 'special', price: 160, isUnlocked: false, isEquipped: false },
  { id: 'special_horns', name: 'Cuernos de Demonio', category: 'special', price: 140, isUnlocked: false, isEquipped: false },
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
    hair: globalAvatarState.hair || 'hair_short',
    eyes: globalAvatarState.eyes || 'eyes_open',
    eyebrows: globalAvatarState.eyebrows || 'eyebrows_normal',
    mouth: globalAvatarState.mouth || 'mouth_smile',
    glasses: globalAvatarState.glasses || '',
    special: globalAvatarState.special || '',
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

  const currentAvatarOpts: DiceBearAvatarOptions = useMemo(() => ({
    skin: avatarState.skin,
    hair: avatarState.hair,
    eyes: avatarState.eyes,
    eyebrows: avatarState.eyebrows,
    mouth: avatarState.mouth,
    glasses: avatarState.glasses,
    special: avatarState.special,
  }), [avatarState]);

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
        setGlobalAvatarState({ ...globalAvatarState, ...newState });
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
    setGlobalAvatarState({ ...globalAvatarState, ...avatarState });
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
                  skinId={avatarState.skin}
                  hairId={avatarState.hair}
                  eyesId={avatarState.eyes}
                  eyebrowsId={avatarState.eyebrows}
                  mouthId={avatarState.mouth}
                  glassesId={avatarState.glasses}
                  specialId={avatarState.special}
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
                currentAvatarOpts={currentAvatarOpts}
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
