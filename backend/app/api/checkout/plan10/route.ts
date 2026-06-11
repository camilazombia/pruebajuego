import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { stripe, AMOUNTS } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = token.user as { id: string; email: string; name: string };
    const frontendUrl = process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      currency: 'cop',
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency:   'cop',
            unit_amount: AMOUNTS.inscripcion,          // $200.000 COP — mes 1
            recurring:  { interval: 'month' },
            product_data: { name: 'Inscripción Mundo Mágico — Plan 10 Meses' },
          },
        },
      ],
      subscription_data: {
        metadata: {
          userId:         user.id,
          plan:           'plan_10_meses',
          cuota_amount:   String(AMOUNTS.plan10_cuota), // $90.000 COP — meses 2-10
          fases_restantes: '9',
        },
      },
      metadata: {
        userId: user.id,
        plan:   'plan_10_meses',
      },
      success_url: `${frontendUrl}/home?pago=exitoso&plan=plan10`,
      cancel_url:  `${frontendUrl}/pricing?pago=cancelado`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout/plan10]', err);
    return NextResponse.json({ error: 'Error al crear sesión de pago' }, { status: 500 });
  }
}
