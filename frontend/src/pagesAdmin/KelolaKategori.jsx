import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

//Data Dummy
const fallbackCategories = [
  { id: 1, category_name: 'Fiksi', is_active: true, created_at: '2026-07-01 08:00:00' },
  { id: 2, category_name: 'Non-Fiksi', is_active: true, created_at: '2026-07-01 08:10:00' },
  { id: 3, category_name: 'Sains & Teknologi', is_active: true, created_at: '2026-07-01 08:20:00' },
  { id: 4, category_name: 'Sejarah', is_active: true, created_at: '2026-07-01 08:30:00' },
  { id: 5, category_name: 'Pemrograman', is_active: false, created_at: '2026-07-01 08:40:00' },
];

const emptyForm = {
  id: null,
  category_name: '',
  is_active: true,
};

export default function KelolaKategoriAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(false);

  // State Modal Form (Tambah / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch Data Kategori dari Backend
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/categories`, getAuthHeader());
      if (res.data) setCategories(res.data);
    } catch (err) {
      console.warn("Backend offline, menggunakan data fallback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter Kategori berdasarkan Search Bar
  const filteredCategories = categories.filter((c) =>
    c.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Modal Tambah
  const handleOpenAddModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal Edit
  const handleOpenEditModal = (category) => {
    setFormData(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit Handler (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE KATEGORI
        await axios.put(`${API_BASE_URL}/admin/categories/${formData.id}`, formData, getAuthHeader());
        alert('Kategori berhasil diperbarui!');
      } else {
        // CREATE KATEGORI
        await axios.post(`${API_BASE_URL}/admin/categories`, formData, getAuthHeader());
        alert('Kategori baru berhasil ditambahkan!');
      }
      fetchCategories();
      setIsModalOpen(false);
    } catch (err) {
      // Demo Fallback Mode
      if (isEditing) {
        setCategories((prev) => prev.map((c) => (c.id === formData.id ? { ...formData } : c)));
        alert('[Demo Mode] Berhasil mengedit kategori!');
      } else {
        const newCategory = {
          ...formData,
          id: Date.now(),
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
        setCategories((prev) => [newCategory, ...prev]);
        alert('[Demo Mode] Berhasil menambah kategori baru!');
      }
      setIsModalOpen(false);
    }
  };

  // Soft Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/categories/${id}`, getAuthHeader());
      alert('Kategori berhasil dihapus!');
      fetchCategories();
    } catch (err) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      alert(`[Demo Mode] Kategori dengan ID ${id} berhasil dihapus`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Search khusus Admin */}
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari nama kategori..." />
        
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-6 rounded-2xl border border-amber-500/30 shadow-md text-white flex justify-between items-center">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400">Manajemen Pengelompokan</span>
          <h1 className="text-2xl font-bold text-amber-100 mt-0.5">Kelola Kategori Buku</h1>
          <p className="text-xs text-emerald-200/80">Atur taksonomi dan status keaktifan kategori koleksi buku.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-4 py-2.5 rounded-xl border border-amber-500 shadow-md transition flex items-center gap-2 text-sm"
        >
          <span>+</span> Tambah Kategori
        </button>
      </div>

      {/* Tabel Data Kategori */}
      <div className="bg-white border border-emerald-900/15 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-emerald-900/10">
          <h2 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Daftar Kategori ({filteredCategories.length})
          </h2>
          {loading && <span className="text-xs text-amber-600 animate-pulse font-semibold">Memuat data...</span>}
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-950 text-amber-300 border-b border-emerald-900">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama Kategori</th>
                <th className="p-3">Status Aktif</th>
                <th className="p-3">Tanggal Dibuat</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/10 text-emerald-950">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-emerald-800/60">Tidak ada data kategori ditemukan.</td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-emerald-50/50 transition">
                    <td className="p-3 font-mono text-xs text-emerald-800/70">#{cat.id}</td>
                    <td className="p-3 font-bold text-emerald-950">{cat.category_name}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                          cat.is_active
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        {cat.is_active ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </td>
                    <td className="p-3 text-emerald-900/70 text-xs">{cat.created_at || '-'}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(cat)}
                        className="px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm border border-amber-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 border border-rose-300 rounded-lg hover:bg-rose-50"
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
      </div>

      {/* MODAL FORM (CREATE / EDIT KATEGORI) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-emerald-900/20 w-full max-w-md p-6 shadow-xl text-emerald-950">
            <div className="flex justify-between items-center mb-4 border-b border-emerald-900/10 pb-3">
              <h3 className="text-lg font-bold text-emerald-950">
                {isEditing ? '✏️ Edit Kategori' : '➕ Tambah Kategori Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-emerald-800/60 hover:text-emerald-950 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-950 mb-1">Nama Kategori</label>
                <input
                  type="text"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleInputChange}
                  placeholder="Contoh: Sains, Sejarah, Fiksi..."
                  required
                  className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="is_active" className="text-sm font-semibold text-emerald-950 cursor-pointer">
                  Kategori Aktif (Dapat dipilih saat input buku)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-emerald-900/10 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-emerald-900 border border-emerald-900/20 rounded-xl hover:bg-emerald-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-amber-400 bg-emerald-950 border border-amber-500/40 rounded-xl hover:bg-emerald-900 shadow-md"
                >
                  {isEditing ? 'Simpan Perubahan' : 'Tambah Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}