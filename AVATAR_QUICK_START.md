# 🎨 Avatar Chibi Modular - Documentación Rápida

## 🚀 Inicio Rápido

### Uso Básico
```tsx
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';

<ChibiAvatar />
```

### Con Personalización
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

---

## 📖 Documentación

| Documento | Contenido |
|-----------|----------|
| `AVATAR_EXECUTIVE_SUMMARY.md` | Resumen general del proyecto ✨ **EMPIEZA AQUÍ** |
| `AVATAR_API_REFERENCE.md` | Referencia completa de props y métodos |
| `AVATAR_HOW_TO_ADD_PIECES.md` | Cómo agregar nuevas ropas y accesorios |
| `CHIBI_AVATAR_SYSTEM.md` | Documentación técnica del sistema |
| `AVATAR_IMPLEMENTATION_SUMMARY.md` | Cambios implementados |
| `ChibiAvatar.examples.tsx` | 9 ejemplos de código |

---

## 📁 Estructura de Carpetas

```
public/assets/avatar/
├── base/
│   ├── body/           # Cuerpo y partes base
│   ├── eyes/           # Expresiones de ojos
│   ├── mouth/          # Expresiones de boca
│   └── hair/           # Cabello
├── clothing/
│   ├── tops/           # Camisetas, suéteres
│   ├── bottoms/        # Pantalones, shorts
│   └── shoes/          # Zapatos
└── accessories/        # Gorros, gafas, etc.

src/assets/svg/
├── ChibiAvatar.tsx
├── ChibiAvatar.module.css
├── ChibiAvatar.examples.tsx
└── ChibiAvatar.examples.module.css
```

---

## 🎯 Props Principales

```typescript
// Colores
bodyColor?: string         // Color de piel
hairColor?: string         // Color de cabello

// Expresiones
eyeState?: 'open' | 'closed'
mouthState?: 'neutral' | 'smile'

// Vestuario
topId?: string             // 'top_red_shirt' | 'top_sweater'
bottomId?: string          // 'bottom_pants' | 'bottom_shorts'
shoesId?: string           // 'shoes_sneakers' | 'shoes_boots'
accessories?: string[]     // ['acc_beanie', 'acc_glasses']

// Animaciones
isBlinking?: boolean       // Parpadeo automático
isBreathing?: boolean      // Respiración

// Presentación
size?: 'sm' | 'md' | 'lg'  // Tamaño
```

---

## 💡 Casos de Uso

### Avatar en RewardsPage (ACTUAL)
```tsx
<ChibiAvatar
  topId={equipmentItems.casualTops || 'top_red_shirt'}
  bottomId={equipmentItems.bottomsCasual || 'bottom_pants'}
  shoesId={equipmentItems.shoes || 'shoes_sneakers'}
  size="lg"
  isBlinking={true}
  isBreathing={true}
/>
```

### Selector de Ropa
```tsx
{tops.map(top => (
  <button key={top.id} onClick={() => selectTop(top.id)}>
    <ChibiAvatar topId={top.id} size="sm" />
  </button>
))}
```

### Galería de Personajes
```tsx
{players.map(player => (
  <ChibiAvatar
    key={player.id}
    bodyColor={player.skinColor}
    hairColor={player.hairColor}
    size="md"
  />
))}
```

---

## 🎨 Personalización de Colores

### Tonos de Piel
```
#f9e4c8  Muy claro
#f4c4a0  Claro (default)
#d9a894  Medio
#c9956a  Oscuro
#8b5a2b  Muy oscuro
```

### Colores de Cabello
```
#3d2817  Marrón oscuro (default)
#8b6f47  Marrón claro
#d4af37  Rubio dorado
#ff1493  Rosa
#00ced1  Turquesa
```

---

## ⚙️ Cómo Agregar Nuevas Piezas

### 1. Crear SVG
- ViewBox exacto: `0 0 200 240`
- Guardarlo en carpeta apropiada
- Ejemplo: `public/assets/avatar/clothing/tops/top_dress.svg`

### 2. Agregar en ChibiAvatar.tsx
```tsx
{topId === 'top_dress' && (
  <svg className={layerClass} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    {/* SVG content aquí */}
  </svg>
)}
```

### 3. Usar en componente
```tsx
<ChibiAvatar topId="top_dress" />
```

Ver `AVATAR_HOW_TO_ADD_PIECES.md` para detalles completos.

---

## 🐛 Troubleshooting

### Avatar no aparece
- Verificar que `ChibiAvatar.tsx` esté en la ruta correcta
- Verificar que no haya errores en consola
- Verificar que el módulo CSS esté vinculado

### Piezas desalineadas
- Todos los SVG deben tener ViewBox: `0 0 200 240`
- Verificar posiciones en el código

### Animaciones no funcionan
- Verificar que `isBlinking` o `isBreathing` sean `true`
- Verificar que el navegador soporte CSS animations

---

## 📊 Estadísticas

- **Archivos SVG**: 22
- **Props soportadas**: 11
- **Combinaciones posibles**: 500+
- **Tamaños disponibles**: 3
- **Líneas de código**: ~400

---

## 🔄 Integración Actual

### RewardsPage
✅ Avatar reemplaza a Sapito
✅ Muestra ropa equipada
✅ Tiene animaciones
✅ Es completamente funcional

### Sistema de Rewards
✅ Lee `equipmentItems`
✅ Sincroniza ropa en tiempo real
✅ Actualiza al comprar/equipar

---

## 📞 Referencias

- **API Completa**: `AVATAR_API_REFERENCE.md`
- **Ejemplos**: `ChibiAvatar.examples.tsx`
- **Tutorial**: `AVATAR_HOW_TO_ADD_PIECES.md`
- **Sistema**: `CHIBI_AVATAR_SYSTEM.md`

---

## ✅ Status

- ✅ Implementación completada
- ✅ Integración con RewardsPage completada
- ✅ Documentación completa
- ✅ Sin errores de compilación
- ✅ Listo para producción

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 26, 2025
