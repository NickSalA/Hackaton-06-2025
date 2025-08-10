
"use client";
import Navbar from "./components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] p-8 gap-10 bg-gradient-to-br from-[#18181b] via-[#343541] to-[#23272f] transition-colors duration-300">
        <section className="w-full max-w-3xl text-center flex flex-col items-center gap-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight animate-fade-in">
            ProfAI
          </h1>
          <p className="text-xl md:text-2xl text-[#10a37f] font-semibold mb-2 animate-fade-in delay-100">
            Learn Prompt Engineering and master conversational AI
          </p>
          <p className="text-base md:text-lg text-gray-200 max-w-2xl animate-fade-in delay-200">
            An interactive platform to learn, practice, and experiment with prompt techniques, chatbots, and language models. Explore lessons, test your knowledge, and chat with an advanced AI.
          </p>
          {/* Animación SVG con logo centrado */}
          <div className="w-full flex justify-center mt-8 animate-fade-in delay-300 relative" style={{height: 180}}>
            <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl absolute left-1/2 top-0 -translate-x-1/2">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#10a37f" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#343541" stopOpacity="0.1" />
                </radialGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10a37f" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <ellipse cx="160" cy="90" rx="140" ry="70" fill="url(#grad1)" />
              <circle cx="160" cy="90" r="60" fill="url(#grad2)" opacity="0.7">
                <animate attributeName="r" values="60;80;60" dur="3s" repeatCount="indefinite" />
              </circle>
              <g>
                <circle cx="100" cy="70" r="10" fill="#fff" opacity="0.15">
                  <animate attributeName="cy" values="70;110;70" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="220" cy="120" r="8" fill="#fff" opacity="0.12">
                  <animate attributeName="cy" values="120;80;120" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="160" cy="50" r="6" fill="#10a37f" opacity="0.25">
                  <animate attributeName="cy" values="50;130;50" dur="3.2s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Logo centrado sobre la animación */}
              {/* Optimized logo with Next.js Image */}
              <Image
                src="/profai_logo.png"
                alt="ProfAI Logo"
                width={90}
                height={90}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-fade-in delay-400">
          {/* Learn from scratch */}
          <div className="bg-[#23272f] rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            {/* Graduation cap icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2 text-[#10a37f]"><path fill="currentColor" d="M12 3L2 8.5l10 5.5 10-5.5L12 3zm0 2.18L18.6 8.5 12 11.82 5.4 8.5 12 5.18zM4 10.36v4.14c0 2.21 3.58 4 8 4s8-1.79 8-4v-4.14l-8 4.4-8-4.4z"/></svg>
            <h3 className="text-lg font-bold text-white mb-1">Learn from scratch</h3>
            <p className="text-gray-300 text-sm">Structured lessons on fundamentals, patterns, and best prompt practices.</p>
          </div>
          {/* Practice and experiment */}
          <div className="bg-[#23272f] rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            {/* Lightning bolt icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2 text-[#10a37f]"><path fill="currentColor" d="M7 2v2H3v2h2v14h14V6h2V4h-4V2H7zm2 2h6v2H9V4zm8 4v10H7V8h10zm-4 2h-2v4h2v-4z"/></svg>
            <h3 className="text-lg font-bold text-white mb-1">Practice and experiment</h3>
            <p className="text-gray-300 text-sm">Interact with AI, test your own prompts, and get instant feedback.</p>
          </div>
          {/* Community and resources */}
          <div className="bg-[#23272f] rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            {/* Community icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2 text-[#10a37f]"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.64 13.36 18 14.28 18 15.5V19h6v-2.5c0-2.33-4.67-3.5-6-3.5z"/></svg>
            <h3 className="text-lg font-bold text-white mb-1">Community and resources</h3>
            <p className="text-gray-300 text-sm">Share, learn from others, and access exclusive resources to boost your learning.</p>
          </div>
        </section>

        <footer className="mt-16 text-gray-400 text-xs text-center opacity-80 animate-fade-in delay-500">
          &copy; {new Date().getFullYear()} IA Teacher. Educational project for the future of AI-powered learning.
        </footer>
      </main>
    </>
  );
}
