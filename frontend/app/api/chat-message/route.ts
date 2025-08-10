
// DELETE /api/chat-message?lessonId=xxx
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  }

  // Busca el usuario por email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Busca la sesión de chat más reciente para este usuario y lección
  const chatSession = await prisma.chatSession.findFirst({
    where: { userId: user.id, lessonId },
    orderBy: { createdAt: "desc" },
  });
  if (!chatSession) {
    return NextResponse.json({ ok: true }); // Nada que borrar
  }

  // Borra todos los mensajes de esa sesión
  await prisma.message.deleteMany({ where: { chatSessionId: chatSession.id } });

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth-options";

// GET /api/chat-message?lessonId=xxx
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  }

  // Busca el usuario por email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Busca la sesión de chat más reciente para este usuario y lección
  const chatSession = await prisma.chatSession.findFirst({
    where: { userId: user.id, lessonId },
    orderBy: { createdAt: "desc" },
  });
  if (!chatSession) {
    return NextResponse.json([]);
  }

  // Obtiene los últimos 20 mensajes (ordenados del más antiguo al más reciente)
  const messages = await prisma.message.findMany({
    where: { chatSessionId: chatSession.id },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  return NextResponse.json(messages);
}

// POST /api/chat-message
// Body: { lessonId: string, content: string, role: "user" | "assistant" }
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, content, role } = await req.json();
  if (!lessonId || !content || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Busca el usuario por email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Busca o crea la sesión de chat para este usuario y lección
  let chatSession = await prisma.chatSession.findFirst({
    where: { userId: user.id, lessonId },
    orderBy: { createdAt: "desc" },
  });
  if (!chatSession) {
    chatSession = await prisma.chatSession.create({
      data: { userId: user.id, lessonId },
    });
  }


  // Guarda el mensaje
  await prisma.message.create({
    data: {
      chatSessionId: chatSession.id,
      role,
      content,
    },
  });

  // --- REGISTRO DE ACCESO PARA RACHA ---
  // Busca la lección para obtener el courseId
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (lesson) {
    const courseId = lesson.courseId;
    // Fecha de hoy (sin hora)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    // Verifica si ya existe un AccessLog para hoy
    const existing = await prisma.accessLog.findFirst({
      where: {
        userId: user.id,
        courseId,
        accessedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
    if (!existing) {
      await prisma.accessLog.create({
        data: {
          userId: user.id,
          courseId,
        },
      });
    }
  }

  // Mantén solo los últimos 20 mensajes
  const messages = await prisma.message.findMany({
    where: { chatSessionId: chatSession.id },
    orderBy: { createdAt: "desc" },
    skip: 20,
  });
  if (messages.length > 0) {
    const idsToDelete = messages.map(m => m.id);
    await prisma.message.deleteMany({ where: { id: { in: idsToDelete } } });
  }

  return NextResponse.json({ ok: true });
}
