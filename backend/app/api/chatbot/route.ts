import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { mongoPool } from '@/lib/mongodb-pool';

const RATE_LIMIT = 30; // per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const userId = (token.user as any).id;

    // Rate limiting
    const now = Date.now();
    const userLimit = rateLimitMap.get(userId);
    if (userLimit) {
      if (now < userLimit.resetAt) {
        if (userLimit.count >= RATE_LIMIT) {
          return NextResponse.json({ error: 'Límite de uso alcanzado. Intenta en una hora.' }, { status: 429 });
        }
        userLimit.count++;
      } else {
        rateLimitMap.set(userId, { count: 1, resetAt: now + 3600000 });
      }
    } else {
      rateLimitMap.set(userId, { count: 1, resetAt: now + 3600000 });
    }

    const { message, history } = await req.json();

    // Try DeepSeek first
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'Eres un asistente de aprendizaje de inglés para niños. Responde de forma clara, amigable y educativa.' },
              ...(history || []),
              { role: 'user', content: message },
            ],
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';
          return NextResponse.json({ reply });
        }
      } catch (e) {
        console.error('DeepSeek error, falling back to OpenRouter');
      }
    }

    // Fallback to OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openRouterKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Eres un asistente de aprendizaje de inglés para niños.' },
            ...(history || []),
            { role: 'user', content: message },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';
        return NextResponse.json({ reply });
      }
    }

    return NextResponse.json({ reply: 'El servicio de chatbot no está disponible en este momento.' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
