"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/panel");
    }
  }, [status, router]);

  return (
    <main className="flex h-screen flex-col md:flex-row items-stretch justify-center p-0 bg-gradient-to-br from-[#18181b] via-[#343541] to-[#23272f] transition-colors duration-300 overflow-hidden">
      <section className="flex-1 flex flex-col justify-center items-center bg-[#202123] p-4 md:p-12">
  {/* Logo visual llamativo */}
        {/* Optimized logo with Next.js Image */}
  {/* Optimized logo with Next.js Image */}
        {/* Animación SVG con logo centrado */}
        <div className="relative flex flex-col items-center justify-center w-[340px] h-[200px] mb-2">
          <svg width="340" height="200" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
            <ellipse cx="170" cy="100" rx="160" ry="80" fill="#23272f" opacity="0.7" />
            <ellipse cx="170" cy="100" rx="120" ry="60" fill="#10a37f" opacity="0.18" />
            <circle cx="170" cy="100" r="90" fill="#10a37f" opacity="0.28" />
            <circle cx="170" cy="100" r="70" fill="#10a37f" opacity="0.32" />
            <circle cx="170" cy="100" r="60" fill="#10a37f" opacity="0.38" />
            <circle cx="170" cy="100" r="50" fill="#10a37f" opacity="0.45" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <Image
              src="/ai_teacher_logo.png"
              alt="AI Teacher Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome to IA Teacher
        </h2>
        <p className="text-gray-300 text-lg max-w-xs text-center">
          Learn AI interactively.
        </p>
      </section>
      <section className="flex-1 flex flex-col justify-center items-center p-4 md:p-12 bg-[#343541]">
        <div className="w-full max-w-xs flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-semibold text-white mb-2 text-center">
            Sign in
          </h1>
          <button
            onClick={() => signIn("github", { prompt: "login" })}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#10a37f] to-[#0e8c6c] hover:from-[#0e8c6c] hover:to-[#10a37f] text-white rounded-lg transition-all font-bold shadow-lg text-lg flex items-center justify-center gap-2 animate-bounce"
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block mr-2"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
            Sign in with GitHub
          </button>
          {/* More login options can be added here */}
        </div>
      </section>
    </main>
  );
}
