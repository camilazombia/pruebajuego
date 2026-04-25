import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './MemoryPage.module.css';

// ── Data ────────────────────────────────────────────────────────────────────

interface WordPair {
  id: string;
  english: string;
  spanish: string;
  emoji: string;
  sound: string;
}

interface MatchTopic {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  pairs: WordPair[];
}

const TOPICS: MatchTopic[] = [
  {
    id: 'animals', label: 'Animales', labelEn: 'Animals', icon: '🐾',
    pairs: [
      { id: 'cat',      english: 'CAT',      spanish: 'Gato',     emoji: '🐱', sound: 'cat' },
      { id: 'dog',      english: 'DOG',      spanish: 'Perro',    emoji: '🐶', sound: 'dog' },
      { id: 'bear',     english: 'BEAR',     spanish: 'Oso',      emoji: '🐻', sound: 'bear' },
      { id: 'frog',     english: 'FROG',     spanish: 'Rana',     emoji: '🐸', sound: 'frog' },
      { id: 'lion',     english: 'LION',     spanish: 'León',     emoji: '🦁', sound: 'lion' },
      { id: 'fish',     english: 'FISH',     spanish: 'Pez',      emoji: '🐟', sound: 'fish' },
      { id: 'rabbit',   english: 'RABBIT',   spanish: 'Conejo',   emoji: '🐰', sound: 'rabbit' },
      { id: 'bird',     english: 'BIRD',     spanish: 'Pájaro',   emoji: '🐦', sound: 'bird' },
    ],
  },
  {
    id: 'fruits', label: 'Frutas', labelEn: 'Fruits', icon: '🍎',
    pairs: [
      { id: 'apple',  english: 'APPLE',  spanish: 'Manzana',  emoji: '🍎', sound: 'apple' },
      { id: 'banana', english: 'BANANA', spanish: 'Plátano',  emoji: '🍌', sound: 'banana' },
      { id: 'orange', english: 'ORANGE', spanish: 'Naranja',  emoji: '🍊', sound: 'orange' },
      { id: 'grape',  english: 'GRAPE',  spanish: 'Uva',      emoji: '🍇', sound: 'grape' },
      { id: 'lemon',  english: 'LEMON',  spanish: 'Limón',    emoji: '🍋', sound: 'lemon' },
      { id: 'peach',  english: 'PEACH',  spanish: 'Melocotón',emoji: '🍑', sound: 'peach' },
      { id: 'mango',  english: 'MANGO',  spanish: 'Mango',    emoji: '🥭', sound: 'mango' },
      { id: 'cherry', english: 'CHERRY', spanish: 'Cereza',   emoji: '🍒', sound: 'cherry' },
    ],
  },
  {
    id: 'colors', label: 'Colores', labelEn: 'Colors', icon: '🌈',
    pairs: [
      { id: 'red',    english: 'RED',    spanish: 'Rojo',     emoji: '🔴', sound: 'red' },
      { id: 'blue',   english: 'BLUE',   spanish: 'Azul',     emoji: '🔵', sound: 'blue' },
      { id: 'green',  english: 'GREEN',  spanish: 'Verde',    emoji: '🟢', sound: 'green' },
      { id: 'yellow', english: 'YELLOW', spanish: 'Amarillo', emoji: '🟡', sound: 'yellow' },
      { id: 'orange', english: 'ORANGE', spanish: 'Naranja',  emoji: '🟠', sound: 'orange' },
      { id: 'purple', english: 'PURPLE', spanish: 'Morado',   emoji: '🟣', sound: 'purple' },
      { id: 'black',  english: 'BLACK',  spanish: 'Negro',    emoji: '⚫', sound: 'black' },
      { id: 'white',  english: 'WHITE',  spanish: 'Blanco',   emoji: '⚪', sound: 'white' },
    ],
  },
  {
    id: 'food', label: 'Comida', labelEn: 'Food', icon: '🍕',
    pairs: [
      { id: 'pizza',    english: 'PIZZA',    spanish: 'Pizza',    emoji: '🍕', sound: 'pizza' },
      { id: 'cake',     english: 'CAKE',     spanish: 'Pastel',   emoji: '🎂', sound: 'cake' },
      { id: 'bread',    english: 'BREAD',    spanish: 'Pan',      emoji: '🍞', sound: 'bread' },
      { id: 'egg',      english: 'EGG',      spanish: 'Huevo',    emoji: '🥚', sound: 'egg' },
      { id: 'milk',     english: 'MILK',     spanish: 'Leche',    emoji: '🥛', sound: 'milk' },
      { id: 'cookie',   english: 'COOKIE',   spanish: 'Galleta',  emoji: '🍪', sound: 'cookie' },
      { id: 'icecream', english: 'ICE CREAM',spanish: 'Helado',   emoji: '🍦', sound: 'icecream' },
      { id: 'candy',    english: 'CANDY',    spanish: 'Dulce',    emoji: '🍬', sound: 'candy' },
    ],
  },
  {
    id: 'body', label: 'Cuerpo', labelEn: 'Body Parts', icon: '👁️',
    pairs: [
      { id: 'eye',   english: 'EYE',   spanish: 'Ojo',     emoji: '👁️', sound: 'eye' },
      { id: 'nose',  english: 'NOSE',  spanish: 'Nariz',   emoji: '👃', sound: 'nose' },
      { id: 'ear',   english: 'EAR',   spanish: 'Oreja',   emoji: '👂', sound: 'ear' },
      { id: 'mouth', english: 'MOUTH', spanish: 'Boca',    emoji: '👄', sound: 'mouth' },
      { id: 'hand',  english: 'HAND',  spanish: 'Mano',    emoji: '✋', sound: 'hand' },
      { id: 'foot',  english: 'FOOT',  spanish: 'Pie',     emoji: '🦶', sound: 'foot' },
      { id: 'arm',   english: 'ARM',   spanish: 'Brazo',   emoji: '💪', sound: 'arm' },
      { id: 'head',  english: 'HEAD',  spanish: 'Cabeza',  emoji: '🗣️', sound: 'head' },
    ],
  },
  {
    id: 'transport', label: 'Transporte', labelEn: 'Transport', icon: '🚗',
    pairs: [
      { id: 'car',   english: 'CAR',   spanish: 'Coche',   emoji: '🚗', sound: 'car' },
      { id: 'plane', english: 'PLANE', spanish: 'Avión',   emoji: '✈️', sound: 'airplane' },
      { id: 'train', english: 'TRAIN', spanish: 'Tren',    emoji: '🚂', sound: 'train' },
      { id: 'bus',   english: 'BUS',   spanish: 'Autobús', emoji: '🚌', sound: 'bus' },
      { id: 'boat',  english: 'BOAT',  spanish: 'Barco',   emoji: '⛵', sound: 'boat' },
      { id: 'bike',  english: 'BIKE',  spanish: 'Bici',    emoji: '🚲', sound: 'bicycle' },
      { id: 'truck', english: 'TRUCK', spanish: 'Camión',  emoji: '🚚', sound: 'truck' },
      { id: 'rocket',english: 'ROCKET',spanish: 'Cohete',  emoji: '🚀', sound: 'rocket' },
    ],
  },
  {
    id: 'weather', label: 'Clima', labelEn: 'Weather', icon: '☀️',
    pairs: [
      { id: 'sun',     english: 'SUN',     spanish: 'Sol',       emoji: '☀️', sound: 'sun' },
      { id: 'rain',    english: 'RAIN',    spanish: 'Lluvia',    emoji: '🌧️', sound: 'rain' },
      { id: 'cloud',   english: 'CLOUD',   spanish: 'Nube',      emoji: '☁️', sound: 'cloud' },
      { id: 'snow',    english: 'SNOW',    spanish: 'Nieve',     emoji: '❄️', sound: 'snow' },
      { id: 'rainbow', english: 'RAINBOW', spanish: 'Arcoíris',  emoji: '🌈', sound: 'rainbow' },
      { id: 'storm',   english: 'STORM',   spanish: 'Tormenta',  emoji: '⛈️', sound: 'storm' },
      { id: 'wind',    english: 'WIND',    spanish: 'Viento',    emoji: '💨', sound: 'wind' },
      { id: 'moon',    english: 'MOON',    spanish: 'Luna',      emoji: '🌙', sound: 'moon' },
    ],
  },
  {
    id: 'emotions', label: 'Emociones', labelEn: 'Emotions', icon: '😊',
    pairs: [
      { id: 'happy',   english: 'HAPPY',   spanish: 'Feliz',     emoji: '😊', sound: 'happy' },
      { id: 'sad',     english: 'SAD',     spanish: 'Triste',    emoji: '😢', sound: 'sad' },
      { id: 'angry',   english: 'ANGRY',   spanish: 'Enojado',   emoji: '😠', sound: 'angry' },
      { id: 'scared',  english: 'SCARED',  spanish: 'Asustado',  emoji: '😨', sound: 'scared' },
      { id: 'tired',   english: 'TIRED',   spanish: 'Cansado',   emoji: '😴', sound: 'tired' },
      { id: 'excited', english: 'EXCITED', spanish: 'Emocionado',emoji: '🤩', sound: 'excited' },
      { id: 'sick',    english: 'SICK',    spanish: 'Enfermo',   emoji: '🤒', sound: 'sick' },
      { id: 'brave',   english: 'BRAVE',   spanish: 'Valiente',  emoji: '😎', sound: 'brave' },
    ],
  },
  {
    id: 'school', label: 'Escuela', labelEn: 'School', icon: '📚',
    pairs: [
      { id: 'book',   english: 'BOOK',   spanish: 'Libro',   emoji: '📚', sound: 'book' },
      { id: 'pen',    english: 'PEN',    spanish: 'Pluma',   emoji: '🖊️', sound: 'pen' },
      { id: 'desk',   english: 'DESK',   spanish: 'Pupitre', emoji: '🪑', sound: 'desk' },
      { id: 'bag',    english: 'BAG',    spanish: 'Mochila', emoji: '🎒', sound: 'backpack' },
      { id: 'ruler',  english: 'RULER',  spanish: 'Regla',   emoji: '📏', sound: 'ruler' },
      { id: 'map',    english: 'MAP',    spanish: 'Mapa',    emoji: '🗺️', sound: 'map' },
      { id: 'globe',  english: 'GLOBE',  spanish: 'Globo',   emoji: '🌍', sound: 'globe' },
      { id: 'test',   english: 'TEST',   spanish: 'Examen',  emoji: '📝', sound: 'test' },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function playWord(sound: string) {
  new Audio(`/assets/audio/voices/words/${sound}.mp3`).play().catch(() => {});
}

const PAIR_COUNT = 6;

// ── Component ────────────────────────────────────────────────────────────────

const MemoryPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState<MatchTopic | null>(null);

  // Left column: English word cards (shuffled)
  const [leftItems, setLeftItems] = useState<WordPair[]>([]);
  // Right column: Emoji cards (shuffled differently)
  const [rightItems, setRightItems] = useState<WordPair[]>([]);

  // Currently selected
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);  // pair id
  const [selectedRight, setSelectedRight] = useState<string | null>(null); // pair id

  // Matched pair ids
  const [matched, setMatched] = useState<string[]>([]);
  // Wrong shake animation
  const [wrongLeft, setWrongLeft] = useState(false);
  const [wrongRight, setWrongRight] = useState(false);

  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);

  const startGame = useCallback((topic: MatchTopic) => {
    const picked = shuffle(topic.pairs).slice(0, PAIR_COUNT);
    setLeftItems(shuffle(picked));
    setRightItems(shuffle(picked));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setWrongLeft(false);
    setWrongRight(false);
    setMoves(0);
    setFinished(false);
    setSelectedTopic(topic);
  }, []);

  // Check for match whenever both sides are selected
  useEffect(() => {
    if (!selectedLeft || !selectedRight) return;

    setMoves((m) => m + 1);

    if (selectedLeft === selectedRight) {
      // Correct match!
      const newMatched = [...matched, selectedLeft];
      setTimeout(() => {
        setMatched(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (newMatched.length === PAIR_COUNT) {
          setFinished(true);
        }
        // Play the word on correct match
        const pair = leftItems.find((p) => p.id === selectedLeft);
        if (pair) playWord(pair.sound);
      }, 400);
    } else {
      // Wrong — shake and clear
      setWrongLeft(true);
      setWrongRight(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongLeft(false);
        setWrongRight(false);
      }, 700);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeft, selectedRight]);

  const handleLeftClick = (pair: WordPair) => {
    if (matched.includes(pair.id)) return;
    if (selectedLeft === pair.id) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(pair.id);
    playWord(pair.sound);
  };

  const handleRightClick = (pair: WordPair) => {
    if (matched.includes(pair.id)) return;
    if (selectedRight === pair.id) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(pair.id);
  };

  // ── Finish screen ──────────────────────────────────────────────────────────
  if (finished && selectedTopic) {
    const stars = moves <= PAIR_COUNT + 2 ? 3 : moves <= PAIR_COUNT + 5 ? 2 : 1;
    return (
      <>
        <OrientationAlert />
        <div className={styles.page}>
          <motion.div
            className={styles.finishScreen}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <div className={styles.finishStars}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`${styles.star} ${i < stars ? styles.starLit : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 300 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <h2 className={styles.finishTitle}>¡Perfecto!</h2>
            <p className={styles.finishSubtitle}>
              Great job! • {moves} {moves === 1 ? 'intento' : 'intentos'}
            </p>
            <div className={styles.finishBtns}>
              <button className={styles.playAgainBtn} onClick={() => startGame(selectedTopic)}>
                🔄 Jugar otra vez
              </button>
              <button className={styles.topicsBtn} onClick={() => setSelectedTopic(null)}>
                📚 Cambiar tema
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // ── Topic selector ─────────────────────────────────────────────────────────
  if (!selectedTopic) {
    return (
      <>
        <OrientationAlert />
        <div className={styles.page}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>← Volver</button>
          <div className={styles.header}>
            <h1 className={styles.title}>Une las Palabras</h1>
            <p className={styles.subtitle}>Match the words! 🔗</p>
          </div>

          <div className={styles.howTo}>
            <span>👈</span>
            <span>Toca la palabra en inglés y luego su pareja en español</span>
          </div>

          <div className={styles.topicsGrid}>
            {TOPICS.map((topic, i) => (
              <motion.button
                key={topic.id}
                className={styles.topicCard}
                onClick={() => startGame(topic)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 280 }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.93 }}
              >
                <span className={styles.topicIcon}>{topic.icon}</span>
                <span className={styles.topicLabel}>{topic.label}</span>
                <span className={styles.topicLabelEn}>{topic.labelEn}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Game ───────────────────────────────────────────────────────────────────
  return (
    <>
      <OrientationAlert />
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.gameHeader}>
          <button className={styles.backBtn} onClick={() => setSelectedTopic(null)}>← Temas</button>
          <span className={styles.topicBadge}>{selectedTopic.icon} {selectedTopic.labelEn}</span>
          <button className={styles.restartBtn} onClick={() => startGame(selectedTopic)} aria-label="Reiniciar">🔄</button>
        </div>

        {/* Progress */}
        <div className={styles.progressRow}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              animate={{ width: `${(matched.length / PAIR_COUNT) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className={styles.progressLabel}>{matched.length}/{PAIR_COUNT}</span>
        </div>

        {/* Column headers */}
        <div className={styles.colHeaders}>
          <div className={styles.colHeader}>🇬🇧 Inglés</div>
          <div className={styles.colHeader}>🇪🇸 Español</div>
        </div>

        {/* Matching area */}
        <div className={styles.matchArea}>
          {/* LEFT — English words */}
          <div className={styles.column}>
            <AnimatePresence>
              {leftItems.map((pair) => {
                const isMatched = matched.includes(pair.id);
                const isSelected = selectedLeft === pair.id;
                const isWrong = wrongLeft && isSelected;
                return (
                  <motion.button
                    key={pair.id}
                    className={`${styles.wordCard} ${isSelected ? styles.selectedCard : ''} ${isMatched ? styles.matchedCard : ''} ${isWrong ? styles.wrongCard : ''}`}
                    onClick={() => handleLeftClick(pair)}
                    disabled={isMatched}
                    whileTap={!isMatched ? { scale: 0.94 } : {}}
                    animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    layout
                  >
                    <span className={styles.wordText}>{pair.english}</span>
                    {isSelected && !isMatched && (
                      <span className={styles.speakerIcon}>🔊</span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Center connector line */}
          <div className={styles.connector} aria-hidden="true">
            {leftItems.map((pair) => {
              const isMatched = matched.includes(pair.id);
              return (
                <div key={pair.id} className={styles.connectorSlot}>
                  {isMatched && (
                    <motion.div
                      className={styles.connectorLine}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT — Emoji + Spanish */}
          <div className={styles.column}>
            <AnimatePresence>
              {rightItems.map((pair) => {
                const isMatched = matched.includes(pair.id);
                const isSelected = selectedRight === pair.id;
                const isWrong = wrongRight && isSelected;
                return (
                  <motion.button
                    key={pair.id}
                    className={`${styles.emojiCard} ${isSelected ? styles.selectedCard : ''} ${isMatched ? styles.matchedCard : ''} ${isWrong ? styles.wrongCard : ''}`}
                    onClick={() => handleRightClick(pair)}
                    disabled={isMatched}
                    whileTap={!isMatched ? { scale: 0.94 } : {}}
                    animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    layout
                  >
                    <span className={styles.emojiIcon}>{pair.emoji}</span>
                    <span className={styles.spanishText}>{pair.spanish}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <p className={styles.hint}>
          {selectedLeft && !selectedRight
            ? `"${leftItems.find(p => p.id === selectedLeft)?.english}" — ahora toca su pareja 👉`
            : matched.length === 0
            ? 'Toca una palabra en inglés para comenzar'
            : matched.length < PAIR_COUNT
            ? `¡Bien! Faltan ${PAIR_COUNT - matched.length}`
            : ''}
        </p>
      </div>
    </>
  );
};

export default MemoryPage;
