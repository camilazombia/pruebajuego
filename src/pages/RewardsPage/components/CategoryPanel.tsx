import React from 'react';
import styles from './CategoryPanel.module.css';
import { CATEGORY_INFO } from '../types';

interface CategoryPanelProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.categoryList}>
        {categories.map((category) => {
          const info = CATEGORY_INFO[category];
          if (!info) return null;

          return (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => onCategorySelect(category)}
              title={info.name}
              aria-label={info.name}
            >
              <span className={styles.icon}>{info.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
