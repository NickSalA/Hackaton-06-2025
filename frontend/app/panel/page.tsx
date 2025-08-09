import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth-options";
import { redirect } from "next/navigation";

export default async function PanelPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 bg-[#343541] transition-colors duration-300 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Panel de Aprendizaje</h1>
      <p className="text-gray-300 text-lg text-center max-w-xl">
        Aquí verás tus chats, progreso y recursos de aprendizaje sobre IA. ¡Personaliza este panel como desees!
      </p>
      {/* Aquí irá la UI de chats, progreso, etc. */}
    </main>
  );
}
