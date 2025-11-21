"use client";
import { useState, useEffect } from "react";
import {
  getAllTransactions,
  updateTransactionStatus,
} from "../lib/actions";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleUpdateStatus = async (borrowId, newStatus) => {
    try {
      const result = await updateTransactionStatus(borrowId, newStatus);

      if (result.success) {
        setTransactions((prev) =>
          prev.map((t) =>
            t.borrow_id === borrowId ? { ...t, status: newStatus } : t
          )
        );
        alert(`Status transaksi berhasil diupdate menjadi ${newStatus}`);
      } else {
        alert("Gagal mengupdate status transaksi");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Gagal mengupdate status transaksi");
    }
  };

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

      {transactions.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600 font-[Open_Sans] text-lg">
            Tidak ada data transaksi
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  User
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Buku
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
              {transactions.map((transaction) => (
                <tr
                  key={transaction.borrow_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {transaction.username}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {transaction.nama_buku}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {transaction.borrow_date}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {transaction.return_date}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold font-[Open_Sans] ${
                        transaction.status === "borrowed"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-green-100 text-green-800 border border-green-300"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {transaction.status === "borrowed" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(transaction.borrow_id, "returned")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                      >
                        Tandai Kembali
                      </button>
                    )}
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
