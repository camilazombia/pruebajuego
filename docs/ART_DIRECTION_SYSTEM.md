# Sistema Visual — Dirección de Arte
## Plataforma de inglés para niños 4-8 años

**Versión:** 1.0  
**Última actualización:** Febrero 2025

---

# 1. Definición de estilo visual global

## 1.1 Tipo de ilustración

**Estilo recomendado:** **2D cartoon suave con toques flat**

| Atributo | Decisión |
|----------|----------|
| **Base** | Flat design con contornos suaves |
| **Estética** | Cartoon amigable, no infantil excesivo |
| **Referencias** | Duolingo, Khan Academy Kids, Lingokids |
| **Evitar** | Hiperrealismo, estilo anime hardcore, minimalismo extremo |

**Justificación:** El flat 2D cartoon es:
- Escalable para distintas resoluciones
- Rápido de renderizar en web
- Fácil de mantener coherente con IA
- Amigable y no intimidante para 4-8 años

## 1.2 Paleta de colores

### Principal (primaria)
| Color | Hex | Uso |
|-------|-----|-----|
| Rosa mágico | `#FF3FA1` | CTAs, highlights, progreso |
| Azul noche | `#0B1220` | Fondos principales, contraste |
| Blanco suave | `#F8FAFC` | Texto sobre oscuro, fondos claros |

### Secundaria
| Color | Hex | Uso |
|-------|-----|-----|
| Azul medio | `#1A2D4D` | Cards, paneles, estados hover |
| Azul brillante | `#3B82F6` | Links, elementos interactivos |
| Verde éxito | `#22C55E` | Feedback correcto, estrellas |
| Amarillo estrella | `#FBBF24` | Recompensas, logros |
| Rosa suave | `#FBCFE8` | Fondos secundarios, acentos |

### Semántica
| Uso | Color |
|-----|-------|
| Correcto | `#22C55E` |
| Incorrecto | `#EF4444` |
| Advertencia | `#F59E0B` |
| Información | `#3B82F6` |

## 1.3 Tipo de iluminación

- **Dirección:** Luz superior suave (top-down), ligera inclinación 15–20°
- **Intensidad:** Baja a media — sin sombras duras
- **Atmósfera:** Ligeramente difusa, ambiente acogedor

## 1.4 Nivel de detalle

| Elemento | Nivel | Descripción |
|----------|-------|-------------|
| Fondos | Bajo | Formas simples, gradientes suaves, sin texturas ruidosas |
| Personajes | Medio | Rostros simples, 3–4 rasgos definidos, ropa sin patrones complejos |
| Objetos | Bajo–medio | Siluetas reconocibles, detalles mínimos |
| UI | Muy bajo | Íconos planos o con ligero volumen |

## 1.5 Grosor de líneas

| Uso | Grosor | Ejemplo |
|-----|--------|---------|
| Contornos personajes | 2–3px | Outline de avatar |
| Contornos objetos | 1.5–2px | Elementos arrastrables |
| Contornos UI | 1–1.5px | Botones, íconos |
| Separadores | 1px | Bordes de cards |

**Color de líneas:** Siempre 10–20% más oscuro que el fill del elemento.

## 1.6 Sombras

**Sí, pero suaves y coherentes:**

| Tipo | Valores | Uso |
|------|---------|-----|
| Drop shadow suave | `0 4px 12px rgba(0,0,0,0.15)` | Cards, paneles |
| Drop shadow elevado | `0 8px 24px rgba(0,0,0,0.2)` | Modales, elementos flotantes |
| Sombras de personaje | `0 2px 8px rgba(0,0,0,0.12)` | Avatar en escena |
| Sin sombras duras | Evitar `blur < 4px` con opacidad alta | — |

---

# 2. Reglas técnicas obligatorias

## 2.1 Tamaños exactos (px)

| Elemento | Tamaño | Aspecto | Formato | Notas |
|---------|--------|---------|---------|-------|
| **Fondos** | 1920×1080 | 16:9 | PNG/WebP | Escalables; contenido importante en safe area central 1440×810 |
| **Fondos móvil** | 828×1792 | 9:19.5 | PNG/WebP | iPhone referencia |
| **Personaje principal** | 400×480 | 5:6 | PNG/SVG | Altura recomendada para avatar |
| **Personajes secundarios** | 200×240 | 5:6 | PNG/SVG | NPCs, compañeros |
| **Emojis grandes** | 120×120 | 1:1 | PNG/SVG | En minijuegos (cat, dog, etc.) |
| **Emojis medianos** | 48×48 | 1:1 | PNG/SVG | En botones de opción |
| **Íconos UI pequeños** | 24×24 | 1:1 | SVG | Navegación, sonido, volver |
| **Íconos UI medianos** | 32×32 | 1:1 | SVG | Botones principales |
| **Elementos arrastrables** | 80×80 a 120×120 | Variable | PNG/SVG | Mínimo touch target 44×44 |
| **Drop slots** | 100×100 a 140×140 | 1:1 o similar | — | CSS, no asset |

