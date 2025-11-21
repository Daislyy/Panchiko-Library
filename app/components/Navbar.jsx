"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[#2e2e2e] border-b border-gray-700 text-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/panchiko.png"
            alt="Panchiko Logo"
            width={150}
            height={35}
            className="rounded"
          />
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-300">
            Product
          </a>
        </div>

    
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/register")}
            className="border border-gray-500 rounded-md px-4 py-1 hover:bg-gray-700 transition"
          >
            Sign-in
          </button>
          <button
            onClick={() => router.push("/login")}
            className="border border-gray-500 rounded-md px-4 py-1 hover:bg-gray-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
