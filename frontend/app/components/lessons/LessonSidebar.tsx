"use client";
import React from "react";
import type { Lesson } from "../../data/lessons";

const LessonSidebar: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <aside
      className={`h-full bg-[#18181b] border-r border-[#343541]/60 p-6 transition-all duration-300 flex flex-col gap-4 ${open ? "w-80" : "w-12"}`}
    >
      <button
        className="self-end mb-2 text-[#10a37f] hover:text-[#0e8c6c] transition-colors"
        onClick={() => setOpen((v) => !v)}
        title={open ? "Ocultar menú" : "Mostrar menú"}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 12L6 6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 12L18 18" />
          </svg>
        )}
      </button>
      {open && (
        <>
          <h2 className="text-lg font-bold text-white mb-2">{lesson.title}</h2>
          <p className="text-gray-300 text-base whitespace-pre-line">{lesson.content}</p>
        </>
      )}
    </aside>
  );
};

export default LessonSidebar;
