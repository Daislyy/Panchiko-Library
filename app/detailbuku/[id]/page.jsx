import { getBookById } from "../../lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import NavSis from "../../components/NavSis";
import BorrowButton from "../../components/BorrowButton";
import { BookOpen, User, Tag, Package } from "lucide-react";

export default async function BookDetail({ params }) {
  const { id } = await params;
  const bookResult = await getBookById(id);
  const session = await getServerSession(authOptions);

  if (!bookResult.success || !bookResult.data) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">Book not found</p>
          <Link
            href="/dashboard"
            className="text-[#d1b892] hover:text-amber-400 mt-4 inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const book = bookResult.data;
  const userId = session?.user?.id || null;

  console.log("Session:", session);
  console.log("User ID:", userId);

  return (
    <div className="min-h-screen bg-white">
      <NavSis />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-center min-h-[calc(100vh-80px)]">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden w-full">
          <div className="flex flex-col lg:flex-row lg:min-h-[600px]">
            {/* Left Side - Book Cover */}
            <div className="lg:w-2/5 p-6 lg:p-10 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center w-full max-w-sm mx-auto">
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#d1b892] to-amber-400 rounded-lg blur opacity-20"></div>
                  <Image
                    src={book.cover_image || "/images/default-book-cover.png"}
                    alt={book.nama_buku}
                    width={260}
                    height={380}
                    className="relative rounded-lg shadow-2xl mx-auto object-cover border-4 border-white"
                    priority
                  />
                </div>

                {session && userId ? (
                  <div className="space-y-3 w-full">
                    {book.available_stock > 0 ? (
                      <BorrowButton userId={userId} bookId={book.book_id} />
                    ) : (
                      <div className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold font-[Open_Sans] cursor-not-allowed flex items-center justify-center gap-2">
                        <Package className="w-5 h-5" />
                        Stok Habis
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 w-full">
                    <p className="text-red-500 text-sm font-[Open_Sans] flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Please login to borrow
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-3/5 p-6 lg:p-10 flex flex-col justify-center">
              <div className="mb-5">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-[Merriweather] mb-2">
                  {book.nama_buku}
                </h1>
                <p className="text-xl text-gray-600 font-[Open_Sans]">
                  by {book.author}
                </p>
              </div>

              {book.genre && (
                <div className="mb-5">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold font-[Open_Sans] border border-gray-300 shadow-sm">
                    <Tag className="w-4 h-4" />
                    {book.genre}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-[Open_Sans] flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Ketersediaan:
                  </span>
                  {book.available_stock > 0 ? (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-300 font-[Open_Sans] shadow-sm">
                      Tersedia ({book.available_stock} buku)
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-300 font-[Open_Sans] shadow-sm">
                      Stok Habis
                    </span>
                  )}
                </div>
              </div>

              <div className="w-20 h-1 bg-gradient-to-r from-[#d1b892] to-amber-400 rounded-full mb-5 shadow-sm"></div>

              <div className="mb-5">
                <h2 className="text-2xl font-bold mb-3 text-gray-900 font-[Merriweather] flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#d1b892]" />
                  Prologue
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="max-h-64 overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed font-[Open_Sans] text-justify whitespace-pre-line">
                      {book.prolog || "No prologue available for this book."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-[Open_Sans] mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Author
                  </p>
                  <p className="font-semibold text-gray-900 font-[Open_Sans]">
                    {book.author}
                  </p>
                </div>

                {book.genre && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-500 font-[Open_Sans] mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Genre
                    </p>
                    <p className="font-semibold text-gray-900 font-[Open_Sans]">
                      {book.genre}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const bookResult = await getBookById(id);

  if (!bookResult.success || !bookResult.data) {
    return {
      title: "Book Not Found - PANCHIKO",
    };
  }

  const book = bookResult.data;

  return {
    title: `${book.nama_buku} by ${book.author} - PANCHIKO`,
    description: book.prolog || `Read ${book.nama_buku} by ${book.author}`,
  };
}
