"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

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
        </>
      ) : (
        <button
          onClick={() => signIn("github", { prompt: "login" })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Log in
        </button>
      )}
    </div>
  );
}
