# 📋 TAREAS TÉCNICAS DETALLADAS - ROADMAP IMPLEMENTACIÓN

**Última actualización**: Enero 2, 2026  
**Estado**: Listo para asignar a desarrolladores

---

## 📌 TAREA 1: SECCIÓN DE CUENTOS (STORIES)

**Prioridad**: 🔴 ALTA  
**Complejidad**: Media  
**Tiempo Estimado**: 5-7 días  
**Asignado a**: [Nombre]

### Descripción
Expandir y mejorar la sección StoriesPage para que permita a los niños leer historias adaptadas a su edad con opciones de narración de audio.

### Subtareas

#### 1.1 Crear estructura de datos de historias
**Archivo**: `src/shared/data/stories.ts`  
**Tiempo**: 1 día

```typescript
interface StoryVariant {
  title: string
  description: string
  content: string[] // Array de párrafos
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface Story {
  id: string // story_1, story_2, etc.
  number: number
  world?: string // Opcional: enlazar a mundo
  variants: {
    beginner: StoryVariant
    intermediate: StoryVariant
    advanced: StoryVariant
  }
  imageUrl: string // Ilustración principal
  estimatedReadingTime: number // minutos
  keywords: string[] // Palabras clave a destacar
  audioUrl?: string // Narración (opcional)
}

const STORIES: Story[] = [
  {
    id: 'story_1',
    number: 1,
    world: 'w1', // Magic Forest
    variants: {
      beginner: {
        title: 'El Bosque Mágico',
        description: 'Una aventura en el bosque...',
        content: [
          'Érase una vez un pequeño reino...',
          '...',
        ],
        difficulty: 'beginner',
      },
      // ... intermediate, advanced
    },
    imageUrl: '/assets/images/stories/story_1.png',
    estimatedReadingTime: 5,
    keywords: ['forest', 'magic', 'adventure'],
  },
  // ... más historias (mínimo 8)
]
```

**Requisitos**:
- ✅ Mínimo 8 historias diferentes
- ✅ Cada historia con 3 variantes (beginner/intermediate/advanced)
- ✅ Párrafos adaptados: 3-5 (beginner), 5-8 (intermediate), 8+ (advanced)
- ✅ Palabras clave para destacar
- ✅ Exportar por defecto: `export default STORIES`

#### 1.2 Mejorar componente StoriesPage
**Archivo**: `src/pages/ReviewPage/StoriesPage.tsx`  
**Tiempo**: 2-3 días

```typescript
interface StoriesPageState {
  selectedStoryId: string | null
  isReading: boolean
  currentPageIndex: number
  highlightedWord: string | null
  isNarrating: boolean
}

export const StoriesPage: React.FC = () => {
  const { variant } = useAgeAdaptedVariants()
  
  // PANTALLA 1: Selector de historias
  if (!selectedStoryId) {
    return (
      <div>
        <h1>📖 Nuestras Historias</h1>
        <Grid>
          {STORIES.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              variant={variant}
              onClick={() => selectStory(story.id)}
            />
          ))}
        </Grid>
      </div>
    )
  }
  
  // PANTALLA 2: Lector de historia
  const currentStory = STORIES.find(s => s.id === selectedStoryId)
  const storyContent = currentStory.variants[variant]
  const currentParagraph = storyContent.content[currentPageIndex]
  
  return (
    <div>
      <button onClick={goBack}>← Volver</button>
      
      <h2>{storyContent.title}</h2>
      <img src={currentStory.imageUrl} />
      
      <div className={styles.paragraphContainer}>
        {currentParagraph.split(' ').map((word, idx) => (
          <span
            key={idx}
            className={
              currentStory.keywords.includes(word.toLowerCase())
                ? styles.highlighted
                : ''
            }
            onHover={() => setHighlightedWord(word)}
          >
            {word}
          </span>
        ))}
      </div>
      
      <div className={styles.controls}>
        <button onClick={previousPage} disabled={currentPageIndex === 0}>
          ← Anterior
        </button>
        
        <span>
          Página {currentPageIndex + 1} de {storyContent.content.length}
        </span>
        
        <button
          onClick={toggleNarration}
          disabled={!currentStory.audioUrl}
        >
          {isNarrating ? '⏸' : '🔊'} Narración
        </button>
        
        <button
          onClick={nextPage}
          disabled={currentPageIndex >= storyContent.content.length - 1}
        >
          Siguiente →
        </button>
      </div>
      
      {currentPageIndex === storyContent.content.length - 1 && (
        <CongratulationsModal onClose={handleCompletion} />
      )}
    </div>
  )
}
```

