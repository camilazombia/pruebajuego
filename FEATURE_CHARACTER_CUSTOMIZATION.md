# Sistema de Personalización de Personaje - RewardsPage

## Características Implementadas

### 1. **Personaje Animado (CharacterPreview.tsx)**
- Personaje dibujado con SVG que flota y tiene animaciones
- 4 slots de equipamiento:
  - **Head**: Sombreros y coronas
  - **Body**: Ropa y capas
  - **Feet**: Zapatillas especiales
  - **Accessory**: Accesorios varios

### 2. **Sistema de Premios Mejorado**
- 12 premios con 4 niveles de rareza:
  - **Common** (Gris): Gafas, Botón, Cinta - 100-150 monedas
  - **Rare** (Azul): Gema, Diamante, Corazón, Flor - 450-600 monedas
  - **Epic** (Púrpura): Estrella, Escudo, Pergamino, Corona - 2000-2500 monedas
  - **Legendary** (Oro): Trofeo, Varita, Corona Dorada - 5000-5500 monedas

### 3. **Sistema de Monedas**
- Mostrar monedas disponibles vs. gastadas
- Precio dinámico basado en rareza
- Indicador de progreso de colección (5/12 items)

### 4. **Interacciones de Equipo**
#### Drag and Drop:
```
Arrastra un premio desde la grilla al personaje
-> El personaje se viste con ese item
-> El item ocupa automáticamente el slot correcto
```

#### Click para Equipar:
```
Haz clic en un premio comprado
-> Se abre modal con opción "Equipar"
-> Haz clic en "Equipar"
-> El personaje se viste instantáneamente
```

### 5. **Interfaz de Usuario**
- **CharacterDisplay**: Área de drop con borde punteado
  - Cambia a borde sólido cuando arrastra un item
  - Muestra efecto visual de "sobre"
  - Texto informativo: "Arrastra premios aquí o haz clic para equipar"

- **RewardCards**: Mejoradas con drag
  - Indicador visual si está equipado
  - Estilos diferentes por rareza
  - Transiciones suaves

- **Modal**: Con botón "Equipar"
  - Muestra detalles del premio
  - Rareza con colores
  - Precio
  - Botón comprar o equipar

### 6. **Estructura de Archivos**
```
src/entities/character/
├── model/character.ts              # Tipos y mapeos
├── ui/
│   ├── CharacterPreview.tsx        # Componente SVG del personaje
│   └── CharacterPreview.module.css # Estilos

src/pages/RewardsPage/
├── RewardsPage.tsx                 # Lógica completa
├── RewardsPage.module.css          # Estilos (expandido)

src/shared/data/
└── rewards.ts                      # Definición de premios actualizada
```

### 7. **Estados del Personaje**
- **Sin equipar**: Personaje base con solo cara y brazos/piernas
- **Con equipo Head**: Muestra gorro/corona
- **Con equipo Body**: Muestra ropa/capa
- **Con equipo Feet**: Muestra zapatillas
- **Con equipo Accessory**: Muestra accesorios (gafas, etc.)
- **Múltiple**: Combina todos los equipos elegidos

### 8. **Animaciones**
- Personaje flota suavemente
- Equipo tiene pulso de opacidad
- Transiciones suaves en drag and drop
- Efectos hover en tarjetas
- Bounce al abrir modal

## Próximos Pasos (Opcionales)
- Guardar estado del personaje en localStorage
- Sistema de rotación del personaje
- Emote/expresiones faciales del personaje
- Más opciones de equipamiento
- Efectos de partículas al equipar
