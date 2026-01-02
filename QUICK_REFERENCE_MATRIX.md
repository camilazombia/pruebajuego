# 🗺️ MATRIZ DE REFERENCIA RÁPIDA - MUNDO MÁGICO INGLÉS

**Propósito**: Encontrar rápidamente qué documento leer para una pregunta específica.

---

## 🎯 PREGUNTAS Y DÓNDE ENCONTRAR RESPUESTAS

### "Acabo de recibir el proyecto, ¿por dónde empiezo?"
→ **QUICK_START_GUIDE.md** (5 min read)

### "Necesito entender la arquitectura del proyecto"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (30 min)

### "¿Cuáles son las características que falta implementar?"
→ **TECHNICAL_TASKS_DETAILED.md** (Overview section)

### "¿Cuál es la tarea prioritaria?"
→ **DELIVERY_SUMMARY.md** (Sección "Tareas Prioritarias")

### "¿Cómo hago X?" (agregar página, componente, etc)
→ **QUICK_START_GUIDE.md** (Sección "Cómo hacer cosas comunes")

### "¿Cuáles son los estándares de código?"
→ **QUALITY_GUIDELINES.md** (Sección "Estándares")

### "¿Cómo escribo código de buena calidad?"
→ **QUALITY_GUIDELINES.md** (Secciones "DO's y DON'Ts")

### "¿Qué debo verificar antes de hacer commit?"
→ **QUALITY_GUIDELINES.md** (Sección "Checklist antes de commit")

### "¿Cómo hace el proyecto la adaptación por edad?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Sistema de Adaptación")

### "¿Cómo funciona el avatar chibi?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Avatar Chibi")

### "¿Cuál es la estructura de datos de mundos?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Flujos de Datos")

### "Tengo un error, ¿cómo debuggeo?"
→ **QUALITY_GUIDELINES.md** (Sección "Guía de Debugging")

### "¿Cuáles son los nombres correctos para variables/funciones?"
→ **QUALITY_GUIDELINES.md** (Sección "Convenciones de Nombres")

### "¿Cómo reviso el código de otro?"
→ **QUALITY_GUIDELINES.md** (Sección "Proceso de Code Review")

### "¿Cuánto tiempo toma cada tarea?"
→ **TECHNICAL_TASKS_DETAILED.md** (Tabla "Resumen de Tareas")

### "¿Necesito hacer dependencias entre tareas?"
→ **TECHNICAL_TASKS_DETAILED.md** (Sección "Dependencias")

### "¿Qué imágenes necesito crear?"
→ **TECHNICAL_TASKS_DETAILED.md** (Tarea 6)

### "¿Qué colores debo usar?"
→ **QUALITY_GUIDELINES.md** (Sección "Colores")

### "¿Cuál es el flujo de navegación?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Flujo Principal")

### "¿Qué es ChildContext y cómo lo uso?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Sistema de Adaptación")

### "¿Dónde pongo X archivo/componente?"
→ **PROJECT_COMPLETE_DOCUMENTATION.md** (Sección "Estructura de Carpetas")

---

## 📚 TABLA DE DOCUMENTOS

| Documento | Propósito | Lectura | Cuándo usar |
|-----------|-----------|---------|------------|
| **QUICK_START_GUIDE.md** | Inicio rápido | 5-10 min | Primero que nada |
| **PROJECT_COMPLETE_DOCUMENTATION.md** | Documentación integral | 30-45 min | Referencia general |
| **TECHNICAL_TASKS_DETAILED.md** | Tareas específicas | 20-30 min | Cuando asignen tarea |
| **QUALITY_GUIDELINES.md** | Estándares de código | 15-20 min | Siempre que codes |
| **DELIVERY_SUMMARY.md** | Resumen de entrega | 5 min | Visión general |
| **Esta matriz** | Referencia rápida | 2 min | Encontrar dónde buscar |

---

## 🗂️ DOCUMENTOS EXISTENTES DEL PROYECTO

