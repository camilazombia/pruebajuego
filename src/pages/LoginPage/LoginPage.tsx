import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { motion } from 'framer-motion';
import styles from './LoginPage.module.css';

// UI
import Logo from '../../assets/svg/logo.svg';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

// Config
const USER_KEY  = 'family_user';
const CODE_MIN  = 1;
const CODE_MAX  = 20;
const pattern   = /^[a-zA-Z0-9_\-]+$/;
const API_URL   = import.meta.env.VITE_API_URL ?? '';

const ERROR_CODES: Record<string, string> = {
  'invalid_format': 'Código inválido. Solo se permiten letras y números.',
  'invalid_length': 'El código debe tener entre 1 y 12 caracteres.',
  'not_found': 'Código incorrecto. Verifica e intenta nuevamente.',
  'network_error': 'Error de conexión. Intenta nuevamente más tarde.',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isReady = useMemo(() => {
    if (!code) return false;
    if (!pattern.test(code)) return false;
    return code.length >= CODE_MIN && code.length <= CODE_MAX;
  }, [code]);

  const submit = async () => {
    if (!isReady || loading) return;

    if (!pattern.test(code)) {
      setErr(ERROR_CODES.invalid_format);
      return;
    }
    if (code.length < CODE_MIN || code.length > CODE_MAX) {
      setErr(ERROR_CODES.invalid_length);
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/family-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (res.status === 401 || res.status === 403) {
        const data = await res.json().catch(() => ({}));
        setErr(data.error ?? ERROR_CODES.not_found);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('network');

      const { user } = await res.json();
      // Guardar datos del usuario en localStorage para la sesión
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      navigate('/family-access', { replace: true });
    } catch {
      setErr(ERROR_CODES.network_error);
      setLoading(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') submit();
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
          aria-label="Acceso Familiar"
        >
          <h1 className={styles.title}>Ingresar</h1>

          <Input
            id="family-code"
            label="Código de acceso*"
            placeholder="Ingresa tu código"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (err) setErr(null);
            }}
            onKeyDown={onKeyDown}
            helperText="* Campo obligatorio"
            error={err}
            maxLength={CODE_MAX}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            sizeVariant="lg"
          />

          <div className={styles.actions}>
            <Button
              text={loading ? 'Validando…' : 'COMENZAR'}
              className={styles.cta}
              onClick={submit}
              disabled={!isReady || loading}
            />
          </div>
        </motion.section>
      </main>

    </div>
    </>
  );
}
