"use client";
import { useState, useEffect } from "react";
import {
  getAllTransactions,
  updateTransactionStatus,
  rejectBorrow,
} from "../lib/actions";
import Image from "next/image";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, borrowed, returned

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const result = await getAllTransactions();

      if (result.success) {
        setTransactions(result.data);
      } else {
        console.error("Error fetching transactions:", result.error);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (borrowId) => {
    if (!confirm("Setujui peminjaman ini?")) return;

    try {
      const result = await updateTransactionStatus(borrowId, "borrowed");

      if (result.success) {
        setTransactions((prev) =>
          prev.map((t) =>
            t.borrow_id === borrowId ? { ...t, status: "borrowed" } : t
          )
        );
        alert("Peminjaman berhasil disetujui!");
      } else {
        alert("Gagal menyetujui peminjaman");
      }
    } catch (error) {
      console.error("Error approving transaction:", error);
      alert("Gagal menyetujui peminjaman");
    }
  };

  const handleReject = async (borrowId) => {
    if (!confirm("Tolak peminjaman ini? Data akan dihapus.")) return;

    try {
      const result = await rejectBorrow(borrowId);

      if (result.success) {
        setTransactions((prev) => prev.filter((t) => t.borrow_id !== borrowId));
        alert("Peminjaman berhasil ditolak");
      } else {
        alert("Gagal menolak peminjaman");
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      alert("Gagal menolak peminjaman");
    }
  };

  const handleReturn = async (borrowId) => {
    if (!confirm("Tandai buku ini sudah dikembalikan?")) return;

    try {
      const result = await updateTransactionStatus(borrowId, "returned");

      if (result.success) {
        setTransactions((prev) =>
          prev.map((t) =>
            t.borrow_id === borrowId ? { ...t, status: "returned" } : t
          )
        );
        alert("Buku berhasil ditandai sudah dikembalikan!");
      } else {
        alert("Gagal mengupdate status");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Gagal mengupdate status");
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const pendingCount = transactions.filter(
    (t) => t.status === "pending"
  ).length;
  const borrowedCount = transactions.filter(
    (t) => t.status === "borrowed"
  ).length;
  const returnedCount = transactions.filter(
    (t) => t.status === "returned"
  ).length;

  if (loading)
    return (
      <div className="text-center py-12 font-[Open_Sans] text-lg">
        Loading transactions...
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold font-[Merriweather]">
          Daftar Transaksi Peminjaman
        </h3>
        <button
          onClick={fetchTransactions}
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors font-[Open_Sans] shadow-lg"
        >
          Refresh Data
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Total</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {transactions.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Pending</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Dipinjam</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {borrowedCount}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Dikembalikan</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {returnedCount}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Semua ({transactions.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("borrowed")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "borrowed"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Dipinjam ({borrowedCount})
        </button>
        <button
          onClick={() => setFilter("returned")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "returned"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Dikembalikan ({returnedCount})
        </button>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600 font-[Open_Sans] text-lg">
            Tidak ada data transaksi{" "}
            {filter !== "all" ? `dengan status ${filter}` : ""}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Cover
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Buku
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Peminjam
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Tanggal Pinjam
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Tanggal Kembali
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Status
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.borrow_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Image
                      src={
                        transaction.cover_image ||
                        "/images/default-book-cover.png"
                      }
                      alt={transaction.nama_buku}
                      width={50}
                      height={70}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans]">
                      {transaction.nama_buku}
                    </p>
                    <p className="text-sm text-gray-600 font-[Open_Sans]">
                      {transaction.author}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans]">
                      {transaction.username}
                    </p>
                    <p className="text-sm text-gray-600 font-[Open_Sans]">
                      {transaction.email}
                    </p>
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {new Date(transaction.borrow_date).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {new Date(transaction.return_date).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold font-[Open_Sans] ${
                        transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : transaction.status === "borrowed"
                          ? "bg-orange-100 text-orange-800 border border-orange-300"
                          : "bg-green-100 text-green-800 border border-green-300"
                      }`}
                    >
                      {transaction.status === "pending"
                        ? "Menunggu"
                        : transaction.status === "borrowed"
                        ? "Dipinjam"
                        : "Dikembalikan"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      {transaction.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(transaction.borrow_id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                          >
                            Setuju
                          </button>
                          <button
                            onClick={() => handleReject(transaction.borrow_id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                      {transaction.status === "borrowed" && (
                        <button
                          onClick={() => handleReturn(transaction.borrow_id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                        >
                          Tandai Kembali
                        </button>
                      )}
                      {transaction.status === "returned" && (
                        <span className="text-gray-500 text-sm font-[Open_Sans] italic">
                          Selesai
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
