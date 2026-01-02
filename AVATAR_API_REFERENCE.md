# ChibiAvatar API Reference

## Componente: ChibiAvatar

**Ruta**: `src/assets/svg/ChibiAvatar.tsx`

**Importación**:
```typescript
import { ChibiAvatar, ChibiAvatarProps } from '../../assets/svg/ChibiAvatar';
```

## Props Interface

### ChibiAvatarProps

```typescript
interface ChibiAvatarProps {
  // Apariencia base
  bodyColor?: string;
  hairColor?: string;

  // Expresiones faciales
  eyeState?: 'open' | 'closed' | 'blink';
  mouthState?: 'neutral' | 'smile';

  // Vestuario
  topId?: string;
  bottomId?: string;
  shoesId?: string;

  // Accesorios
  accessories?: string[];

  // Animaciones
  isBlinking?: boolean;
  isBreathing?: boolean;

  // Presentación
  size?: 'sm' | 'md' | 'lg';
}
```

## Propiedades Detalladas

### bodyColor
**Tipo**: `string`  
**Default**: `'#f4c4a0'`  
**Descripción**: Color de piel (hex color)  
**Ejemplo**:
```tsx
<ChibiAvatar bodyColor="#c9956a" />
```

---

### hairColor
**Tipo**: `string`  
**Default**: `'#3d2817'`  
**Descripción**: Color del cabello (hex color)  
**Ejemplo**:
```tsx
<ChibiAvatar hairColor="#d4af37" /> {/* Rubio */}
```

---

### eyeState
**Tipo**: `'open' | 'closed' | 'blink'`  
**Default**: `'open'`  
**Descripción**: Estado de los ojos  
**Valores**:
- `'open'`: Ojos abiertos
- `'closed'`: Ojos cerrados
- `'blink'`: Modo parpadeo automático (ver `isBlinking`)

**Ejemplo**:
```tsx
<ChibiAvatar eyeState="closed" />
```

---

### mouthState
**Tipo**: `'neutral' | 'smile'`  
**Default**: `'neutral'`  
**Descripción**: Expresión de la boca  
**Valores**:
- `'neutral'`: Boca neutral (línea)
- `'smile'`: Sonrisa abierta

**Ejemplo**:
```tsx
<ChibiAvatar mouthState="smile" />
```

---

### topId
**Tipo**: `string`  
**Default**: `'top_red_shirt'`  
**Descripción**: ID del top/camiseta  
**Valores disponibles**:
- `'top_red_shirt'`: Camiseta roja (default)
- `'top_sweater'`: Suéter naranja con cuello

**Ejemplo**:
```tsx
<ChibiAvatar topId="top_sweater" />
```

---

### bottomId
**Tipo**: `string`  
**Default**: `'bottom_pants'`  
**Descripción**: ID del pantalón/bottom  
**Valores disponibles**:
- `'bottom_pants'`: Pantalones azules (default)
- `'bottom_shorts'`: Shorts rosas

**Ejemplo**:
```tsx
<ChibiAvatar bottomId="bottom_shorts" />
```

---

### shoesId
**Tipo**: `string`  
**Default**: `'shoes_sneakers'`  
**Descripción**: ID de los zapatos  
**Valores disponibles**:
- `'shoes_sneakers'`: Tenis negros (default)
- `'shoes_boots'`: Botas marrones

**Ejemplo**:
```tsx
<ChibiAvatar shoesId="shoes_boots" />
```

---

### accessories
**Tipo**: `string[]`  
**Default**: `[]`  
**Descripción**: Array de IDs de accesorios  
**Valores disponibles**:
- `'acc_beanie'`: Gorro beanie púrpura con pompón
- `'acc_glasses'`: Gafas

**Ejemplo**:
```tsx
<ChibiAvatar accessories={['acc_beanie', 'acc_glasses']} />
```

---

### isBlinking
**Tipo**: `boolean`  
**Default**: `false`  
**Descripción**: Activar parpadeo automático periódico  
**Frecuencia**: Cada 3-5 segundos  
**Duración**: 150ms por parpadeo

**Ejemplo**:
```tsx
<ChibiAvatar isBlinking={true} />
```

---

### isBreathing
**Tipo**: `boolean`  
**Default**: `false`  
**Descripción**: Activar animación de respiración (escala leve)  
**Duración**: 3 segundos por ciclo  
**Escala**: 1.0 - 1.02

**Ejemplo**:
```tsx
<ChibiAvatar isBreathing={true} />
```

---

### size
**Tipo**: `'sm' | 'md' | 'lg'`  
**Default**: `'md'`  
**Descripción**: Tamaño del avatar  
**Dimensiones**:
- `'sm'`: 120px × 144px
- `'md'`: 200px × 240px
- `'lg'`: 300px × 360px

**Ejemplo**:
```tsx
<ChibiAvatar size="lg" />
```

---

## Ejemplos de Uso

### Básico
```tsx
<ChibiAvatar />
```

### Con personalización completa
```tsx
<ChibiAvatar
  bodyColor="#d9a894"
  hairColor="#8b6f47"
  eyeState="open"
  mouthState="smile"
  topId="top_sweater"
  bottomId="bottom_shorts"
  shoesId="shoes_boots"
  accessories={['acc_beanie', 'acc_glasses']}
  isBlinking={true}
  isBreathing={true}
  size="md"
/>
```

