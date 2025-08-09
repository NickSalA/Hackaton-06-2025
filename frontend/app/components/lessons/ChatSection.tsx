"use client";
import React from "react";

const ChatSection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  // Placeholder para el chat
  return (
    <div className="h-full w-full flex flex-col justify-end bg-[#18181b] rounded-xl p-4 shadow-inner">
      <div className="flex-1 text-gray-400 flex items-center justify-center">
        <span className="opacity-60">Aquí irá el chat de la lección <b>{lessonId}</b></span>
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-1 rounded-l-lg px-4 py-2 bg-[#23242a] text-white border border-[#343541] focus:outline-none"
          placeholder="Escribe tu mensaje..."
          disabled
        />
        <button className="px-4 py-2 bg-[#10a37f] text-white rounded-r-lg font-medium" disabled>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
