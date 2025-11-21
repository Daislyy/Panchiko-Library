"use client";

import { useState, useEffect } from "react";
import { getAllBooks } from "../lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Load  buku 
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const result = await getAllBooks();
      if (result.success) {
        setBooks(result.data);
      }
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter buku  search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks([]);
      setShowResults(false);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.nama_buku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.genre &&
          book.genre.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setFilteredBooks(filtered);
    setShowResults(true);
  }, [searchQuery, books]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredBooks.length > 0) {
      setShowResults(true);
    }
  };

  const handleBookSelect = (book) => {
    // Redirect ke halaman detail bukkyu
    router.push(`/detailbuku/${book.book_id}`);
    setSearchQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
    
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search books by title, author, or genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] shadow-lg"
        />

        
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 hover:bg-yellow-200 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

     
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </form>

  
      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-2xl mt-2 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Loading books...
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No books found matching "{searchQuery}"
            </div>
          ) : (
            <div className="py-2">
              {/* Results Count */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm text-gray-500 font-[Open_Sans]">
                  Found {filteredBooks.length} book
                  {filteredBooks.length !== 1 ? "s" : ""}
                </p>
              </div>

         
              {filteredBooks.map((book) => (
                <div
                  key={book.book_id}
                  onClick={() => handleBookSelect(book)}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
              
                  <div className="flex-shrink-0">
                    <Image
                      src={book.cover_image || "/images/default-book-cover.png"}
                      alt={book.nama_buku}
                      width={50}
                      height={70}
                      className="rounded-lg object-cover"
                    />
                  </div>

                
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 font-[Merriweather] truncate">
                      {book.nama_buku}
                    </h3>
                    <p className="text-gray-600 text-sm font-[Open_Sans]">
                      by {book.author}
                    </p>
                    {book.genre && (
                      <p className="text-gray-500 text-xs font-[Open_Sans] mt-1">
                        {book.genre}
                      </p>
                    )}
                  </div>

              
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookSelect(book);
                    }}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
