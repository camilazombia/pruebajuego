import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './LegalPages.module.css';

interface LegalPage {
  id: string;
  label: string;
  title: string;
  component: React.ComponentType<any>;
}

interface LegalPagesLayoutProps {
  currentPageId: string;
  pages: LegalPage[];
}

export const LegalPagesLayout: React.FC<LegalPagesLayoutProps> = ({
  currentPageId,
  pages,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState(currentPageId);

  const currentPage = pages.find((p) => p.id === activePage);
  const CurrentComponent = currentPage?.component;

  const handlePageClick = (pageId: string) => {
    setActivePage(pageId);
    // Si quieres que también navegue a la ruta, descomenta:
    // navigate(`/legal/${pageId}`);
  };

  return (
    <>
    <OrientationAlert />
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Migas de pan">
        <button 
          className={styles.breadcrumbLink}
          onClick={() => navigate(-1)}
          title="Volver a la página anterior"
        >
          ← Atrás
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{currentPage?.label || 'Políticas'}</span>
      </nav>

      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      {/* Main Layout */}
      <div className={styles.layoutContainer}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${
            sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
          }`}
        >
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Índice de Políticas</h2>
            <button
              className={styles.sidebarToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Alternar sidebar"
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
          </div>

          <nav className={styles.sidebarNav}>
            {pages.map((page) => (
              <button
                key={page.id}
                className={`${styles.sidebarItem} ${
                  activePage === page.id ? styles.active : ''
                }`}
                onClick={() => {
                  handlePageClick(page.id);
                  // En móvil, cerrar sidebar al seleccionar
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
              >
                {page.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Panel */}
        <main className={styles.contentPanel}>
          {CurrentComponent && <CurrentComponent />}
        </main>
      </div>
    </div>
    </>
  );
};

export default LegalPagesLayout;
