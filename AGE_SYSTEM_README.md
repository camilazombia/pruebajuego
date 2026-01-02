# 🎮 Sistema de Adaptación por Edad - Mundo Mágico Inglés

## 📋 Descripción

Sistema automático de adaptación de contenido basado en la edad del niño. Selecciona la edad al comenzar (FamilyAccessPage) y **toda la experiencia se personaliza automáticamente** para esa edad.

## 🎯 Objetivo

Proporcionar una experiencia educativa personalizada con:
- **Contenido adaptado** (palabras, dificultad, índice de pistas)
- **UI adaptada** (tamaño de fuente, velocidad de animación)
- **Límites de tiempo** (sesiones cortas, límites diarios)
- **Filtrado automático** de niveles y mundos por edad

## 👥 Grupos de Edad

| Edad | Emoji | Palabras | Pistas | Animación | Fuente | Sesión | Diario |
|------|-------|----------|--------|-----------|--------|--------|--------|
| 3–6 años | 🎈 | 3 por lección | Altas | Lenta (0.8×) | Grande (1.2×) | 10 min | 30 min |
| 7–10 años | ⭐ | 5 por lección | Medias | Normal (1×) | Normal (1×) | 20 min | 60 min |
| 11+ años | 🚀 | 8 por lección | Bajas | Rápida (1.2×) | Pequeña (0.95×) | 30 min | 120 min |

## 🏗️ Arquitectura

```
┌─ ChildContext (Contexto Global)
│  ├── ageRange: '3-6' | '7-10' | '11+' | null
│  ├── ageGroup: AgeGroup (configuración)
│  ├── contentPreferences: Preferencias personalizadas
│  └── Métodos: setAgeRange(), updateContentPreferences()
│
├─ Hooks (Interfaz de Desarrollo)
│  ├── useChild() → Acceso al contexto
│  ├── useAgeAdaptation() → Configuración UI/UX
│  ├── useAgeStyles() → Estilos CSS calculados
│  └── useAgeAdaptedContent() → Contenido filtrado
│
├─ Data Layer
│  ├── ageGroups.ts → Configuración por edad
│  └── worlds.ts → Filtrado de contenido
│
└─ Persistencia
   └── localStorage: childAgeRange, contentPreferences
```

## 🔄 Flujo de Datos

```
1. Usuario accede a FamilyAccessPage
   ↓
2. Selecciona edad (3-6, 7-10, o 11+)
   ↓
3. Hace clic en "COMENZAR"
   ↓
4. setAgeRange(age) guarda en contexto y localStorage
   ↓
5. Navega a /welcome
   ↓
6. Cada componente accede a useChild() o hooks de adaptación
   ↓
7. App automáticamente se adapta:
   - Tamaño de fuente
   - Velocidad de animaciones
   - Nivel de pistas
   - Filtrado de mundos/capítulos
   - Límites de tiempo
```

## 📂 Archivos Clave

### Contexto
```
src/features/child/context/ChildContext.tsx
- Almacena ageRange, ageGroup, contentPreferences
- Persiste en localStorage
- Proporciona useChild() hook
```

### Configuración
```
src/shared/data/ageGroups.ts
- Define 3 AgeGroup con todas las configuraciones
- Funciones: getAgeGroupByRange(), getAgeGroupByAge(), etc.
```

### Hooks
```
src/features/child/hooks/
├── useAgeAdaptation.ts → Configuración UI (fontSize, animationSpeed, etc.)
├── useAgeAdaptedContent.ts → Contenido filtrado (worlds, chapters, levels)
├── useAgeStyles.ts → Estilos CSS calculados
└── index.ts → Exportaciones
```

### Extensiones
```
src/shared/data/worlds.ts
- Tipos extendidos: World, Chapter, Level con minAge?, maxAge?
- Funciones de filtrado:
  - getWorldsByAgeRange(range)
  - getChaptersForWorldByAge(worldId, range)
  - getLevelsForChapterByAge(chapterId, range)
```

## 💻 Cómo Usar

### 1. En cualquier componente, accede al contexto
```tsx
import { useChild } from '../../features/child/context/ChildContext';

export const MyComponent = () => {
  const { ageRange, ageGroup } = useChild();
  
  console.log(ageRange); // '3-6' | '7-10' | '11+' | null
  console.log(ageGroup?.wordsPerLesson); // 3, 5, o 8
};
```

### 2. Para configuración UI, usa el hook de adaptación
```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const GameComponent = () => {
  const { fontSize, animationSpeed, hintLevel } = useAgeAdaptation();
  
  return (
    <div style={{ fontSize: `${fontSize}rem` }}>
      {/* UI adaptada */}
    </div>
  );
};
```

### 3. Para contenido filtrado por edad
```tsx
import { useAgeAdaptedContent } from '../../features/child/hooks/useAgeAdaptedContent';

export const WorldsMapPage = () => {
  const { worlds, getChapters, getLevels } = useAgeAdaptedContent();
  
  // worlds ya está filtrado automáticamente por edad
  return <>{worlds.map(w => <WorldCard key={w.id} world={w} />)}</>;
};
```