## 2.2 Proporciones recomendadas

- **Personaje : fondo:** 1:4 a 1:5 en altura
- **Objeto : personaje:** 1:2 a 1:3
- **Emoji en botón : botón:** 1:2 (emoji ocupa ~50% del botón)
- **Margen entre elementos interactivos:** Mínimo 16px

## 2.3 Márgenes seguros

| Zona | Márgenes desde borde |
|------|----------------------|
| Contenido crítico (texto, CTAs) | 24px mínimo |
| Safe area central (foco visual) | 15% desde cada borde |
| Zona táctil inferior (evitar navbar) | 80px desde bottom |

## 2.4 Resolución ideal para web

| Uso | Resolución | @1x, @2x, @3x |
|-----|------------|----------------|
| Assets export | 2x (doble de lo visual) | Sí, proporcionar @2x |
| SVG | Vectorial | Escala infinita |
| Lottie/JSON | 1x | Escalar por viewport |

**Recomendación:** Generar todo en 2x; comprimir con herramientas tipo Squoosh para WebP.

---

# 3. Sistema de animaciones coherente

## 3.1 Estilo de animación

- **Filosofía:** Bounce suave, juguetón, nunca brusco
- **Referencia:** Material Design Motion + Disney principios básicos (squash & stretch leve)
- **Framerate:** 60fps objetivo (animaciones CSS/JS), 30fps aceptable para Lottie pesados

## 3.2 Duración recomendada

| Acción | Duración | Easing |
|--------|----------|--------|
| Hover / Focus | 150–200ms | `ease-out` |
| Click / Tap | 100–150ms | `ease-in-out` |
| Aparecer (entrada) | 300–400ms | `ease-out` |
| Desaparecer (salida) | 200–300ms | `ease-in` |
| Transición de pantalla | 400–500ms | `ease-in-out` |
| Feedback correcto (estrella, check) | 500–700ms | `ease-out` + bounce |
| Feedback incorrecto (shake) | 400–500ms | `ease-in-out` |
| **Personaje caminando** | Loop 800–1200ms/ciclo | `ease-in-out` |
| **Personaje celebrando** | 800–1000ms | `ease-out` + bounce |

## 3.3 Easing

```css
/* Valores recomendados */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out-soft: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-soft: cubic-bezier(0.32, 0, 0.67, 0);
```

## 3.4 Qué se anima y qué no

| Animar | No animar |
|--------|-----------|
| Botones (scale, color) | Fondos estáticos |
| Elementos interactivos al tap | Texto largo de lectura |
| Personaje (idle, walk, celebrate) | Iconos muy pequeños (< 20px) |
| Feedback correcto/incorrecto | Líneas decorativas |
| Transiciones de nivel/capítulo | — |
| Barras de progreso | — |

## 3.5 Reacción del personaje entre capítulos

**Comportamiento deseado:** El personaje debe **caminar** y **animarse** invitando al niño a seguir.

| Momento | Animación | Descripción |
|---------|-----------|-------------|
| Entre capítulos | Walk loop | Piernas alternadas, brazos balanceo, desplazamiento horizontal |
| Al completar nivel | Celebrate | Salto, brazos arriba, boca sonriente |
| Idle en nivel | Idle sutil | Respiración (scale 1 → 1.02), parpadeo ocasional |
| Antes de iniciar | Wave / Point | Señalar hacia el siguiente nivel |
| Al elegir opción correcta | Nod + smile | Cabeza asiente, expresión feliz |

**Walk cycle técnico:**
- 4–6 frames por ciclo o interpolación fluida (Lottie)
- Desplazamiento: ~80–120px en 1s
- Dirección: hacia la derecha (siguiente contenido)
- Opcional: bocadillo "¡Siguiente capítulo!" o "Let's go!"

---

# 4. Estructura de carpetas

