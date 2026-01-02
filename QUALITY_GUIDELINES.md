# ✅ GUÍA DE CALIDAD Y CHECKLIST - MUNDO MÁGICO INGLÉS

**Propósito**: Garantizar que todos los nuevos features mantengan la calidad del proyecto.

---

## 🎯 ESTÁNDARES DEL PROYECTO

### Código TypeScript/React

#### ✅ DO's (HACER)

1. **Usar componentes funcionales con hooks**
```tsx
export const MyComponent: React.FC<Props> = (props) => {
  const [state, setState] = useState(initialValue)
  return <div>{state}</div>
}
```

2. **Usar CSS modules para estilos**
```tsx
import styles from './MyComponent.module.css'
<div className={styles.container}>
```

3. **Tipos completos con TypeScript**
```tsx
interface MyComponentProps {
  title: string
  count: number
  onSubmit: (data: FormData) => void
}
```

4. **Hooks de adaptación por edad**
```tsx
const { fontSize, animationSpeed } = useAgeAdaptation()
```

5. **Nombres descriptivos**
```tsx
✅ const handleButtonClick = () => {}
✅ const [isLoading, setIsLoading] = useState(false)
✅ const calculateTotalScore = () => {}
```

6. **Componentes reutilizables en `src/shared/ui/`**
```tsx
// NO crear botones personalizados en cada página
// SÍ usar <Button /> del shared/ui/
```

#### ❌ DON'Ts (NO HACER)

1. **❌ Estilos inline**
```tsx
// MALO
<div style={{ color: 'red', fontSize: '20px' }}>

// BUENO
<div className={styles.title}>
```

2. **❌ Estados globales sin contexto**
```tsx
// MALO - variables globales
let globalState = { ... }

// BUENO - usar Context
const { state } = useMyContext()
```

3. **❌ Componentes enormes (>300 líneas)**
```tsx
// MALO - 500 líneas en un componente
const MassiveComponent = () => { ... }

// BUENO - dividir en subcomponentes
const Header = () => { ... }
const Content = () => { ... }
const Footer = () => { ... }
const MassiveComponent = () => (
  <>
    <Header />
    <Content />
    <Footer />
  </>
)
```

4. **❌ Ignorar warnings de TypeScript**
```tsx
// MALO
const data: any = response.data

// BUENO
interface ResponseData {
  id: string
  name: string
}
const data: ResponseData = response.data
```

5. **❌ Props sin documentación**
```tsx
// MALO
interface Props {
  x: string
  y: boolean
  z?: number
}

// BUENO
interface ButtonProps {
  /** Texto a mostrar en el botón */
  label: string
  /** Función a ejecutar al hacer click */
  onClick: () => void
  /** Si el botón está deshabilitado */
  disabled?: boolean
}
```

6. **❌ Rutas hardcodeadas**
```tsx
// MALO
navigate('/reward/item/123')

// BUENO - usar constantes
const ROUTES = {
  REWARDS: '/rewards',
  REWARD_DETAIL: (id: string) => `/rewards/${id}`,
}
navigate(ROUTES.REWARD_DETAIL('123'))
```

---

## 🎨 ESTÁNDARES DE DISEÑO

### Colores

#### Paleta Principal
```
🟥 Primario: #FF6B6B (Rojo suave)
🟦 Secundario: #4ECDC4 (Turquesa)
🟨 Acento: #FFE66D (Amarillo)
⬛ Dark: #2C3E50 (Azul oscuro)
⬜ Light: #F7F9FC (Gris muy claro)
```

#### Colores por Rareza
```
⚪ Common: #808080 (Gris)
🔵 Rare: #4169E1 (Azul)
🟣 Epic: #9370DB (Púrpura)
⭐ Legendary: #FFD700 (Oro)
```

### Tipografía

```css
/* Encabezados */
h1 { font-size: 2.5rem; font-weight: bold; }
h2 { font-size: 2rem; font-weight: bold; }
h3 { font-size: 1.5rem; font-weight: 600; }

/* Cuerpo */
body { font-size: 1rem; font-weight: 400; }
small { font-size: 0.875rem; }

/* Adaptada por edad */
const { fontSize } = useAgeAdaptation()
// 3-6: fontSize * 1.2
// 7-10: fontSize * 1
// 11+: fontSize * 0.95
```

### Espaciado

```css
/* Usar múltiplos de 0.5rem */
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */

/* En CSS */
.button { padding: var(--spacing-md) var(--spacing-lg); }
```

### Redondeado

```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 999px

.card { border-radius: var(--radius-lg); }
```

### Sombras

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

