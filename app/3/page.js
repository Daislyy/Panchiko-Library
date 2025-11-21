import Link from "next/link";
import Head from "next/head";

export default function UserProfile() {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <title>Ducati Profile</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <div className="w-full max-w-md">
          {/* Card Profil */}
          <div className="bg-[#0D0D0D] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
            {/* Header Profil with Ducati Red */}
            <div className="bg-[#D40000] text-center p-6 relative">
              <div className="absolute top-4 left-4">
                <Link href="/">
                  <i className="ri-arrow-left-line text-white text-2xl hover:text-gray-200 transition"></i>
                </Link>
              </div>

              <div className="relative mx-auto w-24 h-24">
                <img
                  src="/Asset/changli.png"
                  alt="Foto Profil"
                  className="w-full h-full rounded-full border-4 border-white/80 object-cover shadow-md"
                />
                <button className="absolute bottom-0 right-0 bg-black p-2 rounded-full shadow-md text-[#D40000] hover:bg-gray-900 transition">
                  <i className="ri-camera-line"></i>
                </button>
              </div>
              <h1 className="text-2xl font-bold text-white mt-4">
                Padly Padilah
              </h1>
              <p className="text-yellow font-medium">Ducati Enthusiast</p>
            </div>

            {/* Detail Profil */}
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <div className="bg-[#D40000] p-3 rounded-full text-white">
                  <i className="ri-mail-line"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-white">dlyy07@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <div className="bg-[#D40000] p-3 rounded-full text-white">
                  <i className="ri-phone-line"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telepon</p>
                  <p className="font-medium text-white">+62 813 1923 3748</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <div className="bg-[#D40000] p-3 rounded-full text-white">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lokasi</p>
                  <p className="font-medium text-white">Sumedang, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <div className="bg-[#D40000] p-3 rounded-full text-white">
                  <i className="ri-calendar-line"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bergabung</p>
                  <p className="font-medium text-white">15 Januari 2023</p>
                </div>
              </div>

              {/* Ducati-specific info */}
              <div className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
                <div className="bg-[#D40000] p-3 rounded-full text-white">
                  <i className="ri-bike-line"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Bike</p>
                  <p className="font-medium text-white">Ducati Panigale V4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/5"
              className="bg-[#D40000] text-white px-8 py-3 inline-block rounded-full hover:bg-[#B30000] transition font-bold uppercase tracking-wider"
            >
              Go to next page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
