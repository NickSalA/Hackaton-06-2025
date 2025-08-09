"use client";

import React from "react";

export interface UserMenuProps {
  session: any;
  onLogout: () => void;
  onPanel: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ session, onLogout, onPanel }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="relative flex items-center gap-2 bg-[#26272b] px-3 py-1 rounded-full cursor-pointer select-none hover:ring-2 hover:ring-[#10a37f]/40 transition-all duration-200"
      onClick={() => setOpen((v) => !v)}
      tabIndex={0}
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#10a37f] text-white font-bold shadow-md">
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
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[200px] bg-[#23242a] text-white rounded-xl shadow-2xl z-50 py-2 flex flex-col animate-fade-in border border-[#343541]/60">
          <button
            className="w-full text-left px-5 py-3 rounded-t-xl bg-transparent hover:bg-[#10a37f]/15 hover:text-[#10a37f] transition-colors duration-200 font-medium text-base cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onPanel();
              setOpen(false);
            }}
          >
            Panel de aprendizaje
          </button>
          <div className="h-px bg-[#343541]/60 mx-3 my-1" />
          <button
            className="w-full text-left px-5 py-3 rounded-b-xl bg-transparent hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200 font-medium text-base cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
              setOpen(false);
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
