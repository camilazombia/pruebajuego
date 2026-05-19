import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { User } from '@/models/User';

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user || (token.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const { userId, role } = await req.json();
    if (!userId || !role) return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
