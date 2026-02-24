# Plan de Audios para ElevenLabs - Mundo Mágico Inglés

> Guía completa de todos los archivos de audio que deben generarse con ElevenLabs.
> Voz recomendada: voz infantil amigable para el **Libro Mágico Flotante** y voces con personalidad para cada **Guardián**.

---

## Convenciones de Nombres

- Prefijo `magicBook_` → Voz del Libro Mágico (Guía principal)
- Prefijo `guardian_` → Voz del Guardián del mundo
- Prefijo `ui_` → Audios de interfaz (feedback, instrucciones)
- Prefijo `word_` → Pronunciación de una palabra individual en inglés
- Prefijo `intro_` → Introducción narrativa de un capítulo/nivel

**Ruta base:** `/public/assets/audio/voices/`

---

## 1. AUDIOS DEL UI (Interfaz general - Se usan en TODOS los mundos)

| # | Nombre de Archivo | Texto EN | Texto ES (si aplica) | Personaje | Ruta |
|---|---|---|---|---|---|
| 1 | `ui_wellDone.mp3` | "Well done!" | "¡Bien hecho!" | Libro Mágico | `/public/assets/audio/voices/` |
| 2 | `ui_excellent.mp3` | "Excellent!" | "¡Excelente!" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `ui_tryAgain.mp3` | "Try again!" | "¡Inténtalo de nuevo!" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `ui_almostThere.mp3` | "Almost there!" | "¡Casi lo logras!" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `ui_starEarned.mp3` | "You earned a star!" | "¡Ganaste una estrella!" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `ui_levelComplete.mp3` | "Level complete!" | "¡Nivel completo!" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `ui_chapterComplete.mp3` | "Chapter complete! The guardian is getting better!" | "¡Capítulo completo! ¡El guardián se está curando!" | Libro Mágico | `/public/assets/audio/voices/` |
| 8 | `ui_dragTheWord.mp3` | "Drag the word to its match!" | "¡Arrastra la palabra a su pareja!" | Libro Mágico | `/public/assets/audio/voices/` |
| 9 | `ui_listenAndChoose.mp3` | "Listen and choose the right answer!" | "¡Escucha y elige la respuesta correcta!" | Libro Mágico | `/public/assets/audio/voices/` |
| 10 | `ui_tapToListen.mp3` | "Tap the speaker to listen!" | "¡Toca el altavoz para escuchar!" | Libro Mágico | `/public/assets/audio/voices/` |
| 11 | `ui_buildTheSentence.mp3` | "Put the words in order!" | "¡Pon las palabras en orden!" | Libro Mágico | `/public/assets/audio/voices/` |
| 12 | `ui_selectCorrectWord.mp3` | "Select the correct word!" | "¡Selecciona la palabra correcta!" | Libro Mágico | `/public/assets/audio/voices/` |
| 13 | `ui_keepGoing.mp3` | "Keep going, you're doing great!" | "¡Sigue así, lo estás haciendo genial!" | Libro Mágico | `/public/assets/audio/voices/` |
| 14 | `ui_guardianCured.mp3` | "The guardian is cured! You saved this world!" | "¡El guardián está curado! ¡Salvaste este mundo!" | Libro Mágico | `/public/assets/audio/voices/` |
| 15 | `ui_worldUnlocked.mp3` | "A new world has been unlocked!" | "¡Un nuevo mundo se ha desbloqueado!" | Libro Mágico | `/public/assets/audio/voices/` |
| 16 | `ui_wrongAnswer.mp3` | "Oops! That's not quite right." | "¡Ups! Eso no es del todo correcto." | Libro Mágico | `/public/assets/audio/voices/` |
| 17 | `ui_correctAnswer.mp3` | "That's correct!" | "¡Eso es correcto!" | Libro Mágico | `/public/assets/audio/voices/` |

---

## 2. AUDIOS DEL MUNDO 1 - Fundamentos Mágicos (Guardián: Sol Dormilón ☀️)

### 2.1 Narrativa del Mundo

