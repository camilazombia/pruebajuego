import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

// Import menu images
import HomeIcon from '../../assets/images/menu/Home.png';
import WorldsIcon from '../../assets/images/menu/Worlds.png';
import RewardsIcon from '../../assets/images/menu/Clothes.png';
import ReviewIcon from '../../assets/images/menu/Review.png';
import HelpIcon from '../../assets/images/menu/Help.png';

const MENU_ITEMS = [
  { key: 'home', label: 'Inicio', icon: HomeIcon },
  { key: 'worlds', label: 'Mundos', icon: WorldsIcon },
  { key: 'rewards', label: 'Premios', icon: RewardsIcon },
  { key: 'review', label: 'Repaso', icon: ReviewIcon },
  { key: 'help', label: 'Ayuda & Padres', icon: HelpIcon },
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>('home');
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    setActive(key);
    
    switch (key) {
      case 'home':
        navigate('/home');
        break;
      case 'worlds':
        navigate('/worlds');
        break;
      case 'rewards':
        navigate('/rewards');
        break;
      case 'review':
        navigate('/review');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  return (
    <aside className={styles.sidebar} aria-label="Menú lateral">
      <div className={styles.stack}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`${styles.item} ${active === item.key ? styles.active : ''}`}
            onClick={() => handleClick(item.key)}
            aria-current={active === item.key ? 'page' : undefined}
            aria-label={item.label}
            type="button"
            title={item.label}
          >
            <img 
              src={item.icon} 
              alt={item.label}
              className={styles.icon}
            />
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
