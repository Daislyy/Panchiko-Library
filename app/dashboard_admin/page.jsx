"use client";
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TransactionManagement from "../components/TransactionManagement";
import MemberManagement from "../components/MemberManagement";
import BookManagement from "../components/BookManagement";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("transaksi");

  const renderContent = () => {
    switch (activeTab) {
      case "transaksi":
        return <TransactionManagement />;
      case "anggota":
        return <MemberManagement />;
      case "buku":
        return <BookManagement />;
      default:
        return <TransactionManagement />;
    }
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-white font-[Merriweather]">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-900">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-[Merriweather] mb-4">
                {activeTab === "transaksi" && "Manajemen Transaksi"}
                {activeTab === "anggota" && "Manajemen Anggota"}
                {activeTab === "buku" && "Manajemen Buku"}
              </h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  );
}
