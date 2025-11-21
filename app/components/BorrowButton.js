"use client";
import { useState } from "react";
import { borrowBook } from "../lib/actions";

export default function BorrowButton({ bookId, userId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBorrow = async () => {
    if (!userId) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      const result = await borrowBook(userId, bookId);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={isLoading}
      className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto disabled:opacity-50"
    >
      {isLoading ? "Mengajukan..." : "Borrow"}
    </button>
  );
}
