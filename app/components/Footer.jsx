"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-6 md:px-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
    
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8">
       
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/panchiko.png"
                alt="Panchiko Logo"
                width={100}
                height={35}
                className="rounded"
              />
            </div>

            <p className="text-gray-400 mb-6 font-[Open_Sans] text-sm leading-relaxed">
              Your digital library companion. Discover and explore thousands of
              books.
            </p>

       
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-amber-50  0 text-sm">Email:</span>
                <span className="font-[Open_Sans] text-sm">
                  PaddyPadillah07@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-amber-500 text-sm">Phone:</span>
                <span className="font-[Open_Sans] text-sm">(0275) 030708</span>
              </div>
            </div>
          </div>

      
          <div className="flex-1">
            <h3 className="font-bold mb-4 text-lg font-[Merriweather]">
              Follow Us
            </h3>
            
            
          </div>
        </div>

        {/* Bottom Bar - Simplified */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm font-[Open_Sans]">
            © 2024 Panchiko. Kopirek.
          </p>
        </div>
      </div>
    </footer>
  );
}
