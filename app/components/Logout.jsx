"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-[Open_Sans] font-bold shadow-lg group"
    >
      <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      <span>Logout</span>
    </button>
  );
}
