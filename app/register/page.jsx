"use client";
import { storeUser } from "../lib/actions";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await storeUser(formData);

      if (result.success) {
        // Redirect ke login page setelah registrasi berhasil
        router.push(result.redirectTo);
      } else {
        // Tampilkan error dari server action
        setError(result.error);
      }
    } catch (error) {
      // Fallback error handling
      setError("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-1 bg-[#2e2e2e] items-center justify-center p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/hdlogo.png"
              alt="Panchiko Logo"
              width={400}
              height={500}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/panchiko.png"
                alt="Panchiko Logo"
                width={120}
                height={40}
                className="rounded"
              />
            </div>
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Username*
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900 placeholder-gray-500"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Email*
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900 placeholder-gray-500"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Password*
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900 placeholder-gray-500"
                type="password"
                name="password"
                placeholder="Min. 8 karakter, huruf besar, kecil & angka"
                required
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Password harus minimal 8 karakter, mengandung huruf besar, huruf
                kecil, dan angka
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Role*
              </label>
              <select
                name="role"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900"
                required
                disabled={isLoading}
              >
                <option value="">Pilih Role</option>
                <option value="siswa">Siswa</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 font-[Merriweather] mb-4">
                Register User
              </h3>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 font-[Merriweather] text-lg"
              >
                {isLoading ? "Processing..." : "Register"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm font-[Open_Sans]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-700 hover:text-gray-600 font-semibold transition-colors duration-300"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