| # | Nombre de Archivo | Texto | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `guardian_sleepySun_intro.mp3` | "Yaaawn... I'm so sleepy... I forgot all the magic words... Can you help me wake up? Say the words in English and I'll start to shine again!" | Sol Dormilón | `/public/assets/audio/voices/world_1/` |
| 2 | `guardian_sleepySun_halfway.mp3` | "I'm starting to feel warmer! Keep going, little wizard!" | Sol Dormilón | `/public/assets/audio/voices/world_1/` |
| 3 | `guardian_sleepySun_cured.mp3` | "I'M AWAKE! Thank you, little wizard! You brought back the light to the Magic World!" | Sol Dormilón | `/public/assets/audio/voices/world_1/` |

### 2.2 Capítulo 1: Magic Greetings (Saludos)

| # | Nombre de Archivo | Texto EN | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `intro_ch1_magicGreetings.mp3` | "Hello, little wizard! In this chapter, we'll learn magic greeting words. Say hello, hi, and goodbye to wake up the forest!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 2 | `word_hello.mp3` | "Hello" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `word_hi.mp3` | "Hi" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `word_goodbye.mp3` | "Goodbye" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `word_goodMorning.mp3` | "Good morning" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `word_goodNight.mp3` | "Good night" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `magicBook_ch1_listen.mp3` | "Listen carefully and choose the right greeting!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 8 | `magicBook_ch1_drag.mp3` | "Match each English greeting with its Spanish meaning!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 9 | `magicBook_ch1_build.mp3` | "Put the words together to make a greeting!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |

### 2.3 Capítulo 2: Color Spells (Colores)

| # | Nombre de Archivo | Texto EN | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `intro_ch2_colorSpells.mp3` | "Now let's learn the color spells! Say the color name in English and watch it glow!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 2 | `word_red.mp3` | "Red" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `word_blue.mp3` | "Blue" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `word_yellow.mp3` | "Yellow" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `word_green.mp3` | "Green" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `word_orange.mp3` | "Orange" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `magicBook_ch2_listen.mp3` | "Listen to the color and tap the right one!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 8 | `magicBook_ch2_drag.mp3` | "Drag each color to its name in Spanish!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |

### 2.4 Capítulo 3: Magic Toys (Juguetes)

| # | Nombre de Archivo | Texto EN | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `intro_ch3_magicToys.mp3` | "The toys are asleep! Say their names in English to wake them up and play!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 2 | `word_ball.mp3` | "Ball" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `word_doll.mp3` | "Doll" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `word_car.mp3` | "Car" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `word_toy.mp3` | "Toy" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `word_teddyBear.mp3` | "Teddy bear" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `word_robot.mp3` | "Robot" | Libro Mágico | `/public/assets/audio/voices/` |
| 8 | `magicBook_ch3_listen.mp3` | "Listen to the toy name and pick the right picture!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 9 | `magicBook_ch3_drag.mp3` | "Match each toy with its English name!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |

### 2.5 Capítulo 4: Family Charms (Familia)

| # | Nombre de Archivo | Texto EN | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `intro_ch4_familyCharms.mp3` | "Your family needs you! Say their names in English so they can appear with magic!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 2 | `word_mom.mp3` | "Mom" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `word_dad.mp3` | "Dad" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `word_sister.mp3` | "Sister" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `word_brother.mp3` | "Brother" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `word_baby.mp3` | "Baby" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `magicBook_ch4_listen.mp3` | "Listen and choose the right family member!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 8 | `magicBook_ch4_drag.mp3` | "Connect each family member with the right word!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |

### 2.6 Capítulo 5: Cozy Room (Habitación)

| # | Nombre de Archivo | Texto EN | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `intro_ch5_cozyRoom.mp3` | "Welcome to the Cozy Room! Name each object to make it respond to your voice!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 2 | `word_bed.mp3` | "Bed" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `word_chair.mp3` | "Chair" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `word_table.mp3` | "Table" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `word_lamp.mp3` | "Lamp" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `word_window.mp3` | "Window" | Libro Mágico | `/public/assets/audio/voices/` |
| 7 | `word_door.mp3` | "Door" | Libro Mágico | `/public/assets/audio/voices/` |
| 8 | `magicBook_ch5_listen.mp3` | "Listen to the object name and find it in the room!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |
| 9 | `magicBook_ch5_drag.mp3` | "Drag each room object to its English name!" | Libro Mágico | `/public/assets/audio/voices/world_1/` |

