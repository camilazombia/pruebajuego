import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código requerido' }, { status: 400 });
    }

    // Los códigos válidos se definen en la variable de entorno FAMILY_CODES
    // Formato: "codigo1,codigo2,codigo3"
    const rawCodes = process.env.FAMILY_CODES ?? '';
    const validCodes = rawCodes.split(',').map((c) => c.trim()).filter(Boolean);

    if (!validCodes.includes(code)) {
      return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
