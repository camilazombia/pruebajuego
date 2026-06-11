import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../shared/ui/Button/Button';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';
import { useAvatar } from '../../app/providers/AvatarProvider';
import { useProgressStore } from '../../features/progress/store/progressStore';
import { useAudio } from '../../app/providers/AudioProvider';
import { useSettingsStore, useSettingsActions } from '../../app/store/settings.store';
import { WORLDS } from '../../shared/data/worlds';
import { BackgroundImage } from '../../shared/ui/BackgroundImage/BackgroundImage';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const { animationSpeed } = useAgeAdaptation();
  const { avatarState } = useAvatar();
  const { unlockedWorlds, completedWorlds, completedLevels, magicCoins } = useProgressStore();
  const { playMusic, stopMusic, playFeedback } = useAudio();
  const { musicEnabled, soundEffectsEnabled } = useSettingsStore();
  const { toggleMusic, toggleSoundEffects } = useSettingsActions();

  const currentWorld = useMemo(() => {
    const sorted = WORLDS
      .filter((w) => unlockedWorlds.includes(w.id))
      .sort((a, b) => b.number - a.number);
    return sorted[0] || WORLDS[0];
  }, [unlockedWorlds]);

  const bgChapterId = `${currentWorld.id}_chapter_1`;
  const worldsCompleted = completedWorlds.length;

  const [showDailyReviewBanner, setShowDailyReviewBanner] = useState(false);

  useEffect(() => {
    if (searchParams.get('pago') === 'exitoso') {
      setPagoExitoso(true);
      // Limpiar el parámetro de la URL sin recargar
      window.history.replaceState({}, '', '/home');
      const t = setTimeout(() => setPagoExitoso(false), 6000);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

  const DAILY_REVIEW_KEY = 'mundo_magico_last_visit';
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem(DAILY_REVIEW_KEY);
    if (lastVisit !== today && completedWorlds.length > 0) {
      localStorage.setItem(DAILY_REVIEW_KEY, today);
      setShowDailyReviewBanner(true);
    }
  }, []);

  useEffect(() => {
    if (musicEnabled) {
      playMusic('home_bg');
    }
    return () => { stopMusic(); };
  }, [musicEnabled, playMusic, stopMusic]);

  const handleToggleMusic = () => {
    toggleMusic();
    if (musicEnabled) {
      stopMusic();
    }
  };

  const getNextLevelId = (): string | null => {
    for (const world of WORLDS) {
      if (!unlockedWorlds.includes(world.id)) continue;
      for (const chapter of world.chapters) {
        for (const level of chapter.levels) {
          if (!completedLevels.includes(level.id)) {
            return level.id;
          }
        }
      }
    }
    return null;
  };

  const handleToggleSoundEffects = () => {
    toggleSoundEffects();
    if (!soundEffectsEnabled) {
      playFeedback('correct');
    }
  };

  return (
    <>
      <OrientationAlert />
      <div className={styles.page}>
      <BackgroundImage chapterId={bgChapterId} className={styles.backgroundImage} />

      {/* Banner de pago exitoso */}
      {pagoExitoso && (
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, background: 'linear-gradient(135deg,#22c55e,#16a34a)',
          color: '#fff', borderRadius: '999px', padding: '0.75rem 1.75rem',
          fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          🎉 ¡Pago exitoso! Bienvenido a Mundo Mágico
        </div>
      )}

      {/* ===== INDICADORES SUPERIORES ===== */}
      <div className={styles.topIndicators}>
        <div className={styles.indicatorBlock}>
          <span className={`material-symbols-outlined ${styles.indicatorIcon}`}>
            paid
          </span>
          <span className={styles.indicatorText}>{magicCoins}</span>
        </div>

        <div className={styles.indicatorBlock}>
          <span className={`material-symbols-outlined ${styles.indicatorIcon} ${styles.worldIcon}`}>
            public
          </span>
          <span className={styles.indicatorText}>{worldsCompleted}/{WORLDS.length}</span>
        </div>
      </div>

      {/* ===== PERSONAJE PRINCIPAL Y BOTONES LATERALES ===== */}
      <div className={styles.centerSection}>
        <Button
          onClick={() => navigate('/rewards')}
          text="PREMIOS"
          icon="trophy"
          showIconCircle={false}
          className={styles.sideButton}
        />

        <motion.div
          className={styles.characterContainer}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 / animationSpeed, repeat: Infinity }}
        >
          <div className={styles.sapitContainer}>
            <ChibiAvatar
              eyeState="open"
              mouthState="smile"
              topId={avatarState.top}
              bottomId={avatarState.bottom}
              shoesId={avatarState.shoes}
              skinId={avatarState.skin}
              hairId={avatarState.hair}
              eyesId={avatarState.eyes}
              eyebrowsId={avatarState.eyebrows}
              mouthId={avatarState.mouth}
              glassesId={avatarState.glasses}
              specialId={avatarState.special}
              accessories={[]}
              isBlinking={true}
              isBreathing={true}
              size="lg"
            />
          </div>
          <div className={styles.characterShadow}></div>
        </motion.div>

        <Button
          onClick={() => {
            if (showDailyReviewBanner) {
              setShowDailyReviewBanner(false);
              navigate('/review');
              return;
            }
            const nextLevel = getNextLevelId();
            if (nextLevel) {
              navigate(`/level/${nextLevel}`);
            } else {
              navigate('/worlds');
            }
          }}
          text="JUGAR"
          icon="play_arrow"
          showIconCircle={true}
          className={styles.sideButton}
        />
      </div>

      {/* ===== BOTONES CIRCULARES INFERIORES ===== */}
      <div className={styles.controlButtonsContainer}>
        <Button
          title="Música"
          text=""
          icon={musicEnabled ? 'music_note' : 'music_off'}
          className={`${styles.controlButtonStyle} ${!musicEnabled ? styles.controlDisabled : ''}`}
          showIconCircle={false}
          onClick={handleToggleMusic}
        />
        <Button
          title="Sonido"
          text=""
          icon={soundEffectsEnabled ? 'volume_up' : 'volume_off'}
          className={`${styles.controlButtonStyle} ${!soundEffectsEnabled ? styles.controlDisabled : ''}`}
          showIconCircle={false}
          onClick={handleToggleSoundEffects}
        />
        <Button
          title="Repaso"
          text={showDailyReviewBanner ? '¡Nuevo!' : ''}
          icon="menu_book"
          className={styles.controlButtonStyle}
          showIconCircle={false}
          onClick={() => navigate('/review')}
        />
      </div>
    </div>
    </>
  );
};

export default HomePage;