| Documento | Qué Explica | Cuándo Consultar |
|-----------|------------|-----------------|
| AGE_SYSTEM_README.md | Sistema de adaptación por edad en detalle | Si trabajas con edades |
| AGE_ADAPTATION_GUIDE.md | Cómo usar hooks de edad con ejemplos | Si necesitas edad en componente |
| CHIBI_AVATAR_SYSTEM.md | Sistema de avatar modular | Si trabajas con avatar |
| AVATAR_IMPLEMENTATION_SUMMARY.md | Detalles técnicos del avatar | Si necesitas agregar piezas |
| ARQUITECTURA_MUNDOS_MISIONES.md | Estructura de datos de mundos | Si trabajas con mundos/misiones |
| FEATURE_CHARACTER_CUSTOMIZATION.md | Sistema de recompensas | Si trabajas con rewards |
| CONTENT_VARIANTS_SYSTEM.md | Sistema de variantes por edad | Si trabajas con contenido |
| AWAKENING_LEVEL_IMPLEMENTATION.md | Sistema de niveles | Si trabajas con niveles |

---

## 🎯 FLUJO RECOMENDADO PARA NUEVO DESARROLLADOR

```
DÍA 1: APRENDER
├─ Leer QUICK_START_GUIDE.md (15 min)
├─ npm install && npm run dev (5 min)
├─ Probar la app completa (20 min)
├─ Explorar estructura en VS Code (20 min)
└─ Leer secciones relevantes de PROJECT_COMPLETE_DOCUMENTATION.md (30 min)

DÍA 2: ENTENDER
├─ Leer PROJECT_COMPLETE_DOCUMENTATION.md completo (45 min)
├─ Revisar archivos: worlds.ts, ageGroups.ts, rewards.ts (30 min)
├─ Ejecutar npm run lint && npm run build (5 min)
├─ Examinar componentes principales: HomePage, RewardsPage (30 min)
└─ Leer QUALITY_GUIDELINES.md (20 min)

DÍA 3: PREPARARSE
├─ Leer TECHNICAL_TASKS_DETAILED.md (30 min)
├─ Elegir primera tarea (10 min)
├─ Leer detalles específicos de esa tarea (20 min)
├─ Crear rama git para esa tarea (5 min)
├─ Comenzar a desarrollar (inicio)
└─ Referirse a QUALITY_GUIDELINES.md mientras codeas
```

---

## 🚀 TAREAS EN ORDEN RECOMENDADO

```
PARALLELIZABLE (Hacer simultáneamente):
1. Tarea 1: Sección de Cuentos (5-7 días)
2. Tarea 2: Dibujos Colorear (4-6 días)
3. Tarea 3: Colores ParentZone (1-2 días)
4. Tarea 5: Ropa Avatar (2-3 días)

DESPUÉS (Dependencias):
5. Tarea 6: Todas las Imágenes (2-3 días)
6. Tarea 4: Niveles en Mundos (3-4 días)

TOTAL: 17-25 días
```

---

## 💻 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Inicia servidor dev

# Verificación
npm run build           # Compila
npm run lint            # Lint errors

# Debugging
npm run build -- --verbose  # Build detallado

# Git
git status              # Ver cambios
git add .               # Agregar cambios
git commit -m "msg"     # Commit
git checkout -b feature/name  # Nueva rama
```

---

## 📱 TESTING CHECKLIST

Antes de considerar una tarea "hecha":

```
DESKTOP (1920x1080):
- [ ] Se ve correctamente
- [ ] Funciona toda la lógica
- [ ] Sin errores en console

TABLET (768x1024):
- [ ] Responsive
- [ ] Textos legibles
- [ ] Botones clickeables

MOBILE (375x667):
- [ ] Responsive
- [ ] Sin scroll horizontal
- [ ] Touch funciona

NAVEGADORES:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari

PERFORMANCE:
- [ ] npm run build compila
- [ ] npm run lint pasa
- [ ] Sin TypeScript warnings
```

---

## 🎨 COLORES RÁPIDA REFERENCIA

```
Primario:     #FF6B6B (Rojo)
Secundario:   #4ECDC4 (Turquesa)
Acento:       #FFE66D (Amarillo)
Dark:         #2C3E50 (Azul oscuro)
Light:        #F7F9FC (Gris claro)

Rareza:
Common:       #808080 (Gris)
Rare:         #4169E1 (Azul)
Epic:         #9370DB (Púrpura)
Legendary:    #FFD700 (Oro)
```

---

## 📊 ESTADO DEL PROYECTO SNAPSHOT

```
✅ COMPLETO:
- Avatar Chibi modular
- Sistema de adaptación por edad
- Recompensas y tienda
- Estructura mundos/capítulos/misiones
- Interfaz responsive
- Flujo de setup