**Requisitos de UI**:
- ✅ Tarjetas de historias con thumbnail + descripción
- ✅ Navegación anterior/siguiente
- ✅ Indicador de progreso (página X de Y)
- ✅ Botón de narración (si existe audioUrl)
- ✅ Palabras clave destacadas en color
- ✅ Modal de congratulación al terminar
- ✅ Responsive en mobile
- ✅ Animaciones suaves con Framer Motion

#### 1.3 Crear archivos de historias
**Ubicación**: Crear contenido  
**Tiempo**: 1-2 días

Crear 8 historias mínimo:
```
1. El Bosque Mágico (Magic Forest) - Aventura
2. La Princesa y el Dragón (Sky Adventures) - Fantasía
3. El Viaje del Pequeño Pez (Ocean Kingdom) - Aventura marina
4. El Castillo Encantado (Enchanted Castle) - Misterio
5. La Búsqueda del Tesoro - Aventura
6. Los Amigos del Bosque - Amistad
7. El Día Especial de Luna - Eventos
8. La Gran Carrera - Competencia
```

Cada una debe tener:
- Título adaptado por edad
- Descripción corta
- 3-8 párrafos por variante
- Palabras clave en inglés
- Ilustración (PNG 800x600)

#### 1.4 Crear rutas
**Archivo**: `src/app/router/AppRouter.tsx`  
**Tiempo**: 30 min

```typescript
<Route path="/review/stories" element={<StoriesPage />} />
```

Actualizar NavigationDrawer/Sidebar si necesario.

#### 1.5 Testing
**Tiempo**: 1 día

- [ ] Selector de historias se ve bien (todos los dispositivos)
- [ ] Navegación anterior/siguiente funciona
- [ ] Palabras clave se destacan
- [ ] Narración reproduce si existe audio
- [ ] Modal de fin se muestra correctamente
- [ ] Adaptación por edad funciona (textos diferentes)
- [ ] Sin errores de TypeScript/lint

---

## 📌 TAREA 2: MEJORAR DIBUJOS PARA COLOREAR

**Prioridad**: 🔴 ALTA  
**Complejidad**: Media  
**Tiempo Estimado**: 4-6 días  
**Asignado a**: [Nombre]

### Descripción
Expandir el sistema de dibujos para colorear con más dibujos, herramientas mejores y un editor visual más amigable.

### Subtareas

#### 2.1 Crear/obtener archivos SVG de dibujos
**Tiempo**: 1-2 días  
**Archivos a crear**: 9-12 nuevos SVG

Ubicación: `public/assets/images/coloring/`

**Dibujos necesarios** (en orden de prioridad):
1. ✅ sun.svg
2. ✅ flower.svg
3. ✅ butterfly.svg
4. ✅ house.svg
5. ❌ tree.svg
6. ❌ cloud.svg
7. ❌ fish.svg
8. ❌ bird.svg
9. ❌ apple.svg
10. ❌ star.svg
11. ❌ rainbow.svg
12. ❌ cat.svg
13. ❌ dog.svg (opcional)
14. ❌ car.svg (opcional)

**Requisitos para cada SVG**:
```svg
<svg viewBox="0 0 500 500">
  <!-- Cada elemento coloreble debe estar en su propio path -->
  <path id="sun-body" d="..." fill="none" stroke="#000" stroke-width="2"/>
  <path id="sun-rays" d="..." fill="none" stroke="#000" stroke-width="2"/>
  <path id="cloud-1" d="..." fill="none" stroke="#000" stroke-width="2"/>
  ...
</svg>
```

**Especificaciones**:
- ViewBox: 0 0 500 500 (cuadrado)
- Stroke ancho: 2-3 px
- Sin relleno inicial (`fill="none"`)
- Paths limpios y optimizados
- IDs únicos para cada zona
- Estilos simples (no gradientes)

#### 2.2 Reemplazar ColoringPage con mejor editor
**Archivo**: `src/pages/ReviewPage/ColoringPage.tsx`  
**Tiempo**: 2-3 días

