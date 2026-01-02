# 🎮 MUNDO MÁGICO INGLÉS - RESUMEN RÁPIDO PARA NUEVOS DESARROLLADORES

## ¿Qué es este proyecto?

Una **app educativa para niños de 3-11+ años** que enseña inglés a través de mundos temáticos, misiones interactivas y un sistema de recompensas. El contenido se adapta automáticamente según la edad del niño.

---

## 🚀 EMPEZAR EN 5 MINUTOS

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173`

---

## 📊 ESTADO ACTUAL

### ✅ YA ESTÁ HECHO
- Avatar personalizable (Chibi modular)
- Sistema de adaptación por edad (3 grupos)
- Estructura de mundos, capítulos y misiones
- Página de recompensas con sistema de compra
- Actividades de repaso (flashcards, historias básicas, colorear)
- Panel parental (básico)
- Interfaz responsiva y animada

### ❌ FALTA HACER (PRIORITARIO)

**1. Sección de CUENTOS completa** (5-7 días)
   - 8-10 historias diferentes
   - Editor de lectura con narración
   - Adaptadas por edad

**2. DIBUJOS para colorear mejorados** (4-6 días)
   - 12-15 dibujos (tenemos 6)
   - Herramientas: pincel, bote de pintura, borrador
   - Guardar y compartir

**3. Cambiar COLORES del Panel Parental** (1 día)
   - Actualizar paleta de colores
   - Mejorar diseño

**4. NIVELES dentro de mundos** (3-4 días)
   - Estructura: Mundo → Capítulo → **Nivel** → Misión
   - Datos para 40-60 niveles

**5. Más ROPA para avatar** (2-3 días)
   - Agregar 4-5 tops, bottoms, shoes
   - Total: 20+ combinaciones

**6. TODAS las imágenes** (2-3 días)
   - Fondos para cada sección
   - Iconos de premios
   - Ilustraciones de historias

---

## 🗂️ ESTRUCTURA IMPORTANTE

```
src/
├── pages/              ← Las pantallas principales
├── features/           ← Lógica de negocio
├── shared/data/        ← Datos centralizados (mundos, premios)
├── shared/ui/          ← Componentes reutilizables
├── entities/           ← Modelos de datos
└── app/providers/      ← Contextos (edad, audio, avatar)
```

### Archivos CRÍTICOS

| Archivo | Qué hace |
|---------|----------|
| `src/shared/data/worlds.ts` | Define todos los mundos, capítulos, misiones |
| `src/shared/data/rewards.ts` | Define premios y rareza |
| `src/shared/data/ageGroups.ts` | Configura adaptación por edad |
| `src/pages/ParentZonePage/` | Panel parental (necesita colores) |
| `src/pages/ReviewPage/ColoringPage.tsx` | Dibujos para colorear |
| `src/pages/ReviewPage/StoriesPage.tsx` | Historias (necesita expandir) |

---

## 🎯 CÓMO NAVEGA LA APP

```
LandingPage 
  → LoginPage 
  → FamilyAccessPage (Selecciona edad aquí 🔑)
  → WelcomePage
  → HomePage
    ├─ WorldsMapPage → ChapterMapPage → LevelPage → MissionPage
    ├─ ReviewPage → (Flashcards, Historias, Colorear)
    ├─ RewardsPage → (Avatar + Tienda)
    └─ ParentZonePage (Para papás)
```

---

## 🎓 SISTEMA DE ADAPTACIÓN POR EDAD

```
3-6 años      7-10 años     11+ años
├─ 3 palabras ├─ 5 palabras ├─ 8 palabras
├─ Fuente +20%├─ Normal    ├─ -5%
├─ Animaciones├─ Normal    ├─ +20%
│  -20%       │            │
└─ ...        └─ ...       └─ ...
```

**Cómo usar en componentes:**
```tsx
import { useAgeAdaptation } from '@/features/child/hooks';

const { fontSize, animationSpeed } = useAgeAdaptation();
```

---

## 🎨 AVATAR CHIBI

- Está **100% funcional**
- Archivos en `public/assets/avatar/`
- Componente: `src/assets/svg/ChibiAvatar.tsx`
- Personalizable: 5 tonos de piel, cabello, ropa, accesorios
- **Tarea**: Agregar más opciones de ropa

---

## 📝 CÓMO HACER COSAS COMUNES

### Agregar un nuevo premio

`src/shared/data/rewards.ts`:
```typescript
{
  id: 'new-item',
  name: 'Item Name',
  description: 'Description',
  rarity: 'epic',
  price: 1500,
  equipmentType: 'body',
  image: 'url',
}
```

### Agregar una nueva misión

`src/shared/data/worlds.ts`:
```typescript
{
  id: 'm99',
  title: 'New Mission',
  description: '...',
  type: 'DragAndDrop',
  levelId: 'l1',
  content: [...],
}
```

### Usar estilos de edad

```tsx
const { fontSize } = useAgeAdaptation();

<div style={{ fontSize: `${fontSize}rem` }}>
  Texto que se adapta
</div>
```

---

## 🔴 PRIORIDADES INMEDIATAS

1. **CUENTOS**: Expandir StoriesPage.tsx con 8-10 historias
2. **COLOREAR**: Agregar 9 dibujos más + herramientas al ColoringPage
3. **COLORES**: Cambiar paleta en ParentZonePage.module.css
4. **NIVELES**: Estructurar LevelPage y expandir worlds.ts
5. **ROPA**: Crear 12 nuevos SVGs de ropa
6. **IMÁGENES**: Crear/descargar todas las imágenes de fondo

---

## 📚 DOCUMENTACIÓN COMPLETA

Existe archivo completo: `PROJECT_COMPLETE_DOCUMENTATION.md`

Contiene:
- Arquitectura detallada
- Todos los archivos explicados
- Flujos de datos
- Guía paso a paso para nuevas features
- Roadmap completo

---

## 🆘 SI TIENES PROBLEMAS

### "Veo errores de TypeScript"
```bash
npm run lint
# Lee los errores y corrige tipos
```

### "No compila"
```bash
npm run build
# Verá exactamente qué falla
```

### "Quiero agregar una nueva página"
1. Crea carpeta en `src/pages/MyPage/`
2. Copia estructura de otra página similar
3. Agrega ruta en `src/app/router/AppRouter.tsx`
4. Usa `useAgeAdaptation()` si necesita adaptación

### "Quiero cambiar estilos"
- **NO** uses `style={{ }}` inline
- **SÍ** usa `MyComponent.module.css`
- Clases con patrón: `.className { ... }`

---

## 🎯 ANTES DE HACER PUSH

```bash
npm run lint      # ✅ Sin errores
npm run build     # ✅ Compila
```

Si todo verde, ¡listo para commit!

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Cómo agrego un mundo nuevo?**
A: Edita `src/shared/data/worlds.ts`, agrega objeto World, sus capítulos y misiones.

**P: ¿Dónde va la lógica de guardado?**
A: Por ahora localStorage. Buscar `localStorage` en el código para ver ejemplos.

**P: ¿Cómo funciona el sistema de edad?**
A: Se elige en FamilyAccessPage → se guarda en ChildContext → todos los hooks acceden a él.

**P: ¿Puedo usar jQuery?**
A: No, es React puro. Usa Framer Motion para animaciones.

**P: ¿Cómo pruebo en mobile?**
A: `npm run dev`, abre DevTools (F12), cambia a modo móvil.

---

**Buena suerte! 🚀**

Para dudas → Lee `PROJECT_COMPLETE_DOCUMENTATION.md`
