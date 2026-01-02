import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './HelpPage.module.css';

interface ParentAccessState {
  step: 'initial' | 'birthYear' | 'success';
  selectedYear: string;
  error: string;
}

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [parentAccess, setParentAccess] = useState<ParentAccessState>({
    step: 'initial',
    selectedYear: '',
    error: '',
  });

  const calculateAge = (year: number): number => {
    return new Date().getFullYear() - year;
  };

  const validateAndSubmit = (year: string) => {
    if (year.length !== 4) return;
    
    const yearNum = parseInt(year, 10);
    const age = calculateAge(yearNum);
    
    if (age < 18) {
      setParentAccess(prev => ({
        ...prev,
        error: `Debes tener 18 años o más. Tienes ${age} años.`,
      }));
      return;
    }

    setParentAccess(prev => ({ ...prev, step: 'success', error: '' }));
    
    // Redirect immediately
    navigate('/parent-zone');
  };

  // Validate automatically when year is complete
  React.useEffect(() => {
    if (parentAccess.step === 'birthYear' && parentAccess.selectedYear.length === 4) {
      validateAndSubmit(parentAccess.selectedYear);
    }
  }, [parentAccess.selectedYear, parentAccess.step]);

  const handleStartParentAccess = () => {
    setParentAccess(prev => ({ ...prev, step: 'birthYear' }));
  };

  // Initialize with parent access modal on component mount
  React.useEffect(() => {
    handleStartParentAccess();
  }, []);

  return (
    <>
    <OrientationAlert />
    <div className={styles.page}>
      <div className={styles.containerParentOnly}>
        {/* Parent Zone Access - Full Width */}
        <section className={styles.parentZoneSectionFull}>
          <div className={styles.parentCard}>
            <AnimatePresence mode="wait">
              {parentAccess.step === 'birthYear' && (
                <motion.div
                  key="birthYear"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.stepContentTwoColumns}
                >
                  {/* Left Column - Text and Year Input */}
                  <div className={styles.leftColumn}>
                    <p className={styles.stepLabel}>Por favor ingresa tú año de<br />nacimiento para continuar</p>
                    
                    {/* Year Display - 4 Separate Inputs */}
                    <div className={styles.yearDisplayContainer}>
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          type="text"
                          className={styles.yearInput}
                          value={parentAccess.selectedYear[index] || ''}
                          readOnly
                          maxLength={1}
                          placeholder="_"
                          aria-label={`Dígito ${index + 1} del año`}
                        />
                      ))}
                    </div>

                    {parentAccess.error && (
                      <p className={styles.errorMessage}>{parentAccess.error}</p>
                    )}
                  </div>

                  {/* Right Column - Numeric Keyboard */}
                  <div className={styles.rightColumn}>
                    <div className={styles.numericKeyboard}>
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          className={styles.keyboardButton}
                          onClick={() => {
                            if (parentAccess.selectedYear.length < 4) {
                              setParentAccess(prev => ({
                                ...prev,
                                selectedYear: prev.selectedYear + String(num)
                              }));
                            }
                          }}
                        >
                          {num}
                        </button>
                      ))}
                      
                      {/* Empty space and 0 Button */}
                      <div className={styles.keyboardSpacer}></div>
                      <button
                        className={styles.keyboardButton}
                        onClick={() => {
                          if (parentAccess.selectedYear.length < 4) {
                            setParentAccess(prev => ({
                              ...prev,
                              selectedYear: prev.selectedYear + '0'
                            }));
                          }
                        }}
                      >
                        0
                      </button>

                      {/* Backspace Button */}
                      <button
                        className={styles.backspaceButton}
                        onClick={() => {
                          setParentAccess(prev => ({
                            ...prev,
                            selectedYear: prev.selectedYear.slice(0, -1)
                          }));
                        }}
                        title="Borrar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className={styles.backspaceIcon}><path d="M0 0h24v24H0z" fill="none"/><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" fill="currentColor"/></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {parentAccess.step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={styles.stepContent}
                >
                  <div className={styles.successMessage}>
                    <span className={styles.successIcon}>✓</span>
                    <p>¡Acceso concedido!</p>
                    <p className={styles.successText}>Redirigiendo a Zona de Padres...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default HelpPage;
