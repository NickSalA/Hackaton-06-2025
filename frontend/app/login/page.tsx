"use client";
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
    <main className="flex h-screen flex-col md:flex-row items-stretch justify-center p-0 bg-[#343541] transition-colors duration-300 overflow-hidden">
      <section className="flex-1 flex flex-col justify-center items-center bg-[#202123] p-4 md:p-12">
        <h2 className="text-3xl font-bold text-white mb-4 text-center md:text-left">
          Bienvenido a IA Teacher
        </h2>
        <p className="text-gray-300 text-lg max-w-md text-center md:text-left">
          Aprende sobre inteligencia artificial, agentes y mucho más con nuestro
          chat-bot educativo. Guarda tu progreso y explora los temas a tu ritmo.
        </p>
      </section>
      <section className="flex-1 flex flex-col justify-center items-center p-4 md:p-12 bg-[#343541]">
        <div className="w-full max-w-xs flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-white mb-2 text-center">
            Iniciar sesión
          </h1>
          <button
            onClick={() => signIn("github", { prompt: "login" })}
            className="w-full px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6c] text-white rounded transition-colors font-medium shadow"
          >
            Iniciar sesión con GitHub
          </button>
          {/* Aquí puedes agregar más opciones de login en el futuro */}
        </div>
      </section>
    </main>
  );
}
