import Link from "next/link";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 dark:bg-gray-950 shadow-lg transition-colors duration-300 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          IA Teacher
        </Link>
        {/* Aquí puedes agregar más links o íconos */}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200 font-medium shadow"
        >
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
}
