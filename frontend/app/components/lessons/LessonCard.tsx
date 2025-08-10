"use client";
import React from "react";
import type { Lesson } from "@prisma/client";


interface LessonCardProps {
  lesson: Lesson;
  number?: number;
  onClick?: () => void;
  enabled?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, number, onClick, enabled = true }) => (
  <div
    className={`bg-[#23242a] rounded-xl shadow-md p-6 mb-4 border transition-all duration-200 relative cursor-pointer w-full 
      ${enabled ? 'border-[#343541]/60 hover:bg-[#10a37f]/10 hover:shadow-2xl hover:scale-[1.03] hover:border-[#10a37f] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/40' : 'border-gray-700 opacity-50 pointer-events-none select-none'}`}
    onClick={enabled ? onClick : undefined}
    tabIndex={enabled ? 0 : -1}
    aria-disabled={!enabled}
  >
    {typeof number === 'number' && (
      <div className={`absolute -top-4 -left-4 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg border-4 z-20 
        ${enabled ? 'bg-gradient-to-br from-[#10a37f] to-[#22d3ee] text-white border-[#23242a]' : 'bg-gray-700 text-gray-300 border-gray-800'}`}
      >
        {number}
      </div>
    )}
    {!enabled && (
      <div className="absolute top-3 right-3 z-30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 11V7a5 5 0 0 0-10 0v4M5 11h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z" />
        </svg>
      </div>
    )}
    <h2 className="text-xl font-bold text-white mb-2 ml-2">{lesson.title}</h2>
    <p className="text-gray-300 mb-1 ml-2">{lesson.description ?? ""}</p>
  </div>
);

export default LessonCard;
