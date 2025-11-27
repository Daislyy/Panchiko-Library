"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logout from "./Logout";

export default function Sidebar({ username, profilePicture }) {
  const pathname = usePathname();

  const menuItems = [{ name: "Profile", href: "/profile" }];

  return (
    <div className="w-64 bg-[#1a1a1a] h-screen fixed left-0 top-16 border-r border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-500 flex items-center justify-center">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={username}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-900 font-bold text-lg">
                {username?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-bold font-[Merriweather]">
              {username}
            </p>
            <p className="text-gray-400 text-sm font-[Open_Sans]">Reader</p>
          </div>
        </div>
      </div>

      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-[Open_Sans] ${
                  pathname === item.href
                    ? "bg-amber-500 text-gray-900 font-bold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <Logout></Logout> 
        </ul>
      </nav>
    </div>
  );
}
