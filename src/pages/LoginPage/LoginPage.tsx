import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { motion } from 'framer-motion';
import styles from './LoginPage.module.css';

// UI
import Logo from '../../assets/svg/logo.svg';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

// Config
const STORAGE_KEY = 'family_access_code';
const CODE_MIN = 1;   // ajusta si quieres otra longitud mínima
const CODE_MAX = 12;  // y máxima
const pattern = /^[a-zA-Z0-9]+$/; // solo letras/números (cámbialo si quieres solo números)

// Códigos válidos para acceso familiar
const VALID_CODES = [
  '1234',        // Código de prueba principal
  '5678',        // Código de prueba secundario
  '0000',        // Código de prueba adicional
  'family2024',  // Código alfanumérico
];

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

  // Focus en el input al cargar (opcional, ya que Input maneja su propio focus)
  useEffect(() => {
    // El Input de shared/ui maneja su propio focus interno
  }, []);

  const isReady = useMemo(() => {
    if (!code) return false;
    if (!pattern.test(code)) return false;
    return code.length >= CODE_MIN && code.length <= CODE_MAX;
  }, [code]);

  const validateCode = async (value: string) => {
    // Validar formato
    if (!pattern.test(value)) {
      setErr(ERROR_CODES.invalid_format);
      return false;
    }

    // Validar longitud
    if (value.length < CODE_MIN || value.length > CODE_MAX) {
      setErr(ERROR_CODES.invalid_length);
      return false;
    }

    // Simular llamada a API
    await new Promise((r) => setTimeout(r, 200));

    // Validar código contra lista de códigos válidos
    if (!VALID_CODES.includes(value)) {
      setErr(ERROR_CODES.not_found);
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!isReady || loading) return;
    setLoading(true);
    setErr(null);
    try {
      const ok = await validateCode(code);
      if (!ok) {
        setLoading(false);
        return;
      }
      localStorage.setItem(STORAGE_KEY, code);
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
          <h1 className={styles.title}>Acceso Familiar</h1>
          <p className={styles.subtitle}>Código de acceso del padre</p>

          <Input
            id="family-code"
            label="Ingresa el código*"
            placeholder="Ej: 1234"
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