```typescript
interface ColoringEditorState {
  selectedDrawing: DrawingItem | null
  canvas: SVGElement | null
  selectedColor: string
  brushSize: number
  tool: 'brush' | 'fill' | 'eraser'
  history: CanvasState[]
  historyIndex: number
  completedZones: Set<string>
}

export const ColoringPage: React.FC = () => {
  const [state, setState] = useState<ColoringEditorState>({...})
  
  // PANTALLA 1: Selector de dibujos
  if (!state.selectedDrawing) {
    return (
      <div className={styles.page}>
        <h1>🎨 Dibujos para Colorear</h1>
        <Grid columns={3}>
          {DRAWINGS.map(drawing => (
            <DrawingCard
              key={drawing.id}
              drawing={drawing}
              completed={completedDrawings.includes(drawing.id)}
              onClick={() => selectDrawing(drawing)}
            />
          ))}
        </Grid>
      </div>
    )
  }
  
  // PANTALLA 2: Editor
  return (
    <div className={styles.editorPage}>
      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <button onClick={goBack}>← Volver</button>
        
        {/* Selector de herramienta */}
        <div className={styles.tools}>
          <ToolButton
            tool="brush"
            active={state.tool === 'brush'}
            onClick={() => selectTool('brush')}
            icon="🖌️"
          />
          <ToolButton
            tool="fill"
            active={state.tool === 'fill'}
            onClick={() => selectTool('fill')}
            icon="🪣"
          />
          <ToolButton
            tool="eraser"
            active={state.tool === 'eraser'}
            onClick={() => selectTool('eraser')}
            icon="🧹"
          />
        </div>
        
        {/* Color picker */}
        <div className={styles.colorPicker}>
          <label>Color:</label>
          <div className={styles.colors}>
            {COLORS.map(color => (
              <ColorOption
                key={color.hex}
                color={color}
                selected={state.selectedColor === color.hex}
                onClick={() => selectColor(color.hex)}
              />
            ))}
          </div>
          <input
            type="range"
            min="2"
            max="20"
            value={state.brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            aria-label="Tamaño de pincel"
          />
          <span>Tamaño: {state.brushSize}px</span>
        </div>
        
        {/* Botones de acción */}
        <div className={styles.actions}>
          <button onClick={undo} disabled={!canUndo}>↶ Deshacer</button>
          <button onClick={redo} disabled={!canRedo}>↷ Rehacer</button>
          <button onClick={clear} className={styles.danger}>
            🗑️ Limpiar
          </button>
          <button onClick={save} className={styles.success}>
            💾 Guardar
          </button>
        </div>
      </div>
      
      {/* CANVAS */}
      <div className={styles.canvasContainer}>
        <SVGCanvas
          ref={canvasRef}
          svgUrl={state.selectedDrawing.svgUrl}
          onPathClick={handlePathClick}
          onPathDrag={handlePathDrag}
          colorMap={colorMap}
          completedZones={state.completedZones}
        />
        
        {/* Progress indicator */}
        <div className={styles.progress}>
          Completado: {state.completedZones.size}/
          {getTotalZones(state.selectedDrawing)} zonas
        </div>
      </div>
      
      {/* Congratulations modal cuando termina */}
      {state.completedZones.size === getTotalZones(state.selectedDrawing) && (
        <CongratulationsModal
          drawing={state.selectedDrawing}
          onClose={handleComplete}
        />
      )}
    </div>
  )
}
```

**Funcionalidades requeridas**:

1. **Herramientas**:
   - ✅ Pincel (pintar con color seleccionado)
   - ✅ Bote de pintura (fill - rellenar zona completa)
   - ✅ Borrador (limpiar color)
   - ✅ Tamaño ajustable para pincel/borrador

2. **Paleta de colores**:
   ```typescript
   const COLORS = [
     { name: 'Rojo', hex: '#FF0000' },
     { name: 'Azul', hex: '#0000FF' },
     { name: 'Verde', hex: '#00AA00' },
     { name: 'Amarillo', hex: '#FFFF00' },
     { name: 'Naranja', hex: '#FF8800' },
     { name: 'Púrpura', hex: '#AA00FF' },
     { name: 'Rosa', hex: '#FF69B4' },
     { name: 'Marrón', hex: '#8B4513' },
     { name: 'Gris', hex: '#808080' },
     { name: 'Negro', hex: '#000000' },
     { name: 'Blanco', hex: '#FFFFFF' },
     { name: 'Turquesa', hex: '#00CED1' },
   ]
   ```

