"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[#2e2e2e] border-b border-gray-700 text-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
  
        <div className="flex items-center gap-2">
          <Image
            src="/panchiko.png"
            alt="Panchiko Logo"
            width={150}
            height={35}
            className="rounded"
          />
        </div>

       

    
      
      </div>
    </nav>
  );
}
