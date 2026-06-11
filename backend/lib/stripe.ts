import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

/**
 * Montos en centavos COP (Stripe requiere la unidad más pequeña).
 * 1 peso colombiano = 100 centavos → $200.000 COP = 20.000.000 centavos.
 * Estos valores son estáticos; no se necesita crear precios en el dashboard.
 */
export const AMOUNTS = {
  inscripcion:  20_000_000,  // $200.000 COP — pago inicial (ambos planes)
  plan10_cuota:  9_000_000,  // $90.000 COP  — cuotas 2-10 (plan 10 meses)
  plan6_cuota:  13_000_000,  // $130.000 COP — cuotas 2-6  (plan 6 meses)
  contado:      69_000_000,  // $690.000 COP — pago único
} as const;
