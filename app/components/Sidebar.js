"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logout from "./Logout";
import { BookOpen, UserCircle, Library } from "lucide-react";

export default function Sidebar({ username, profilePicture }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: <UserCircle className="w-5 h-5" />,
      description: "Kelola profil Anda",
    },
    {
      name: "Buku Dipinjam",
      href: "/my-borrows",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Lihat riwayat peminjaman",
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] h-screen fixed left-0 top-16 border-r border-gray-800 shadow-2xl">
    
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-amber-500/10 to-transparent">
        <div className="flex flex-col items-center text-center space-y-3">
         
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-amber-500 flex items-center justify-center ring-4 ring-amber-500/30">
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt={username}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-900 font-bold text-2xl">
                  {username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

        
          <div className="space-y-1">
            <p className="text-white font-bold text-lg font-[Merriweather] leading-tight">
              {username}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
              <Library className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 text-xs font-semibold font-[Open_Sans]">
                Book Lover
              </span>
            </div>
          </div>
        </div>
      </div>

    
      <nav className="p-4">
        <div className="mb-2 px-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-[Open_Sans]">
            Menu
          </p>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group flex flex-col px-4 py-3 rounded-xl transition-all duration-200 font-[Open_Sans] ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`transition-transform group-hover:scale-110 ${
                      pathname === item.href
                        ? "text-gray-900"
                        : "text-amber-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-semibold ${
                      pathname === item.href ? "text-gray-900" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {pathname !== item.href && (
                  <span className="text-xs text-gray-500 mt-1 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </span>
                )}
              </Link>
            </li>
          ))}

         
          <li className="py-2">
            <div className="border-t border-gray-800"></div>
          </li>

   
          <Logout />
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-black/20">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Library className="w-4 h-4" />
          <p className="text-xs font-[Open_Sans]">Library Management</p>
        </div>
      </div>
    </div>
  );
}