```
/public
├── assets/
│   ├── backgrounds/           # Fondos por mundo/capítulo
│   │   ├── world_1/           # Mundo 1: Fundamentos Mágicos
│   │   │   ├── chapter_1.png
│   │   │   ├── chapter_2.png
│   │   │   └── ...
│   │   ├── world_2/           # Mundo 2: Aventuras Ciudad
│   │   └── world_3/           # Mundo 3: Exploradores
│   │
│   ├── characters/            # Personajes
│   │   ├── avatar/            # Avatar del niño (capas)
│   │   │   ├── base/
│   │   │   ├── eyes/
│   │   │   ├── mouth/
│   │   │   ├── tops/
│   │   │   ├── bottoms/
│   │   │   ├── shoes/
│   │   │   └── composite/    # PNGs pre-compuestos
│   │   ├── npc/               # NPCs por mundo
│   │   │   ├── world_1/
│   │   │   └── world_2/
│   │   └── mascot/            # Mascota si aplica
│   │
│   ├── objects/               # Objetos para minijuegos
│   │   ├── animals/           # gato, perro, etc.
│   │   ├── food/
│   │   ├── transport/
│   │   ├── colors/            # Formas/círculos de colores
│   │   └── vocabulary/       # Por categoría de nivel
│   │
│   ├── ui/                    # Elementos de interfaz
│   │   ├── icons/             # SVG 24x24, 32x32
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── progress/          # Barras, estrellas
│   │   └── feedback/           # Check, X, estrellas
│   │
│   ├── animations/            # Lottie / sprites
│   │   ├── character/         # Walk, idle, celebrate
│   │   │   ├── walk.json
│   │   │   ├── idle.json
│   │   │   ├── celebrate.json
│   │   │   └── wave.json
│   │   ├── transitions/      # Entre pantallas
│   │   └── feedback/          # Estrella ganada, etc.
│   │
│   └── audio/                 # (existente)
│       ├── voices/
│       ├── sfx/
│       └── music/
```

## Formatos por tipo

| Carpeta | Formato principal | Alternativa | Notas |
|---------|-------------------|-------------|-------|
| backgrounds | PNG, WebP | — | WebP para menor peso |
| characters | SVG (capas), PNG (composite) | — | SVG para avatar customizable |
| objects | PNG @2x, SVG | WebP | PNG si hay gradientes complejos |
| ui/icons | SVG | — | Siempre SVG para escalado |
| ui/buttons, cards | SVG, PNG | — | SVG preferido |
| animations | JSON (Lottie) | GIF (fallback) | Lottie para walk, celebrate |
| feedback (estrellas, etc.) | SVG animado, Lottie | PNG sprite | Lottie para animaciones ricas |

---

# 5. Prompts listos para IA

## 5.1 Prompt base — Fondos

```
Children's educational app background, 2D flat cartoon style, soft lighting from top-left, no harsh shadows. [MUNDO/CAPÍTULO: e.g. magical forest with floating sparkles, cozy bedroom with toys]. Pastel and warm colors, palette: soft pinks #FBCFE8, light blues #BFDBFE, mint #A7F3D0. Clean composition, central safe area empty for UI. 16:9 aspect ratio, 1920x1080px. Friendly, non-threatening, suitable for ages 4-8. No text, no logos. Consistent line weight 2px, rounded shapes.
```

**Variables a sustituir por capítulo:**
- Mundo 1 Ch1: "magical forest with floating sparkles, greeting fairies"
- Mundo 1 Ch2: "colorful workshop with glowing orbs and paint brushes"
- Mundo 1 Ch3: "toy room with soft stuffed animals and balls"
- Mundo 2 Ch1: "sunny park with swing, slide, trees"
- Mundo 2 Ch2: "safe street with cars, bus, traffic lights"
- Mundo 3 Ch1: "world map with flags, globes, travel items"

## 5.2 Prompt base — Personajes

```
Children's app character, 2D flat cartoon, friendly and round proportions. [DESCRIPCIÓN: e.g. young child avatar, diverse, neutral]. Simple face: 2 dots eyes, small smile. Soft pastel clothes. Consistent with: outline 2-3px, no complex patterns, soft shadows. Isolated on transparent background. Front view, full body or上半身. 400x480px. Style: Duolingo/Khan Kids hybrid, warm and approachable. Same artist style across all assets.
```

**Para avatar del niño:**
```
Friendly child character for language learning app, 2D cartoon flat style. Neutral, customizable base. Simple round head, big expressive eyes, small smile. Wearing simple red t-shirt. Isolated, transparent BG. Front view. 400x480px. Consistent with educational app aesthetic, soft colors, 2px outline.
```

## 5.3 Prompt base — Objetos

```
[OBJETO: e.g. red apple, blue ball, yellow star] for children's educational app. 2D flat cartoon style, isolated on transparent background. Simple shape, recognizable silhouette. Soft pastel or saturated color. 2px outline, no complex textures. 120x120px. Consistent with flat cartoon aesthetic, Duolingo-style. Single object, centered.
```

