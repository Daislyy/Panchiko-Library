"use client";
import { useState, useEffect } from "react";
import {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../lib/actions";

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

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
    if (confirm("Yakin ingin menghapus?")) {
      const result = await deleteMember(userId);
      if (result.success) {
        fetchMembers();
        alert("Anggota berhasil dihapus");
      } else alert(result.error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Manajemen Anggota</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 text-gray-900 font-bold px-6 py-3 rounded-lg"
        >
          + Tambah Anggota
        </button>
      </div>

      {showAddForm && (
        <AddMemberForm
          onSave={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onSave={handleEditMember}
          onCancel={() => setEditingMember(null)}
        />
      )}

      {members.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p>Tidak ada data anggota</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left">Username</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Role</th>
                <th className="py-4 px-6 text-left">Foto</th>
                <th className="py-4 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{member.username}</td>
                  <td className="py-4 px-6">{member.email}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        member.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={member.profile_picture}
                      alt={member.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
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

function AddMemberForm({ onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(formData);
  };

  return (
    <div className="bg-gray-100 border-2 border-amber-500 rounded-lg p-6 mb-8">
      <h4 className="font-bold text-xl mb-4">Tambah Anggota Baru</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg"
          />
          <select name="role" className="w-full p-3 border rounded-lg" required>
            <option value="siswa">Siswa</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="file"
            name="profile_picture"
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

function EditMemberForm({ member, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("currentImage", member.profile_picture);
    onSave(member.id, formData);
  };

  return (
    <div className="bg-gray-100 border-2 border-amber-500 rounded-lg p-6 mb-8">
      <h4 className="font-bold text-xl mb-4">Edit Anggota</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            defaultValue={member.username}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            defaultValue={member.email}
            required
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="role"
            defaultValue={member.role}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="siswa">Siswa</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="file"
            name="profile_picture"
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
