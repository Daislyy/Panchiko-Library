import { getBookById } from "../../lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import NavSis from "../../components/NavSis";
import BorrowButton from "../../components/BorrowButton";

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

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-[#d1b892] transition-colors font-[Open_Sans]"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-8 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="relative inline-block">
                  <Image
                    src={book.cover_image || "/images/default-book-cover.png"}
                    alt={book.nama_buku}
                    width={280}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto mb-6 object-cover border-4 border-white"
                    priority
                  />
                </div>

                {/* Borrow Button */}
                {session && userId ? (
                  <div className="space-y-3 max-w-xs mx-auto">
                    <BorrowButton userId={userId} bookId={book.book_id} />
                  </div>
                ) : (
                  <div className="space-y-3 max-w-xs mx-auto">
                    <p className="text-red-500 text-sm">
                      Please login to borrow
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 font-[Merriweather] mb-2">
                  {book.nama_buku}
                </h1>
                <p className="text-xl text-gray-600 font-[Open_Sans]">
                  by {book.author}
                </p>
              </div>

              {book.genre && (
                <div className="mb-6">
                  <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold font-[Open_Sans]">
                    {book.genre}
                  </span>
                </div>
              )}

              <div className="w-20 h-1 bg-[#d1b892] mb-8"></div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 font-[Merriweather]">
                  Prologue
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="max-h-96 overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed font-[Open_Sans] text-justify whitespace-pre-line">
                      {book.prolog || "No prologue available for this book."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 font-[Open_Sans] mb-1">
                    Author
                  </p>
                  <p className="font-semibold text-gray-900 font-[Open_Sans]">
                    {book.author}
                  </p>
                </div>

                {book.genre && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-500 font-[Open_Sans] mb-1">
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
