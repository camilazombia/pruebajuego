import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
  { key: 'home', label: 'Inicio' },
  { key: 'worlds', label: 'Mundos' },
  { key: 'rewards', label: 'Premios' },
  { key: 'review', label: 'Repaso' },
  { key: 'help', label: 'Ayuda' },
  
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
            type="button"
          >
            <div className={styles.iconPlaceholder} aria-hidden />
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
