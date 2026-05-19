import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { Progress } from '@/models/Progress';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const userId = (token.user as any).id;
    const body = await req.json();

    const progress = await Progress.findOneAndUpdate(
      { userId },
      { ...body, userId },
      { upsert: true, new: true }
    );

    return NextResponse.json({ progress });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
