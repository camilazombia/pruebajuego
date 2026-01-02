import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FamilyAccessPage.module.css';
import { useChild } from '../../features/child/context/ChildContext';

// SVG Icons for ages
import Age34Svg from '../../assets/svg/age3-4.svg';
import Age56Svg from '../../assets/svg/age5-6.svg';
import Age78Svg from '../../assets/svg/age7-8.svg';
import Logo from '../../assets/svg/logo.svg';

// Avatar options
const AVATAR_OPTIONS = [
  { id: 1, emoji: '👦', label: 'Niño' },
  { id: 2, emoji: '👧', label: 'Niña' },
  { id: 3, emoji: '🐰', label: 'Conejo' },
  { id: 4, emoji: '🦊', label: 'Zorro' },
  { id: 5, emoji: '🐻', label: 'Oso' },
  { id: 6, emoji: '🦁', label: 'León' },
  { id: 7, emoji: '🐱', label: 'Gato' },
  { id: 8, emoji: '🐶', label: 'Perro' },
];

// Age options with SVG icons
const AGE_OPTIONS = [
  { id: 1, icon: Age34Svg, label: '3–6 años', range: '3-6' },
  { id: 2, icon: Age56Svg, label: '7–10 años', range: '7-10' },
  { id: 3, icon: Age78Svg, label: '11+ años', range: '11+' },
];

export default function FamilyAccessPage() {
  const navigate = useNavigate();
  const { setAgeRange } = useChild();
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [dataPolicy, setDataPolicy] = useState(false);
  const [progressStorage, setProgressStorage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isReady = childName.trim() && childAge && dataPolicy && progressStorage;

  const handleSubmit = async () => {
    if (!isReady || loading) return;
    setLoading(true);
    
    // Guardar el rango de edad en el contexto
    setAgeRange(childAge);
    
    // Simulamos validación
    await new Promise((r) => setTimeout(r, 500));
    // Aquí guardarías los datos del menor
    console.log({ childName, childAge, selectedAvatar, dataPolicy, progressStorage });
    navigate('/welcome', { 
      replace: true,
      state: { childName, selectedAvatar }
    });
  };

  const handleButtonClick = () => {
    if (!isReady && !loading) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else if (isReady && !loading) {
      handleSubmit();
    }
  };

  return (
    <>
    <OrientationAlert />
    <div className={styles.page}>
      {/* HEADER con logo centrado */}
      <header className={styles.navbar}>
        <div className={styles.navCenter}>
          <img src={Logo} alt="Mundo Mágico Inglés" className={styles.logoSvg} />
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Información del Menor"
        >
          <h1 className={styles.title}>Acceso Familiar</h1>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur. Nulla cursus magna aliquam quam ac dui hac tellus. Egestas molestie non vulputate sed mauris platea est dignissim.
          </p>

          {/* Content Container - Avatar on left, Form on right */}
          <div className={styles.contentContainer}>
            {/* Avatar Section */}
            <div className={styles.avatarSection}>
              <motion.button
                className={styles.avatarButton}
                onClick={() => setShowAvatarModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Seleccionar avatar"
              >
                <span className={styles.avatarEmoji}>{selectedAvatar.emoji}</span>
                <span className={styles.avatarPlus}>+</span>
              </motion.button>
            </div>

            {/* Form Section */}
            <div className={styles.formSection}>
              {/* Nombre del Menor */}
              <Input
                id="child-name"
                label="Nombre del Menor*"
                placeholder="Nombre"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                helperText="* Campo obligatorio"
                type="text"
              />

              {/* Selecciona la edad - Inside form section */}
              <div className={styles.formGroup}>
                <label className={styles.ageLabel}>Selecciona la edad*</label>
                <div className={styles.ageChipsContainer}>
                  {AGE_OPTIONS.map((age) => (
                    <motion.button
                      key={age.id}
                      className={`${styles.ageChip} ${
                        childAge === age.range ? styles.selected : ''
                      }`}
                      onClick={() => setChildAge(age.range)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={age.icon} alt={age.label} className={styles.chipIcon} />
                      <span className={styles.chipLabel}>{age.range}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={dataPolicy}
                    onChange={(e) => setDataPolicy(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    Acepto{' '}
                    <a href="#" className={styles.policyLink}>
                      política de datos infantil
                    </a>
                  </span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={progressStorage}
                    onChange={(e) => setProgressStorage(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    Autorizo el{' '}
                    <a href="#" className={styles.policyLink}>
                      almacenamiento local del progreso
                    </a>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className={styles.actions}>
            <div className={styles.buttonWrapper}>
              <Button
                className={`${styles.cta} ${!isReady ? styles.disabled : ''}`}
                onClick={handleButtonClick}
                disabled={false}
              >
                {loading ? 'Procesando…' : 'COMENZAR'}
              </Button>
              {showTooltip && !isReady && (
                <motion.div
                  className={styles.tooltip}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                >
                  Completa toda la información para continuar
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Avatar Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>Selecciona tu avatar</h2>
              <div className={styles.avatarGrid}>
                {AVATAR_OPTIONS.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    className={`${styles.avatarOption} ${
                      selectedAvatar.id === avatar.id ? styles.selected : ''
                    }`}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarModal(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={avatar.label}
                  >
                    <span className={styles.optionEmoji}>{avatar.emoji}</span>
                  </motion.button>
                ))}
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setShowAvatarModal(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
