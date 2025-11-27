"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      // 1. Login dengan NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });

      // 2. Cek jika login gagal
      if (result.error) {
        setError("Email atau password salah");
        return;
      }

      // 3. Ambil session untuk cek role user
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      // 4. Redirect berdasarkan role
      if (session?.user?.role === "admin") {
        router.push("/dashboard_admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar kiri untuk desktop */}
      <div className="hidden md:flex flex-1 bg-[#2e2e2e] items-center justify-center p-8">
        <Image
          src="/images/hdlogo.png"
          alt="Logo"
          width={400}
          height={500}
          className="rounded"
        />
      </div>

      {/* Form login */}
      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="md:hidden text-center mb-8">
            <Image
              src="/images/panchiko.png"
              alt="Logo"
              width={120}
              height={40}
              className="rounded mx-auto mb-4"
            />
            <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form action={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Email*
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 font-[Merriweather]">
                Password*
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 font-[Merriweather] mb-4">
                Login User
              </h3>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 font-[Merriweather] text-lg"
              >
                {isLoading ? "Processing..." : "Login"}
              </button>
            </div>
          </form>

          {/* Link register */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm font-[Open_Sans]">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-gray-700 hover:text-gray-600 font-semibold transition-colors duration-300"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
