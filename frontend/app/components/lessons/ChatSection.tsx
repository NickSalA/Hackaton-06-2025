"use client";
import React from "react";

const ChatSection: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const [messages, setMessages] = React.useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [recording, setRecording] = React.useState(false);
  const [recognizing, setRecognizing] = React.useState(false);
  const recognitionRef = React.useRef<any>(null);

  // Autoajustar altura del textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Scroll automático al fondo
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: {
            tipo: "texto",
            contenido: userMsg.content,
          },
          lessonId,
        }),
      });
      const data = await res.json();
      let botMsg = "";
      if (data && typeof data === "object") {
        botMsg = data.respuesta || data.output?.respuesta || data.message || JSON.stringify(data);
      }
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", content: botMsg || "(Sin respuesta del agente)" },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", content: "Error en la petición" },
      ]);
    } finally {
      setLoading(false);
    }
  };


  // --- AUDIO (Web Speech API) ---
  const handleAudioClick = () => {
    if (recognizing) {
      recognitionRef.current?.stop();
      setRecording(false);
      setRecognizing(false);
      return;
    }
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz (Web Speech API)");
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "es-ES"; // Cambia el idioma si lo necesitas
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setRecording(true);
    setRecognizing(true);
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecording(false);
      setRecognizing(false);
      if (transcript) {
        setMessages((msgs) => [
          ...msgs,
          { role: "user", content: transcript },
        ]);
        setLoading(true);
        try {
          const res = await fetch("/api/agent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: {
                tipo: "texto",
                contenido: transcript,
              },
              lessonId,
            }),
          });
          const data = await res.json();
          let botMsg = data.respuesta || data.output?.respuesta || data.message || JSON.stringify(data);
          setMessages((msgs) => [
            ...msgs,
            { role: "bot", content: botMsg || "(Sin respuesta del agente)" },
          ]);
        } catch {
          setMessages((msgs) => [
            ...msgs,
            { role: "bot", content: "Error en la petición" },
          ]);
        } finally {
          setLoading(false);
        }
      }
    };
    recognition.onerror = (event: any) => {
      setRecording(false);
      setRecognizing(false);
      alert("Error en el reconocimiento de voz: " + event.error);
    };
    recognition.onend = () => {
      setRecording(false);
      setRecognizing(false);
    };
    recognition.start();
  };

  return (
    <div className="h-full w-full flex flex-col justify-end bg-[#18181b] rounded-xl p-4 shadow-inner">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pr-2 mb-2 flex flex-col gap-2"
        style={{ minHeight: 200 }}
      >
        {messages.length === 0 && (
          <div className="flex-1 text-gray-400 flex items-center justify-center">
            <span className="opacity-60">
              ¡Comienza el chat de la lección <b>{lessonId}</b>!
            </span>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div className="flex items-end mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10a37f] to-[#22d3ee] flex items-center justify-center text-white font-bold shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0v4m0 8v4m-4-4h8" />
                  </svg>
                </div>
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm whitespace-pre-line transition-all duration-200
                ${msg.role === "user"
                  ? "bg-[#23242a] text-white rounded-br-md border border-[#343541]"
                  : "bg-[#10a37f]/10 text-[#10a37f] rounded-bl-md border border-[#10a37f]/30"}
              `}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {msg.content}
              {loading && i === messages.length - 1 && msg.role === "bot" && (
                <span className="ml-2 animate-pulse">...</span>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex items-end ml-2">
                <div className="w-8 h-8 rounded-full bg-[#23242a] border border-[#343541] flex items-center justify-center text-[#38bdf8] font-bold shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0 1 12 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex w-full justify-start animate-fade-in">
            <div className="flex items-end mr-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10a37f] to-[#22d3ee] flex items-center justify-center text-white font-bold shadow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
            <div className="max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm bg-[#10a37f]/10 text-[#10a37f] border border-[#10a37f]/30 rounded-bl-md animate-pulse">
              Pensando...
            </div>
          </div>
        )}
      </div>
      <form
        className="mt-4 flex gap-2 items-end"
        onSubmit={handleSend}
        autoComplete="off"
      >
        <div className="flex-1 flex items-end gap-2 bg-[#23242a] rounded-2xl shadow-inner px-3 py-2 border border-[#343541]">
          <button
            type="button"
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition shadow-sm mr-2 ${recording ? "bg-red-600 border-red-600 text-white animate-pulse" : "bg-[#23242a] border-[#343541] text-[#38bdf8] hover:bg-[#1e293b] hover:text-[#0ea5e9]"}`}
            title={recording ? "Grabando..." : "Enviar audio"}
            onClick={handleAudioClick}
            disabled={loading || recognizing}
          >
            {recording ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0a6 6 0 0 1-6-6v-2.25m12 0v2.25a6 6 0 0 1-6 6zm0 0v-1.5m0 0a3 3 0 0 0 3-3v-3a3 3 0 0 0-6 0v3a3 3 0 0 0 3 3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0a6 6 0 0 1-6-6v-2.25m12 0v2.25a6 6 0 0 1-6 6zm0 0v-1.5m0 0a3 3 0 0 0 3-3v-3a3 3 0 0 0-6 0v3a3 3 0 0 0 3 3z" />
              </svg>
            )}
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
            disabled={!input.trim() || loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l15-6m0 0l-6 15m6-15l-15 6" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
