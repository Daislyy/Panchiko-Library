"use client";
import { useState, useEffect } from "react";
import {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../lib/actions";
import Image from "next/image";

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const result = await getAllMembers();
      if (result.success) setMembers(result.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (formData) => {
    const result = await addMember(formData);
    if (result.success) {
      setShowAddForm(false);
      fetchMembers();
      alert("Anggota berhasil ditambahkan");
    } else alert(result.error);
  };

  const handleEditMember = async (userId, formData) => {
    const result = await updateMember(userId, formData);
    if (result.success) {
      setEditingMember(null);
      fetchMembers();
      alert("Data berhasil diupdate");
    } else alert(result.error);
  };

  const handleDeleteMember = async (userId) => {
    if (confirm("Yakin ingin menghapus anggota ini?")) {
      const result = await deleteMember(userId);
      if (result.success) {
        fetchMembers();
        alert("Anggota berhasil dihapus");
      } else alert(result.error);
    }
  };

  const filteredMembers = members.filter((m) => {
    if (filter === "all") return true;
    return m.role === filter;
  });

  const adminCount = members.filter((m) => m.role === "admin").length;
  const siswaCount = members.filter((m) => m.role === "siswa").length;

  if (loading)
    return (
      <div className="text-center py-12 font-[Open_Sans] text-lg">
        Loading members...
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold font-[Merriweather]">
          Daftar Anggota Perpustakaan
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors font-[Open_Sans] shadow-lg"
          >
            + Tambah Anggota
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">
            Total Anggota
          </p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {members.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Admin</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {adminCount}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-[Open_Sans]">Siswa</p>
          <p className="text-3xl font-bold text-gray-900 font-[Merriweather]">
            {siswaCount}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Semua ({members.length})
        </button>
        <button
          onClick={() => setFilter("admin")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "admin"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Admin ({adminCount})
        </button>
        <button
          onClick={() => setFilter("siswa")}
          className={`px-6 py-2 rounded-lg font-[Open_Sans] font-semibold transition-colors ${
            filter === "siswa"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Siswa ({siswaCount})
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <AddMemberForm
          onSave={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form Modal */}
      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onSave={handleEditMember}
          onCancel={() => setEditingMember(null)}
        />
      )}

      {/* Members Table */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600 font-[Open_Sans] text-lg">
            Tidak ada data anggota{" "}
            {filter !== "all" ? `dengan role ${filter}` : ""}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Foto
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Anggota
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Email
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Role
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Bergabung
                </th>
                <th className="py-4 px-6 text-left font-[Merriweather]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Image
                      src={
                        member.profile_picture || "/images/default-avatar.png"
                      }
                      alt={member.username}
                      width={50}
                      height={50}
                      className="rounded-full object-cover border-2 border-gray-200"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold font-[Open_Sans]">
                      {member.username}
                    </p>
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">{member.email}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold font-[Open_Sans] ${
                        member.role === "admin"
                          ? "bg-purple-100 text-purple-800 border border-purple-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}
                    >
                      {member.role === "admin" ? "Admin" : "Siswa"}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-[Open_Sans]">
                    {new Date(member.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold font-[Open_Sans] transition-colors shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
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

function AddMemberForm({ onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h4 className="font-bold text-2xl mb-6 font-[Merriweather] text-gray-900">
          Tambah Anggota Baru
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Username *
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Password *
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Role *
              </label>
              <select
                name="role"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="siswa">Siswa</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Foto Profil
              </label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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

function EditMemberForm({ member, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("currentImage", member.profile_picture);
    onSave(member.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h4 className="font-bold text-2xl mb-6 font-[Merriweather] text-gray-900">
          Edit Anggota
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Username *
              </label>
              <input
                type="text"
                name="username"
                defaultValue={member.username}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                defaultValue={member.email}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Role *
              </label>
              <select
                name="role"
                defaultValue={member.role}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="siswa">Siswa</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 font-[Open_Sans] text-gray-700">
                Foto Profil Baru
              </label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 font-[Open_Sans]">
                Foto saat ini:
              </p>
              <Image
                src={member.profile_picture || "/images/default-avatar.png"}
                alt={member.username}
                width={100}
                height={100}
                className="mt-2 rounded-lg object-cover border-2 border-gray-200"
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