3. **Control de deshacer/rehacer**:
   - Máximo 20 estados en historial
   - Deshacer vuelve a estado anterior
   - Rehacer reactiva cambios deshechos

4. **Persistencia**:
   ```typescript
   // Guardar estado en localStorage
   localStorage.setItem(
     `coloring_${drawing.id}`,
     JSON.stringify({
       colorMap: { [pathId]: color },
       timestamp: Date.now(),
     })
   )
   ```

5. **Detección de completitud**:
   - Tracking automático de zonas coloreadas
   - Mostrar porcentaje completado
   - Modal de felicitación al 100%
   - Guardar en lista de "Completados"

#### 2.3 Componente SVGCanvas reutilizable
**Archivo**: `src/shared/ui/SVGCanvas/SVGCanvas.tsx`  
**Tiempo**: 1 día

Este componente manejar:
- Cargar SVG dinámicamente
- Detectar clicks en paths
- Aplicar colores
- Manejar drag (para pincel)
- Rastrear estado de colores

```typescript
interface SVGCanvasProps {
  svgUrl: string
  onPathClick: (pathId: string) => void
  onPathDrag: (pathId: string, x: number, y: number) => void
  colorMap: Record<string, string> // { pathId: color }
  completedZones?: Set<string>
}
```

#### 2.4 Actualizar datos de dibujos
**Archivo**: `src/pages/ReviewPage/ColoringPage.tsx` (parte de datos)  
**Tiempo**: 1 día

```typescript
interface DrawingItem {
  id: string
  title: string
  description: string
  svgUrl: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // minutos
  totalZones: number
}

const DRAWINGS: DrawingItem[] = [
  {
    id: 'sun',
    title: 'Sol',
    description: 'Colorea el sol brillante',
    svgUrl: '/assets/images/coloring/sun.svg',
    difficulty: 'easy',
    estimatedTime: 5,
    totalZones: 2,
  },
  // ... más dibujos
]
```

#### 2.5 Testing
**Tiempo**: 1 día

- [ ] Selector de dibujos se ve correcto
- [ ] Herramienta pincel funciona
- [ ] Herramienta fill (bote) funciona
- [ ] Borrador funciona
- [ ] Tamaño de pincel se ajusta
- [ ] Deshacer/rehacer funciona
- [ ] Guardado en localStorage funciona
- [ ] Modal de completitud se muestra
- [ ] Responsive en tablet y mobile
- [ ] Sin errores de TypeScript

---

## 📌 TAREA 3: CAMBIAR COLORES PANEL PARENTAL

**Prioridad**: 🟠 MEDIA  
**Complejidad**: Baja  
**Tiempo Estimado**: 1-2 días  
**Asignado a**: [Nombre]

### Descripción
Actualizar la paleta de colores del ParentZonePage para que sea más atractiva y consistente con el diseño de la aplicación.

### Subtareas

#### 3.1 Definir nueva paleta de colores
**Tiempo**: 1-2 horas

**Propuesta**:
```css
:root {
  --color-primary: #FF6B6B;      /* Rojo suave */
  --color-secondary: #4ECDC4;    /* Turquesa */
  --color-accent: #FFE66D;       /* Amarillo */
  --color-dark: #2C3E50;         /* Azul oscuro */
  --color-light: #F7F9FC;        /* Gris muy claro */
  --color-text: #2D3436;         /* Texto oscuro */
  --color-text-light: #636E72;   /* Texto gris */
  --color-success: #00B894;      /* Verde */
  --color-warning: #FF7675;      /* Rojo */
  --color-info: #74B9FF;         /* Azul */
  
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

#### 3.2 Refactorizar ParentZonePage.tsx
**Archivo**: `src/pages/ParentZonePage/ParentZonePage.tsx`  
**Tiempo**: 1 día

**Cambios**:
1. Eliminar todos los estilos inline
2. Usar clases CSS variables
3. Mejorar estructura HTML (semantic)

```tsx
// ANTES (❌ MAL)
<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', ... }}>

