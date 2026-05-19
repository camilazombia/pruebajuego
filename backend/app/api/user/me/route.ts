import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const userId = (token.user as any).id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
