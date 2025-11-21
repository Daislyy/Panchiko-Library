"use client";

import { useState } from "react";
import { updateUserProfile } from "../lib/actions";

export default function EditUsername({ currentUsername, userId, userEmail }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(currentUsername);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("email", userEmail); // Tetap kirim email yang sama

      const result = await updateUserProfile(userId, formData);
      if (result.success) {
        setIsEditing(false);
        window.location.reload();
      } else {
        alert(result.error || "Gagal mengupdate username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Terjadi error saat mengupdate username");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={3}
            maxLength={50}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setUsername(currentUsername);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            Batal
          </button>
        </form>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="text-lg font-semibold">{currentUsername}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-500 text-sm transition-colors"
          >
            Edit Username
          </button>
        </div>
      )}
    </div>
  );
}
