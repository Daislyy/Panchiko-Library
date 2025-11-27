import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "../components/NavSis";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { getUserByEmail, getAllBooks } from "../lib/actions";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Library, Sparkles } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session)

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">You must login first.</p>
      </div>
    );
  }

  const email = session.user.email;
  const userData = await getUserByEmail(email);
  const booksResult = await getAllBooks();

  const books = booksResult.success ? booksResult.data : [];
  const availableBooks = books.filter(
    (b) => (b.available_stock || 0) > 0
  ).length;

  return (
    <main className="min-h-screen bg-[#2e2e2e] text-white font-[Merriweather]">
      <Navbar />

      <div className="flex pt-16">
        <Sidebar
          username={userData.username}
          profilePicture={userData.profile_picture}
        />

        <div className="flex-1 ml-64">
         
          <section className="relative px-6 md:px-16 pt-20 pb-20 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-6 py-2 mb-6">
                  <Sparkles className="text-amber-400" size={20} />
                  <span className="text-amber-400 font-[Open_Sans] font-semibold">
                    Selamat Datang Kembali
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-[Merriweather]">
                  Halo,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    {userData.username}
                  </span>
                  !
                </h1>

                <p className="text-gray-300 text-xl md:text-2xl font-[Merriweather] mb-10 max-w-3xl mx-auto">
                  Created By : Dlyy
                </p>

         
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <Library className="mx-auto mb-3 text-blue-400" size={32} />
                    <p className="text-3xl font-bold font-[Merriweather] mb-2">
                      {books.length}
                    </p>
                    <p className="text-gray-400 font-[Open_Sans] text-sm">
                      Total Buku
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <BookOpen
                      className="mx-auto mb-3 text-green-400"
                      size={32}
                    />
                    <p className="text-3xl font-bold font-[Merriweather] mb-2">
                      {availableBooks}
                    </p>
                    <p className="text-gray-400 font-[Open_Sans] text-sm">
                      Buku Tersedia
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <Sparkles
                      className="mx-auto mb-3 text-amber-400"
                      size={32}
                    />
                    <p className="text-3xl font-bold font-[Merriweather] mb-2">
                      Gratis
                    </p>
                    <p className="text-gray-400 font-[Open_Sans] text-sm">
                      Pinjam Tanpa Biaya
                    </p>
                  </div>
                </div>

      
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="#Book">
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/50 hover:scale-105 font-[Merriweather]">
                      Jelajahi Koleksi
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="bg-white text-black px-6 md:px-20 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center font-[Merriweather]">
                Cari Buku Favoritmu
              </h2>
              <SearchBar />
            </div>
          </section>

  
          <section
            id="Book"
            className="bg-white text-black px-8 md:px-20 py-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-[Merriweather]">
                Koleksi Terbaru
              </h2>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-gray-600 rounded-full animate-pulse"></div>
              </div>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 font-[Open_Sans] text-lg">
                  Belum ada buku tersedia. Tunggu update terbaru!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {books.map((book) => {
                  const isAvailable = (book.available_stock || 0) > 0;

                  return (
                    <Link
                      key={book.book_id}
                      href={`/detailbuku/${book.book_id}`}
                      className="block"
                    >
                      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer group relative">
                        {/* Stock Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          {isAvailable ? (
                            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full font-[Open_Sans]">
                              {book.available_stock} Tersedia
                            </span>
                          ) : (
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full font-[Open_Sans]">
                              Stok Habis
                            </span>
                          )}
                        </div>

                        <div className="flex-1 mb-6 relative">
                          <Image
                            src={
                              book.cover_image ||
                              "/images/default-book-cover.png"
                            }
                            alt={book.nama_buku}
                            width={140}
                            height={200}
                            className={`mx-auto rounded-lg object-cover h-48 w-32 group-hover:scale-105 transition-transform duration-300 ${
                              !isAvailable ? "opacity-50 grayscale" : ""
                            }`}
                          />
                        </div>

                        <h3 className="font-bold text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center group-hover:text-amber-600 transition-colors">
                          {book.nama_buku}
                        </h3>

                        <h6 className="font-extralight mb-10 text-sm font-[Merriweather] flex items-center justify-center text-gray-700">
                          Author: {book.author}
                        </h6>

                        <div
                          className={`${
                            isAvailable
                              ? "bg-green-400 hover:bg-green-500"
                              : "bg-gray-400"
                          } text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto ${
                            isAvailable ? "group-hover:bg-green-500" : ""
                          }`}
                        >
                          {isAvailable ? "Pinjam Buku" : "Tidak Tersedia"}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
