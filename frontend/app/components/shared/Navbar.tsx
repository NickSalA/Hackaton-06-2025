"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = React.memo(function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "authenticated") {
      router.push("/panel");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#202123] shadow-lg transition-colors duration-300 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          IA Teacher
        </Link>
        {/* Aquí puedes agregar más links o íconos */}
      </div>
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="w-24 h-8 bg-[#26272b] rounded animate-pulse" />
        ) : session ? (
          <>
            <div className="flex items-center gap-2 bg-[#26272b] px-3 py-1 rounded-full">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#10a37f] text-white font-bold">
                {session.user?.image ? (
                  <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                )}
              </span>
              <span className="text-white font-medium max-w-[120px] truncate">
                {session.user?.name || session.user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 font-medium shadow"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <a
            href="/login"
            onClick={handleLoginClick}
            className="px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6c] text-white rounded transition-colors duration-200 font-medium shadow cursor-pointer"
          >
            Iniciar sesión
          </a>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
