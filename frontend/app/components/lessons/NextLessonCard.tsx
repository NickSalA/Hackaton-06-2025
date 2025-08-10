"use client";
import React from "react";
import { Lesson } from "@/app/data/lessons";
import { useRouter } from "next/navigation";

interface NextLessonCardProps {
  lesson: Lesson;
}

const NextLessonCard: React.FC<NextLessonCardProps> = ({ lesson }) => {
  const router = useRouter();
  return (
    <div className="mt-10 flex flex-col items-center animate-fade-in">
      <div className="bg-gradient-to-br from-[#10a37f]/80 to-[#22d3ee]/80 rounded-2xl shadow-lg p-6 w-full max-w-xl border border-[#10a37f]/30 flex flex-col items-center">
        <div className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <span>Next Lesson:</span>
          <span className="text-[#10a37f]">{lesson.title}</span>
        </div>
        <div className="text-gray-200 mb-4 text-center">{lesson.description}</div>
        <button
          className="px-6 py-2 rounded-full bg-[#10a37f] text-white font-semibold shadow hover:bg-[#22d3ee] transition flex items-center gap-2"
          onClick={() => router.push(`/panel/lesson/${lesson.id}`)}
        >
          Continue
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NextLessonCard;
