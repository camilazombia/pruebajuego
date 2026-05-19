import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { RecordedClass } from '@/models/RecordedClass';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const classes = await RecordedClass.find({ isVisible: true }).sort({ date: -1 });
    return NextResponse.json({ classes });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
