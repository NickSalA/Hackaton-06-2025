"use client";
import React from "react";

const ChatSection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true, lessonId }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Error en la petición" });
    } finally {
      setLoading(false);
    }
  };
  // Placeholder para el chat
  return (
    <div className="h-full w-full flex flex-col justify-end bg-[#18181b] rounded-xl p-4 shadow-inner">
      <div className="flex-1 text-gray-400 flex items-center justify-center">
        <span className="opacity-60">
          Aquí irá el chat de la lección <b>{lessonId}</b>
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-l-lg px-4 py-2 bg-[#23242a] text-white border border-[#343541] focus:outline-none"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-[#10a37f] text-white rounded-r-lg font-medium"
          disabled
        >
          Enviar
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium disabled:opacity-60"
          onClick={handleTest}
          disabled={loading}
        >
          {loading ? "Probando..." : "Probar endpoint"}
        </button>
      </div>
      {result && (
        <pre className="mt-4 bg-[#23242a] text-green-400 rounded p-4 text-xs overflow-x-auto max-h-40">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ChatSection;
