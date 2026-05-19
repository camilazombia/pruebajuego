import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { mongoPool } from '@/lib/mongodb-pool';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    if (!mongoPool.isReady()) await mongoPool.initialize();

    const adminEmail = 'admin@mundomagico.com';
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      return NextResponse.json({ message: 'Admin already exists', email: adminEmail });
    }

    const hashed = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashed,
      role: 'admin',
    });

    return NextResponse.json({ message: 'Admin created', email: adminEmail, id: admin._id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
