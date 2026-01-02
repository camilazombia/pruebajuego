# Sistema de Contenido Adaptado por Edad

## Concepto

El nuevo sistema permite que **el mismo mundo, capítulo y nivel** tenga **diferentes nombres, descripciones y dificultad** según la edad del niño.

### Antes
```
Mundo 1 (solo para 3-6 años)
Mundo 2 (solo para 7-10 años)
Mundo 3 (solo para 11+)
```

### Ahora
```
Mundo 1 - 3 variantes:
  ├─ Beginner (3-6): "Mundo 1 - El primer mundo..."
  ├─ Intermediate (7-10): "Mundo 1: Alphabet Masters"
  └─ Advanced (11+): "Mundo 1: Language Fundamentals"

Capítulo 1 - 3 variantes:
  ├─ Beginner: "The Alphabet & Numbers"
  ├─ Intermediate: "Advanced Alphabet & Numbers"
  └─ Advanced: "Phonetics & Numerals"

Nivel 1 - 3 variantes:
  ├─ Beginner: "Letras A-F" (3 palabras)
  ├─ Intermediate: "Vowels & Consonants A-G" (5 palabras)
  └─ Advanced: "Phonetic Patterns (A-H)" (8 palabras)
```

## Estructura de Tipos

### `AgeVariant`
```typescript
type AgeVariant = 'beginner' | 'intermediate' | 'advanced';
```

### `World`
```typescript
type World = {
  id: 'w1'; // ID único (nunca cambia)
  number: 1; // Número de mundo
  variants: {
    beginner: WorldVariant;    // Para 3-6 años
    intermediate: WorldVariant; // Para 7-10 años
    advanced: WorldVariant;     // Para 11+ años
  };
  chapters: Chapter[]; // Mismos capítulos para todas las edades
  backgroundImage?: string;
};
```

### `WorldVariant`
```typescript
type WorldVariant = {
  variant: AgeVariant;
  name: string;           // "Mundo 1" vs "Alphabet Masters" vs "Language Fundamentals"
  description?: string;
  difficulty: AgeVariant; // Refleja la dificultad
};
```

**Igual para `Chapter` → `ChapterVariant` y `Level` → `LevelVariant`**

## Uso en Componentes

### Hook 1: `useAgeAdaptedVariants()` ⭐ (Recomendado)

Obtiene el contenido con las variantes YA APLICADAS según la edad:

```typescript
import { useAgeAdaptedVariants } from '@/features/child/hooks';

function WorldsMapPage() {
  const { variant, worlds, getAdaptedChapters, getAdaptedLevels } = 
    useAgeAdaptedVariants();

  return (
    <div>
      {worlds.map((world) => (
        <WorldCard key={world.id}>
          {/* 'world.name' ya tiene la variante aplicada */}
          <h2>{world.name}</h2>
          <p>{world.description}</p>

          {getAdaptedChapters(world.id).map((chapter) => (
            <ChapterItem key={chapter.id}>
              {/* 'chapter.name' ya tiene la variante aplicada */}
              <h3>{chapter.name}</h3>
            </ChapterItem>
          ))}
        </WorldCard>
      ))}
    </div>
  );
}
```

**Retorna:**
```typescript
{
  variant: 'intermediate', // La variante actual (basada en ageRange)
  worlds: AdaptedWorld[],  // Mundos con variantes aplicadas
  getAdaptedChapters(worldId): AdaptedChapter[], // Capítulos adaptados
  getAdaptedChapter(id): AdaptedChapter,
  getAdaptedLevels(chapterId): AdaptedLevel[],
  getAdaptedLevel(id): AdaptedLevel,
}
```

### Hook 2: `useAgeAdaptedContent()`

Solo obtiene los mundos/capítulos/niveles sin aplicar variantes (para casos especiales):

```typescript
const { variant, worlds, getChapters, getLevels } = useAgeAdaptedContent();

// 'worlds' contiene los datos SIN variantes aplicadas
// Debe aplicarlas manualmente:
const chapter = getChapters(worldId)[0];
const chapterName = getChapterVariant(chapter, variant)?.name;
```

## Mapeo de AgeRange a AgeVariant

| ageRange | AgeVariant | Edades | Dificultad |
|----------|-----------|--------|-----------|
| '3-6' | 'beginner' | 3-6 años | Beginner |
| '7-10' | 'intermediate' | 7-10 años | Intermediate |
| '11+' | 'advanced' | 11+ años | Advanced |

## Funciones Helper en `worlds.ts`

```typescript
// Obtener variante específica
export const getWorldVariant = (world, variant) => world?.variants[variant];
export const getChapterVariant = (chapter, variant) => chapter?.variants[variant];
export const getLevelVariant = (level, variant) => level?.variants[variant];

// Obtener colecciones
export const getChaptersForWorld = (worldId) => WORLDS.find(...)?.chapters;
export const getLevelsForChapter = (chapterId) => chapter?.levels;
```

## Ventajas

✅ Mismo ID de contenido para todas las edades → Progreso unificado  
✅ Contenido diferenciado por edad → Experiencia personalizada  
✅ Escalabilidad → Fácil agregar nuevas variantes (ej: "expert")  
✅ Mantenibilidad → Un mundo = múltiples versiones en la misma estructura  

## Próximos Pasos

1. Completar w2-w10 con variantes para cada capítulo y nivel
2. Actualizar páginas (HomePage, WorldsMapPage, MissionPage) para usar `useAgeAdaptedVariants`
3. Aplicar vocabulario adaptado en ejercicios
4. Ajustar dificultad en evaluaciones según edad

## Ejemplo Completo: Mundo 1, Capítulo 1, Nivel 1

**Datos en `worlds.ts`:**
```typescript
{
  id: 'w1-l1-1',
  chapterId: 'w1-ch1',
  number: 1,
  completed: true,
  stars: 3,
  variants: {
    beginner: {
      variant: 'beginner',
      name: 'Letras A-F',
      difficulty: 'beginner',
      vocabulary: 3,
    },
    intermediate: {
      variant: 'intermediate',
      name: 'Vowels & Consonants A-G',
      difficulty: 'intermediate',
      vocabulary: 5,
    },
    advanced: {
      variant: 'advanced',
      name: 'Phonetic Patterns (A-H)',
      difficulty: 'advanced',
      vocabulary: 8,
    },
  },
}
```

**En el componente (con `useAgeAdaptedVariants`):**
```typescript
// Si ageRange es '3-6':
level = {
  id: 'w1-l1-1',
  chapterId: 'w1-ch1',
  number: 1,
  name: 'Letras A-F',           // ← De variante 'beginner'
  difficulty: 'beginner',        // ← De variante 'beginner'
  vocabulary: 3,                 // ← De variante 'beginner'
  completed: true,               // ← Del nivel base
  stars: 3,                       // ← Del nivel base
}

// Si ageRange es '7-10':
level = {
  id: 'w1-l1-1',
  chapterId: 'w1-ch1',
  number: 1,
  name: 'Vowels & Consonants A-G', // ← De variante 'intermediate'
  difficulty: 'intermediate',       // ← De variante 'intermediate'
  vocabulary: 5,                    // ← De variante 'intermediate'
  completed: true,                  // ← Del nivel base
  stars: 3,                         // ← Del nivel base
}
```

El `id`, `chapterId`, `completed` y `stars` son **iguales** para todas las edades!
Solo cambia el **contenido pedagógico** (`name`, `vocabulary`, `difficulty`).