⚠️ PENDIENTE:
- Cuentos (expandir)
- Dibujos (mejorar)
- Colores ParentZone
- Niveles en mundos
- Ropa avatar (expandir)
- Todas las imágenes
- Actividades completas
- Audio real
- Backend
```

---

## 🔧 HERRAMIENTAS NECESARIAS

```
Instaladas:
✅ Node.js (v16+)
✅ npm (v8+)
✅ VS Code
✅ Git

Extensiones recomendadas para VS Code:
✅ TypeScript Vue Plugin
✅ ES7+ React/Redux/React-Native snippets
✅ Prettier - Code formatter
✅ ESLint
✅ CSS Modules
✅ Framer Motion

Otras herramientas útiles:
- DevTools (F12)
- Figma (si necesitas diseñar)
- Tinify (si comprimes imágenes)
```

---

## 🎓 ESTRUCTURA TÍPICA DE COMPONENTE

```tsx
// Imports
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgeAdaptation } from '@/features/child/hooks'
import styles from './MyComponent.module.css'

// Types
interface MyComponentProps {
  title: string
  onSubmit: (data: FormData) => void
}

// Component
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onSubmit,
}) => {
  const navigate = useNavigate()
  const { fontSize } = useAgeAdaptation()
  const [state, setState] = React.useState(initialValue)

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: `${fontSize}rem` }}>{title}</h1>
      {/* Content */}
    </div>
  )
}

export default MyComponent
```

---

## 🆘 SI ALGO NO FUNCIONA

```
Error: npm: command not found
→ Instala Node.js desde nodejs.org

Error: Cannot find module
→ npm install
→ npm run build para ver detalles

TypeScript errors
→ npm run build muestra todos
→ Revisa tipos en interface

Lint errors
→ npm run lint muestra todos
→ Usa prettier: npx prettier --write .

Componente no se ve
→ Verifica que ruta está correcta
→ npm run dev en terminal
→ F12 → Console para errores

Performance lento
→ Revisa Network tab (imágenes)
→ Usa React DevTools para re-renders
→ Mira console para warnings
```

---

## 📖 LECTURA POR ROL

### Desarrollador Frontend
1. QUICK_START_GUIDE.md ✅
2. PROJECT_COMPLETE_DOCUMENTATION.md ✅
3. TECHNICAL_TASKS_DETAILED.md ✅
4. QUALITY_GUIDELINES.md ✅

### Diseñador UX/UI
1. QUICK_START_GUIDE.md ✅
2. PROJECT_COMPLETE_DOCUMENTATION.md (Sección Diseño)
3. QUALITY_GUIDELINES.md (Sección Diseño)

### Devops/Backend
1. PROJECT_COMPLETE_DOCUMENTATION.md (Arquitectura)
2. DELIVERY_SUMMARY.md (Tecnología)

### QA/Tester
1. QUICK_START_GUIDE.md ✅
2. QUALITY_GUIDELINES.md (Checklist)
3. TECHNICAL_TASKS_DETAILED.md (Casos de prueba)

### Product Manager
1. QUICK_START_GUIDE.md ✅
2. DELIVERY_SUMMARY.md ✅
3. TECHNICAL_TASKS_DETAILED.md (Overview)

---

## 🎯 MÉTRICAS DE ÉXITO

```
Por día (Desarrollo):
✅ 1 subtarea completada
✅ npm run build sin errores
✅ npm run lint sin errores
✅ Responsivo en 3+ dispositivos
✅ Code review aprobado

Por tarea:
✅ Todas las subtareas completadas
✅ Testing checklist pasado
✅ Documentación actualizada
✅ Performance acceptable
✅ Accesibilidad WCAG A mínimo

Por proyecto:
✅ 6 tareas pendientes completadas
✅ Código limpio y mantenible
✅ Documentación 95%+
✅ Usuarios felices ✨
```

---

## 📞 CONTACTO Y ESCALACIÓN

Para dudas:
1. **Pequeñas**: Revisa la documentación (esta matriz)
2. **Técnicas**: Consulta QUALITY_GUIDELINES.md
3. **Arquitectura**: Consulta PROJECT_COMPLETE_DOCUMENTATION.md
4. **Tareas**: Consulta TECHNICAL_TASKS_DETAILED.md
5. **Bloqueado**: Escalate al team lead

---

**Última actualización**: Enero 2, 2026

**Próxima lectura**: QUICK_START_GUIDE.md (5 min)
