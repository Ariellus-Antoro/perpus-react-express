import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Pastikan port 8000 ini sudah sesuai dengan port server backend Express milikmu
const API_BASE_URL = 'http://localhost:8000/api';

const emptyForm = {
  id: null,
  nik: '',
  email: '',
  password: '',
  full_name: '',
  address: '',
  phone: '',
  ktp: null,
  role: 'MEMBER',
  account_status: 'APPROVED',
};

export default function KelolaMemberAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]); // Dikantongi array kosong agar murni dari MySQL
  const [loading, setLoading] = useState(false);

  // State Modal (Tambah & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/users`, getAuthHeader());
      if (res.data) {
        // Ambil data array dari respons backend, proteksi dengan Array.isArray agar tidak crash
        const rawData = res.data.data || res.data;
        setMembers(Array.isArray(rawData) ? rawData : []);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari MySQL:", err.response?.data?.message || err.message);
      alert("Gagal memuat data dari server. Pastikan backend aktif!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      (m.full_name && m.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.nik && m.nik.includes(searchQuery)) ||
      (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAddModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setFormData({ ...member, password: '', ktp: null });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, ktp: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append('full_name', formData.full_name);
    payload.append('nik', formData.nik);
    payload.append('email', formData.email);
    payload.append('address', formData.address || '');
    payload.append('phone', formData.phone || '');
    payload.append('role', formData.role);
    payload.append('account_status', formData.account_status);

    if (formData.password) {
      payload.append('password', formData.password);
    }

    if (formData.ktp) {
      payload.append('ktp', formData.ktp);
    }

    try {
      if (isEditing) {
        // PERBAIKAN: Gunakan axios.put langsung ke ID user (tanpa ?_method=PUT)
        await axios.put(`${API_BASE_URL}/admin/users/${formData.id}`, payload, {
          headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Data pengguna berhasil diperbarui di database!');
      } else {
        // PERBAIKAN: Gunakan axios.post untuk membuat user baru
        await axios.post(`${API_BASE_URL}/admin/users`, payload, {
          headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Pengguna baru berhasil ditambahkan ke database!');
      }
      fetchMembers();
      setIsModalOpen(false);
    } catch (err) {
      // PERBAIKAN: Menampilkan error asli dari MySQL / Express
      const errorMsg = err.response?.data?.message || err.message || "Gagal menyimpan data";
      alert(`ERROR BACKEND: ${errorMsg}`);
      console.error("Detail error submit:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus / memblokir pengguna ini?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/users/${id}`, getAuthHeader());
      alert('Pengguna berhasil dihapus dari database!');
      fetchMembers();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Gagal menghapus data";
      alert(`ERROR BACKEND: ${errorMsg}`);
      console.error("Detail error delete:", err);
    }
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari nama, NIK, atau email..." />

      {/* Banner Section */}
      <div>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Pengguna (Full Access)</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Kelola Data Pengguna</h1>
        <p className="text-xs font-body text-stone-600">Pantau, perbarui, dan atur detail profil akun seluruh pengguna.</p>
      </div>

      {/* Tabel Data Anggota/Pengguna */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
        <h2 className="font-headline font-bold text-stone-950 text-lg flex items-center gap-2">
          Daftar Pengguna ({filteredMembers.length})
        </h2>
        {loading && <span className="text-xs font-label text-amber-800 animate-pulse font-semibold">Memuat data...</span>}
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-100 hover:bg-amber-200 text-stone-950 font-label font-bold px-4 py-2.5 rounded-xl border border-black shadow-xs transition flex items-center gap-2 text-sm"
        >
          <span>+</span> Tambah Pengguna
        </button>
      </div>

      <div className="overflow-x-auto border border-black bg-white shadow-xs">
        <table className="w-full text-left text-sm font-body">
          <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
            <tr>
              <th className="p-3">Info Pengguna</th>
              <th className="p-3">Kontak & Alamat</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status Akun</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-stone-500 font-body">
                  {loading ? 'Sedang mengambil data dari database...' : 'Tidak ada data pengguna ditemukan di database.'}
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-amber-50/50 transition">
                  <td className="p-3">
                    <p className="font-bold text-stone-950">{member.full_name}</p>
                    <p className="text-xs font-mono text-stone-600">NIK: {member.nik}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-stone-900 font-medium">{member.email}</p>
                    <p className="text-xs text-stone-600">{member.phone || '-'}</p>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] font-label font-bold rounded-lg border ${member.role === 'ADMIN' ? 'bg-amber-200 text-stone-950 border-black' : 'bg-stone-100 text-stone-700 border-stone-400'}`}>
                      {member.role || 'MEMBER'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-label font-bold rounded-full border ${
                        member.account_status === 'APPROVED' || member.account_status === 'AKTIF'
                          ? 'bg-amber-200 text-stone-950 border-black'
                          : member.account_status === 'PENDING'
                          ? 'bg-amber-100 text-amber-900 border-black'
                          : 'bg-rose-100 text-rose-800 border-rose-400'
                      }`}
                    >
                      {member.account_status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(member)}
                      className="px-3 py-1.5 text-xs font-label font-bold text-stone-950 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-xs border border-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-400 rounded-lg hover:bg-rose-50 shadow-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM (CREATE / EDIT PENGGUNA) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto text-stone-900 font-body">
            <div className="flex justify-between items-center mb-4 border-b border-black pb-3">
              <h3 className="text-lg font-headline font-bold text-stone-950">
                {isEditing ? '✏️ Edit Data Pengguna' : '➕ Tambah Pengguna Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-600 hover:text-stone-950 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Nama Lengkap (full_name)</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Nomor Induk Kependudukan (nik)</label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik || ''}
                    onChange={handleInputChange}
                    required
                    maxLength="20"
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Nomor HP (phone)</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    maxLength="15"
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Alamat Lengkap (address)</label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">
                    Upload Foto KTP {isEditing && <span className="text-stone-500 font-normal">(Abaikan jika tidak ingin mengubah)</span>}
                  </label>
                  <input
                    type="file"
                    name="ktp"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3.5 py-1.5 text-sm border border-black rounded-xl bg-white focus:outline-none text-stone-900 shadow-xs file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border file:border-black file:text-xs file:font-label file:font-bold file:bg-amber-100 file:text-stone-950 hover:file:bg-amber-200 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={isEditing ? "Kosongkan jika tidak ingin diubah" : "Masukkan password awal"}
                    value={formData.password || ''}
                    onChange={handleInputChange}
                    required={!isEditing}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-label">
                <div>
                  <label className="block text-xs font-semibold text-stone-900 mb-1">Role Akun</label>
                  <select
                    name="role"
                    value={formData.role || 'MEMBER'}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 font-semibold shadow-xs"
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Status Akun</label>
                  <select
                    name="account_status"
                    value={formData.account_status || 'APPROVED'}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 font-semibold shadow-xs"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-black mt-4 font-label">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 border border-black rounded-xl hover:bg-stone-100 shadow-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-100 border border-black rounded-xl hover:bg-amber-200 shadow-xs disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}