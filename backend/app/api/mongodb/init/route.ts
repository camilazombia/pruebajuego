import { NextRequest, NextResponse } from 'next/server';
import { mongoPool } from '@/lib/mongodb-pool';

export async function GET(req: NextRequest) {
  try {
    if (!mongoPool.isReady()) {
      await mongoPool.initialize();
    }
    return NextResponse.json({ status: 'connected', stats: mongoPool.getStats() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
