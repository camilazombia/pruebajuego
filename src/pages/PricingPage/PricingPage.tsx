import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PricingPage.module.css';

// URL del backend Next.js (configurar VITE_API_URL en .env)
const API_URL = import.meta.env.VITE_API_URL ?? '';

interface Plan {
  id: 'contado' | 'plan6' | 'plan10';
  emoji: string;
  name: string;
  tagline: string;
  upfront: string;
  cuotas: string | null;
  totalLabel: string;
  features: string[];
  cta: string;
  ctaClass: string;
  popular: boolean;
  endpoint: string;
}

const PLANS: Plan[] = [
  {
    id: 'contado',
    emoji: '⚡',
    name: 'Pago de Contado',
    tagline: 'Un solo pago, acceso total',
    upfront: '$690.000',
    cuotas: null,
    totalLabel: '$690.000 COP',
    features: [
      'Acceso completo a los 12 mundos',
      'Sin cuotas mensuales',
      'Mejor precio total',
      'Acceso inmediato tras el pago',
      'Soporte prioritario',
    ],
    cta: 'Pagar $690.000 ahora',
    ctaClass: styles.ctaContado,
    popular: false,
    endpoint: '/api/checkout/contado',
  },
  {
    id: 'plan6',
    emoji: '🚀',
    name: 'Plan 6 Meses',
    tagline: 'La opción más popular',
    upfront: '$200.000',
    cuotas: '5 cuotas de $130.000/mes',
    totalLabel: '$850.000 COP',
    features: [
      'Acceso completo a los 12 mundos',
      'Pago inicial de $200.000',
      '5 cuotas automáticas de $130.000',
      'Acceso inmediato tras el pago inicial',
      'Cobros automáticos mensuales',
    ],
    cta: 'Empezar con $200.000',
    ctaClass: styles.ctaPopular,
    popular: true,
    endpoint: '/api/checkout/plan6',
  },
  {
    id: 'plan10',
    emoji: '🌟',
    name: 'Plan 10 Meses',
    tagline: 'Cuotas más cómodas',
    upfront: '$200.000',
    cuotas: '9 cuotas de $90.000/mes',
    totalLabel: '$1.010.000 COP',
    features: [
      'Acceso completo a los 12 mundos',
      'Pago inicial de $200.000',
      '9 cuotas automáticas de $90.000',
      'Acceso inmediato tras el pago inicial',
      'Cobros automáticos mensuales',
    ],
    cta: 'Empezar con $200.000',
    ctaClass: styles.ctaDefault,
    popular: false,
    endpoint: '/api/checkout/plan10',
  },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (plan: Plan) => {
    setLoading(plan.id);
    setError(null);

    try {
      const res = await fetch(`${API_URL}${plan.endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Error ${res.status}`);
      }

      const { url } = await res.json();
      if (!url) throw new Error('No se recibió la URL de pago');

      // Redirigir a Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('[PricingPage]', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Error al iniciar el pago. Inténtalo de nuevo.',
      );
      setLoading(null);
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <header className={styles.header}>
        <span className={styles.badge}>Planes y Precios</span>
        <h1 className={styles.title}>
          Elige tu <span>aventura mágica</span>
        </h1>
        <p className={styles.subtitle}>
          Acceso completo a todos los mundos · Cobros automáticos · Cancela cuando quieras
        </p>
      </header>

      {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

      <div className={styles.grid}>
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            className={`${styles.card} ${plan.popular ? styles.cardPopular : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
          >
            {plan.popular && (
              <span className={styles.popularBadge}>⭐ Más Popular</span>
            )}

            {/* Header */}
            <div className={styles.cardHeader}>
              <span className={styles.cardEmoji}>{plan.emoji}</span>
              <div>
                <h2 className={styles.cardName}>{plan.name}</h2>
                <p className={styles.cardTagline}>{plan.tagline}</p>
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className={styles.pricing}>
              <div className={styles.pricingMain}>
                <span className={styles.priceAmount}>{plan.upfront}</span>
                <span className={styles.priceLabel}>COP pago inicial</span>
              </div>

              {plan.cuotas ? (
                <>
                  <div className={styles.pricingRow}>
                    <span className={styles.pricingRowLabel}>Cuotas restantes</span>
                    <span className={styles.pricingRowValue}>{plan.cuotas}</span>
                  </div>
                  <hr className={styles.pricingDivider} />
                  <div className={styles.pricingTotal}>
                    <span className={styles.pricingTotalLabel}>Total final</span>
                    <span className={styles.pricingTotalValue}>{plan.totalLabel}</span>
                  </div>
                </>
              ) : (
                <p className={styles.priceNote}>Pago único · Sin cuotas · Sin sorpresas</p>
              )}
            </div>

            {/* Features */}
            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f} className={styles.feature}>
                  <span className={styles.featureCheck}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`${styles.ctaButton} ${plan.ctaClass}`}
              onClick={() => handleSelectPlan(plan)}
              disabled={loading !== null}
            >
              {loading === plan.id ? (
                <>⏳ Redirigiendo a Stripe...</>
              ) : (
                <>{plan.cta}</>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <p className={styles.guarantee}>
        🔒 Pago 100% seguro con Stripe · Los cobros se procesan en COP
      </p>
    </div>
  );
};

export default PricingPage;
