import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Simulación de respuesta del agente
  return NextResponse.json({
    ok: true,
    received: body,
    message: `¡Hola! Recibí tu mensaje: ${body.message ?? "(sin mensaje)"}`,
    timestamp: Date.now(),
  });
}
