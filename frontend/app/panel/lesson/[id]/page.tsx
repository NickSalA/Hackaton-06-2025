import { notFound } from "next/navigation";
import Navbar from "@/app/components/shared/Navbar";
import { prisma } from "@/lib/prisma";
import ChatSection from "@/app/components/lessons/ChatSection";
import LessonSidebar from "@/app/components/lessons/LessonSidebar";

interface LessonPageProps {
  params: { id: string };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = params;
  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (!lesson) return notFound();

  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-0 h-[calc(100vh-80px)] bg-[#23242a]">
        <LessonSidebar lesson={lesson} />
        <div className="flex-1 flex flex-col justify-end h-full min-h-0">
          <ChatSection lessonId={lesson.id} />
        </div>
      </div>
    </>
  );
}