// DESPUÉS (✅ BIEN)
<div className={styles.card}>
```

#### 3.3 Actualizar ParentZonePage.module.css
**Archivo**: `src/pages/ParentZonePage/ParentZonePage.module.css`  
**Tiempo**: 1 día

```css
/* Variables */
:root {
  --primary: #FF6B6B;
  --secondary: #4ECDC4;
  --accent: #FFE66D;
  /* ... */
}

/* Cards de métricas */
.metricCard {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.metricCard:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Diferentes colores para cada métrica */
.metricCard:nth-child(1) {
  border-left: 4px solid var(--primary);
}

.metricCard:nth-child(2) {
  border-left: 4px solid #FFD700; /* Monedas */
}

.metricCard:nth-child(3) {
  border-left: 4px solid #FF4444; /* Streak */
}

/* ... etc */

/* Botones */
.button {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background: color-mix(in srgb, var(--primary) 90%, black);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: scale(0.95);
}

/* Inputs */
.input {
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  padding: 0.75rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
}

/* Secciones */
.section {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}
```

#### 3.4 Mejorar componentes individuales
**Tiempo**: 1 día

Actualizar:
- [ ] Cards de métricas (6 cards)
- [ ] Formulario de perfil
- [ ] Formulario de límites
- [ ] Selector de edad
- [ ] Checkbox
- [ ] Labels y textos
- [ ] Botones (guardar, cancel, etc)

#### 3.5 Testing visual
**Tiempo**: 1-2 horas

- [ ] Colores se ven bien en pantalla
- [ ] Coherencia visual en toda la página
- [ ] Hover effects funcionan
- [ ] Responsive en mobile
- [ ] Accesibilidad (contraste suficiente)
- [ ] Sin errores CSS

---

## 📌 TAREA 4: NIVELES DENTRO DE MUNDOS

**Prioridad**: 🟠 MEDIA  
**Complejidad**: Media  
**Tiempo Estimado**: 3-4 días  
**Asignado a**: [Nombre]

### Descripción
Implementar estructura de niveles dentro de capítulos. Cambiar navegación de:
```
Mundo → Capítulo → [Misión]
```
A:
```
Mundo → Capítulo → Nivel → [Misión]
```

### Subtareas

#### 4.1 Actualizar estructura de datos
**Archivo**: `src/shared/data/worlds.ts`  
**Tiempo**: 1 día

```typescript
interface Level {
  id: string // l1_1_1 = world 1, chapter 1, level 1
  number: number
  chapterId: string // Para referencia
  worldId: string
  variants: {
    beginner: LevelVariant
    intermediate: LevelVariant
    advanced: LevelVariant
  }
  missions: Mission[]
  requirements?: {
    minPoints?: number
    previousLevelId?: string
  }
  rewards: {
    coins: number
    points: number
    items?: string[]
  }
  thumbnail?: string
}

interface LevelVariant {
  variant: AgeVariant
  title: string
  description?: string
  difficulty: AgeVariant
}

// Actualizar Chapter
interface Chapter {
  id: string
  // ... campos existentes
  levels: Level[] // NUEVO
}
```

**Datos necesarios**:
- Mínimo 10 niveles por capítulo
- Total: 40-60 niveles (4 mundos × 3 capítulos × 3-5 niveles)
- Cada nivel con 3 variantes de nombre
- Cada nivel con 5-8 misiones

**Ejemplo**:
```typescript
const world1Chapter1: Chapter = {
  id: 'c1_1',
  number: 1,
  worldId: 'w1',
  variants: { /* ... */ },
  levels: [
    {
      id: 'l1_1_1',
      number: 1,
      chapterId: 'c1_1',
      worldId: 'w1',
      variants: {
        beginner: {
          title: 'Letras A-C',
          difficulty: 'beginner',
        },
        // ...
      },
      missions: [
        // 5-8 misiones
      ],
      rewards: {
        coins: 50,
        points: 10,
      },
    },
    // ... más niveles
  ],
}
```

#### 4.2 Crear componente LevelMapPage
**Archivo**: `src/pages/LevelMapPage/LevelMapPage.tsx`  
**Carpeta**: Crear `src/pages/LevelMapPage/`  
**Tiempo**: 1-2 días

```typescript
export const LevelMapPage: React.FC = () => {
  const { levelId } = useParams()
  const { levels } = useAgeAdaptedContent()
  
  const chapter = levels.find(l => l.id === levelId)
  const chapter = /* obtener capítulo del levelId */
  
  return (
    <div className={styles.page}>
      <h1>{chapter?.title}</h1>
      
      {/* Grid de niveles */}
      <div className={styles.levelsGrid}>
        {chapter?.levels.map((level, idx) => (
          <LevelCard
            key={level.id}
            level={level}
            number={idx + 1}
            completed={isCompleted(level.id)}
            locked={isLocked(level.id)}
            onClick={() => navigateToLevel(level.id)}
          />
        ))}
      </div>
      
      {/* Información de capítulo */}
      <div className={styles.info}>
        <p>Progreso: {completedCount}/{chapter?.levels.length}</p>
      </div>
    </div>
  )
}
```

#### 4.3 Crear componente LevelCard
**Archivo**: `src/shared/ui/LevelCard/LevelCard.tsx`  
**Tiempo**: 1 día

```typescript
interface LevelCardProps {
  level: Level
  number: number
  completed?: boolean
  locked?: boolean
  onClick: () => void
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  number,
  completed,
  locked,
  onClick,
}) => {
  return (
    <motion.div
      className={`${styles.card} ${completed ? styles.completed : ''} ${locked ? styles.locked : ''}`}
      onClick={onClick}
      whileHover={!locked ? { scale: 1.05 } : {}}
      whileTap={!locked ? { scale: 0.95 } : {}}
    >
      {/* Número del nivel */}
      <div className={styles.number}>{number}</div>
      
      {/* Título */}
      <h3>{level.title}</h3>
      
      {/* Estadísticas */}
      <div className={styles.stats}>
        <span>⭐ {level.missions.length} misiones</span>
        <span>🪙 {level.rewards.coins} monedas</span>
      </div>
      
      {/* Estado */}
      {completed && <div className={styles.badge}>✓ Completado</div>}
      {locked && <div className={styles.badge}>🔒 Bloqueado</div>}
      
      {/* Progreso */}
      {!completed && !locked && (
        <div className={styles.progress}>
          {completedMissions}/{level.missions.length} misiones
        </div>
      )}
    </motion.div>
  )
}
```

#### 4.4 Actualizar rutas
**Archivo**: `src/app/router/AppRouter.tsx`  
**Tiempo**: 30 min

```typescript
// Actualizar:
<Route path="/chapters/:worldId" element={<ChapterMapPage />} />
<Route path="/level/:levelId" element={<LevelMapPage />} /> {/* NUEVO */}
<Route path="/mission/:missionId" element={<MissionPage />} />

