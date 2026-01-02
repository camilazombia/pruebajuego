# Arquitectura de Mundos y Misiones

## Estructura General

La aplicación tiene una jerarquía clara:

```
Landing / Login / Family Access → Welcome
    ↓
Home → Worlds Carousel (WorldsMapPage)
    ↓
Click on World → Missions Map (MissionsMapPage) - plantilla general
    ↓
Click on Mission → Mission Page (MissionPage) - plantilla general
```

## Cómo está organizado

### 1. **Datos Centralizados** (`src/shared/data/worlds.ts`)
Todos los mundos y misiones están definidos en un único archivo:

```typescript
export const WORLDS: World[] = [
  {
    id: 'w1',
    name: 'Mundo 1',
    stars: 3,
    backgroundImage: '/assets/images/backgrounds/world1.jpg',
    missions: [
      { id: 'm1-1', worldId: 'w1', number: 1, name: 'Saludos Básicos', completed: true, reward: 10 },
      { id: 'm1-2', worldId: 'w1', number: 2, name: 'Números del 1 al 10', completed: true, reward: 10 },
      // ... más misiones
    ]
  },
  // ... más mundos
];
```

### 2. **Páginas Plantilla (Templates)**

#### **WorldsMapPage** (`src/pages/WorldsMapPage/`)
- Muestra un carrusel horizontal de mundos
- Lee datos de `WORLDS`
- Al hacer click en un mundo: navega a `/missions/{worldId}`
- **No se modifica**, reutilizable para todos los mundos

#### **MissionsMapPage** (`src/pages/MissionsMapPage/`)
- Muestra un grid de misiones para un mundo específico
- Lee datos de `getMissionsForWorld(worldId)`
- Renderiza dinámicamente misiones del mundo
- El fondo cambia automáticamente según el `worldId` usando clases CSS
- Al hacer click en una misión: navega a `/mission/{missionId}`
- **No se modifica**, es una plantilla general

#### **MissionPage** (`src/pages/MissionPage/`)
- Página individual de misión
- Lee datos de `getMissionById(missionId)`
- Muestra información de la misión
- El fondo cambia automáticamente según el `worldId`
- **Plantilla general** para todas las misiones
- Las actividades específicas se renderizarán aquí en el futuro

### 3. **Rutas** (`src/app/router/AppRouter.tsx`)
```typescript
<Route path="/worlds" element={<WorldsMapPage />} />
<Route path="/missions/:worldId" element={<MissionsMapPage />} />
<Route path="/mission/:missionId" element={<MissionPage />} />
```

## Cómo Agregar Nuevos Mundos

### Paso 1: Agregar datos en `src/shared/data/worlds.ts`

```typescript
{
  id: 'w11',                                              // ID único
  name: 'Mundo 11',                                       // Nombre visible
  stars: 0,                                               // Estrellas completadas (0-3)
  locked: false,                                          // Si está bloqueado
  backgroundImage: '/assets/images/backgrounds/world11.jpg', // Imagen de fondo
  missions: [
    { id: 'm11-1', worldId: 'w11', number: 1, name: 'Misión 1', completed: false, reward: 10 },
    { id: 'm11-2', worldId: 'w11', number: 2, name: 'Misión 2', completed: false, reward: 10 },
    { id: 'm11-3', worldId: 'w11', number: 3, name: 'Misión 3', completed: false, reward: 10 },
  ]
}
```

### Paso 2: Agregar imagen de fondo

1. Coloca la imagen en: `public/assets/images/backgrounds/world11.jpg`
2. O actualiza la URL en la propiedad `backgroundImage`

### Paso 3: Agregar estilos CSS (si es necesario)

En `src/pages/MissionsMapPage/MissionsMapPage.module.css`:
```css
.missionsContainer.world-w11 {
  background-image: url('/assets/images/backgrounds/world11.jpg');
}
```

En `src/pages/MissionPage/MissionPage.module.css`:
```css
.background.bg-w11 {
  background-image: url('/assets/images/backgrounds/world11.jpg');
}
```

**Nota:** Si sigues el patrón `world{N}.jpg`, los estilos CSS ya funcionarán automáticamente sin cambios.

## Cómo Agregar Nuevas Misiones a un Mundo Existente

Solo necesitas editar el array `missions` del mundo en `src/shared/data/worlds.ts`:

```typescript
missions: [
  // Misiones existentes...
  // Nueva misión
  { id: 'm1-4', worldId: 'w1', number: 4, name: 'Nueva Misión', completed: false, reward: 10 },
]
```

**¡Listo!** La misión aparecerá automáticamente en MissionsMapPage.

## Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `src/shared/data/worlds.ts` | **Datos centralizados de mundos y misiones** |
| `src/pages/WorldsMapPage/WorldsMapPage.tsx` | Carrusel de mundos (no modificar) |
| `src/pages/MissionsMapPage/MissionsMapPage.tsx` | Grid de misiones - **plantilla general** (no modificar) |
| `src/pages/MissionPage/MissionPage.tsx` | Página de misión individual - **plantilla general** (no modificar) |
| `src/app/router/AppRouter.tsx` | Rutas (actualizar si agregas nuevas) |

## Flujo de Datos

```
WORLDS (src/shared/data/worlds.ts)
    ↓
WorldsMapPage → lee WORLDS → renderiza carrusel
    ↓
Click mundo → navega a /missions/{worldId}
    ↓
MissionsMapPage → lee getMissionsForWorld(worldId) → renderiza grid
    ↓
Click misión → navega a /mission/{missionId}
    ↓
MissionPage → lee getMissionById(missionId) → renderiza detalles
```

## Futuro: Actividades

Las actividades específicas (DragAndDrop, MatchPairs, etc.) se renderizarán en `MissionPage` basándose en el tipo de misión. Los directorios ya existen en:
- `src/pages/MissionPage/activities/`

Se pueden crear componentes específicos para cada tipo de actividad y renderizarlos condicionalmente.

