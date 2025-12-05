import { useState, useEffect } from "react";
import {
  getAllTransactions,
  updateTransactionStatus,
  rejectBorrow,
} from "../lib/actions";
import Image from "next/image";
import {
  RefreshCw,
  Receipt,
  Clock,
  BookOpen,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
} from "lucide-react";
import * as XLSX from "xlsx";

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const result = await getAllTransactions();
    if (result.success) {
      setTransactions(result.data);
    }
    setLoading(false);
  };

  const handleApprove = async (borrowId) => {
    if (!confirm("Setujui peminjaman ini?")) return;

    const result = await updateTransactionStatus(borrowId, "borrowed");
    if (result.success) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.borrow_id === borrowId ? { ...t, status: "borrowed" } : t
        )
      );
      alert("Peminjaman berhasil disetujui!");
    }
  };

  const handleReject = async (borrowId) => {
    if (!confirm("Tolak peminjaman ini? Data akan dihapus.")) return;

    const result = await rejectBorrow(borrowId);
    if (result.success) {
      setTransactions((prev) => prev.filter((t) => t.borrow_id !== borrowId));
      alert("Peminjaman berhasil ditolak");
    }
  };

  const handleReturn = async (borrowId) => {
    if (!confirm("Tandai buku ini sudah dikembalikan?")) return;

    const result = await updateTransactionStatus(borrowId, "returned");
    if (result.success) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.borrow_id === borrowId ? { ...t, status: "returned" } : t
        )
      );
      alert("Buku berhasil ditandai sudah dikembalikan!");
    }
  };

  const handleExportExcel = () => {
    const dataToExport = filteredTransactions.map((transaction, index) => ({
      No: index + 1,
      "Nama Buku": transaction.nama_buku,
      Author: transaction.author,
      Peminjam: transaction.username,
      Email: transaction.email,
      "Tanggal Pinjam": new Date(transaction.borrow_date).toLocaleDateString(
        "id-ID"
      ),
      "Tanggal Kembali": new Date(transaction.return_date).toLocaleDateString(
        "id-ID"
      ),
      Status:
        transaction.status === "pending"
          ? "Menunggu"
          : transaction.status === "borrowed"
          ? "Dipinjam"
          : "Dikembalikan",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaksi");

    // Set column widths
    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];

    const fileName = `Transaksi_Peminjaman_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName);
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
        <div className="flex gap-3">
          <button
            onClick={handleExportExcel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors font-[Open_Sans] shadow-lg flex items-center gap-2"
          >
            <Download size={20} />
            Export Excel
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-[Open_Sans]">Total</p>
              <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
                {transactions.length}
              </p>
            </div>
            <Receipt size={40} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-[Open_Sans]">Pending</p>
              <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
                {pendingCount}
              </p>
            </div>
            <Clock size={40} className="text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-[Open_Sans]">Dipinjam</p>
              <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
                {borrowedCount}
              </p>
            </div>
            <BookOpen size={40} className="text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-[Open_Sans]">
                Dikembalikan
              </p>
              <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
                {returnedCount}
              </p>
            </div>
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>
      </div>

     
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors flex items-center gap-2 ${
            filter === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Receipt size={18} />
          Semua ({transactions.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors flex items-center gap-2 ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Clock size={18} />
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("borrowed")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors flex items-center gap-2 ${
            filter === "borrowed"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <BookOpen size={18} />
          Dipinjam ({borrowedCount})
        </button>
        <button
          onClick={() => setFilter("returned")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors flex items-center gap-2 ${
            filter === "returned"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <CheckCircle size={18} />
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
                      className="rounded object-cover shadow-md border-2 border-gray-200"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans] text-gray-900">
                      {transaction.nama_buku}
                    </p>
                    <p className="text-sm text-gray-600 font-[Open_Sans]">
                      {transaction.author}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans] text-gray-900">
                      {transaction.username}
                    </p>
                    <p className="text-sm text-gray-600 font-[Open_Sans]">
                      {transaction.email}
                    </p>
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans] text-gray-700">
                    {new Date(transaction.borrow_date).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans] text-gray-700">
                    {new Date(transaction.return_date).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold font-[Open_Sans] flex items-center gap-2 w-fit ${
                        transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : transaction.status === "borrowed"
                          ? "bg-orange-100 text-orange-800 border border-orange-300"
                          : "bg-green-100 text-green-800 border border-green-300"
                      }`}
                    >
                      {transaction.status === "pending" ? (
                        <>
                          <Clock size={16} />
                          Menunggu
                        </>
                      ) : transaction.status === "borrowed" ? (
                        <>
                          <BookOpen size={16} />
                          Dipinjam
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          Dikembalikan
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      {transaction.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(transaction.borrow_id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Setuju
                          </button>
                          <button
                            onClick={() => handleReject(transaction.borrow_id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Tolak
                          </button>
                        </>
                      )}
                      {transaction.status === "borrowed" && (
                        <button
                          onClick={() => handleReturn(transaction.borrow_id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md flex items-center gap-2"
                        >
                          <RotateCcw size={16} />
                          Tandai Kembali
                        </button>
                      )}
                      {transaction.status === "returned" && (
                        <span className="text-gray-500 text-sm font-[Open_Sans] italic flex items-center gap-2">
                          <CheckCircle size={16} />
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