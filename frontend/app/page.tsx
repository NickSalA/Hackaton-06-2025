"use client";
import Navbar from "./components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 bg-[#343541] transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
          Bienvenido a la app de IA Teacher
        </h1>
        {/* Aquí puedes agregar más contenido para el home */}
      </main>
    </>
  );
}
