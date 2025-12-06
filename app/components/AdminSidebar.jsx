"use client";
import Image from "next/image";
import {
  Receipt,
  Users,
  BookOpen,
  LogOut,
  Shield,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllBooks, getAllTransactions } from "../lib/actions";
import Logout from "./Logout";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const [stats, setStats] = useState({ totalBooks: 0, borrowedBooks: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [booksResult, transactionsResult] = await Promise.all([
          getAllBooks(),
          getAllTransactions(),
        ]);

        const totalBooks = booksResult.success ? booksResult.data.length : 0;
        const borrowedBooks = transactionsResult.success
          ? transactionsResult.data.filter((t) => t.status === "borrowed")
              .length
          : 0;

        setStats({ totalBooks, borrowedBooks });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, [activeTab]); 

  const menuItems = [
    {
      id: "transaksi",
      label: "Transaksi",
      icon: <Receipt className="w-5 h-5" />,
      description: "Kelola peminjaman buku",
    },
    {
      id: "anggota",
      label: "Anggota",
      icon: <Users className="w-5 h-5" />,
      description: "Manajemen member",
    },
    {
      id: "buku",
      label: "Buku",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Kelola koleksi buku",
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen shadow-2xl border-r border-gray-700">
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-amber-500/10 to-transparent">
        <div className="flex items-center justify-center mb-4 relative group">
          <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Image
            src="/images/panchiko.png"
            alt="Panchiko Logo"
            width={1200}
            height={90}
            className="rounded relative z-10"
          />
        </div>

        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/30">
          <Shield className="w-4 h-4 text-amber-400" />
          <p className="text-amber-400 text-sm font-bold font-[Open_Sans]">
            Admin Panel
          </p>
        </div>

        <p className="text-gray-400 text-xs mt-3 font-[Open_Sans] text-center">
          Library Management System
        </p>
      </div>

      <nav className="mt-6 px-3">
        <div className="mb-3 px-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-[Open_Sans] flex items-center gap-2">
            <BarChart3 className="w-3 h-3" />
            Dashboard
          </p>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group w-full flex flex-col px-4 py-3 text-left transition-all duration-300 rounded-xl font-[Open_Sans] ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 shadow-lg shadow-amber-500/30 scale-105"
                  : "hover:bg-gray-700/50 text-gray-300 hover:text-white hover:translate-x-1"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`transition-transform group-hover:scale-110 ${
                    activeTab === item.id ? "text-gray-900" : "text-amber-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-base font-semibold ${
                    activeTab === item.id ? "text-gray-900" : ""
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {activeTab !== item.id && (
                <span className="text-xs text-gray-500 mt-1 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-3 mt-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <p className="text-xs font-semibold text-gray-400 font-[Open_Sans]">
            Quick Stats
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Total Buku</span>
            <span className="text-sm font-bold text-white">
              {stats.totalBooks}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Dipinjam</span>
            <span className="text-sm font-bold text-amber-400">
              {stats.borrowedBooks}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-3 right-3 w-30 mt-6">
        <Logout />
      </div>
    </div>
  );
}
