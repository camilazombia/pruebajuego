import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { RecordedClass } from '@/models/RecordedClass';

async function verifyAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.user || (token.user as any).role !== 'admin') return null;
  return token.user;
}

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  if (!mongoPool.isReady()) await mongoPool.initialize();

  const classes = await RecordedClass.find({}).sort({ date: -1 });
  return NextResponse.json({ classes });
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  if (!mongoPool.isReady()) await mongoPool.initialize();

  const body = await req.json();
  const cls = await RecordedClass.create(body);
  return NextResponse.json({ class: cls }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  if (!mongoPool.isReady()) await mongoPool.initialize();

  const { id, ...update } = await req.json();
  const cls = await RecordedClass.findByIdAndUpdate(id, update, { new: true });
  return NextResponse.json({ class: cls });
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  if (!mongoPool.isReady()) await mongoPool.initialize();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  await RecordedClass.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Eliminado' });
}
