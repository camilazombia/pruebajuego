import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';

/**
 * Ejemplos de uso del Avatar Chibi Modular
 */

// Ejemplo 1: Avatar básico
export const BasicAvatarExample = () => (
  <ChibiAvatar
    size="md"
  />
);

// Ejemplo 2: Avatar con expresiones
export const ExpressiveAvatarExample = () => (
  <ChibiAvatar
    eyeState="open"
    mouthState="smile"
    isBlinking={true}
    isBreathing={true}
    size="md"
  />
);

// Ejemplo 3: Avatar con ropa personalizada
export const DressedAvatarExample = () => (
  <ChibiAvatar
    eyeState="open"
    mouthState="smile"
    topId="top_sweater"
    bottomId="bottom_shorts"
    shoesId="shoes_boots"
    size="md"
  />
);

// Ejemplo 4: Avatar con accesorios
export const AccessorizedAvatarExample = () => (
  <ChibiAvatar
    eyeState="open"
    mouthState="smile"
    topId="top_red_shirt"
    bottomId="bottom_pants"
    shoesId="shoes_sneakers"
    accessories={['acc_beanie', 'acc_glasses']}
    isBlinking={true}
    isBreathing={true}
    size="md"
  />
);

// Ejemplo 5: Avatar pequeño para lista de personajes
export const SmallAvatarExample = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
    {['1', '2', '3'].map((id) => (
      <ChibiAvatar
        key={id}
        size="sm"
      />
    ))}
  </div>
);

// Ejemplo 6: Avatar grande para modal de personalización
export const LargeAvatarExample = () => (
  <ChibiAvatar
    eyeState="open"
    mouthState="smile"
    topId="top_sweater"
    bottomId="bottom_shorts"
    shoesId="shoes_boots"
    accessories={['acc_beanie']}
    isBlinking={true}
    isBreathing={true}
    size="lg"
  />
);

// Ejemplo 7: Avatar con diferentes tipos de ropa
export const ClothingVariantsExample = () => {
  const topVariants = ['top_red_shirt', 'top_sweater'];

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {topVariants.map((top) => (
        <div key={top} style={{ textAlign: 'center' }}>
          <ChibiAvatar
            topId={top}
            size="md"
          />
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{top}</p>
        </div>
      ))}
    </div>
  );
};

// Ejemplo 8: Avatar con diferentes expresiones
export const ExpressionVariantsExample = () => {
  const expressions: Array<{ eye: 'open' | 'closed'; mouth: 'neutral' | 'smile'; label: string }> = [
    { eye: 'open', mouth: 'neutral', label: 'Neutral' },
    { eye: 'open', mouth: 'smile', label: 'Sonriendo' },
    { eye: 'closed', mouth: 'smile', label: 'Feliz' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {expressions.map((expr) => (
        <div key={expr.label} style={{ textAlign: 'center' }}>
          <ChibiAvatar
            eyeState={expr.eye}
            mouthState={expr.mouth}
            size="md"
          />
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{expr.label}</p>
        </div>
      ))}
    </div>
  );
};

// Ejemplo 9: Galería de combinaciones de ropa
export const ClothingCombinationsExample = () => {
  const combinations = [
    { top: 'top_red_shirt', bottom: 'bottom_pants', shoes: 'shoes_sneakers', label: 'Casual 1' },
    { top: 'top_sweater', bottom: 'bottom_shorts', shoes: 'shoes_boots', label: 'Casual 2' },
    { top: 'top_red_shirt', bottom: 'bottom_shorts', shoes: 'shoes_sneakers', label: 'Verano' },
    { top: 'top_sweater', bottom: 'bottom_pants', shoes: 'shoes_boots', label: 'Invierno' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      {combinations.map((combo) => (
        <div key={combo.label} style={{ textAlign: 'center' }}>
          <ChibiAvatar
            topId={combo.top}
            bottomId={combo.bottom}
            shoesId={combo.shoes}
            size="md"
          />
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{combo.label}</p>
        </div>
      ))}
    </div>
  );
};
