import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-[#D40000] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-black text-white rounded-lg overflow-hidden shadow-2xl">
        {/* Logo Section */}
        <div className="flex items-center justify-center p-8 bg-[#D40000]">
          <img
            src="/Ducati-Symbol.png"
            alt="Ducati Logo"
            className="h-96 object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 md:px-8 py-8 bg-[#0D0D0D]">
          <form action="landing.html" method="GET" className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#D40000]">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-md text-black bg-gray-100 focus:ring-2 focus:ring-[#D40000]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#D40000]">
                Email address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-md text-black bg-gray-100 focus:ring-2 focus:ring-[#D40000]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#D40000]">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2 rounded-md text-black bg-gray-100 focus:ring-2 focus:ring-[#D40000] pr-10"
                />
                <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                  👁️
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#D40000]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2 rounded-md text-black bg-gray-100 focus:ring-2 focus:ring-[#D40000] pr-10"
                />
                <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                  👁️
                </span>
              </div>
            </div>
            <div className="text-right text-sm">
              <Link href="/5" className="text-[#D40000] hover:text-white">
                Go to next page?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D40000] text-white font-bold py-2 rounded-md hover:bg-[#B30000] transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-700" />
            <span className="px-3 text-sm text-gray-400">Or continue with</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <div className="flex justify-center space-x-4">
            <button className="bg-gray-800 hover:bg-[#D40000] rounded-full p-2 transition duration-300">
              <img src="/Asset/Fesnuk.jpg" alt="Facebook" className="h-6 w-6" />
            </button>
            <button className="bg-gray-800 hover:bg-[#D40000] rounded-full p-2 transition duration-300">
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google"
                className="h-6 w-6"
              />
            </button>
            <button className="bg-gray-800 hover:bg-[#D40000] rounded-full p-2 transition duration-300">
              <img src="/Asset/X.jpg" alt="X" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