// Nueva estructura de navegación:
// /worlds → /chapters/:worldId → /level/:levelId → /mission/:missionId
```

#### 4.5 Actualizar componentes relacionados
**Tiempo**: 1 día

- [ ] ChapterMapPage → Renderizar niveles en lugar de misiones
- [ ] LevelPage → Renombrar a LevelMapPage
- [ ] MissionPage → Mantener igual
- [ ] Actualizar breadcrumbs
- [ ] Actualizar sidebar navigation

#### 4.6 Testing
**Tiempo**: 1 día

- [ ] Navegación entre niveles funciona
- [ ] Bloqueo de niveles funciona
- [ ] Progreso se calcula bien
- [ ] Responsive en todos los dispositivos
- [ ] Sin errores de TypeScript
- [ ] Cumplimiento con edad

---

## 📌 TAREA 5: EXPANDIR VARIANTES DE ROPA

**Prioridad**: 🟠 MEDIA  
**Complejidad**: Media  
**Tiempo Estimado**: 2-3 días  
**Asignado a**: [Nombre]

### Descripción
Crear archivos SVG de ropa adicional para el avatar y registrarlos en el sistema de recompensas.

### Subtareas

#### 5.1 Crear archivos SVG de ropa
**Ubicación**: `public/assets/avatar/clothing/`  
**Tiempo**: 1-2 días

**Nuevos archivos necesarios**:

Tops (agregar 4):
```
├── top_3.svg (camiseta con patrón)
├── top_4.svg (suéter)
├── top_5.svg (camisa formal)
└── top_6.svg (bata/vestido)
```

Bottoms (agregar 3):
```
├── bottom_3.svg (pantalones)
├── bottom_4.svg (falda)
└── bottom_5.svg (shorts)
```

Shoes (agregar 3):
```
├── shoes_3.svg (zapatillas deportivas)
├── shoes_4.svg (botas)
└── shoes_5.svg (sandalias)
```

**Especificaciones**:
- ViewBox: 0 0 200 240 (mismo que ChibiAvatar)
- SVG bien estructurado y optimizado
- Nombres de archivos descriptivos
- Colores base neutros (personalizable después)

#### 5.2 Actualizar datos de recompensas
**Archivo**: `src/shared/data/rewards.ts`  
**Tiempo**: 1 día

Agregar nuevos items:
```typescript
// Nuevos TOPS
{
  id: 'top_3',
  name: 'Camiseta con Patrón',
  description: 'Camiseta colorida con patrón único',
  rarity: 'common',
  price: 150,
  equipmentType: 'body',
  image: '/assets/avatar/clothing/tops/top_3.svg',
},
// ... más tops