**Ejemplos de objetos:**
- `red apple, green leaf`
- `orange cat, sitting, friendly`
- `blue dog, cartoon, happy`
- `yellow sun, smiling`
- `green tree, simple silhouette`

## 5.4 Prompt base — Íconos UI

```
UI icon [DESCRIPCIÓN: e.g. home, back arrow, sound on]. Flat design, 2px stroke, rounded corners. Color: #FFFFFF on dark or #0B1220 on light. 24x24px. Simple, recognizable at small size. Consistent with children's app, friendly. No gradients, solid fill.
```

## 5.5 Prompt — Mantener coherencia de estilo

Usar este bloque en **todas** las generaciones:

```
STYLE LOCK (include in every prompt): 2D flat cartoon, soft lighting, pastel and warm palette (#FF3FA1, #0B1220, #F8FAFC, #22C55E). Outline 2px, rounded shapes, no harsh shadows. Children's educational app, ages 4-8. Friendly, non-threatening. Consistent with Duolingo/Khan Academy Kids aesthetic.
```

## 5.6 Prompt — Personaje caminando (entre capítulos)

```
Character animation sheet or sprite, 2D flat cartoon child walking. 4-6 frames, side view, rightward movement. Legs alternating, arms swinging. Loopable. Same style as [REFERENCIA]. Transparent background. 400x480px per frame. Happy expression. For children's educational app transition screen.
```

**Alternativa Lottie (describir para animador):**
- Loop infinito
- 800ms por ciclo
- Movimiento horizontal + bounce vertical suave
- Brazos balanceando, piernas alternando
- Bocadillo opcional: "¡Vamos!"

---

# 6. Historia entre capítulos

Cada capítulo debe conectar con el anterior en una **narrativa continua**:

| Mundo | Capítulo | Historia que continúa |
|-------|----------|------------------------|
| 1 Ch1 | Magic Greetings | El niño despierta en un bosque mágico, aprende a saludar |
| 1 Ch2 | Color Spells | Usa los saludos para que un hada le muestre colores mágicos |
| 1 Ch3 | Magic Toys | Los colores dan vida a juguetes en una habitación |
| 1 Ch4 | Family Charms | Los juguetes le piden que invoque a su familia con palabras |
| 1 Ch5 | Cozy Room | La familia está en casa; nombra los objetos de su habitación |
| 2 Ch1 | At the Park | Sale al parque; aplica lo aprendido con amigos |
| 2 Ch2 | On the Street | Camina por la calle hacia la escuela |
| ... | ... | ... |

**Transición visual:** El fondo del capítulo N+1 puede mostrar un "camino" desde el anterior (ej: puerta que se abre, sendero que continúa). El personaje **camina** de un fondo al siguiente.

---

# 7. Errores comunes al generar con IA

| Error | Solución |
|-------|----------|
| **Inconsistencia de estilo** | Usar siempre el STYLE LOCK en cada prompt; generar en sesiones cortas y comparar |
| **Manos mal dibujadas** | Pedir "hands hidden in pockets" o "arms behind back"; evitar manos detalladas |
| **Caras aterradoras** | Especificar "simple face, 2 dots eyes, small curve mouth, no teeth" |
| **Colores saturados** | Incluir "pastel" o hex exactos en el prompt |
| **Fondos ocupados** | Pedir "central area empty, negative space in center" |
| **Resolución baja** | Generar en 1920x1080 o 2x; upscale con Real-ESRGAN si hace falta |
| **Mezcla de estilos** | Un solo modelo por proyecto (ej. siempre DALL·E o Midjourney); no alternar |
| **Texto en imágenes** | Explicitamente "no text, no words, no letters" |
| **Demasiado detalle** | "Simple, minimal details, clean silhouette" |
| **Sombras duras** | "Soft shadows, diffuse lighting, no harsh contrast" |
| **Proporciones incorrectas** | Indicar tamaños en px y "child-friendly proportions" |
| **Objetos recortados** | "Full object visible, no cropping at edges" |
| **Falta de aislamiento** | "Isolated on pure white #FFFFFF or transparent PNG" |

---

# Anexo: Checklist de revisión visual

Antes de integrar cualquier asset:

- [ ] ¿Coincide con la paleta definida?
- [ ] ¿El tamaño es el especificado?
- [ ] ¿Formato correcto (SVG/PNG/WebP)?
- [ ] ¿Transparente cuando corresponde?
- [ ] ¿Contorno 2–3px, estilo coherente?
- [ ] ¿Sin texto ni logos?
- [ ] ¿Safe area respetada en fondos?
- [ ] ¿Funciona en modo claro y oscuro si aplica?

---

*Documento creado para la plataforma Mundo Mágico Inglés. Uso interno.*