### Avatar pequeño para listas
```tsx
<ChibiAvatar size="sm" />
```

### Avatar grande para modales
```tsx
<ChibiAvatar size="lg" isBlinking={true} isBreathing={true} />
```

### Con diferentes tonos de piel
```tsx
const skinTones = ['#f9e4c8', '#f4c4a0', '#d9a894', '#c9956a'];

{skinTones.map(tone => (
  <ChibiAvatar key={tone} bodyColor={tone} />
))}
```

### Dinámico desde estado
```tsx
const [selectedTop, setSelectedTop] = useState('top_red_shirt');

<ChibiAvatar
  topId={selectedTop}
  onTopChange={setSelectedTop}
/>
```

---

## Integración con RewardsPage

```tsx
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';

// En el componente
<ChibiAvatar
  bodyColor="#f4c4a0"
  hairColor="#3d2817"
  eyeState="open"
  mouthState="smile"
  topId={equipmentItems.casualTops || 'top_red_shirt'}
  bottomId={equipmentItems.bottomsCasual || 'bottom_pants'}
  shoesId={equipmentItems.shoes || 'shoes_sneakers'}
  accessories={[]}
  isBlinking={true}
  isBreathing={true}
  size="lg"
/>
```

---

## Estilos CSS

**Módulo CSS**: `src/assets/svg/ChibiAvatar.module.css`

### Clases Disponibles

```css
.container        /* Container principal con posicionamiento relativo */
.layer           /* Clase para cada capa SVG (posicionamiento absoluto) */
.sizeSm          /* Tamaño pequeño (120×144px) */
.sizeMd          /* Tamaño medio (200×240px) */
.sizeLg          /* Tamaño grande (300×360px) */
.breathing       /* Animación de respiración */
```

### Personalizar Estilos

```css
/* Hacer avatar más grande */
.container {
  transform: scale(1.5);
}

/* Agregar sombra */
.container {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

/* Efecto borde */
.container {
  border: 2px solid #667eea;
  border-radius: 1rem;
  padding: 1rem;
}
```

---

## Animaciones

### Parpadeo (Blink)
- **Activación**: `isBlinking={true}`
- **Intervalo**: 3000-5000ms aleatorio
- **Duración**: 150ms
- **Función**: Cierra los ojos durante 150ms y abre

### Respiración (Breathing)
- **Activación**: `isBreathing={true}`
- **Duración**: 3 segundos por ciclo
- **Escala**: Oscila entre 1.0 y 1.02
- **Efecto**: Suave efecto de respiro

---

## Especificaciones Técnicas

### ViewBox
- **Valor**: `0 0 200 240`
- **Proporción**: 5:6
- **Unidades**: Unidades de usuario SVG

### Orden de Renderizado (Z-Index)
1. Body Base
2. Hair Back
3. Hair Front
4. Eyes
5. Mouth
6. Top Clothing
7. Bottom Clothing
8. Shoes
9. Accessories

### Canvas Position Guide
```
   0      100      200
 0 ┌───────────────┐
   │   Cabeza      │
50 │               │
   │  Ojos - Boca  │
100│               │
   │   Cuerpo      │
   │   Ropa Top    │
150│               │
   │  Ropa Bottom  │
   │  Piernas      │
200│               │
   │   Zapatos     │
240└───────────────┘
```

---

## Limitaciones Actuales

- Solo soporta una prenda superior a la vez
- Solo soporta una prenda inferior a la vez
- Solo soporta un par de zapatos a la vez
- No hay soporte para múltiples expresiones emocionales
- No hay animaciones de movimiento

---

## Roadmap Futuro

- [ ] Más estilos de cabello
- [ ] Sistema de coloración dinámica de ropas
- [ ] Animaciones de brazos
- [ ] Expresiones emocionales adicionales (enojo, tristeza, sorpresa)
- [ ] Sistema de posiciones (sentado, saltando, etc.)
- [ ] Exportar avatar a PNG
- [ ] Más accesorios
- [ ] Sistema de capas de ropa superpuesta

---

## Troubleshooting

### Avatar no aparece
- Verificar que el componente esté importado correctamente
- Verificar que `ChibiAvatar.tsx` no tenga errores de compilación
- Verificar que el módulo CSS esté vinculado

### Piezas desalineadas
- Todos los SVG deben tener ViewBox: `0 0 200 240`
- Verificar coordenadas en cada capa

### Animaciones no funcionan
- Verificar que `isBlinking` o `isBreathing` estén en `true`
- Verificar que el navegador soporte CSS animations

### Colores no se aplican
- Usar formato hex válido: `#RRGGBB`
- Verificar que el prop sea `bodyColor` o `hairColor` (no `skinColor`)

---

## Performance

- **Renderizado**: SVG vector (sin rasterizado)
- **Animaciones**: CSS y JavaScript state-based
- **Tamaño**: Aproximadamente 50KB por avatar (todos los SVG incrustados)
- **Optimización**: Usa React.memo si hay múltiples avatares

---

## Soporte de Navegadores

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores móviles modernos

---

## Licencia

Parte del proyecto "Mundo Mágico Inglés" © 2025
