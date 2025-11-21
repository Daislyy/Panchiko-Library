"use client";
import { useState, useEffect } from "react";
import { getAllBooks, addBook, updateBook, deleteBook } from "../lib/actions";

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const result = await getAllBooks();
      if (result.success) setBooks(result.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (formData) => {
    const result = await addBook(formData);
    if (result.success) {
      setShowAddForm(false);
      fetchBooks();
      alert("Buku berhasil ditambahkan");
    } else alert(result.error);
  };

  const handleEditBook = async (bookId, formData) => {
    const result = await updateBook(bookId, formData);
    if (result.success) {
      setEditingBook(null);
      fetchBooks();
      alert("Data berhasil diupdate");
    } else alert(result.error);
  };

  const handleDeleteBook = async (bookId) => {
    if (confirm("Yakin ingin menghapus?")) {
      const result = await deleteBook(bookId);
      if (result.success) {
        fetchBooks();
        alert("Buku berhasil dihapus");
      } else alert(result.error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Manajemen Buku</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 text-gray-900 font-bold px-6 py-3 rounded-lg"
        >
          + Tambah Buku
        </button>
      </div>

      {showAddForm && (
        <AddBookForm
          onSave={handleAddBook}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSave={handleEditBook}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {books.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p>Tidak ada data buku</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left">Cover</th>
                <th className="py-4 px-6 text-left">Nama Buku</th>
                <th className="py-4 px-6 text-left">Author</th>
                <th className="py-4 px-6 text-left">Genre</th>
                <th className="py-4 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.book_id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <img
                      src={book.cover_image}
                      alt={book.nama_buku}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-6 font-semibold">{book.nama_buku}</td>
                  <td className="py-4 px-6">{book.author}</td>
                  <td className="py-4 px-6">{book.genre}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.book_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
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
    <div className="bg-gray-100 border-2 border-amber-500 rounded-lg p-6 mb-8">
      <h4 className="font-bold text-xl mb-4">Tambah Buku Baru</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="nama_buku"
            placeholder="Nama Buku"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="prolog"
            placeholder="Prolog"
            rows="3"
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <input
            type="file"
            name="cover_image"
            accept="image/*"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Batal
          </button>
        </div>
      </form>
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
    <div className="bg-gray-100 border-2 border-amber-500 rounded-lg p-6 mb-8">
      <h4 className="font-bold text-xl mb-4">Edit Buku</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="nama_buku"
            defaultValue={book.nama_buku}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="author"
            defaultValue={book.author}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="genre"
            defaultValue={book.genre}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="prolog"
            defaultValue={book.prolog}
            rows="3"
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <input
            type="file"
            name="cover_image"
            accept="image/*"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
