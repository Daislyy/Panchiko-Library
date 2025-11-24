"use client";

import { useState, useEffect } from "react";
import { borrowBook } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function BorrowButton({ userId, bookId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("BorrowButton mounted with:", { userId, bookId });
  }, [userId, bookId]);

  const handleBorrow = async () => {
    console.log("Borrow clicked!", { userId, bookId });

    if (!userId || !bookId) {
      alert("Data tidak lengkap. User ID atau Book ID tidak valid.");
      return;
    }

    if (!confirm("Ajukan peminjaman buku ini?")) return;

    setLoading(true);

    try {
      const result = await borrowBook(userId, bookId);
      console.log("Borrow result:", result);

      if (result.success) {
        alert(result.message || "Permintaan peminjaman berhasil dikirim!");
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(result.error || "Gagal mengajukan peminjaman");
      }
    } catch (error) {
      console.error("Borrow error:", error);
      alert("Terjadi kesalahan saat mengajukan peminjaman");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={loading}
      className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md font-[Open_Sans] ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Memproses..." : "Borrow Book"}
    </button>
  );
}
