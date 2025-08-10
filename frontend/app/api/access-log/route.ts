
// GET /api/access-log?courseId=xxx
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }

  // Busca el usuario por email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Obtiene todos los AccessLog de este curso, ordenados por fecha descendente
  const logs = await prisma.accessLog.findMany({
    where: { userId: user.id, courseId },
    orderBy: { accessedAt: "desc" },
  });

  // Calcula la racha de días consecutivos
  let streak = 0;
  let prev = null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (logs.length > 0) {
    const firstLog = new Date(logs[0].accessedAt);
    firstLog.setHours(0, 0, 0, 0);
    const diffFirst = (today.getTime() - firstLog.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffFirst) === 0 || Math.round(diffFirst) === 1) {
      streak = 1;
      prev = firstLog;
      for (let i = 1; i < logs.length; i++) {
        const logDate = new Date(logs[i].accessedAt);
        logDate.setHours(0, 0, 0, 0);
        const diff = (prev.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
        if (Math.round(diff) === 1) {
          streak++;
          prev = logDate;
        } else if (diff > 1) {
          break;
        }
      }
    }
  }
  return NextResponse.json({ streak });
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth-options";

// ENDPOINT TEMPORAL: /api/access-log/all
export async function ALL(req: NextRequest) {
  // Solo para depuración: devuelve todos los AccessLog del usuario y courseId
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const logs = await prisma.accessLog.findMany({
    where: {
      userId: user.id,
      courseId: courseId,
    },
    orderBy: { accessedAt: "desc" },
  });
  return NextResponse.json({ logs });
}

// POST /api/access-log
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await req.json();
  // Busca el usuario por email
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

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
        // accessedAt se pone por defecto
      },
    });
  }

  return NextResponse.json({ ok: true });
}
