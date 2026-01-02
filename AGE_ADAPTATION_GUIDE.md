# Sistema de Adaptación por Edad

## Descripción General

El sistema de adaptación por edad permite personalizar completamente la experiencia del juego según la edad del niño. Se divide en tres grupos de edad con configuraciones específicas:

- **3–6 años** (🎈 Emoji): Contenido beginner, UI grande, animaciones lentas
- **7–10 años** (⭐ Emoji): Contenido intermediate, UI normal, animaciones normales
- **11+ años** (🚀 Emoji): Contenido advanced, UI pequeña, animaciones rápidas

## Flujo de Uso

### 1. Selección de Edad en FamilyAccessPage

```tsx
import { useChild } from '../../features/child/context/ChildContext';

export default function FamilyAccessPage() {
  const { setAgeRange } = useChild();
  
  const handleSubmit = async () => {
    // El usuario selecciona '3-6', '7-10' o '11+'
    setAgeRange(childAge); // childAge es '3-6', '7-10', o '11+'
    navigate('/welcome');
  };
}
```

### 2. Acceso al Contexto en Cualquier Componente

```tsx
import { useChild } from '../../features/child/context/ChildContext';

export const MyComponent = () => {
  const { ageRange, ageGroup, contentPreferences } = useChild();
  
  console.log(ageRange); // '3-6' | '7-10' | '11+' | null
  console.log(ageGroup?.wordsPerLesson); // 3 | 5 | 8
  console.log(ageGroup?.fontSizeMultiplier); // 1.2 | 1 | 0.95
};
```

## Hooks Disponibles

### useAgeAdaptation()

Retorna las configuraciones de adaptación por edad para UI/UX:

```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const HomePage = () => {
  const { 
    fontSize,        // 0.95 | 1 | 1.2 (multiplicador)
    animationSpeed,  // 0.8 | 1 | 1.2 (multiplicador)
    hintLevel,       // 'high' | 'medium' | 'low'
    wordCount,       // 3 | 5 | 8
    difficulty,      // 'beginner' | 'intermediate' | 'advanced'
    sessionLimit,    // 10 | 20 | 30 (minutos)
    dailyLimit,      // 30 | 60 | 120 (minutos)
    soundEnabled     // boolean
  } = useAgeAdaptation();
  
  // Usar valores en animaciones
  const transitionDuration = 1.5 / animationSpeed;
};
```

### useAgeStyles()

Retorna estilos CSS calculados:

```tsx
import { useAgeStyles } from '../../features/child/hooks/useAgeStyles';

export const Component = () => {
  const { fontSize, transitionDuration } = useAgeStyles();
  
  return (
    <div style={{ fontSize, transitionDuration }}>
      Contenido adaptado
    </div>
  );
};
```

### useAgeAdaptedContent()

Retorna contenido filtrado por rango de edad:

```tsx
import { useAgeAdaptedContent } from '../../features/child/hooks/useAgeAdaptedContent';

export const WorldsMapPage = () => {
  const { worlds, getChapters, getLevels } = useAgeAdaptedContent();
  
  // worlds ya está filtrado para la edad del niño
  const chapter = getChapters(worldId);
  const levels = getLevels(chapterId);
};
```

## Configuración por Edad (ageGroups.ts)

Cada grupo de edad tiene estas propiedades:

```tsx
interface AgeGroup {
  id: string;                      // 'age-3-6' | 'age-7-10' | 'age-11-plus'
  label: string;                   // '3–6 años' | '7–10 años' | '11+ años'
  minAge: number;                  // 3 | 7 | 11
  maxAge: number;                  // 6 | 10 | 999
  emoji: string;                   // '🎈' | '⭐' | '🚀'
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordsPerLesson: number;          // 3 | 5 | 8
  hintLevel: 'high' | 'medium' | 'low';
  fontSizeMultiplier: number;      // 1.2 | 1 | 0.95
  animationSpeedMultiplier: number; // 0.8 | 1 | 1.2
  soundVolume: number;              // 0.5 | 1 | 1 (0-1)
  sessionLimitMinutes: number;      // 10 | 20 | 30
  dailyLimitMinutes: number;        // 30 | 60 | 120
}
```

## Ejemplos de Uso

### Ejemplo 1: Aplicar tamaño de fuente adaptado

```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const GameLevel = () => {
  const { fontSize } = useAgeAdaptation();
  
  return (
    <div style={{ fontSize: `${1 + (fontSize - 1) * 0.25}rem` }}>
      {/* Content */}
    </div>
  );
};
```

### Ejemplo 2: Velocidad de animación adaptada

```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';
import { motion } from 'framer-motion';

export const AnimatedButton = () => {
  const { animationSpeed } = useAgeAdaptation();
  
  return (
    <motion.button
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1 / animationSpeed }}
    >
      Click me
    </motion.button>
  );
};
```

### Ejemplo 3: Mostrar/ocultar hints según edad

```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const GameContent = () => {
  const { hintLevel } = useAgeAdaptation();
  
  return (
    <>
      <span>Main content</span>
      {hintLevel === 'high' && <div className="big-hint">Pista grande</div>}
      {hintLevel === 'medium' && <div className="medium-hint">Pista normal</div>}
      {/* Los de 11+ no ven hints */}
    </>
  );
};
```

### Ejemplo 4: Filtrar mundos por edad en WorldsMapPage

```tsx
import { useAgeAdaptedContent } from '../../features/child/hooks/useAgeAdaptedContent';

export const WorldsMapPage = () => {
  const { worlds } = useAgeAdaptedContent();
  
  return (
    <div>
      {worlds.map(world => (
        <WorldCard key={world.id} world={world} />
      ))}
    </div>
  );
};
```

## Persistencia

El sistema persiste automáticamente en `localStorage`:

- **childAgeRange**: La edad seleccionada ('3-6', '7-10', '11+')
- **contentPreferences**: Las preferencias personalizadas (JSON)

## Integración con Componentes

### Actualizar HomePage

```tsx
// HomePage.tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const HomePage = () => {
  const { animationSpeed } = useAgeAdaptation();
  
  // Usar en animaciones de Framer Motion
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3 / animationSpeed, repeat: Infinity }}
  />
};
```

### Actualizar LevelsPage

```tsx
// LevelsPage.tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const LevelsPage = () => {
  const { wordCount, hintLevel, fontSize } = useAgeAdaptation();
  
  // Renderizar nivel con parámetros específicos de edad
};
```

### Actualizar RewardsPage

```tsx
// RewardsPage.tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const RewardsPage = () => {
  const { fontSize } = useAgeAdaptation();
  
  // Hacer UI más grande para niños de 3-6 años
};
```

## Próximos Pasos

1. ✅ Sistema de contexto configurado
2. ✅ FamilyAccessPage integrada
3. ✅ Hooks de adaptación creados
4. ⏳ Actualizar WorldsMapPage para filtrar contenido por edad
5. ⏳ Aplicar fontSize en componentes clave
6. ⏳ Aplicar animationSpeed en transiciones
7. ⏳ Mostrar/ocultar hints según hintLevel
8. ⏳ Implementar límites de sesión/diarios en ParentZone

## Notas

- El contexto requiere que la app esté envuelta con `<ChildProvider>`
- Si no hay edad seleccionada, los valores por defecto son para 7-10 años
- localStorage persiste entre sesiones
- Los cambios se sincronizan automáticamente en toda la app
