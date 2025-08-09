"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    if (session) {
      router.push("/panel");
    } else {
      signIn("github", { prompt: "login" });
    }
  };

  return (
    <div>
      {session ? (
        <>
          <p className="mb-4">
            Sesión iniciada como: <b>{session.user?.email}</b>
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cerrar sesión
          </button>
          <button
            onClick={handleLogin}
            className="ml-2 px-4 py-2 bg-[#10a37f] text-white rounded hover:bg-[#0e8c6c] cursor-pointer"
          >
            Ir al panel
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-[#10a37f] text-white rounded hover:bg-[#0e8c6c] cursor-pointer"
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
}
