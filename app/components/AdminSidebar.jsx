"use client";
import Image from "next/image";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "transaksi", label: "Transaksi", icon: "" },
    { id: "anggota", label: "Anggota", icon: "" },
    { id: "buku", label: "Buku", icon: "" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/images/panchiko.png"
            alt="Panchiko Logo"
            width={1200}
            height={90}
            className="rounded"
          />
        </div>

        <p className="text-gray-400 text-sm mt-2 font-[Open_Sans] text-center">
          Library Management System (Admin)
        </p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-4 text-left transition-all duration-300 font-[Open_Sans] ${
              activeTab === item.id
                ? "bg-gray-700 text-white font-bold border-r-4 border-[#2e2e2e]"
                : "hover:bg-gray-700 text-gray-300 hover:text-white"
            }`}
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-8 left-8 right-8">
        <button
          onClick={() => (window.location.href = "/login")}
          className=" bg-red-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors font-[Open_Sans] font-bold text-lg shadow-lg "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
