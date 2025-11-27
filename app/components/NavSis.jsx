"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <nav className="fixed top-0 w-full bg-[#2e2e2e] border-b border-gray-700 text-white z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Back Button and Logo */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-9 h-9 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/panchiko.png"
                alt="Panchiko Logo"
                width={140}
                height={32}
                className="rounded transition-opacity hover:opacity-90"
                priority
              />
            </div>
          </div>

          {/* Right Section: Placeholder for future elements */}
          <div className="flex items-center gap-3">
            {/* Additional navigation items can be added here */}
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
