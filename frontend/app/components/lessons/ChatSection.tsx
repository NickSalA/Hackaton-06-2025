"use client";
import React from "react";

const ChatSection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Autoajustar altura del textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

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

  // Enviar mensaje (placeholder)
  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    // Aquí iría la lógica real de envío
    setInput("");
  };
  // Placeholder para el chat
  return (
    <div className="h-full w-full flex flex-col justify-end bg-[#18181b] rounded-xl p-4 shadow-inner">
      <div className="flex-1 text-gray-400 flex items-center justify-center">
        <span className="opacity-60">
          Aquí irá el chat de la lección <b>{lessonId}</b>
        </span>
      </div>
      <form
        className="mt-4 flex gap-2 items-end"
        onSubmit={handleSend}
        autoComplete="off"
      >
        <div className="flex-1 flex items-end gap-2 bg-[#23242a] rounded-2xl shadow-inner px-3 py-2 border border-[#343541]">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#23242a] border border-[#343541] text-[#38bdf8] hover:bg-[#1e293b] hover:text-[#0ea5e9] transition shadow-sm mr-2"
            title="Enviar audio (próximamente)"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0a6 6 0 0 1-6-6v-2.25m12 0v2.25a6 6 0 0 1-6 6zm0 0v-1.5m0 0a3 3 0 0 0 3-3v-3a3 3 0 0 0-6 0v3a3 3 0 0 0 3 3z" />
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none rounded-xl px-4 py-3 bg-transparent text-white border-none focus:outline-none min-h-[40px] max-h-40 transition-all placeholder:text-gray-400"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
          />
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#10a37f] to-[#22d3ee] text-white font-medium disabled:opacity-60 ml-2 shadow-md transition hover:from-[#22d3ee] hover:to-[#10a37f]"
            disabled={!input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l15-6m0 0l-6 15m6-15l-15 6" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="min-h-[48px] px-5 py-3 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] text-white rounded font-medium disabled:opacity-60 ml-2 shadow-md hover:from-[#0ea5e9] hover:to-[#38bdf8] transition"
          onClick={handleTest}
          disabled={loading}
        >
          {loading ? "Probando..." : "Probar endpoint"}
        </button>
      </form>
      {result && (
        <pre className="mt-4 bg-[#23242a] text-green-400 rounded p-4 text-xs overflow-x-auto max-h-40">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ChatSection;
