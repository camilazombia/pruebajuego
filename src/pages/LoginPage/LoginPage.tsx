import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LoginPage.module.css';

// UI
import Logo from '../../assets/svg/logo.svg';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

// Config
const STORAGE_KEY = 'family_access_code';
const CODE_MIN = 6;   // ajusta si quieres otra longitud mínima
const CODE_MAX = 12;  // y máxima
const pattern = /^[a-zA-Z0-9]+$/; // solo letras/números (cámbialo si quieres solo números)

export default function LoginPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Autologin si ya hay un código guardado
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && pattern.test(saved)) {
      navigate('/play', { replace: true });
    } else {
      inputRef.current?.focus();
    }
  }, [navigate]);

  const isReady = useMemo(() => {
    if (!code) return false;
    if (!pattern.test(code)) return false;
    return code.length >= CODE_MIN && code.length <= CODE_MAX;
  }, [code]);

  const validateCode = async (value: string) => {
    // Aquí podrías llamar a tu API si aplica.
    await new Promise((r) => setTimeout(r, 200));
    return pattern.test(value) && value.length >= CODE_MIN && value.length <= CODE_MAX;
  };

  const submit = async () => {
    if (!isReady || loading) return;
    setLoading(true);
    setErr(null);
    try {
      const ok = await validateCode(code);
      if (!ok) {
        setErr('Código inválido. Verifica e intenta nuevamente.');
        setLoading(false);
        return;
      }
      localStorage.setItem(STORAGE_KEY, code);
      navigate('/play', { replace: true });
    } catch {
      setErr('Ocurrió un problema al validar el código.');
      setLoading(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') submit();
  };

  return (
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
          aria-label="Acceso Familiar"
        >
          <h1 className={styles.title}>Acceso Familiar</h1>
          <p className={styles.subtitle}>Código de acceso del padre</p>

          <Input
            id="family-code"
            ref={inputRef as any}
            label="Ingresa el código*"
            placeholder="Ej: 10286524"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (err) setErr(null);
            }}
            onKeyDown={onKeyDown}
            helperText="* Campo obligatorio"
            error={err}
            maxLength={CODE_MAX}
            type="text"           // usa "tel" si quieres teclado numérico
            inputMode="numeric"   // sugiere teclado numérico en móvil
            autoComplete="one-time-code"
          />

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              className={styles.cta}
              onClick={submit}
              disabled={!isReady || loading}
            >
              {loading ? 'Validando…' : 'COMENZAR'}
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
