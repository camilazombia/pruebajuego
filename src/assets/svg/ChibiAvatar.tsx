import React, { useState, useEffect } from 'react';
import styles from './ChibiAvatar.module.css';

export interface ChibiAvatarProps {
  // Face expressions
  eyeState?: 'open' | 'closed' | 'blink'; // blink is temporary
  mouthState?: 'neutral' | 'smile';
  
  // Clothing
  topId?: string; // 'top_red_shirt' | 'top_sweater'
  bottomId?: string; // 'bottom_pants' | 'bottom_shorts'
  shoesId?: string; // 'shoes_sneakers' | 'shoes_boots'
  
  // Accessories (optional array)
  accessories?: string[]; // ['acc_beanie', 'acc_glasses']
  
  // Animations
  isBlinking?: boolean;
  isBreathing?: boolean;
  
  // Size
  size?: 'sm' | 'md' | 'lg';
}

export const ChibiAvatar: React.FC<ChibiAvatarProps> = ({
  eyeState = 'open',
  mouthState = 'neutral',
  topId = 'top_red_shirt',
  bottomId = 'bottom_pants',
  shoesId = 'shoes_sneakers',
  accessories = [],
  isBlinking = false,
  isBreathing = false,
  size = 'md',
}) => {
  const [currentEyeState, setCurrentEyeState] = useState<'open' | 'closed'>(eyeState === 'open' ? 'open' : 'closed');

  // Blink animation
  useEffect(() => {
    if (!isBlinking) return;

    const blinkInterval = setInterval(() => {
      setCurrentEyeState('closed');
      setTimeout(() => setCurrentEyeState('open'), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [isBlinking]);

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const layerClass = `${styles.layer}`;

  const containerClass = `${styles.container} ${sizeClass} ${isBreathing ? styles.breathing : ''}`;

  return (
    <div className={containerClass}>
      {/* Hair Back - FIRST (behind everything) */}
      <img className={layerClass} src="/assets/avatar/base/hair/hair_back.svg" alt="Hair Back" />

      {/* Head */}
      <img className={layerClass} src="/assets/avatar/base/body/head.svg" alt="Head" />

      {/* Torso */}
      <img className={layerClass} src="/assets/avatar/base/body/torso.svg" alt="Torso" />

      {/* Arm Left */}
      <img className={layerClass} src="/assets/avatar/base/body/arm_left.svg" alt="Arm Left" />

      {/* Arm Right */}
      <img className={layerClass} src="/assets/avatar/base/body/arm_right.svg" alt="Arm Right" />

      {/* Leg Left */}
      <img className={layerClass} src="/assets/avatar/base/body/leg_left.svg" alt="Leg Left" />

      {/* Leg Right */}
      <img className={layerClass} src="/assets/avatar/base/body/leg_right.svg" alt="Leg Right" />

      {/* Hair Front */}
      <img className={layerClass} src="/assets/avatar/base/hair/hair_front.svg" alt="Hair Front" />

      {/* Eyes */}
      {currentEyeState === 'open' ? (
        <img className={layerClass} src="/assets/avatar/base/eyes/eyes_open.svg" alt="Eyes Open" />
      ) : (
        <img className={layerClass} src="/assets/avatar/base/eyes/eyes_closed.svg" alt="Eyes Closed" />
      )}

      {/* Mouth */}
      {mouthState === 'smile' ? (
        <img className={layerClass} src="/assets/avatar/base/mouth/mouth_smile.svg" alt="Mouth Smile" />
      ) : (
        <img className={layerClass} src="/assets/avatar/base/mouth/mouth_neutral.svg" alt="Mouth Neutral" />
      )}

      {/* Top Layer */}
      {topId === 'top_red_shirt' && (
        <img className={layerClass} src="/assets/avatar/clothing/tops/top_red_shirt.svg" alt="Red Shirt" />
      )}

      {topId === 'top_sweater' && (
        <img className={layerClass} src="/assets/avatar/clothing/tops/top_sweater.svg" alt="Sweater" />
      )}

      {/* Bottom Layer */}
      {bottomId === 'bottom_pants' && (
        <img className={layerClass} src="/assets/avatar/clothing/bottoms/bottom_pants.svg" alt="Pants" />
      )}

      {bottomId === 'bottom_shorts' && (
        <img className={layerClass} src="/assets/avatar/clothing/bottoms/bottom_shorts.svg" alt="Shorts" />
      )}

      {/* Shoes Layer */}
      {shoesId === 'shoes_sneakers' && (
        <img className={layerClass} src="/assets/avatar/clothing/shoes/shoes_sneakers.svg" alt="Sneakers" />
      )}

      {shoesId === 'shoes_boots' && (
        <img className={layerClass} src="/assets/avatar/clothing/shoes/shoes_boots.svg" alt="Boots" />
      )}

      {/* Accessories */}
      {accessories.includes('acc_beanie') && (
        <img className={layerClass} src="/assets/avatar/accessories/acc_beanie.svg" alt="Beanie" />
      )}

      {accessories.includes('acc_glasses') && (
        <img className={layerClass} src="/assets/avatar/accessories/acc_glasses.svg" alt="Glasses" />
      )}
    </div>
  );
};
