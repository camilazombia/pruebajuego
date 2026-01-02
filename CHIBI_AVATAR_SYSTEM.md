# Sistema de Avatar Chibi Modular

## Estructura

El avatar chibi se construye mediante capas independientes de SVG que se superponen en React. Cada capa tiene el mismo viewBox (200x240) para garantizar alineación perfecta.

### Carpetas de Activos

```
public/assets/avatar/
├── base/
│   ├── body/
│   │   └── body_base.svg
│   ├── eyes/
│   │   ├── eyes_open.svg
│   │   └── eyes_closed.svg
│   ├── mouth/
│   │   ├── mouth_neutral.svg
│   │   └── mouth_smile.svg
│   └── hair/
│       ├── hair_front.svg
│       └── hair_back.svg
├── clothing/
│   ├── tops/
│   │   ├── top_red_shirt.svg
│   │   └── top_sweater.svg
│   ├── bottoms/
│   │   ├── bottom_pants.svg
│   │   └── bottom_shorts.svg
│   └── shoes/
│       ├── shoes_sneakers.svg
│       └── shoes_boots.svg
└── accessories/
    ├── acc_beanie.svg
    └── acc_glasses.svg
```

## Componente React: ChibiAvatar

### Props

```typescript
interface ChibiAvatarProps {
  // Color de piel base
  bodyColor?: string;        // Default: '#f4c4a0'
  
  // Color de cabello
  hairColor?: string;        // Default: '#3d2817'
  
  // Expresiones faciales
  eyeState?: 'open' | 'closed' | 'blink';  // Default: 'open'
  mouthState?: 'neutral' | 'smile';         // Default: 'neutral'
  
  // Vestuario
  topId?: string;     // 'top_red_shirt' | 'top_sweater'
  bottomId?: string;  // 'bottom_pants' | 'bottom_shorts'
  shoesId?: string;   // 'shoes_sneakers' | 'shoes_boots'
  
  // Accesorios (array)
  accessories?: string[];  // ['acc_beanie', 'acc_glasses']
  
  // Animaciones
  isBlinking?: boolean;     // Default: false
  isBreathing?: boolean;    // Default: false
  
  // Tamaño
  size?: 'sm' | 'md' | 'lg';  // Default: 'md'
}
```

### Ejemplo de Uso

```tsx
<ChibiAvatar
  bodyColor="#f4c4a0"
  hairColor="#3d2817"
  eyeState="open"
  mouthState="smile"
  topId="top_red_shirt"
  bottomId="bottom_pants"
  shoesId="shoes_sneakers"
  accessories={['acc_beanie']}
  isBlinking={true}
  isBreathing={true}
  size="md"
/>
```

## Integración con Sistema de Personalización

El avatar se integra automáticamente con el sistema de items de `RewardsPage`:

1. **Ropa Top**: Se vincula con `equipmentItems.casualTops` y `equipmentItems.formalTops`
2. **Ropa Bottom**: Se vincula con `equipmentItems.bottomsCasual` y `equipmentItems.bottomsFormal`
3. **Zapatos**: Se vincula con `equipmentItems.shoes`
4. **Accesorios**: Se pueden agregar a través del array `accessories`

## Agregar Nuevas Capas

### Paso 1: Crear archivo SVG

1. Mantener el mismo viewBox: `0 0 200 240`
2. Dibujar con transparencia (sin fondo)
3. Alinear correctamente en el canvas
4. Guardar en la carpeta correspondiente

### Paso 2: Agregar a ChibiAvatar.tsx

Agregar un nuevo `{id === 'nuevo_id' && (<svg>...</svg>)}` en el componente.

### Paso 3: Actualizar RewardsPage

Mapear el nuevo ID en la lógica de equipmentItems.

## Especificaciones Técnicas

### Canvas
- **Viewbox**: 0 0 200 240
- **Ancho**: 200 unidades
- **Altura**: 240 unidades

### Posiciones Importantes (en orden de renderizado)
1. Body Base (capa 0)
2. Hair Back (capa 1)
3. Hair Front (capa 2)
4. Eyes (capa 3)
5. Mouth (capa 4)
6. Top Clothing (capa 5)
7. Bottom Clothing (capa 6)
8. Shoes (capa 7)
9. Accessories (capas 8+)

### Colores Base
- **Piel clara**: #f4c4a0
- **Cabello marrón**: #3d2817
- **Ojos**: #2c3e50
- **Boca**: #d4866a

## Animaciones

### Parpadeo (Blink)
- Intervalo: cada 3-5 segundos
- Duración del parpadeo: 150ms
- Se activa con `isBlinking={true}`

### Respiración (Breathing)
- Escala leve: 1.0 a 1.02
- Duración: 3 segundos por ciclo
- Se activa con `isBreathing={true}`

## Tamaños Responsivos

| Tamaño | Ancho | Alto  |
|--------|-------|-------|
| sm     | 120px | 144px |
| md     | 200px | 240px |
| lg     | 300px | 360px |

## Futuros Mejoras

- [ ] Variaciones de cabello (estilos diferentes)
- [ ] Más opciones de ropa y accesorios
- [ ] Animaciones de brazos
- [ ] Reacciones emocionales avanzadas
- [ ] Sistema de customización de colores en tiempo real
