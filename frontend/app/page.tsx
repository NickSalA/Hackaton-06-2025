import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth-options";
import Navbar from "./components/shared/Navbar";
import AuthButtons from "./components/AuthButtons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar>
        <AuthButtons />
      </Navbar>
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4 drop-shadow-lg">
          Bienvenido a la app de IA Teacher
        </h1>
        {/* Aquí puedes agregar más contenido para el home */}
      </main>
    </>
  );
}
