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
      mode: 'payment',
      currency: 'cop',
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency:     'cop',
            unit_amount:  AMOUNTS.contado,             // $690.000 COP — pago único
            product_data: { name: 'Plan Contado Mundo Mágico' },
          },
        },
      ],
      metadata: {
        userId: user.id,
        plan:   'contado',
      },
      success_url: `${frontendUrl}/home?pago=exitoso&plan=contado`,
      cancel_url:  `${frontendUrl}/pricing?pago=cancelado`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout/contado]', err);
    return NextResponse.json({ error: 'Error al crear sesión de pago' }, { status: 500 });
  }
}
