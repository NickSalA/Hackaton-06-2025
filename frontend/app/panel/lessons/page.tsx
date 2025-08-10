import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth-options";
import { redirect } from "next/navigation";
import Navbar from "../../components/shared/Navbar";
import LessonsList from "../../components/lessons/LessonsList";
import { lessons } from "../../data/lessons";

export default async function LessonsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 bg-[#343541] transition-colors duration-300">
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg tracking-tight">
            Lessons
          </h1>
          <p className="text-[#10a37f] text-lg md:text-xl font-medium mb-2">
            Course: <span className="font-bold">Prompt Engineering</span>
          </p>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Explore the lessons and master the art of creating effective prompts for AI.
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <LessonsList lessons={lessons} />
        </div>
      </main>
    </>
  );
}
