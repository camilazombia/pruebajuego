# 📚 MUNDO MÁGICO INGLÉS - DOCUMENTACIÓN COMPLETA DEL PROYECTO

**Fecha de Documentación**: Enero 2, 2026  
**Estado del Proyecto**: Desarrollo - MVP en construcción  
**Responsable**: Equipo de Desarrollo  

---

## 📋 TABLA DE CONTENIDOS

1. [Visión General del Proyecto](#visión-general)
2. [Arquitectura y Estructura](#arquitectura)
3. [Características Implementadas](#características-implementadas)
4. [Características Pendientes](#características-pendientes)
5. [Flujos de Datos y Navegación](#flujos-de-datos)
6. [Guía para Nuevos Desarrolladores](#guía-para-nuevos-desarrolladores)
7. [Sistema de Configuración por Edad](#sistema-de-adaptación-por-edad)
8. [Avatar Chibi - Sistema Modular](#avatar-chibi)
9. [Próximos Pasos - Roadmap](#próximos-pasos)

---

## 🎯 VISIÓN GENERAL {#visión-general}

### ¿Qué es Mundo Mágico Inglés?

Una **aplicación educativa interactiva** para que niños de 3 a 11+ años aprendan inglés de forma divertida a través de:

- 🌍 **Mundos temáticos** (Magic Forest, Ocean Kingdom, Sky Adventures, etc.)
- 🎮 **Misiones interactivas** con diferentes tipos de actividades
- 🏆 **Sistema de recompensas** con avatar personalizable
- 📊 **Adaptación automática por edad** (contenido y dificultad)
- 👨‍👩‍👧 **Panel de control parental** para monitoreo
- 🎨 **Interfaz colorida y animada** pensada para niños

### Tecnología Base

```
Frontend:
├─ React 19.1.1 + TypeScript
├─ Vite (Build tool)
├─ Framer Motion (Animaciones)
├─ Material-UI (Componentes)
├─ React Router v7 (Navegación)
└─ Vite + SWC (Fast Refresh)

Estructura:
├─ SRC/
│  ├─ Pages/ (Páginas principales)
│  ├─ Features/ (Lógica de negocio)
│  ├─ Entities/ (Modelos de datos)
│  ├─ Shared/ (Utilidades compartidas)
│  └─ Assets/ (SVG, imágenes)
└─ Public/ (Assets estáticos)
```

---

## 🏗️ ARQUITECTURA Y ESTRUCTURA {#arquitectura}

### Estructura de Carpetas

```
d:\mis-proyectos\mundo-magico-ingles\
│
├── 📄 package.json                 # Dependencias y scripts
├── 📄 tsconfig.json               # Configuración TypeScript
├── 📄 vite.config.ts              # Configuración Vite
├── 📄 eslint.config.js            # Linter config
│
├── public/                         # Assets estáticos
│   ├── assets/
│   │   ├── audio/                 # Música y efectos de sonido
│   │   │   ├── music/
│   │   │   ├── sfx/
│   │   │   └── voices/
│   │   ├── avatar/                # Sistema Avatar Chibi
│   │   │   ├── base/              # Partes base (5 cuerpos)
│   │   │   ├── clothing/          # Ropa (tops, bottoms, shoes)
│   │   │   └── accessories/       # Accesorios
│   │   ├── images/
│   │   │   ├── backgrounds/       # Fondos de páginas
│   │   │   ├── characters/        # Personajes
│   │   │   ├── icons/            # Iconografía
│   │   │   └── rewards/          # Iconos de premios
│   │   └── videos/
│   └── locales/                   # Traducciones i18n
│       ├── en/translation.json
│       └── es/translation.json
│
└── src/
    ├── main.tsx                    # Entry point
    ├── index.css                   # Estilos globales
    ├── App.tsx                     # Root component
    ├── App.css
    │
    ├── app/                        # Configuración de la aplicación
    │   ├── layouts/
    │   │   ├── MainLayout.tsx      # Layout principal con sidebar
    │   │   └── MainLayout.module.css
    │   ├── providers/
    │   │   ├── AppProviders.tsx    # Wrapper con todos los providers
    │   │   ├── ChildProvider.tsx   # Contexto de adaptación por edad
    │   │   ├── AudioProvider.tsx   # Contexto de audio
    │   │   ├── AvatarProvider.tsx  # Contexto de avatar
    │   │   ├── i18n.tsx            # Configuración i18n
    │   │   └── QueryProvider.tsx
    │   ├── router/
    │   │   ├── AppRouter.tsx       # Definición de rutas
    │   │   ├── ProtectedRoute.tsx
    │   │   └── ParentRoute.tsx
    │   └── styles/
    │       ├── animations.css      # Animaciones globales
    │       ├── global.css
    │       └── themes.css
    │
    ├── assets/                     # Assets (imágenes, SVG)
    │   ├── fonts/
    │   ├── images/menu/
    │   └── svg/
    │       ├── ChibiAvatar.tsx     # Componente Avatar
    │       ├── ChibiAvatar.examples.tsx
    │       ├── RocketScene.tsx
    │       ├── Sapito.tsx
    │       ├── Bunny.tsx
    │       └── types.ts
    │
    ├── entities/                   # Modelos de datos
    │   ├── character/
    │   │   ├── model/
    │   │   │   └── character.ts    # Tipos de personaje
    │   │   └── ui/
    │   │       ├── CharacterPreview.tsx
    │   │       └── CharacterPreview.module.css
    │   ├── mission/
    │   │   ├── model/
    │   │   │   └── mission.ts
    │   │   └── ui/
    │   ├── reward/
    │   │   ├── model/
    │   │   │   └── reward.ts
    │   │   └── ui/
    │   ├── user/
    │   │   ├── model/
    │   │   │   └── user.ts
    │   │   └── ui/
    │   └── world/
    │       ├── model/
    │       │   └── world.ts
    │       └── ui/
    │
    ├── features/                   # Lógica de negocio
    │   ├── audio/                  # Sistema de audio
    │   ├── auth/                   # Autenticación
    │   ├── child/                  # Gestión del niño
    │   │   ├── context/
    │   │   │   └── ChildContext.tsx    # Contexto de edad
    │   │   └── hooks/
    │   │       ├── useAgeAdaptation.ts
    │   │       ├── useAgeAdaptedContent.ts
    │   │       └── useAgeAdaptedVariants.ts
    │   ├── missions/               # Lógica de misiones
    │   ├── progress/               # Seguimiento de progreso
    │   └── rewards/                # Sistema de premios
    │
    ├── pages/                      # Componentes de página
    │   ├── ChapterMapPage/         # Mapa de capítulos
    │   ├── FamilyAccessPage/       # Setup inicial (edad, nombre, avatar)
    │   ├── HelpPage/               # Página de ayuda
    │   ├── HomePage/               # Página principal del niño
    │   ├── LandingPage/            # Landing page pública
    │   ├── LegalPages/             # Términos, privacidad, acerca de
    │   ├── LevelPage/              # Página de nivel individual
    │   ├── LoginPage/              # Login
    │   ├── MissionPage/            # Página de misión individual
    │   ├── MissionsMapPage/        # Mapa de misiones de un mundo
    │   ├── ParentZonePage/         # Panel parental 👈 NECESITA CAMBIOS
    │   ├── ReviewPage/             # Página de repaso
    │   │   ├── FlashcardsPage.tsx  # Flashcards interactivos
    │   │   ├── StoriesPage.tsx     # Historias
    │   │   ├── ColoringPage.tsx    # Dibujos para colorear
    │   │   └── ReviewPage.tsx      # Selector de actividades
    │   ├── RewardsPage/            # Página de recompensas y avatar
    │   ├── StoriesPage/
    │   ├── WelcomePage/            # Bienvenida al niño
    │   └── WorldsMapPage/          # Carrusel de mundos
    │
    ├── shared/                     # Código compartido
    │   ├── data/
    │   │   ├── ageGroups.ts        # Configuración por edad
    │   │   ├── rewards.ts          # Datos de premios
    │   │   └── worlds.ts           # Datos de mundos, capítulos, misiones
    │   ├── hooks/                  # Hooks customizados
    │   ├── lib/                    # Utilidades
    │   ├── ui/                     # Componentes compartidos
    │   │   ├── Button/
    │   │   ├── Input/
    │   │   ├── SoundButton/
    │   │   ├── ArrowButton/
    │   │   ├── OrientationAlert/
    │   │   └── ...otros
    │   └── utils/                  # Funciones útiles
    │
    └── types/
        └── css.d.ts                # Tipos para CSS modules

```

### Diagrama de Componentes Principales

```
App.tsx
├── <ChildProvider>
│   ├── <AudioProvider>
│   │   ├── <AvatarProvider>
│   │   │   ├── <QueryProvider>
│   │   │   │   └── <AppProviders>
│   │   │   │       └── <Router>
│   │   │   │           ├── LandingPage
│   │   │   │           ├── LoginPage
│   │   │   │           ├── FamilyAccessPage
│   │   │   │           ├── MainLayout
│   │   │   │           │   ├── HomePage
│   │   │   │           │   ├── WorldsMapPage
│   │   │   │           │   ├── ChapterMapPage
│   │   │   │           │   ├── LevelPage
│   │   │   │           │   ├── MissionsMapPage
│   │   │   │           │   ├── MissionPage
│   │   │   │           │   ├── RewardsPage
│   │   │   │           │   ├── ReviewPage
│   │   │   │           │   │   ├── FlashcardsPage
│   │   │   │           │   │   ├── StoriesPage
│   │   │   │           │   │   └── ColoringPage
│   │   │   │           │   ├── ParentZonePage
│   │   │   │           │   └── HelpPage
│   │   │   │           └── LegalPages
│   │   │   │               ├── AboutPage
│   │   │   │               ├── PrivacyPage
│   │   │   │               └── TermsPage
```

---

## ✅ CARACTERÍSTICAS IMPLEMENTADAS {#características-implementadas}

### 1. 🎨 Sistema de Avatar Chibi Modular

**Status**: ✅ COMPLETO  
**Archivos**: `src/assets/svg/ChibiAvatar.tsx`

#### Características:
- ✅ Avatar SVG personalizable (5 tonos de piel)
- ✅ Sistema modular: cabello, ojos, boca, ropa
- ✅ Animaciones: parpadeo automático, respiración, transiciones
- ✅ 3 tamaños (pequeño, medio, grande)
- ✅ Integración con RewardsPage
- ✅ Sistema de equipamiento de ropa

#### Archivos creados:
```
public/assets/avatar/
├── base/
│   ├── body/ (5 tonos de piel)
│   ├── eyes/ (abierto, cerrado)
│   ├── mouth/ (neutral, sonrisa)
│   └── hair/ (2 estilos)
├── clothing/
│   ├── tops/ (2 opciones)
│   ├── bottoms/ (2 opciones)
│   └── shoes/ (2 opciones)
└── accessories/ (2 opciones)
```

#### Documentación:
- `CHIBI_AVATAR_SYSTEM.md`
- `AVATAR_IMPLEMENTATION_SUMMARY.md`
- `AVATAR_HOW_TO_ADD_PIECES.md`
- `AVATAR_API_REFERENCE.md`

---

### 2. 📊 Sistema de Adaptación por Edad

**Status**: ✅ COMPLETO  
**Archivos**: `src/features/child/`, `src/shared/data/ageGroups.ts`

#### Características:
- ✅ 3 grupos de edad: 3-6, 7-10, 11+
- ✅ Contexto global ChildContext
- ✅ Adaptación automática de:
  - Tamaño de fuente (+20%, normal, -5%)
  - Velocidad de animaciones (-20%, x1, +20%)
  - Número de palabras (3, 5, 8)
  - Nivel de pistas (alto, medio, bajo)
  - Tiempo de sesión (10, 20, 30 min)
  - Tiempo diario (30, 60, 120 min)

#### Hooks disponibles:
```tsx
useChild()                    // Contexto del niño
useAgeAdaptation()           // Configuración UI
useAgeAdaptedContent()       // Contenido filtrado
useAgeAdaptedVariants()      // Variantes de texto
```

#### Documentación:
- `AGE_SYSTEM_README.md`
- `AGE_ADAPTATION_GUIDE.md`
- `AGE_ADAPTATION_IMPLEMENTED.md`
- `CONTENT_VARIANTS_SYSTEM.md`

---

### 3. 🎁 Sistema de Recompensas

**Status**: ✅ IMPLEMENTADO  
**Archivos**: `src/pages/RewardsPage/`

#### Características:
- ✅ 12 premios con 4 niveles de rareza:
  - Common (Gris): 100-150 monedas
  - Rare (Azul): 450-600 monedas
  - Epic (Púrpura): 2000-2500 monedas
  - Legendary (Oro): 5000-5500 monedas
- ✅ Sistema de equipamiento (4 slots: head, body, feet, accessory)
- ✅ Drag and drop para equipar items
- ✅ Click to equip desde modal
- ✅ Indicador de progreso (5/12 items)
- ✅ Vista de monedas disponibles

#### Documentación:
- `FEATURE_CHARACTER_CUSTOMIZATION.md`
- `REWARDS_PAGE_REDESIGN.md`

---

### 4. 🌍 Sistema de Mundos y Misiones

**Status**: ✅ ESTRUCTURA LISTA  
**Archivos**: `src/shared/data/worlds.ts`

#### Estructura:
- ✅ 4 Mundos temáticos implementados
- ✅ Sistema de Capítulos dentro de cada mundo
- ✅ Sistema de Niveles dentro de cada capítulo
- ✅ Misiones ligadas a niveles
- ✅ Sistema de variantes por edad (nombre, descripción, dificultad)

#### Navegación:
```
WorldsMapPage (Carrusel) 
  → ChapterMapPage (Capítulos del mundo)
    → LevelPage (Niveles del capítulo)
      → MissionPage (Misión individual)
```

#### Documentación:
- `ARQUITECTURA_MUNDOS_MISIONES.md`

---

### 5. 🧒 Flujo Inicial (Setup)

**Status**: ✅ COMPLETO

#### Páginas implementadas:
1. **LandingPage**: Página pública de inicio
2. **LoginPage**: Login simple
3. **FamilyAccessPage**: Setup inicial
   - Nombre del niño
   - Selección de edad (3-6, 7-10, 11+)
   - Avatar emoji
   - Aceptación de términos
4. **WelcomePage**: Bienvenida personalizada

---

### 6. 🎮 Actividades de Repaso

**Status**: ✅ PARCIALMENTE IMPLEMENTADO

#### Implementadas:
- ✅ FlashcardsPage - Tarjetas interactivas con 10+ temas
- ✅ StoriesPage - Sistema de historias por edad
- ✅ ColoringPage - Dibujos para colorear (6 dibujos básicos)

#### Ubicación:
- `src/pages/ReviewPage/FlashcardsPage.tsx`
- `src/pages/ReviewPage/StoriesPage.tsx`
- `src/pages/ReviewPage/ColoringPage.tsx`

---

### 7. 📱 Interfaz Responsiva

**Status**: ✅ IMPLEMENTADA

#### Características:
- ✅ Alerta de orientación (OrientationAlert)
- ✅ Diseño mobile-first
- ✅ Sidebar colapsable
- ✅ Grid responsivo
- ✅ Fondos dinámicos por página

---

### 8. 🎧 Sistema de Audio

**Status**: ✅ ESTRUCTURA LISTA  
**Archivos**: `src/features/audio/`, `src/app/providers/AudioProvider.tsx`

#### Características:
- ✅ AudioProvider configurado
- ✅ SoundButton en componentes
- ✅ Carpeta de assets preparada
- ⚠️ Falta: Implementación de reproducción real

---

### 9. 👨‍👩‍👧 Panel Parental

**Status**: ⚠️ BÁSICO (NECESITA MEJORAS)  
**Archivos**: `src/pages/ParentZonePage/`

#### Características existentes:
- ✅ Dashboard básico con 5 métricas (nombre, monedas, días streak, palabras, premios)
- ✅ Formulario de perfil del niño
- ✅ Formulario de límites de tiempo
- ✅ UI con cards blancas

#### ❌ NECESITA MEJORAS:
- Cambio de colores de componentes
- Mejor diseño visual
- Secciones adicionales (reportes, historial, etc.)

---

### 10. 🌐 Internacionalización (i18n)

**Status**: ⚠️ ESTRUCTURA LISTA  
**Archivos**: `src/app/providers/i18n.tsx`

#### Características:
- ✅ Setup i18n configurado
- ✅ Archivos de traducción para ES e EN
- ⚠️ Falta: Implementación completa en componentes

---

---

## ❌ CARACTERÍSTICAS PENDIENTES {#características-pendientes}

### 1. 📖 SECCIÓN DE CUENTOS (STORIES)

**Prioridad**: 🔴 ALTA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 5-7 días

#### Qué se necesita:

1. **Datos de Cuentos** (`src/shared/data/stories.ts`)
   ```typescript
   - Estructura: Story[] con id, title, levels (beginner/intermediate/advanced)
   - Mínimo 8 cuentos diferentes
   - Cada cuento con:
     * Título en 3 variantes de edad
     * Descripción
     * Duración aproximada
     * Número de párrafos (3-8 según edad)
     * Imágenes/ilustraciones
     * Audio (narración opcional)
   ```

2. **Componente StoriesPage** (parcialmente existe)
   ```tsx
   - Expandir StoriesPage.tsx para:
     * Carrusel de historias disponibles
     * Vista de lectura con páginas navegables
     * Resaltado de palabras clave
     * Botón de audio para narración
     * Indicador de progreso
     * Quiz post-lectura (opcional)
   ```

3. **Archivos de Historias**
   - Crear 8 historias en formato Markdown o JSON
   - Incluir ilustraciones (PNG/SVG)
   - Estructura de párrafos adaptada por edad

4. **Rutas**
   ```
   GET /review/stories → StoriesPage (selector)
   GET /review/stories/:storyId → Story reader
   ```

---

### 2. 🎨 DIBUJOS PARA COLOREAR (COLORING PAGE)

**Prioridad**: 🔴 ALTA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 4-6 días

#### Qué se necesita:

1. **Dibujos SVG Interactivos**
   ```
   - 12-15 dibujos (actualmente hay 6)
   - Cada dibujo debe tener:
     * Elementos separados (caminos SVG)
     * IDs únicos para cada zona
     * Paths limpios sin relleno inicial
     * ViewBox estandarizado
     * Nombre descriptivo en inglés
   ```

2. **Mejoras a ColoringPage.tsx**
   ```tsx
   - Agregar:
     * Herramienta de pincel (color + tamaño)
     * Herramienta de bote de pintura (fill)
     * Herramienta de borrador
     * Paleta de colores mejorada (12+ colores)
     * Deshacer/Rehacer
     * Guardar dibujo
     * Botón limpiar lienzo
     * Indicador de zonas pintadas
     * Animación de felicitación al completar
   ```

3. **Archivos SVG Necesarios**
   ```
   public/assets/images/coloring/
   ├── sun.svg
   ├── flower.svg
   ├── butterfly.svg
   ├── house.svg
   ├── tree.svg
   ├── cloud.svg
   ├── fish.svg          ← NEW
   ├── bird.svg          ← NEW
   ├── apple.svg         ← NEW
   ├── star.svg          ← NEW
   ├── rainbow.svg       ← NEW
   ├── cat.svg           ← NEW
   └── dog.svg           ← NEW
   ```

4. **Funcionalidades**
   - Persistencia en localStorage
   - Exportar como imagen (PNG)
   - Sección de "Mis dibujos completados"

---

### 3. 📚 NIVELES DENTRO DE MUNDOS

**Prioridad**: 🟠 MEDIA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 3-4 días

#### Qué se necesita:

1. **Expandir estructura en `worlds.ts`**
   ```typescript
   // Actualmente existe:
   World → Chapter → Level → Mission
   
   // Necesita:
   - Agregar campos a Level:
     * id, number, variants (beginner/intermediate/advanced)
     * requirements (condiciones para desbloquear)
     * rewards (monedas, items)
     * thumbnail
   ```

2. **Componente LevelPage mejorado**
   ```tsx
   - Mostrar:
     * Número de misiones en el nivel
     * Progreso (X/Y misiones completadas)
     * Requisitos para desbloquear siguiente nivel
     * Preview de recompensas
     * Botón iniciar primer nivel
   ```

3. **Navegación**
   ```
   WorldsMapPage 
     → ChapterMapPage (muestra capítulos)
       → LevelMapPage (NEW - muestra niveles) 👈
         → MissionPage (misión individual)
   ```

4. **Datos necesarios**
   - Definir 40-60 niveles en total (10-15 por capítulo)
   - Asignar 5-8 misiones por nivel
   - Definir recompensas progresivas

---

### 4. 🎭 VARIANTES DE ROPA DEL AVATAR

**Prioridad**: 🟠 MEDIA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 2-3 días

#### Qué se necesita:

1. **Expandir archivos SVG de ropa**
   ```
   public/assets/avatar/clothing/
   ├── tops/
   │   ├── top_1.svg          ✅ Existe
   │   ├── top_2.svg          ✅ Existe
   │   ├── top_3.svg          ← NEW
   │   ├── top_4.svg          ← NEW
   │   ├── top_5.svg          ← NEW
   │   └── top_6.svg          ← NEW
   ├── bottoms/
   │   ├── bottom_1.svg       ✅ Existe
   │   ├── bottom_2.svg       ✅ Existe
   │   ├── bottom_3.svg       ← NEW
   │   ├── bottom_4.svg       ← NEW
   │   └── bottom_5.svg       ← NEW
   └── shoes/
       ├── shoes_1.svg        ✅ Existe
       ├── shoes_2.svg        ✅ Existe
       ├── shoes_3.svg        ← NEW
       ├── shoes_4.svg        ← NEW
       └── shoes_5.svg        ← NEW
   ```

2. **Expandir ChibiAvatar.tsx**
   ```tsx
   - Actualizar selector de ropa:
     * Agregar array con nuevas opciones
     * Componentes más visuales (thumbnail de cada opción)
   ```

3. **Datos de Premios**
   ```typescript
   // Expandir rewards.ts con nuevos items de ropa
   - 4-5 tops nuevos
   - 4-5 bottoms nuevos
   - 3-4 shoes nuevos
   - Rareza: Common, Rare, Epic, Legendary
   ```

4. **Integración con RewardsPage**
   - Mostrar vista previa al equipar
   - Animación de cambio de ropa
   - Combinaciones sugeridas

---

### 5. 🖼️ TODAS LAS IMÁGENES DEL PROYECTO

**Prioridad**: 🟠 MEDIA  
**Complejidad**: BAJA  
**Tiempo Estimado**: 2-3 días

#### Qué se necesita:

1. **Imágenes Existentes**
   ```
   public/assets/images/
   ├── backgrounds/      (Fondos de páginas)
   ├── characters/       (Personajes)
   ├── icons/           (Iconografía)
   └── rewards/         (Iconos de premios)
   ```

2. **Imágenes Faltantes a Crear**
   ```
   Backgrounds:
   ├── home_bg.png
   ├── worlds_bg.png
   ├── rewards_bg.png
   ├── world_1_bg.png   (Magic Forest)
   ├── world_2_bg.png   (Ocean Kingdom)
   ├── world_3_bg.png   (Sky Adventures)
   └── world_4_bg.png   (Enchanted Castle)
   
   Characters:
   ├── wizard.svg
   ├── mermaid.svg
   ├── dragon.svg
   ├── fairy.svg
   └── varios NPCs
   
   Icons:
   ├── world_icons/ (1-4)
   ├── reward_icons/ (expandir a 20+)
   ├── activity_icons/
   └── status_icons/
   ```

3. **Especificaciones**
   - Resolución mínima: 1920x1080 (backgrounds)
   - Formato PNG o SVG
   - Estilo: Colorido, amigable con niños
   - Optimizadas para web (tinify.com)

---

### 6. 🎨 CAMBIO DE COLORES - PANEL PARENTAL

**Prioridad**: 🟠 MEDIA  
**Complejidad**: BAJA  
**Tiempo Estimado**: 1 día

#### Qué se necesita:

1. **Cambios de Estilo en ParentZonePage**
   ```css
   Actualizar:
   ├── Colores de las cards (actualmente blanco)
   ├── Colores de botones
   ├── Colores de inputs
   ├── Colores de fondos de secciones
   ├── Colores de textos
   └── Colores de bordes
   
   Propuesta de Paleta:
   ├── Primary: #FF6B6B (Rojo suave)
   ├── Secondary: #4ECDC4 (Turquesa)
   ├── Accent: #FFE66D (Amarillo)
   ├── Dark: #2C3E50 (Azul oscuro)
   └── Light: #F7F9FC (Gris claro)
   ```

2. **Componentes a Actualizar**
   ```tsx
   ParentZonePage.tsx:
   ├── Cards de métricas (6 cards)
   ├── Formulario de perfil
   ├── Formulario de límites
   ├── Botones
   ├── Inputs
   └── Textos
   ```

3. **Mejoras de UX**
   - Efectos hover mejorados
   - Transiciones suaves
   - Sombras consistentes
   - Iconografía mejorada
   - Espaciado normalizado

4. **Archivos a Modificar**
   ```
   src/pages/ParentZonePage/
   ├── ParentZonePage.tsx (eliminar estilos inline)
   ├── ParentZonePage.module.css (expandir con nuevas clases)
   └── Considerar componentes reutilizables
   ```

---

### 7. 📊 SISTEMA DE ACTIVIDADES

**Prioridad**: 🔴 ALTA  
**Complejidad**: ALTA  
**Tiempo Estimado**: 10-14 días

#### Qué se necesita:

1. **Tipos de Actividades Base**
   ```
   ├── DragAndDrop
   │   - Arrastra palabras al lugar correcto
   │   - Nivel: Beginner, Intermediate, Advanced
   ├── MatchPairs
   │   - Emparejar palabras con imágenes
   ├── MultipleChoice
   │   - Seleccionar respuesta correcta
   ├── FillBlanks
   │   - Completar espacios en blanco
   ├── Spelling
   │   - Deletrear palabra escuchada
   ├── Pronunciation
   │   - Grabar pronunciación
   ├── Ordering
   │   - Ordenar palabras para formar oración
   └── Listening
   ```

2. **Directorio de Actividades**
   ```
   src/pages/MissionPage/activities/
   ├── DragAndDrop/
   ├── MatchPairs/
   ├── MultipleChoice/
   ├── FillBlanks/
   ├── Spelling/
   ├── Pronunciation/
   ├── Ordering/
   └── common/
       └── ActivityBase.tsx (componente base)
   ```

3. **Datos de Actividades** (`src/shared/data/activities.ts`)
   ```typescript
   interface Activity {
     id: string
     type: ActivityType
     missionId: string
     content: ActivityContent[]  // Variable según tipo
     difficulty: 'beginner' | 'intermediate' | 'advanced'
     timeLimit?: number  // segundos
     points: number
     hints: string[]
   }
   ```

4. **Puntuación y Progreso**
   - Sistema de puntos por actividad
   - Registro de intentos
   - Cálculo de precisión
   - Desbloqueo de siguientes niveles

---

### 8. 🔊 IMPLEMENTACIÓN COMPLETA DE AUDIO

**Prioridad**: 🟠 MEDIA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 3-5 días

#### Qué se necesita:

1. **Audio Assets**
   ```
   public/assets/audio/
   ├── music/
   │   ├── background_ambient.mp3
   │   ├── world_1_theme.mp3
   │   ├── world_2_theme.mp3
   │   └── ...
   ├── sfx/
   │   ├── button_click.mp3
   │   ├── success.mp3
   │   ├── error.mp3
   │   ├── level_complete.mp3
   │   └── ...
   └── voices/
       ├── word_pronunciation/
       │   ├── hello.mp3
       │   ├── goodbye.mp3
       │   └── ...
       └── narrator/
           └── story_narrations/
   ```

2. **Hook useAudio**
   ```tsx
   const { play, stop, pause, isMuted } = useAudio(url)
   ```

3. **Componente AudioControls**
   - Volumen control
   - Mute toggle
   - Reproducción visual

---

### 9. 💾 PERSISTENCIA DE DATOS

**Prioridad**: 🟠 MEDIA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 2-3 días

#### Qué se necesita:

1. **localStorage/sessionStorage**
   ```typescript
   - Perfil del niño (nombre, edad, avatar)
   - Progreso de misiones
   - Estado del avatar (ropa equipada)
   - Preferencias de audio
   - Dibujos guardados
   ```

2. **Estructura de datos**
   ```typescript
   interface GameState {
     child: ChildData
     progress: ProgressData
     avatar: AvatarState
     preferences: UserPreferences
     lastUpdated: timestamp
   }
   ```

3. **Síncrona/Asíncrona**
   - localStorage: datos rápidos
   - Future: Backend API

---

### 10. 📈 SISTEMA DE REPORTES

**Prioridad**: 🟡 BAJA  
**Complejidad**: MEDIA  
**Tiempo Estimado**: 4-5 días

#### Para ParentZonePage:
- Gráficos de progreso (Chart.js o similar)
- Reporte de palabras aprendidas
- Análisis de actividades completadas
- Tiempo de juego por día/semana
- Importancia de actividades más/menos completadas

---

## 🔄 FLUJOS DE DATOS Y NAVEGACIÓN {#flujos-de-datos}

### Flujo Principal: Ingreso del Niño

```
┌─────────────────────────────────────────────────────────────┐
│ LandingPage (Pública)                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ LoginPage (Simple)                                           │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ FamilyAccessPage (Setup Principal)                          │
│ ├─ Nombre del niño                                          │
│ ├─ Selección de edad (3-6, 7-10, 11+) ← KEY                │
│ ├─ Avatar emoji                                             │
│ └─ Aceptación de términos                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
        setAgeRange() + localStorage
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ WelcomePage (Bienvenida Personalizada)                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ MainLayout (Layout Principal)                               │
│ ├─ Sidebar (Navegación)                                     │
│ └─ Outlet (Contenido dinámico)                              │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ (Router)
```

### Flujo de Aprendizaje

```
HomePage
    │
    ├──→ WorldsMapPage (Seleccionar mundo)
    │        │
    │        ▼ /chapters/:worldId
    │    ChapterMapPage (Seleccionar capítulo)
    │        │
    │        ▼ /level/:levelId (Future: /chapters/:worldId/levels)
    │    LevelPage (Ver misiones del nivel)
    │        │
    │        ▼ /mission/:missionId
    │    MissionPage (Realizar actividad)
    │        │
    │        ▼
    │    [Actividades Específicas]
    │    ├── DragAndDrop
    │    ├── MatchPairs
    │    └── etc...
    │        │
    │        ▼
    │    [Resultado + Monedas]
    │        │
    │        └─→ HomePage (Volver)
    │
    ├──→ ReviewPage
    │    ├── FlashcardsPage (Tarjetas)
    │    ├── StoriesPage (Cuentos)
    │    └── ColoringPage (Dibujos)
    │
    ├──→ RewardsPage
    │    └── [Avatar + Sistema de Compra]
    │
    └──→ HelpPage
```

### Contextos y Providers

```
App.tsx
  │
  ├─ ChildProvider (Edad, Adaptación)
  │   └─ useChild()
  │   └─ useAgeAdaptation()
  │
  ├─ AudioProvider (Sonidos)
  │   └─ useAudio()
  │
  ├─ AvatarProvider (Estado Avatar)
  │   └─ useAvatar()
  │
  └─ i18n Provider (Idioma)
      └─ useTranslation()
```

### Flujo de Datos - Mundos → Misiones

```
worlds.ts (Datos centralizados)
   │
   ├─ WORLDS array
   │   │
   │   ├─ World 1 (Magic Forest)
   │   │   │
   │   │   ├─ Chapter 1.1 (The Alphabet)
   │   │   │   │
   │   │   │   ├─ Level 1.1.1 (Letters A-F)
   │   │   │   │   │
   │   │   │   │   ├─ Mission 1 (DragAndDrop)
   │   │   │   │   ├─ Mission 2 (MatchPairs)
   │   │   │   │   └─ Mission 3 (MultipleChoice)
   │   │   │   │
   │   │   │   └─ Level 1.1.2 (Letters G-L)
   │   │   │
   │   │   └─ Chapter 1.2 (Numbers)
   │   │
   │   └─ World 2 (Ocean Kingdom)
   │       └─ ...
   │
   └─ Funciones Utilidad
       ├─ getWorldById(id)
       ├─ getChaptersForWorld(worldId)
       ├─ getLevelsForChapter(chapterId)
       └─ getMissionsForLevel(levelId)
```

---

## 👨‍💻 GUÍA PARA NUEVOS DESARROLLADORES {#guía-para-nuevos-desarrolladores}

### Configuración Inicial

```bash
# 1. Clonar y instalar
git clone [repo-url]
cd mundo-magico-ingles
npm install

# 2. Iniciar desarrollo
npm run dev

# 3. Build para producción
npm run build

# 4. Ver errores de lint
npm run lint
```

### Estructura Recomendada para Agregar Features

#### 1. Agregar un Nuevo Mundo

Archivo: `src/shared/data/worlds.ts`

```typescript
const world5: World = {
  id: 'w5',
  number: 5,
  backgroundImage: '/assets/images/backgrounds/world_5_bg.png',
  variants: {
    beginner: { name: 'Mundo 5', description: '...', difficulty: 'beginner' },
    intermediate: { name: 'World 5: Title', description: '...', difficulty: 'intermediate' },
    advanced: { name: 'World 5: Advanced', description: '...', difficulty: 'advanced' },
  },
  chapters: [
    // Agregar capítulos
  ],
};

WORLDS.push(world5);
```

#### 2. Agregar una Nueva Actividad

Directorio: `src/pages/MissionPage/activities/NewActivity/`

```typescript
// NewActivity.tsx
interface NewActivityProps {
  content: ActivityContent[]
  difficulty: AgeVariant
  onComplete: (score: number) => void
}

export const NewActivity: React.FC<NewActivityProps> = ({ content, difficulty, onComplete }) => {
  // Implementación
}

// Registrar en MissionPage.tsx
const renderActivity = (type: ActivityType) => {
  switch(type) {
    case 'new-activity':
      return <NewActivity {...props} />;
    default:
      return null;
  }
};
```

#### 3. Agregar un Nuevo Componente Reutilizable

Directorio: `src/shared/ui/NewComponent/`

```
src/shared/ui/NewComponent/
├── NewComponent.tsx
├── NewComponent.module.css
└── index.ts
```

#### 4. Usar Hooks de Adaptación

```tsx
import { useAgeAdaptation } from '@/features/child/hooks';

const MyComponent = () => {
  const { fontSize, animationSpeed, hintLevel } = useAgeAdaptation();
  
  return (
    <div style={{ fontSize: `${fontSize}rem` }}>
      Contenido adaptado
    </div>
  );
};
```

### Convenciones de Código

1. **Archivos**: PascalCase para componentes, camelCase para funciones
2. **Componentes**: Nombrados como `MyComponent.tsx`
3. **Estilos**: `MyComponent.module.css`
4. **Tipos**: En `types/` o en misma carpeta
5. **Exports**: Usar `export default` para componentes, `export` para funciones

### Estructura Típica de Página

```tsx
// src/pages/MyPage/MyPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '@/shared/ui/OrientationAlert/OrientationAlert';
import { useAgeAdaptation } from '@/features/child/hooks';
import styles from './MyPage.module.css';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { fontSize, animationSpeed } = useAgeAdaptation();

  return (
    <>
      <OrientationAlert />
      <div className={styles.page}>
        {/* Contenido */}
      </div>
    </>
  );
};

export default MyPage;
```

---

## 🎓 SISTEMA DE ADAPTACIÓN POR EDAD {#sistema-de-adaptación-por-edad}

Ver documentación completa en: `AGE_SYSTEM_README.md`

### Configuración por Grupo

| Aspecto | 3-6 años | 7-10 años | 11+ años |
|---------|----------|-----------|----------|
| **Palabras por nivel** | 3 | 5 | 8 |
| **Pistas** | Altas (3) | Medias (2) | Bajas (1) |
| **Font size** | +20% | Normal | -5% |
| **Animaciones** | -20% lento | Normal | +20% rápido |
| **Sesión máxima** | 10 min | 20 min | 30 min |
| **Diario máximo** | 30 min | 60 min | 120 min |

### Uso en Componentes

```tsx
// Acceso al contexto
const { ageRange, ageGroup } = useChild();

// Configuración de UI
const { fontSize, animationSpeed, hintLevel } = useAgeAdaptation();

// Contenido filtrado
const { worlds, chapters } = useAgeAdaptedContent();

// Variantes de texto
const { variant, worlds } = useAgeAdaptedVariants();
```

---

## 🎨 AVATAR CHIBI - SISTEMA MODULAR {#avatar-chibi}

Ver documentación completa en: `CHIBI_AVATAR_SYSTEM.md`

### Agregar Nuevas Piezas

1. Crear archivo SVG en `public/assets/avatar/{category}/{subcategory}/`
2. Usar viewBox uniforme: `0 0 200 240`
3. Actualizar ChibiAvatar.tsx con las nuevas opciones
4. Agregar a tipos si es necesario

### Estructura de Props

```tsx
<ChibiAvatar
  skinTone="tone3"          // tone1-tone5
  hairColor="#000000"
  eyesState="open"          // open | closed
  mouthExpression="smile"   // neutral | smile
  topId="top_1"
  bottomId="bottom_1"
  shoesId="shoes_1"
  accessories={['beanie']}
  size="medium"             // small | medium | large
/>
```

---

## 🚀 PRÓXIMOS PASOS - ROADMAP {#próximos-pasos}

### FASE 1: MVP Completo (2-3 semanas)

**Prioridad Alta:**
1. ✅ Avatar Chibi (COMPLETADO)
2. ✅ Sistema de Edad (COMPLETADO)
3. ✅ Estructura de Mundos (COMPLETADO)
4. ⚠️ Sección de Cuentos → **EN PROGRESO**
5. ⚠️ Mejorar Dibujos para Colorear → **EN PROGRESO**
6. ⚠️ Cambiar colores ParentZonePage → **EN PROGRESO**

**Prioridad Media:**
7. 📝 Niveles dentro de mundos
8. 👕 Variantes de ropa expandidas
9. 🖼️ Imágenes completas
10. 🔊 Audio funcional

---

### FASE 2: Completitud (3-4 semanas)

**Características:**
1. Sistema de actividades (todos los tipos)
2. Persistencia de datos en backend
3. Sistema de reportes para padres
4. i18n completo
5. Sistema de logros/badges

---

### FASE 3: Pulido y Release (2 semanas)

**Tareas:**
1. Testing completo
2. Performance optimization
3. SEO y PWA setup
4. Deploy a producción
5. Documentación de usuario

---

## 📝 NOTAS IMPORTANTES

### Errores Comunes a Evitar

1. **❌ NO modificar** `worlds.ts` sin entender la estructura
2. **❌ NO agregar** componentes sin seguir convenciones
3. **❌ NO usar** estilos inline (siempre CSS modules)
4. **❌ NO** ignorar warnings de TypeScript
5. **✅ SIEMPRE** usar hooks para estado en componentes

### Recursos Útiles

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://mui.com/)

### Contacto y Soporte

Para dudas sobre la arquitectura o implementación:
1. Revisar documentación existente (.md files)
2. Buscar ejemplos en componentes similares
3. Revisar git history de cambios previos

---

## ✅ LISTA DE VERIFICACIÓN PARA NUEVOS FEATURES

Antes de hacer push:

- [ ] Código compila sin errores (`npm run build`)
- [ ] Lint pasa (`npm run lint`)
- [ ] TypeScript sin errores
- [ ] Responsive en mobile (probado)
- [ ] Accesibilidad básica (aria-labels)
- [ ] Documentación actualizada
- [ ] Hooks de edad implementados si aplica
- [ ] Tests escritos (si aplica)
- [ ] Screenshots agregados a documentación

---

**Última actualización**: Enero 2, 2026
**Versión**: 1.0
**Autor**: Equipo de Desarrollo
