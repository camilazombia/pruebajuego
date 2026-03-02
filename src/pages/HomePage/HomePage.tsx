import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../shared/ui/Button/Button';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { ChibiAvatar } from '../../assets/svg/ChibiAvatar';
import { useAgeAdaptation } from '../../features/child/hooks/useAgeAdaptation';
import { useAvatar } from '../../app/providers/AvatarProvider';
import { useProgressStore } from '../../features/progress/store/progressStore';
import { WORLDS } from '../../shared/data/worlds';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { animationSpeed } = useAgeAdaptation();
  const { avatarState } = useAvatar();
  const { unlockedWorlds, completedWorlds, magicCoins } = useProgressStore();

  const currentWorld = useMemo(() => {
    const sorted = WORLDS
      .filter((w) => unlockedWorlds.includes(w.id))
      .sort((a, b) => b.number - a.number);
    return sorted[0] || WORLDS[0];
  }, [unlockedWorlds]);

  const bgChapterId = `${currentWorld.id}_chapter_1`;
  const worldsCompleted = completedWorlds.length;

  return (
    <>
      <OrientationAlert />
      <div
        className={styles.page}
        style={{
          backgroundImage: `url(/assets/images/backgrounds/${bgChapterId}.jpg)`,
        }}
      >

      {/* ===== INDICADORES SUPERIORES ===== */}
      <div className={styles.topIndicators}>
        {/* Monedas */}
        <div className={styles.indicatorBlock}>
          <span className={`material-symbols-outlined ${styles.indicatorIcon}`}>
            paid
          </span>
          <span className={styles.indicatorText}>{magicCoins}</span>
        </div>

        {/* Mundos Completados */}
        <div className={styles.indicatorBlock}>
          <span className={`material-symbols-outlined ${styles.indicatorIcon} ${styles.worldIcon}`}>
            public
          </span>
          <span className={styles.indicatorText}>{worldsCompleted}/{WORLDS.length}</span>
        </div>
      </div>

      {/* ===== PERSONAJE PRINCIPAL Y BOTONES LATERALES ===== */}
      <div className={styles.centerSection}>
        {/* BOTÓN PREMIOS (izquierda) */}
        <Button
          onClick={() => navigate('/rewards')}
          text="PREMIOS"
          icon="trophy"
          showIconCircle={false}
          className={styles.sideButton}
        />

        {/* PERSONAJE PRINCIPAL */}
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
              accessories={[]}
              isBlinking={true}
              isBreathing={true}
              size="lg"
            />
          </div>
          <div className={styles.characterShadow}></div>
        </motion.div>

        {/* BOTÓN JUGAR (derecha) */}
        <Button
          onClick={() => navigate('/worlds')}
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
          icon="music_note"
          className={styles.controlButtonStyle}
          showIconCircle={false}
        />
        <Button
          title="Magia"
          text=""
          icon="playing_cards"
          className={styles.controlButtonStyle}
          showIconCircle={false}
        />
        <Button
          title="Celebración"
          text=""
          icon="celebration"
          className={styles.controlButtonStyle}
          showIconCircle={false}
        />
      </div>
    </div>
    </>
  );
};

export default HomePage;
