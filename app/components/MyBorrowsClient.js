"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";
import NavSis from "../components/NavSis.jsx";
import Sidebar from "../components/Sidebar.js";

export default function MyBorrowsClient({ borrows, username, profilePicture }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const filteredBorrows = borrows.filter((borrow) => {
    if (filter === "all") return true;
    return borrow.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        color: "bg-yellow-500",
        icon: <Clock className="w-4 h-4" />,
      },
      borrowed: {
        label: "Dipinjam",
        color: "bg-blue-500",
        icon: <BookOpen className="w-4 h-4" />,
      },
      returned: {
        label: "Dikembalikan",
        color: "bg-green-500",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      rejected: {
        label: "Ditolak",
        color: "bg-red-500",
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`${config.color} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 `}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <NavSis />

      <Sidebar username={username} profilePicture={profilePicture} />


      <div className="min-h-screen bg-white pt-16 pl-64">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
       
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-[Merriweather] mb-4">
                Buku yang Dipinjam
              </h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
              <p className="text-gray-600 font-[Open_Sans]">
                Halo, {username}!
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 font-[Open_Sans] transition-colors whitespace-nowrap ${
                  filter === "all"
                    ? "border-b-2 border-amber-500 text-amber-500 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Semua ({borrows.length})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 font-[Open_Sans] transition-colors whitespace-nowrap ${
                  filter === "pending"
                    ? "border-b-2 border-amber-500 text-amber-500 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pending ({borrows.filter((b) => b.status === "pending").length})
              </button>
              <button
                onClick={() => setFilter("borrowed")}
                className={`px-4 py-2 font-[Open_Sans] transition-colors whitespace-nowrap ${
                  filter === "borrowed"
                    ? "border-b-2 border-amber-500 text-amber-500 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dipinjam (
                {borrows.filter((b) => b.status === "borrowed").length})
              </button>
              <button
                onClick={() => setFilter("returned")}
                className={`px-4 py-2 font-[Open_Sans] transition-colors whitespace-nowrap ${
                  filter === "returned"
                    ? "border-b-2 border-amber-500 text-amber-500 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dikembalikan (
                {borrows.filter((b) => b.status === "returned").length})
              </button>
            </div>

        
            {filteredBorrows.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-[Open_Sans] mb-2">
                  {filter === "all"
                    ? "Belum ada peminjaman buku"
                    : `Tidak ada buku dengan status "${filter}"`}
                </p>
                <p className="text-sm text-gray-400">
                  Silakan pinjam buku dari dashboard untuk mulai membaca
                </p>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-[Open_Sans]"
                >
                  Jelajahi Buku
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredBorrows.map((borrow) => (
                  <div
                    key={borrow.borrow_id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6 flex-col md:flex-row">
                      
                      <div className="w-32 h-48 flex-shrink-0 mx-auto md:mx-0">
                        <Image
                          src={
                            borrow.cover_image ||
                            "/images/default-book-cover.png"
                          }
                          alt={borrow.nama_buku}
                          width={128}
                          height={192}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>

                    
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 font-[Merriweather] mb-1">
                              {borrow.nama_buku}
                            </h3>
                            <p className="text-gray-600 font-[Open_Sans]">
                              oleh {borrow.author}
                            </p>
                          </div>
                          <div className="md:ml-auto">
                            {getStatusBadge(borrow.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500 font-[Open_Sans] mb-1">
                              Tanggal Pinjam
                            </p>
                            <p className="text-gray-900 font-semibold font-[Open_Sans]">
                              {formatDate(borrow.borrow_date)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-[Open_Sans] mb-1">
                              Tanggal Kembali
                            </p>
                            <p className="text-gray-900 font-semibold font-[Open_Sans]">
                              {formatDate(borrow.return_date)}
                            </p>
                          </div>
                        </div>

                     
                        {borrow.status === "pending" && (
                          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                            <p className="text-sm text-yellow-800 font-[Open_Sans]">
                              ⏳ Menunggu persetujuan admin
                            </p>
                          </div>
                        )}
                        {borrow.status === "borrowed" && (
                          <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                            <p className="text-sm text-blue-800 font-[Open_Sans]">
                              📚 Jangan lupa kembalikan tepat waktu!
                            </p>
                          </div>
                        )}
                        {borrow.status === "returned" && (
                          <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                            <p className="text-sm text-green-800 font-[Open_Sans]">
                              ✅ Terima kasih telah mengembalikan buku
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