.card { box-shadow: var(--shadow-md); }
```

### Animaciones

```tsx
// Usar Framer Motion
import { motion } from 'framer-motion'

// Entrrada suave
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

---

## 📋 CHECKLIST ANTES DE HACER COMMIT

### Código

- [ ] Compila sin errores: `npm run build`
- [ ] Lint pasa: `npm run lint`
- [ ] TypeScript sin warnings: `npm run build`
- [ ] Todos los tipos están definidos (no `any`)
- [ ] Componentes tienen JSDoc comments
- [ ] No hay console.log() excepto para debug
- [ ] Nombres de variables son descriptivos
- [ ] Funciones tienen máximo 50 líneas
- [ ] CSS modules no tiene estilos inline
- [ ] Rutas hardcodeadas son constantes

### Funcionalidad

- [ ] Feature funciona como se especificó
- [ ] Casos edge están manejados
- [ ] Mensajes de error son útiles
- [ ] Loading states mostrados
- [ ] Validación de inputs funciona
- [ ] Responsive en mobile (DevTools)
- [ ] Adaptación por edad funciona
- [ ] Performance: sin memory leaks

### Accesibilidad

- [ ] aria-labels en botones sin texto
- [ ] Roles ARIA correctos
- [ ] Contraste suficiente (WCAG AA)
- [ ] Navegable por teclado (Tab)
- [ ] Confirmación para acciones destructivas
- [ ] Textos alternativos en imágenes

### Diseño

- [ ] Sigue paleta de colores
- [ ] Espaciado consistente
- [ ] Tipografía consistente
- [ ] Animaciones suaves (no saltos)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Iconografía consistente
- [ ] Ningún elemento "roto" o distorsionado

### Documentación

- [ ] README/comentarios actualizados
- [ ] Nuevas rutas documentadas
- [ ] Nuevos tipos/interfaces documentados
- [ ] Archivos/carpetas tienen propósito claro
- [ ] Ejemplos de uso incluidos si aplica

---

## 🔍 PROCESO DE CODE REVIEW

### Para Revisor

1. **¿Cumple con estándares de código?**
   - Nombres descriptivos
   - TypeScript tipos completos
   - Sin estilos inline
   - CSS modules

2. **¿La funcionalidad es correcta?**
   - Feature funciona como describe el PR
   - Edge cases considerados
   - Error handling presente

3. **¿Mantiene la calidad?**
   - Performance no impactado
   - No hay memory leaks
   - Accesibilidad OK
   - Responsivo

4. **¿La documentación es suficiente?**
   - Cambios documentados
   - JSDoc comments presentes
   - README actualizado si aplica

### Comentarios Útiles

```
❌ "Usa CSS modules en lugar de inline styles"
Razón: Consistencia, performance, mantenibilidad

✅ "Bien resuelto. Consideras el caso edge de X"
```

---

## 🐛 GUÍA DE DEBUGGING

### Si algo no funciona...

1. **Revisa la consola (DevTools)**
```bash
F12 → Console → Busca errores rojos
```

2. **Revisa warnings de TypeScript**
```bash
npm run build  # Verá todos los problemas
```

3. **Lint errors**
```bash
npm run lint   # Problemas de código
```

4. **Usa React DevTools**
```
Chrome: Extensión "React Developer Tools"
- Props correctas?
- Estado correcto?
- Re-renders inesperados?
```

5. **Network tab (para imágenes/assets)**
```bash
F12 → Network → Verifica que se cargan
Status 200 = OK
Status 404 = No encontrado
```

6. **Memory leaks (en componentes)**
```tsx
useEffect(() => {
  // Cleanup function
  return () => {
    // Limpiar listeners, timers, etc
  }
}, [])
```

---

## 🎯 CONVENCIONES DE NOMBRES

### Archivos

```
✅ MyComponent.tsx        (componentes)
✅ myHook.ts             (hooks)
✅ myUtil.ts             (funciones)
✅ MyComponent.module.css (estilos)
✅ types.ts              (tipos)

❌ MyComponent.jsx       (no JSX)
❌ MyComponent.styles.ts (wrong extension)
```

### Carpetas

```
✅ features/              (minúscula, plural)
✅ shared/ui/            (minúscula, plural)
✅ pages/MyPage/         (PascalCase)
❌ features/myFeature    (no PascalCase)
❌ shared/component      (singular)
```

### Funciones

```tsx
✅ const handleButtonClick = () => {}
✅ const getWorldById = (id: string) => {}
✅ const formatDate = (date: Date) => {}
✅ const useAgeAdaptation = () => {}
✅ const calculateScore = () => {}

❌ const click = () => {}
❌ const world = (id) => {}  // ambiguo
❌ const handle = () => {}   // muy genérico
```

