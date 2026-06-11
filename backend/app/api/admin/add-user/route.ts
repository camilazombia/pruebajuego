import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { mongoPool } from '@/lib/mongodb-pool';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user || (token.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!mongoPool.isReady()) await mongoPool.initialize();

    const { name, email, password, role, registration_number } = await req.json();

    if (!name || !email || !password || !registration_number) {
      return NextResponse.json({ error: 'Campos requeridos: name, email, password, registration_number' }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 });
    }

    const codeExists = await User.findOne({ registration_number: registration_number.trim() });
    if (codeExists) {
      return NextResponse.json({ error: 'Código de acceso ya en uso' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: role || 'student',
      registration_number: registration_number.trim(),
    });

    return NextResponse.json({
      message: 'Usuario creado',
      user: { id: user._id, name: user.name, email: user.email, role: user.role, registration_number: user.registration_number },
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
