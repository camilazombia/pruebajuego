import React, { useState, useEffect, useMemo } from 'react';
import { buildDiceBearUrl } from '../../shared/utils/dicebearAvatar';
import styles from './ChibiAvatar.module.css';

/**
 * Cambiar a `false` para volver a los SVGs locales originales.
 */
const USE_DICEBEAR = true;

export interface ChibiAvatarProps {
  eyeState?: 'open' | 'closed' | 'blink';
  mouthState?: 'neutral' | 'smile';
  animationMode?: 'idle' | 'walk' | 'celebrate';

  topId?: string;
  bottomId?: string;
  shoesId?: string;
  accessories?: string[];

  skinId?: string;
  hairId?: string;
  eyesId?: string;
  eyebrowsId?: string;
  mouthId?: string;
  glassesId?: string;
  hatId?: string;
  specialId?: string;

  isBlinking?: boolean;
  isBreathing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

const SIZE_PX: Record<string, number> = { sm: 120, md: 200, lg: 300 };

export const ChibiAvatar: React.FC<ChibiAvatarProps> = ({
  eyeState = 'open',
  mouthState = 'neutral',
  topId = 'top_red_shirt',
  bottomId = 'bottom_pants',
  shoesId = 'shoes_sneakers',
  accessories = [],
  skinId,
  hairId,
  eyesId,
  eyebrowsId,
  mouthId,
  glassesId,
  specialId,
  isBlinking = false,
  isBreathing = false,
  size = 'md',
  animationMode = 'idle',
  showBackground = true,
}) => {
  const [currentEyeState, setCurrentEyeState] = useState<'open' | 'closed'>(
    eyeState === 'open' ? 'open' : 'closed'
  );

  useEffect(() => {
    if (!isBlinking) return;
    const blinkInterval = setInterval(() => {
      setCurrentEyeState('closed');
      setTimeout(() => setCurrentEyeState('open'), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, [isBlinking]);

  const sizeClass = { sm: styles.sizeSm, md: styles.sizeMd, lg: styles.sizeLg }[size];
  const animationClass =
    animationMode === 'walk'
      ? styles.walk
      : animationMode === 'celebrate'
        ? styles.celebrate
        : '';
  const breathingClass = isBreathing && animationMode === 'idle' ? styles.breathing : '';
  const containerClass = `${styles.container} ${sizeClass} ${breathingClass} ${animationClass}`;

  const diceBearUrl = useMemo(
    () =>
      buildDiceBearUrl(
        {
          skin: skinId,
          hair: hairId,
          eyes: eyesId || (currentEyeState === 'closed' ? 'eyes_sparkle' : undefined),
          eyebrows: eyebrowsId,
          mouth: mouthId || (mouthState === 'smile' ? 'mouth_smile' : 'mouth_laugh'),
          glasses: glassesId,
          special: specialId,
          top: topId,
          bottom: bottomId,
        },
        SIZE_PX[size] ?? 200
      ),
    [skinId, hairId, eyesId, eyebrowsId, mouthId, glassesId, specialId, topId, bottomId, size, currentEyeState, mouthState]
  );

  if (USE_DICEBEAR) {
    return (
      <div className={containerClass}>
        {showBackground && <div className={styles.softBg} />}
        <img
          className={styles.diceBearImg}
          src={diceBearUrl}
          alt="Avatar del explorador"
          draggable={false}
        />
      </div>
    );
  }

  /* ── Fallback: SVGs locales originales ────────────────────────── */
  const layerClass = styles.layer;

  return (
    <div className={containerClass}>
      <img className={layerClass} src="/assets/avatar/base/hair/hair_back.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/head.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/torso.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/arm_left.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/arm_right.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/leg_left.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/body/leg_right.svg" alt="" />
      <img className={layerClass} src="/assets/avatar/base/hair/hair_front.svg" alt="" />

      {currentEyeState === 'open' ? (
        <img className={`${layerClass} ${styles.eyesLayer}`} src="/assets/avatar/base/eyes/eyes_open.svg" alt="" />
      ) : (
        <img className={`${layerClass} ${styles.eyesLayer}`} src="/assets/avatar/base/eyes/eyes_closed.svg" alt="" />
      )}

      {mouthState === 'smile' ? (
        <img className={`${layerClass} ${styles.mouthLayer}`} src="/assets/avatar/base/mouth/mouth_smile.svg" alt="" />
      ) : (
        <img className={`${layerClass} ${styles.mouthLayer}`} src="/assets/avatar/base/mouth/mouth_neutral.svg" alt="" />
      )}

      {topId === 'top_red_shirt' && (
        <img className={`${layerClass} ${styles.topLayer}`} src="/assets/avatar/clothing/tops/top_red_shirt.svg" alt="" />
      )}
      {topId === 'top_sweater' && (
        <img className={`${layerClass} ${styles.topLayer}`} src="/assets/avatar/clothing/tops/top_sweater.svg" alt="" />
      )}
      {bottomId === 'bottom_pants' && (
        <img className={`${layerClass} ${styles.bottomLayer}`} src="/assets/avatar/clothing/bottoms/bottom_pants.svg" alt="" />
      )}
      {bottomId === 'bottom_shorts' && (
        <img className={`${layerClass} ${styles.bottomLayer}`} src="/assets/avatar/clothing/bottoms/bottom_shorts.svg" alt="" />
      )}
      {shoesId === 'shoes_sneakers' && (
        <img className={`${layerClass} ${styles.shoesLayer}`} src="/assets/avatar/clothing/shoes/shoes_sneakers.svg" alt="" />
      )}
      {shoesId === 'shoes_boots' && (
        <img className={`${layerClass} ${styles.shoesLayer}`} src="/assets/avatar/clothing/shoes/shoes_boots.svg" alt="" />
      )}
      {accessories.includes('acc_beanie') && (
        <img className={layerClass} src="/assets/avatar/accessories/acc_beanie.svg" alt="" />
      )}
      {accessories.includes('acc_glasses') && (
        <img className={layerClass} src="/assets/avatar/accessories/acc_glasses.svg" alt="" />
      )}
    </div>
  );
};
