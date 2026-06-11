import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { Subscription } from '@/models/Subscription';

// Next.js necesita leer el body crudo para validar la firma de Stripe
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Falta stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[webhook] Firma inválida:', err);
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  await connectDB();

  try {
    switch (event.type) {

      // ------------------------------------------------------------------
      // Checkout completado → otorgar acceso + crear Subscription Schedule
      // ------------------------------------------------------------------
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== 'paid') break;

        const { userId, plan } = session.metadata!;

        // Otorgar acceso: rol 'aldia' = al día con pagos
        await User.findByIdAndUpdate(userId, { role: 'aldia' });

        if (session.mode === 'payment') {
          // Plan de contado: guardar registro sin suscripción
          await Subscription.create({
            userId,
            plan,
            status:               'active',
            stripeCustomerId:     session.customer as string,
            stripePaymentIntentId: session.payment_intent as string,
          });
        } else if (session.mode === 'subscription' && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);

          // Guardar registro inicial
          const subscriptionDoc = await Subscription.create({
            userId,
            plan,
            status:               'active',
            stripeCustomerId:     session.customer as string,
            stripeSubscriptionId: sub.id,
            currentPeriodEnd:     new Date(sub.current_period_end * 1000),
          });

          // Convertir a Subscription Schedule con 2 fases (precio distinto primer mes)
          const scheduleId = await crearScheduleDesdeSuscripcion(
            sub.id,
            parseInt(sub.metadata.cuota_amount),
            parseInt(sub.metadata.fases_restantes),
            sub.current_period_end,
            sub.metadata.plan,
          );

          if (scheduleId) {
            subscriptionDoc.stripeScheduleId = scheduleId;
            await subscriptionDoc.save();
          }
        }
        break;
      }

      // ------------------------------------------------------------------
      // Cuota mensual cobrada
      // ------------------------------------------------------------------
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.billing_reason !== 'subscription_cycle') break;
        if (!invoice.subscription) break;

        const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const userId = sub.metadata.userId;

        // Asegurar acceso activo y actualizar periodo
        await User.findByIdAndUpdate(userId, { role: 'aldia' });
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            status:          'active',
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            gracePeriodEnd:   null,
          },
        );
        break;
      }

      // ------------------------------------------------------------------
      // Cobro fallido → periodo de gracia de 3 días
      // ------------------------------------------------------------------
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.subscription) break;

        const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const userId = sub.metadata.userId;

        const gracePeriodEnd = new Date();
        gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 3);

        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { status: 'grace_period', gracePeriodEnd },
        );

        // No revocar aún — Stripe reintentará según tu configuración de reintentos.
        // Si quieres suspender inmediatamente, descomenta la línea siguiente:
        // await User.findByIdAndUpdate(userId, { role: 'suspended' });

        console.log(`[webhook] Cobro fallido para usuario ${userId}. Gracia hasta ${gracePeriodEnd.toISOString()}`);
        break;
      }

      // ------------------------------------------------------------------
      // Estado de suscripción cambia (past_due, unpaid, etc.)
      // ------------------------------------------------------------------
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata.userId;
        if (!userId) break;

        if (sub.status === 'past_due' || sub.status === 'unpaid') {
          await User.findByIdAndUpdate(userId, { role: 'suspended' });
          await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: sub.id },
            { status: 'past_due' },
          );
        } else if (sub.status === 'active') {
          await User.findByIdAndUpdate(userId, { role: 'aldia' });
          await Subscription.findOneAndUpdate(
            { stripeSubscriptionId: sub.id },
            { status: 'active' },
          );
        }
        break;
      }

      // ------------------------------------------------------------------
      // Suscripción cancelada (Schedule llegó al final o fallo definitivo)
      // ------------------------------------------------------------------
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata.userId;
        if (!userId) break;

        await User.findByIdAndUpdate(userId, { role: 'suspended' });
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { status: 'cancelled' },
        );

        console.log(`[webhook] Suscripción finalizada para usuario ${userId}. Acceso revocado.`);
        break;
      }
    }
  } catch (err) {
    console.error(`[webhook] Error procesando evento ${event.type}:`, err);
    // Devolver 200 igual para que Stripe no reintente indefinidamente
  }

  return NextResponse.json({ received: true });
}

// ----------------------------------------------------------------------------
// Convierte una suscripción simple en un Subscription Schedule con 2 fases:
// • Fase 1: mes 1 al precio de inscripción (ya cobrado)
// • Fase 2: N cuotas al monto de cuota (creado dinámicamente vía API)
// Stripe cancela automáticamente al terminar la última fase.
// ----------------------------------------------------------------------------
async function crearScheduleDesdeSuscripcion(
  subscriptionId:  string,
  cuotaAmount:     number,   // monto en centavos COP, ej. 9_000_000
  fasesRestantes:  number,
  currentPeriodEnd: number,
  plan:            string,
): Promise<string | null> {
  try {
    // 1. Crear precio de cuota dinámicamente (no requiere dashboard)
    const cuotaPrice = await stripe.prices.create({
      currency:    'cop',
      unit_amount: cuotaAmount,
      recurring:   { interval: 'month' },
      product_data: {
        name: plan === 'plan_10_meses'
          ? 'Cuota Mensual — Plan 10 Meses ($90.000 COP)'
          : 'Cuota Mensual — Plan 6 Meses ($130.000 COP)',
      },
    });

    // 2. Convertir suscripción existente en Schedule (hereda fase actual)
    const schedule = await stripe.subscriptionSchedules.create({
      from_subscription: subscriptionId,
    });

    // 3. Agregar fase 2 + cancelación automática al final del plan
    await stripe.subscriptionSchedules.update(schedule.id, {
      end_behavior: 'cancel',
      phases: [
        {
          start_date: schedule.phases[0].start_date,
          end_date:   currentPeriodEnd,          // fin del primer mes
          items: schedule.phases[0].items.map(item => ({
            price:    (item.price as Stripe.Price).id,
            quantity: item.quantity ?? 1,
          })),
        },
        {
          iterations: fasesRestantes,            // 9 o 5 cuotas restantes
          items: [{ price: cuotaPrice.id, quantity: 1 }],
        },
      ],
    });

    console.log(`[webhook] Schedule ${schedule.id} creado — ${fasesRestantes} cuotas × ${cuotaAmount / 100} COP`);
    return schedule.id;
  } catch (err) {
    console.error('[webhook] Error creando Subscription Schedule:', err);
    return null;
  }
}
