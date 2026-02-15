import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './MainLayout.module.css';
import Sidebar from '../../widgets/Sidebar/Sidebar';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const getBackgroundClass = () => {
    const path = location.pathname;
    if (path === '/home') return styles.bgHome;
    if (path === '/worlds' || path.startsWith('/worlds')) return styles.bgWorlds;
    if (path === '/rewards' || path.startsWith('/rewards')) return styles.bgRewards;
    if (path === '/review' || path.startsWith('/review')) return styles.bgReview;
    if (path === '/help') return styles.bgHelp;
    if (path.includes('/chapters') || path.startsWith('/worlds')) return styles.bgChapters;
    return '';
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <motion.main
        key={location.pathname}
        className={`${styles.main} ${getBackgroundClass()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default MainLayout;
