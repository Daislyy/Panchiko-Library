import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "../components/NavSis";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { getUserByEmail, getAllBooks } from "../lib/actions";
import Image from "next/image";
import Link from "next/link"; // Import Link

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

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

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">User not found in database.</p>
      </div>
    );
  }

  const books = booksResult.success ? booksResult.data : [];



  return (
    <main className="min-h-screen bg-[#2e2e2e] text-white font-[Merriweather]">
      <Navbar />

      <div className="flex pt-16">
        <Sidebar
          username={userData.username}
          profilePicture={userData.profile_picture}
        
        />

        <div className="flex-1 ml-64">
          <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 pt-20 pb-20 text-center md:text-left">
            <div className="flex-1 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-[Merriweather]">
                Books in your hands,
                <br /> worlds at your fingertips.
              </h1>
              <p className="text-gray-300 mb-8 text-lg md:text-xl font-[Open_Sans] leading-relaxed">
                Welcome back,{" "}
                <span className="text-amber-400">{userData.username}</span>!
                <br />
                Ready to explore more stories?
              </p>
              <div className="flex justify-center md:justify-start gap-6">
                <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-3 rounded-md text-lg transition-colors font-[Merriweather] font-bold">
                  Browse Collection
                </button>
                <button className="border border-gray-500 hover:bg-gray-700 px-8 py-3 rounded-md text-lg transition-colors font-[Merriweather]">
                  My Books
                </button>
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-64 bg-gray-500 opacity-60 mx-12"></div>

            <div className="flex justify-center gap-6 mt-12 md:mt-0 flex-1">
              <Image
                src="/images/everything.jpg"
                alt="Everything Must Go"
                width={160}
                height={240}
                className="rounded-lg shadow-xl translate-y-4 hover:scale-105 transition-transform duration-300 object-cover"
              />
              <Image
                src="/images/metamorphosis.jpg"
                alt="The Metamorphosis"
                width={160}
                height={240}
                className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 object-cover"
              />
              <Image
                src="/images/animalfarm.jpg"
                alt="Animal Farm"
                width={160}
                height={240}
                className="rounded-lg shadow-xl -translate-y-4 hover:scale-105 transition-transform duration-300 object-cover"
              />
            </div>
          </section>

        
          <section className="bg-white text-black px-6 md:px-20 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center font-[Merriweather]">
                Dlyy
              </h2>
              <SearchBar />
            </div>
          </section>

     
          <section className="bg-white text-black px-8 md:px-20 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-[Merriweather]">
                Today's Pick
              </h2>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-gray-600 rounded-full animate-pulse"></div>
              </div>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-gray-600 font-[Open_Sans] text-lg">
                  No books available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {books.map((book) => (
                  <Link
                    key={book.book_id}
                    href={`/detailbuku/${book.book_id}`}
                    className="block"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                      <div className="flex-1 mb-6">
                        <Image
                          src={
                            book.cover_image || "/images/default-book-cover.png"
                          }
                          alt={book.nama_buku}
                          width={140}
                          height={200}
                          className="mx-auto rounded-lg object-cover h-48 w-32"
                        />
                      </div>
                      <h3 className="font-bold text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center">
                        {book.nama_buku}
                      </h3>
                      <h6 className="font-extralight mb-10 text-sm font-[Merriweather] flex items-center justify-center text-gray-700">
                        Author : {book.author}
                      </h6>
                      <div className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto">
                        Borrow
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