### Variables de Estado

```tsx
✅ const [isLoading, setIsLoading] = useState(false)
✅ const [userData, setUserData] = useState(null)
✅ const [selectedWorld, setSelectedWorld] = useState('')

❌ const [loading, setLoading] = useState(false)
❌ const [user, setUser] = useState(null)
❌ const [world, setWorld] = useState('')  // ambiguo
```

### Constantes

```
✅ const MAX_PLAYERS = 4
✅ const API_URL = 'https://...'
✅ const DEFAULT_TIMEOUT = 5000

❌ const max = 4
❌ const url = 'https://...'
```

---

## 📊 MÉTRICA DE CALIDAD

### Para medir si el código es bueno:

```
✅ EXCELENTE (100%):
├─ Compila sin errores
├─ TypeScript: 0 warnings
├─ Lint: 0 errores
├─ Tests: todas pasan
├─ Accesibilidad: AA o mejor
├─ Performance: <3s carga
└─ Responsive: funciona en mobile

✅ BUENO (80%):
├─ Compila sin errores
├─ TypeScript: algunos warnings
├─ Lint: <5 errores
├─ Tests: 80%+ cobertura
├─ Accesibilidad: A
├─ Performance: <5s carga
└─ Responsive: requiere ajustes menores

⚠️ ACEPTABLE (60%):
├─ Compila con warnings
├─ TypeScript: multiple warnings
├─ Lint: >5 errores
├─ Tests: <80% cobertura
├─ Accesibilidad: problemas
├─ Performance: >5s carga
└─ Responsive: problemas varios

❌ RECHAZAR (<60%):
├─ No compila
├─ Muchos tipos `any`
├─ Lint errors severos
├─ Tests fallan
├─ Accesibilidad muy pobre
├─ Performance muy lenta
└─ No responsive
```

---

## 🚀 PERFORMANCE CHECKLIST

- [ ] Imágenes optimizadas (<500KB por imagen)
- [ ] SVG comprimidos (usar SVGO)
- [ ] CSS minificado en producción
- [ ] JavaScript minificado en producción
- [ ] Lazy loading de imágenes grandes
- [ ] Memoización de componentes pesados
  ```tsx
  export const MyComponent = React.memo(({ prop }) => {
    // Componente costoso
  })
  ```
- [ ] useCallback para callbacks estables
  ```tsx
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);
  ```
- [ ] useMemo para cálculos pesados
  ```tsx
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);
  ```
- [ ] No crear funciones en render
- [ ] Dependency arrays correctos en useEffect

---

## 📱 RESPONSIVIDAD CHECKLIST

Probar en:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Orientación horizontal
- [ ] Zoom en navegador (125%, 150%)
- [ ] Safari, Chrome, Firefox

Verificar:
- [ ] Texto legible en todos los tamaños
- [ ] Botones clickeables (mín 44x44px)
- [ ] Imágenes no distorsionadas
- [ ] Scroll horizontal NO existe
- [ ] Touch events funcionan
- [ ] Animaciones suaves

---

## 🎓 RECURSOS ÚTILES

### Documentación Oficial
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion](https://www.framer.com/motion)
- [CSS Modules](https://github.com/css-modules/css-modules)

### Herramientas Útiles
```bash
# Formatear código
npx prettier --write .

# Analizar bundle
npm run build -- --analyze

# Profile performance
npm run build && npm run preview
# Luego DevTools → Lighthouse
```

### Ejemplos en Proyecto
- Revisar `src/pages/HomePage/HomePage.tsx` (buena estructura)
- Revisar `src/shared/ui/Button/Button.tsx` (componente simple)
- Revisar `src/features/child/context/ChildContext.tsx` (contexto)

---

## ❓ CUANDO TENGAS DUDAS

1. **¿Dónde pongo esto?**
   - Lógica → `src/features/`
   - Componente reutilizable → `src/shared/ui/`
   - Página → `src/pages/`
   - Datos → `src/shared/data/`
   - Tipo → Junto al archivo o `src/types/`

2. **¿Cuál es la estructura correcta?**
   - Ver `src/pages/HomePage/HomePage.tsx`

3. **¿Cómo uso adaptación por edad?**
   - Ver `AGE_ADAPTATION_GUIDE.md`

4. **¿Cómo creo un nuevo feature?**
   - Ver `QUICK_START_GUIDE.md` → "Cómo hacer cosas comunes"

5. **¿Dónde va la API/servidor?**
   - Por ahora localStorage
   - Próximas fases: agregar backend

---

**Última actualización**: Enero 2, 2026
**Mantenedor**: Equipo de Desarrollo
