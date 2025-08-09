"use client";
import React from "react";
import type { Lesson } from "../../data/lessons";

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => (
  <div
    className="bg-[#23242a] rounded-xl shadow-md p-6 mb-4 cursor-pointer border border-[#343541]/60 transition-all duration-200
      hover:bg-[#10a37f]/10 hover:shadow-2xl hover:scale-[1.03] hover:border-[#10a37f] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/40"
    onClick={onClick}
    tabIndex={0}
  >
    <h2 className="text-xl font-bold text-white mb-2">{lesson.title}</h2>
    <p className="text-gray-300 mb-1">{lesson.description}</p>
  </div>
);

export default LessonCard;
