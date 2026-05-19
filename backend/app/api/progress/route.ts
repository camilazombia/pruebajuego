import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { Progress } from '@/models/Progress';

const DEFAULT_LEVELS = [
  { level: 'Principiante', modules: [], completed: false },
  { level: 'Intermedio', modules: [], completed: false },
  { level: 'Avanzado', modules: [], completed: false },
];

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const userId = (token.user as any).id;

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = await Progress.create({ userId, progress: DEFAULT_LEVELS, completedResources: [] });
    }

    return NextResponse.json({ progress });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
