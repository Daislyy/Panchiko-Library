"use client";

import { useState } from "react";
import { updateUserProfile } from "../lib/actions";
import {
  User,
  Mail,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function ProfileForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(user.profile_picture);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.target);
    formData.append("currentImage", user.profile_picture);

    const result = await updateUserProfile(user.id, formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setError(result.error || "Gagal update profil");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle size={20} />
          <span className="font-[Open_Sans]">
            Profil berhasil diperbarui! Memuat ulang...
          </span>
        </div>
      )}

    
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg font-[Open_Sans]">
          {error}
        </div>
      )}

   
      <div>
        <label className="block text-sm font-semibold mb-3 font-[Open_Sans] flex items-center gap-2">
          <ImageIcon size={18} />
          Foto Profil
        </label>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <img
              src={preview || "/images/default-avatar.png"}
              alt="Preview"
              className="w-full h-full rounded-full object-cover border-2 border-white/20"
            />
          </div>
          <div className="flex-1">
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 cursor-pointer bg-white/5 border border-white/10 rounded-lg font-[Open_Sans]"
            />
            <p className="text-xs text-gray-400 mt-2 font-[Open_Sans]">
              JPG, PNG, atau GIF (Maks. 2MB)
            </p>
          </div>
        </div>
      </div>

  
      <div>
        <label className="block text-sm font-semibold mb-2 font-[Open_Sans] flex items-center gap-2">
          <User size={18} />
          Username
        </label>
        <input
          type="text"
          name="username"
          defaultValue={user.username}
          required
          minLength={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-[Open_Sans] text-white placeholder-gray-500"
          placeholder="Masukkan username"
        />
      </div>

    
      <div>
        <label className="block text-sm font-semibold mb-2 font-[Open_Sans] flex items-center gap-2">
          <Mail size={18} />
          Email
        </label>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-[Open_Sans] text-white placeholder-gray-500"
          placeholder="Masukkan email"
        />
      </div>

   
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-blue-300 font-[Open_Sans]">
          <strong>Catatan:</strong> Keren banget bangke
        </p>
      </div>

  
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50 font-[Merriweather] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Menyimpan...</span>
            </>
          ) : (
            <span>Simpan Perubahan</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.location.reload()}
          disabled={loading}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all font-[Open_Sans] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
