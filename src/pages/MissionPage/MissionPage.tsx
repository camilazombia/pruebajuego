import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import styles from './MissionPage.module.css';

// --- Types and Constants ---

type GameObject = {
  id: string;
  name: string;
  color: string;
  isColored: boolean;
};

type GameState = 'intro' | 'playing' | 'finished';

const COLORS_TO_GUESS = ['Red', 'Blue', 'Yellow'];

const GAME_OBJECTS: Omit<GameObject, 'isColored'>[] = [
  { id: 'obj1', name: 'Ball', color: 'Red' },
  { id: 'obj2', name: 'Car', color: 'Blue' },
  { id: 'obj3', name: 'Duck', color: 'Yellow' },
];

// --- Helper Functions ---

const triggerConfetti = () => {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    // Since we launch from two points, we can split the particle count
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};


// --- MissionPage Component ---

export const MissionPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeLevel, isLevelCompleted } = useProgressStore();

  const [gameState, setGameState] = useState<GameState>('intro');
  const [objects, setObjects] = useState<GameObject[]>(
    GAME_OBJECTS.map(obj => ({ ...obj, isColored: false }))
  );
  const [targetColorIndex, setTargetColorIndex] = useState(0);
  
  const currentTargetColor = useMemo(() => COLORS_TO_GUESS[targetColorIndex], [targetColorIndex]);

  // --- Audio Effects ---

  useEffect(() => {
    // Play intro audio when component mounts
    const introAudio = new Audio('/assets/audio/voices/audioRoomIntro.mp3');
    introAudio.play().catch(e => console.error("Audio play failed:", e));

    // Start the game after a delay
    const timer = setTimeout(() => {
      setGameState('playing');
    }, 2500); // Wait for intro audio to give context

    return () => {
      clearTimeout(timer);
      introAudio.pause();
    };
  }, []);

  useEffect(() => {
    // Play the target color voice prompt
    if (gameState === 'playing' && currentTargetColor) {
      const colorAudio = new Audio(`/assets/audio/voices/colors/${currentTargetColor.toLowerCase()}.mp3`);
      colorAudio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [gameState, currentTargetColor]);

  // --- Game Logic ---

  const handleObjectClick = (clickedObject: GameObject) => {
    if (gameState !== 'playing' || clickedObject.isColored) {
      return;
    }

    if (clickedObject.color === currentTargetColor) {
      // Correct guess: color the object
      setObjects(prevObjects =>
        prevObjects.map(obj =>
          obj.id === clickedObject.id ? { ...obj, isColored: true } : obj
        )
      );

      // Play success sound
      const successAudio = new Audio('/assets/audio/sfx/success.mp3');
      successAudio.play().catch(e => console.error("Audio play failed:", e));

      // Move to the next color or finish the game
      if (targetColorIndex === COLORS_TO_GUESS.length - 1) {
        setGameState('finished');
        triggerConfetti();
        // Play victory sound after a short delay
        setTimeout(() => {
            const victoryAudio = new Audio('/assets/audio/sfx/victory.mp3');
            victoryAudio.play().catch(e => console.error("Audio play failed:", e));
        }, 500);
      } else {
        setTargetColorIndex(prevIndex => prevIndex + 1);
      }
    } else {
      // Incorrect guess: play a soft 'wrong' sound
      const wrongAudio = new Audio('/assets/audio/sfx/wrong.mp3');
      wrongAudio.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleBackToMap = () => {
    // Using 'world_1_chapter_2_level_1' as it aligns with the 'Color Spells' chapter
    if (!isLevelCompleted('world_1_chapter_2_level_1')) {
        completeLevel('world_1_chapter_2_level_1');
    }
    navigate('/chapters/world_1');
  };

  // --- Render ---

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ filter: 'grayscale(100%)' }}
      animate={{ filter: gameState === 'finished' ? 'grayscale(0%)' : 'grayscale(100%)' }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <div className={styles.missionContent}>
        
        {/* Character Area */}
        <div className={styles.characterArea}>
          <ChibiAvatar
            eyeState={gameState === 'intro' ? 'closed' : 'open'}
            mouthState={gameState === 'finished' ? 'smile' : 'neutral'}
            size="md"
          />
          {gameState === 'playing' && (
            <div className={styles.speechBubble}>
              Find the color: <strong>{currentTargetColor}</strong>
            </div>
          )}
        </div>

        {/* Interactive Objects Area */}
        <div className={styles.objectsArea}>
          {objects.map(obj => (
            <motion.div
              key={obj.id}
              className={styles.objectWrapper}
              whileHover={{ scale: gameState === 'playing' && !obj.isColored ? 1.1 : 1 }}
              onClick={() => handleObjectClick(obj)}
            >
              <div
                className={`${styles.object} ${styles[`object${obj.color}`]}`}
                style={{ filter: obj.isColored ? 'grayscale(0%)' : 'grayscale(100%)' }}
              />
              <div className={styles.objectName}>{obj.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Completion Button */}
        {gameState === 'finished' && (
          <motion.div
            className={styles.completionContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2>Well Done!</h2>
            <button className={styles.mapButton} onClick={handleBackToMap}>
              Back to Map
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MissionPage;