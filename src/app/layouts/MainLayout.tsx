import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './MainLayout.module.css';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import { useProgressStore } from '../../features/progress/store/progressStore';
import { getProgressBackground } from '../../shared/data/worldImages';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const { unlockedChapters } = useProgressStore();

  const { imageUrl, gradient, worldId } = getProgressBackground(unlockedChapters);

  // Verifica si la imagen local existe; si falla usa el gradiente del mundo
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) { setBgUrl(null); return; }
    const img = new Image();
    img.onload = () => setBgUrl(imageUrl);
    img.onerror = () => setBgUrl(null);
    img.src = imageUrl;
  }, [imageUrl, worldId]);

  const backgroundStyle: React.CSSProperties = bgUrl
    ? {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }
    : { background: gradient };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <motion.main
        key={location.pathname}
        className={styles.main}
        style={backgroundStyle}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default MainLayout;
