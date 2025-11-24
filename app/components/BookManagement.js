"use client";
import { useState, useEffect } from "react";
import { getAllBooks, addBook, updateBook, deleteBook } from "../lib/actions";
import Image from "next/image";

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const result = await getAllBooks();
    if (result.success) setBooks(result.data);
    setLoading(false);
  };

  const handleAddBook = async (formData) => {
    const result = await addBook(formData);
    if (result.success) {
      setShowAddForm(false);
      fetchBooks();
      alert("Buku berhasil ditambahkan");
    }
  };

  const handleEditBook = async (bookId, formData) => {
    const result = await updateBook(bookId, formData);
    if (result.success) {
      setEditingBook(null);
      fetchBooks();
      alert("Data berhasil diupdate");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (confirm("Yakin ingin menghapus buku ini?")) {
      const result = await deleteBook(bookId);
      if (result.success) {
        fetchBooks();
        alert("Buku berhasil dihapus");
      }
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.nama_buku.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      (book.genre && book.genre.toLowerCase().includes(searchLower))
    );
  });

  const allGenres = books.flatMap((b) =>
    b.genre ? b.genre.split(",").map((g) => g.trim()) : []
  );
  const uniqueGenres = [...new Set(allGenres)];

  if (loading)
    return (
      <div className="text-center py-12 font-[Open_Sans] text-lg">
        Loading books...
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold font-[Merriweather]">
          Daftar Koleksi Buku
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors font-[Open_Sans] shadow-lg"
        >
          + Tambah Buku
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Total Buku</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {books.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">
            Kategori Genre
          </p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {uniqueGenres.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">
            Hasil Pencarian
          </p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {filteredBooks.length}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul, author, atau genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans] text-gray-900"
        />
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <AddBookForm
          onSave={handleAddBook}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form Modal */}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSave={handleEditBook}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {/* Books Table */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600 font-[Open_Sans] text-lg">
            {searchTerm
              ? `Tidak ada buku yang cocok dengan pencarian "${searchTerm}"`
              : "Tidak ada data buku"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Cover
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Buku
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Author
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Genre
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Ditambahkan
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr
                  key={book.book_id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Image
                      src={book.cover_image || "/images/default-book-cover.png"}
                      alt={book.nama_buku}
                      width={60}
                      height={80}
                      className="rounded object-cover shadow-md border-2 border-gray-200"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans] text-gray-900">
                      {book.nama_buku}
                    </p>
                    {book.prolog && (
                      <p className="text-sm text-gray-500 font-[Open_Sans] mt-1 line-clamp-2">
                        {book.prolog.substring(0, 80)}...
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans] text-gray-700">
                    {book.author}
                  </td>
                  <td className="py-4 px-6">
                    {book.genre && (
                      <div className="flex flex-wrap gap-2">
                        {book.genre.split(",").map((g, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm font-semibold font-[Open_Sans] bg-indigo-100 text-indigo-800 border border-indigo-300"
                          >
                            {g.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans] text-gray-700">
                    {new Date(book.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.book_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AddBookForm({ onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h4 className="font-bold text-2xl mb-6 font-[Merriweather] text-gray-900">
          Tambah Buku Baru
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Nama Buku *
              </label>
              <input
                type="text"
                name="nama_buku"
                placeholder="Masukkan nama buku"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Author *
              </label>
              <input
                type="text"
                name="author"
                placeholder="Masukkan nama author"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Contoh: Fiction, Romance, Action (pisahkan dengan koma)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
              <p className="text-xs text-gray-500 mt-1 font-[Open_Sans]">
                Pisahkan multiple genre dengan koma
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Prolog / Sinopsis
              </label>
              <textarea
                name="prolog"
                placeholder="Tulis sinopsis atau prolog buku..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Cover Buku
              </label>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold font-[Open_Sans] transition-colors shadow-md"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold font-[Open_Sans] transition-colors shadow-md"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditBookForm({ book, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("currentImage", book.cover_image);
    onSave(book.book_id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h4 className="font-bold text-2xl mb-6 font-[Merriweather] text-gray-900">
          Edit Buku
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Nama Buku *
              </label>
              <input
                type="text"
                name="nama_buku"
                defaultValue={book.nama_buku}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Author *
              </label>
              <input
                type="text"
                name="author"
                defaultValue={book.author}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                defaultValue={book.genre}
                placeholder="Contoh: Fiction, Romance, Action (pisahkan dengan koma)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              />
              <p className="text-xs text-gray-500 mt-1 font-[Open_Sans]">
                Pisahkan multiple genre dengan koma
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Prolog / Sinopsis
              </label>
              <textarea
                name="prolog"
                defaultValue={book.prolog}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-[Open_Sans]"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Cover Buku Baru
              </label>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-[Open_Sans] mb-2">
                Cover saat ini:
              </p>
              <Image
                src={book.cover_image || "/images/default-book-cover.png"}
                alt={book.nama_buku}
                width={120}
                height={160}
                className="rounded-lg object-cover shadow-md border-2 border-gray-200"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold font-[Open_Sans] transition-colors shadow-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold font-[Open_Sans] transition-colors shadow-md"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