// Nuevos BOTTOMS
{
  id: 'bottom_3',
  name: 'Pantalones Azules',
  description: 'Cómodos pantalones',
  rarity: 'rare',
  price: 500,
  equipmentType: 'body',
  image: '/assets/avatar/clothing/bottoms/bottom_3.svg',
},
// ... más bottoms

// Nuevos SHOES
{
  id: 'shoes_3',
  name: 'Zapatillas Deportivas',
  description: 'Para correr y jugar',
  rarity: 'common',
  price: 200,
  equipmentType: 'feet',
  image: '/assets/avatar/clothing/shoes/shoes_3.svg',
},
// ... más shoes
```

**Requisitos**:
- Mínimo 12 items nuevos en total
- Distribución de rareza: 40% Common, 30% Rare, 20% Epic, 10% Legendary
- Precios realistas según rareza
- Descripciones en español

#### 5.3 Actualizar ChibiAvatar.tsx
**Archivo**: `src/assets/svg/ChibiAvatar.tsx`  
**Tiempo**: 30 min

Actualizar listas de opciones:
```typescript
const topOptions = [
  'top_1',
  'top_2',
  'top_3',  // NUEVO
  'top_4',  // NUEVO
  'top_5',  // NUEVO
  'top_6',  // NUEVO
]

// Similar para bottoms y shoes
```

#### 5.4 Actualizar RewardsPage
**Archivo**: `src/pages/RewardsPage/RewardsPage.tsx`  
**Tiempo**: 1 día

Mejorar galería:
- [ ] Mostrar más items (scrollable)
- [ ] Filtro por tipo (Tops, Bottoms, Shoes, Accessories)
- [ ] Vista previa del avatar con cada item
- [ ] Indicador "Nuevo" para items recientes

#### 5.5 Testing
**Tiempo**: 1 día

- [ ] Todos los SVG cargan correctamente
- [ ] Colores se aplican bien en avatar
- [ ] Precios son razonables
- [ ] Rareza es visible en UI
- [ ] Compra y equipamiento funcionan
- [ ] Sin errores TypeScript

---

## 📌 TAREA 6: CREAR TODAS LAS IMÁGENES DEL PROYECTO

**Prioridad**: 🟠 MEDIA  
**Complejidad**: Baja (requiere diseño gráfico)  
**Tiempo Estimado**: 2-3 días  
**Asignado a**: [Nombre con skills de diseño/ilustración]

### Descripción
Crear/obtener todas las imágenes necesarias para el proyecto. Incluye fondos, iconos, personajes e ilustraciones.

### Subtareas

#### 6.1 Fondos de páginas
**Ubicación**: `public/assets/images/backgrounds/`  
**Requisitos**: 1920x1080px, PNG optimizado  
**Tiempo**: 1 día

```
Necesarios:
├── home_bg.png           (Inicio del niño)
├── worlds_bg.png         (Mapa de mundos)
├── chapters_bg.png       (Mapa de capítulos)
├── levels_bg.png         (Mapa de niveles)
├── missions_bg.png       (Mapa de misiones)
├── rewards_bg.png        (Página de recompensas)
├── review_bg.png         (Página de repaso)
├── world_1_bg.png        (Magic Forest)
├── world_2_bg.png        (Ocean Kingdom)
├── world_3_bg.png        (Sky Adventures)
└── world_4_bg.png        (Enchanted Castle)
```

**Especificaciones**:
- Estilo: Colorido, amigable con niños
- Resoluciónínima: 1920x1080
- Sin texto superpuesto
- Optimizado para web (<500KB cada uno)

#### 6.2 Iconos de premios expandidos
**Ubicación**: `public/assets/images/rewards/`  
**Requisitos**: 512x512px PNG transparente  
**Tiempo**: 1 día

```
Crear 20+ iconos en 4 categorías:

