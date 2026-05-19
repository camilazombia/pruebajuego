import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { DailyPractice } from '@/models/DailyPractice';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const userId = (token.user as any).id;
    let practice = await DailyPractice.findOne({ userId });
    if (!practice) {
      practice = await DailyPractice.create({ userId });
    }

    return NextResponse.json({ practice });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const userId = (token.user as any).id;
    const { activityType, score, xpEarned } = await req.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const practice = await DailyPractice.findOneAndUpdate(
      { userId },
      {
        $push: { completedDays: { date: new Date(), activityType, score, xpEarned } },
        $inc: { totalXP: xpEarned || 0, totalActivities: 1 },
        lastCompletedDate: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ practice });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
