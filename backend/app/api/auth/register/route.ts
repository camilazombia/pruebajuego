import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb-pool';
import { User } from '@/models/User';
import { mongoPool } from '@/lib/mongodb-pool';

export async function POST(req: NextRequest) {
  try {
    if (!mongoPool.isReady()) await mongoPool.initialize();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student',
    });

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      userId: user._id.toString(),
    }, { status: 201 });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}
