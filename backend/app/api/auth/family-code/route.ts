import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string' || !code.trim()) {
      return NextResponse.json({ error: 'Código requerido' }, { status: 400 });
    }

    await connectDB();

    // Buscar usuario por su número de registro (código familiar)
    const user = await User.findOne({ registration_number: code.trim() }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 });
    }

    if (user.role === 'blocked' || user.role === 'suspended') {
      return NextResponse.json({ error: 'Cuenta suspendida. Contacta al administrador.' }, { status: 403 });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id:    user._id.toString(),
        name:  user.name,
        email: user.email,
        role:  user.role,
        registration_number: user.registration_number,
      },
    });
  } catch (err) {
    console.error('[family-code]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
