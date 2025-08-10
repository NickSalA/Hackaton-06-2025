"use client";

import React from "react";
import UserMenu from "./UserMenu";
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
          ProfAI
        </Link>
        {/* Aquí puedes agregar más links o íconos */}
      </div>
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="w-24 h-8 bg-[#26272b] rounded animate-pulse" />
        ) : session ? (
          <UserMenu
            session={session}
            onLogout={handleLogout}
            onPanel={() => router.push("/panel")}
          />
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
