# Guía: Cómo Agregar Nuevas Piezas de Avatar

## 1️⃣ Crear el Archivo SVG

### Requisitos:
- ViewBox: `0 0 200 240` (EXACTAMENTE)
- Formato: SVG con transparencia
- Sin fondo (background-color: none)

### Plantilla Base:
```xml
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <!-- Tu contenido aquí -->
</svg>
```

### Ejemplo: Nuevo Top
```xml
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <!-- Top - Vestido Azul -->
  <path d="M 70 100 L 68 160 Q 68 165 72 165 L 128 165 Q 132 165 132 160 L 130 100 Z" fill="#2c3e50"/>
</svg>
```

**Guardar en**: `public/assets/avatar/clothing/tops/top_dress_blue.svg`

## 2️⃣ Actualizar ChibiAvatar.tsx

Agregar la nueva pieza en el componente:

```tsx
// En el JSX, agregar después de los tops existentes:

{topId === 'top_dress_blue' && (
  <svg className={layerClass} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <path d="M 70 100 L 68 160 Q 68 165 72 165 L 128 165 Q 132 165 132 160 L 130 100 Z" fill="#2c3e50"/>
  </svg>
)}
```

## 3️⃣ Actualizar RewardsPage.tsx (Opcional)

Si la nueva pieza es para equipar automáticamente:

```tsx
topId={equipmentItems.casualTops === 'top_dress_blue' ? 'top_dress_blue' : ...}
```

## 📐 Guía de Posiciones en el Canvas

```
        200 (ancho total)
    ├─────────────────────┤
    │                     │
    │    Cabeza (60px h)  │  ← y: 25-95
    │                     │
    │   Cuerpo (80px h)   │  ← y: 95-175
    │    Brazos/Ropa      │
    │    Pantalones       │
    │    Piernas (50px h) │  ← y: 160-210
    │    Zapatos (10px h) │  ← y: 190-210
    │                     │
    └─────────────────────┘
    240 (alto total)
```

## 🎨 Colores Recomendados

### Pasteles
- Rosado: #f5a8d8
- Azul claro: #87ceeb
- Verde claro: #90ee90
- Amarillo: #ffffe0

### Vibrantes
- Rojo: #e74c3c
- Naranja: #f39c12
- Verde: #27ae60
- Azul: #3498db

### Neutros
- Gris: #95a5a6
- Negro: #2c3e50
- Marrón: #8b4513

## 📋 Lista de Verificación

- [ ] ViewBox es `0 0 200 240`
- [ ] SVG tiene transparencia (sin fondo)
- [ ] Las formas están correctamente posicionadas
- [ ] Los colores son consistentes con el estilo chibi
- [ ] El archivo tiene un nombre descriptivo
- [ ] Se agregó el ID en ChibiAvatar.tsx
- [ ] Se probó en la aplicación
- [ ] Se documentó en CHIBI_AVATAR_SYSTEM.md

## 🧪 Testing

Para probar la nueva pieza, uso el componente así:

```tsx
<ChibiAvatar
  topId="top_dress_blue"  // ← Usar el nuevo ID
  size="lg"
  isBlinking={true}
/>
```

## 📝 Tipos de Piezas y Ubicaciones

| Tipo | Carpeta | Ejemplo | Rango Y |
|------|---------|---------|---------|
| Body | `base/body/` | body_base.svg | N/A |
| Hair Front | `base/hair/` | hair_front.svg | 5-45 |
| Hair Back | `base/hair/` | hair_back.svg | 40-150 |
| Eyes | `base/eyes/` | eyes_open.svg | 40-70 |
| Mouth | `base/mouth/` | mouth_smile.svg | 70-85 |
| Top | `clothing/tops/` | top_red_shirt.svg | 95-155 |
| Bottom | `clothing/bottoms/` | bottom_pants.svg | 145-195 |
| Shoes | `clothing/shoes/` | shoes_sneakers.svg | 185-210 |
| Accessory | `accessories/` | acc_beanie.svg | 5-35 |

## ⚠️ Errores Comunes

### Error: "Avatar aparece sin la nueva pieza"
- Verificar que el ID coincida exactamente
- Verificar que el SVG esté en la ruta correcta
- Verificar que el ViewBox sea exacto

### Error: "Piezas no se alinean"
- Verificar que el ViewBox sea `0 0 200 240`
- Comprobar que las coordenadas sean correctas
- Usar la guía de posiciones

### Error: "Fondos no transparentes"
- Asegurarse de NO agregar un `<rect>` de fondo
- Usar solo las formas necesarias
- Verificar que no haya atributo `fill` en el elemento raíz

## 🚀 Ejemplo Completo: Agregar Pantalones Verdes

### 1. Crear archivo `public/assets/avatar/clothing/bottoms/bottom_green_pants.svg`:
```xml
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
  <path d="M 88 145 L 85 160 L 80 195 L 95 195 L 92 160 Z" fill="#27ae60"/>
  <path d="M 112 145 L 115 160 L 120 195 L 105 195 L 108 160 Z" fill="#27ae60"/>
</svg>
```

### 2. Agregar en ChibiAvatar.tsx:
```tsx
{bottomId === 'bottom_green_pants' && (
  <svg className={layerClass} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <path d="M 88 145 L 85 160 L 80 195 L 95 195 L 92 160 Z" fill="#27ae60"/>
    <path d="M 112 145 L 115 160 L 120 195 L 105 195 L 108 160 Z" fill="#27ae60"/>
  </svg>
)}
```

### 3. Usar en RewardsPage:
```tsx
<ChibiAvatar
  bottomId="bottom_green_pants"
/>
```

¡Listo! La nueva pieza está integrada. 🎉