HEADS (Sombreros/coronas):
├── hat_1.png
├── crown_1.png
├── beanie_1.png
└── ... (5-8 total)

BODIES (Ropa/capas):
├── shirt_1.png
├── dress_1.png
├── jacket_1.png
└── ... (5-8 total)

FEET (Zapatillas):
├── shoes_1.png
├── boots_1.png
└── ... (3-5 total)

ACCESSORIES:
├── glasses_1.png
├── necklace_1.png
└── ... (4-6 total)

RAREZA:
├── common_1.png
├── rare_1.png
├── epic_1.png
└── legendary_1.png
```

#### 6.3 Personajes y NPCs
**Ubicación**: `public/assets/images/characters/`  
**Requisitos**: SVG o PNG 500x500px  
**Tiempo**: 1 día

```
Crear o descargar:
├── wizard.svg          (Magic Forest)
├── mermaid.svg         (Ocean Kingdom)
├── dragon.svg          (Sky Adventures)
├── fairy.svg           (Enchanted Castle)
├── elf.svg
├── knight.svg
└── guardians/ (NPCs)
    ├── forest_guardian.svg
    ├── ocean_guardian.svg
    └── ...
```

#### 6.4 Ilustraciones de historias
**Ubicación**: `public/assets/images/stories/`  
**Requisitos**: 800x600px PNG  
**Tiempo**: 1 día

```
Para cada historia (8 total):
story_1.png (Magic Forest story)
story_2.png (Dragon tale)
story_3.png (Ocean adventure)
story_4.png (Castle mystery)
... (4 más)
```

#### 6.5 Iconos de actividades
**Ubicación**: `public/assets/images/icons/`  
**Requisitos**: 256x256px PNG transparente  
**Tiempo**: 1 día

```
├── activities/
│   ├── drag_drop.svg
│   ├── match_pairs.svg
│   ├── multiple_choice.svg
│   ├── fill_blanks.svg
│   ├── spelling.svg
│   ├── pronunciation.svg
│   └── ordering.svg
├── status/
│   ├── locked.svg
│   ├── completed.svg
│   ├── in_progress.svg
│   └── available.svg
└── world_icons/
    ├── world_1_icon.svg
    ├── world_2_icon.svg
    ├── world_3_icon.svg
    └── world_4_icon.svg
```

#### 6.6 Integración en componentes
**Tiempo**: 1 día

- [ ] Actualizar rutas de imágenes en código
- [ ] Testear que todas cargan
- [ ] Optimizar tamaños
- [ ] Verificar responsive
- [ ] Sin errores 404

---

## 📊 RESUMEN DE TAREAS

| Tarea | Prioridad | Días | Estado |
|-------|-----------|------|--------|
| 1. Sección de Cuentos | 🔴 ALTA | 5-7 | ⏳ Pendiente |
| 2. Dibujos Colorear | 🔴 ALTA | 4-6 | ⏳ Pendiente |
| 3. Colores ParentZone | 🟠 MEDIA | 1-2 | ⏳ Pendiente |
| 4. Niveles en Mundos | 🟠 MEDIA | 3-4 | ⏳ Pendiente |
| 5. Ropa Avatar | 🟠 MEDIA | 2-3 | ⏳ Pendiente |
| 6. Todas las Imágenes | 🟠 MEDIA | 2-3 | ⏳ Pendiente |

**Total Estimado**: 17-25 días de trabajo

---

## 🚦 DEPENDENCIAS

```
Tarea 1 (Cuentos) → independiente
Tarea 2 (Colorear) → independiente
Tarea 3 (Colores) → independiente
Tarea 4 (Niveles) → requiere T6 (imágenes de niveles)
Tarea 5 (Ropa) → independiente
Tarea 6 (Imágenes) → requiere algunas para T1, T4

Orden recomendado:
1. Tareas 1, 2, 3, 5 en paralelo (independientes)
2. Tarea 6 parcial (fondos para T4)
3. Tarea 4 (con imágenes)
4. Tarea 6 finalizar
```

---

**Última actualización**: Enero 2, 2026  
**Versión**: 1.0