---

## 3. AUDIOS DE MINIJUEGOS (Instrucciones por tipo de juego)

Estos audios se usan en todos los mundos, para cada tipo de minijuego.

| # | Nombre de Archivo | Texto EN | Texto ES | Personaje | Ruta |
|---|---|---|---|---|---|
| 1 | `minigame_listenAndChoose_intro.mp3` | "Listen to the word and choose the right picture!" | "¡Escucha la palabra y elige la imagen correcta!" | Libro Mágico | `/public/assets/audio/voices/` |
| 2 | `minigame_dragAndDrop_intro.mp3` | "Drag each word to its match! You can do it!" | "¡Arrastra cada palabra a su pareja! ¡Tú puedes!" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `minigame_multipleChoice_intro.mp3` | "Choose the right answer! Only one is correct." | "¡Elige la respuesta correcta! Solo una es correcta." | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `minigame_selectWords_intro.mp3` | "Select all the correct words! Be careful!" | "¡Selecciona todas las palabras correctas! ¡Con cuidado!" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `minigame_buildPhrase_intro.mp3` | "Put the words in the right order to make a sentence!" | "¡Pon las palabras en el orden correcto para formar una oración!" | Libro Mágico | `/public/assets/audio/voices/` |

---

## 4. AUDIOS DEL LIBRO MÁGICO (Guía narrativa global)

| # | Nombre de Archivo | Texto | Personaje | Ruta |
|---|---|---|---|---|
| 1 | `magicBook_welcome.mp3` | "Welcome to the Magic World, little wizard! I'm the Magic Book, and I'll be your guide. Together we will learn English spells to save every land!" | Libro Mágico | `/public/assets/audio/voices/` |
| 2 | `magicBook_firstSpell.mp3` | "To cast a spell, you just need to say the word in English! Ready? Let's go!" | Libro Mágico | `/public/assets/audio/voices/` |
| 3 | `magicBook_worldComplete.mp3` | "Amazing! You've saved this world! The guardian is healed and a new world awaits you!" | Libro Mágico | `/public/assets/audio/voices/` |
| 4 | `magicBook_encouragement1.mp3` | "Don't give up! Every wizard makes mistakes. Try again!" | Libro Mágico | `/public/assets/audio/voices/` |
| 5 | `magicBook_encouragement2.mp3` | "You're getting better and better! The magic is growing inside you!" | Libro Mágico | `/public/assets/audio/voices/` |
| 6 | `magicBook_comeBack.mp3` | "Welcome back, wizard! Let's continue our adventure!" | Libro Mágico | `/public/assets/audio/voices/` |

---

## 5. Resumen de Producción

| Categoría | Cantidad de Audios |
|---|---|
| UI (feedback, instrucciones) | 17 |
| Mundo 1 - Narrativa del Guardián | 3 |
| Mundo 1 - Cap 1: Magic Greetings | 9 |
| Mundo 1 - Cap 2: Color Spells | 8 |
| Mundo 1 - Cap 3: Magic Toys | 9 |
| Mundo 1 - Cap 4: Family Charms | 8 |
| Mundo 1 - Cap 5: Cozy Room | 9 |
| Minijuegos (instrucciones) | 5 |
| Libro Mágico (guía global) | 6 |
| **TOTAL** | **74 audios** |

---

## Notas de Producción

1. **Voces recomendadas en ElevenLabs:**
   - **Libro Mágico Flotante:** Voz amigable, cálida, ligeramente mágica/etérea. Velocidad moderada-lenta para que los niños comprendan.
   - **Sol Dormilón:** Voz soñolienta al inicio, que se va animando conforme lo curan. Tono cálido y alegre.

2. **Formato:** MP3, 44.1kHz, mono, ~128kbps.

3. **Estilo de pronunciación:** Claro, pausado, con énfasis en las palabras clave en inglés. Para las palabras individuales (`word_*.mp3`), pronunciar solo la palabra, sin contexto.

4. **Idioma:** Los audios de palabras (`word_*`) van en inglés puro. Los intros y narrativas del Libro Mágico pueden mezclar inglés y español según la tabla.
