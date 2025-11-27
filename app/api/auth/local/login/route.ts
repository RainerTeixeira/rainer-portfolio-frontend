/**
 * API Route: Local Authentication Login
 * 
 * NOTA: A autenticação local usa localStorage e deve ser feita client-side.
 * Esta rota existe apenas para evitar erros 404, mas redireciona para o método correto.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Tentar ler o body mas não depender dele
    await request.json().catch(() => ({}));
  } catch (e) {
    // Ignorar erro de parsing
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Autenticação local deve ser feita client-side usando o AuthProvider ou localAuth diretamente no navegador.',
      hint: 'Use o componente LoginForm que já integra com localAuth automaticamente.',
    },
    { status: 400 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Local Auth API - Use POST para autenticar',
      note: 'Autenticação local é client-side apenas (localStorage)',
    },
    { status: 200 }
  );
}


