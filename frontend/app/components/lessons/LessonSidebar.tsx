"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import type { Lesson } from "@prisma/client";

const LessonSidebar: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <aside
      className={`h-full bg-[#18181b] border-r border-[#343541]/60 p-6 transition-all duration-300 flex flex-col gap-4 ${open ? "w-[420px]" : "w-12"} overflow-y-auto custom-scrollbar`}
      style={{ minWidth: open ? 320 : 48 }}
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
          <div
            className="prose prose-invert max-w-none text-gray-200 text-base bg-[#23242a] border border-[#10a37f]/40 rounded-xl p-4 shadow-md mt-2"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            <ReactMarkdown
              components={{
                ul: ({node, ...props}) => <ul style={{ listStyleType: 'disc', paddingLeft: 24, marginBottom: 12 }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ listStyleType: 'decimal', paddingLeft: 24, marginBottom: 12 }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: 4 }} {...props} />,
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[#10a37f] mt-4 mb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#22d3ee] mt-3 mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-[#38bdf8] mt-2 mb-1" {...props} />,
                a: ({node, ...props}) => <a className="underline text-[#10a37f] hover:text-[#22d3ee]" target="_blank" rel="noopener noreferrer" {...props} />,
                code: ({node, ...props}) => <code className="bg-[#18181b] px-1 py-0.5 rounded text-[#22d3ee]" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#10a37f] pl-4 italic text-gray-400 my-2" {...props} />,
              }}
            >
              {lesson.infoPanel || ""}
            </ReactMarkdown>
          </div>
        </>
      )}
    </aside>
  );
};

export default LessonSidebar;