## 📊 Configuración Detallada

### Grupo 3–6 años (🎈 Beginner)
```javascript
{
  id: 'age-3-6',
  label: '3–6 años',
  emoji: '🎈',
  minAge: 3,
  maxAge: 6,
  difficulty: 'beginner',
  wordsPerLesson: 3,
  hintLevel: 'high',
  fontSizeMultiplier: 1.2,      // UI 20% más grande
  animationSpeedMultiplier: 0.8, // Animaciones 20% más lentas
  soundVolume: 0.5,
  sessionLimitMinutes: 10,       // Sesiones máximo 10 minutos
  dailyLimitMinutes: 30,         // 30 minutos diarios
}
```

### Grupo 7–10 años (⭐ Intermediate)
```javascript
{
  id: 'age-7-10',
  label: '7–10 años',
  emoji: '⭐',
  minAge: 7,
  maxAge: 10,
  difficulty: 'intermediate',
  wordsPerLesson: 5,
  hintLevel: 'medium',
  fontSizeMultiplier: 1,         // UI normal
  animationSpeedMultiplier: 1,   // Animaciones normales
  soundVolume: 1,
  sessionLimitMinutes: 20,
  dailyLimitMinutes: 60,
}
```

### Grupo 11+ años (🚀 Advanced)
```javascript
{
  id: 'age-11-plus',
  label: '11+ años',
  emoji: '🚀',
  minAge: 11,
  maxAge: 999,
  difficulty: 'advanced',
  wordsPerLesson: 8,
  hintLevel: 'low',
  fontSizeMultiplier: 0.95,      // UI 5% más pequeña
  animationSpeedMultiplier: 1.2, // Animaciones 20% más rápidas
  soundVolume: 1,
  sessionLimitMinutes: 30,
  dailyLimitMinutes: 120,
}
```

## 🎨 Ejemplos de Implementación

### Ejemplo 1: Aplicar tamaño de fuente
```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const LevelContent = () => {
  const { fontSize } = useAgeAdaptation();
  
  const baseFontSize = 1; // rem
  const adaptedFontSize = baseFontSize + (fontSize - 1) * 0.25;
  
  return <div style={{ fontSize: `${adaptedFontSize}rem` }}>Contenido</div>;
};
```

### Ejemplo 2: Velocidad de animación
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
      Presiona aquí
    </motion.button>
  );
};
```

### Ejemplo 3: Mostrar/ocultar hints
```tsx
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';

export const GameLevel = () => {
  const { hintLevel } = useAgeAdaptation();
  
  return (
    <>
      <span>Contenido del nivel</span>
      {hintLevel === 'high' && <div className="big-hint">Pista: Haz esto...</div>}
      {hintLevel === 'medium' && <div className="medium-hint">Pista: Intenta...</div>}
      {/* Sin pista para nivel 'low' (11+) */}
    </>
  );
};
```

### Ejemplo 4: Filtrar contenido (WorldsMapPage - ya implementado)
```tsx
import { useAgeAdaptedContent } from '../../features/child/hooks/useAgeAdaptedContent';

export const WorldsMapPage = () => {
  const { worlds } = useAgeAdaptedContent();
  
  // worlds solo contiene mundos apropiados para la edad del niño
  return (
    <div className="carousel">
      {worlds.map(world => (
        <WorldCard key={world.id} world={world} />
      ))}
    </div>
  );
};
```

## 🔧 Instalación

1. El sistema está completamente integrado
2. App.tsx ya tiene `<ChildProvider>` envolviendo el árbol
3. FamilyAccessPage ya llama a `setAgeRange()`
4. Solo necesitas usar los hooks en tus componentes

## ✨ Características Implementadas

- ✅ Contexto global con persistencia en localStorage
- ✅ 3 grupos de edad con configuraciones específicas
- ✅ Hooks reutilizables (useAgeAdaptation, useAgeAdaptedContent)
- ✅ Integración con FamilyAccessPage
- ✅ Filtrado automático de contenido
- ✅ Adaptación de animaciones en HomePage
- ✅ Adaptación en WorldsMapPage

## 🚀 Próximas Mejoras

1. **Aplicar en LevelsPage**: Mostrar `wordCount` palabras nuevas, `hintLevel` pistas
2. **Aplicar en RewardsPage**: Ajustar `fontSize` según edad
3. **ParentZone**: Mostrar `dailyLimit` y `sessionLimit` alcanzados
4. **Analytics**: Rastrear tiempo de uso vs límites
5. **Notificaciones**: Alertar cuando se alcance límite diario
6. **Reportes**: Dashboard de progreso adaptado por edad

## 📞 Soporte

Para preguntas sobre la implementación, consulta:
- `AGE_ADAPTATION_GUIDE.md` - Guía completa de uso
- `AGE_ADAPTATION_IMPLEMENTED.md` - Resumen técnico

---

**Estado**: ✅ Sistema completamente funcional
**Última actualización**: Noviembre 24, 2025
