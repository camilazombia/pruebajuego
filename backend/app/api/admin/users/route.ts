import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';
import { User } from '@/models/User';

async function verifyAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.user) return null;
  const userInfo = token.user as any;
  if (userInfo.role !== 'admin') return null;
  return userInfo;
}

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(),
    ]);

    return NextResponse.json({ users, total, page, limit });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email ya existe' }, { status: 409 });
    }

    const bcrypt = await import('bcryptjs');
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, role: role || 'student' });

    return NextResponse.json({ message: 'Usuario creado', userId: user._id.toString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
