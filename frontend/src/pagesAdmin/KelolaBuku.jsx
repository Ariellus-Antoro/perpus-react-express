import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

//Dummy
const initialCategories = [
  { id: 1, name: 'Fiksi' },
  { id: 2, name: 'Non-Fiksi' },
  { id: 3, name: 'Sains' },
  { id: 4, name: 'Sejarah' },
];

const fallbackBooks = [
  {
    id: 1,
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    category_id: 1,
    category_name: 'Fiksi',
    year: '2005',
    total_stock: 12,
    available_stock: 8,
    book_cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=200&q=80',
    description: 'Kisah sekelompok anak di Belitung yang berjuang untuk tetap sekolah.',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Gramedia',
    category_id: 2,
    category_name: 'Non-Fiksi',
    year: '2018',
    total_stock: 10,
    available_stock: 5,
    book_cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80',
    description: 'Perubahan kecil yang memberikan hasil luar biasa.',
  },
];

const emptyForm = {
  id: null,
  title: '',
  author: '',
  publisher: '',
  category_id: '',
  year: '',
  total_stock: 0,
  available_stock: 0,
  book_cover: '',
  description: '',
};

export default function KelolaBukuAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState(fallbackBooks);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // State Modal Form (Tambah / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch Data Buku & Kategori dari Backend
  const fetchBooksAndCategories = async () => {
    setLoading(true);
    try {
      const [resBooks, resCategories] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/books`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/categories`, getAuthHeader()),
      ]);
      if (resBooks.data) setBooks(resBooks.data);
      if (resCategories.data) setCategories(resCategories.data);
    } catch (err) {
      console.warn("Backend offline, menggunakan data fallback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksAndCategories();
  }, []);

  // Filter Buku berdasarkan Search Bar
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Modal untuk Tambah Buku Baru
  const handleOpenAddModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal untuk Edit Buku
  const handleOpenEditModal = (book) => {
    setFormData(book);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE BUKU
        await axios.put(`${API_BASE_URL}/admin/books/${formData.id}`, formData, getAuthHeader());
        alert('Buku berhasil diperbarui!');
      } else {
        // CREATE BUKU
        await axios.post(`${API_BASE_URL}/admin/books`, formData, getAuthHeader());
        alert('Buku baru berhasil ditambahkan!');
      }
      fetchBooksAndCategories();
      setIsModalOpen(false);
    } catch (err) {
      // Demo Fallback Mode
      if (isEditing) {
        setBooks((prev) => prev.map((b) => (b.id === formData.id ? { ...formData } : b)));
        alert('[Demo Mode] Berhasil mengedit data buku!');
      } else {
        const newBook = { ...formData, id: Date.now() };
        setBooks((prev) => [newBook, ...prev]);
        alert('[Demo Mode] Berhasil menambah buku baru!');
      }
      setIsModalOpen(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/books/${id}`, getAuthHeader());
      alert('Buku berhasil dihapus!');
      fetchBooksAndCategories();
    } catch (err) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      alert(`[Demo Mode] Buku dengan ID ${id} dihapus`);
    }
  };

  return (
    <div className="space-y-6">
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari judul atau penulis buku..." />
        
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-6 rounded-2xl border border-amber-500/30 shadow-md text-white flex justify-between items-center">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400">Manajemen Inventaris</span>
          <h1 className="text-2xl font-bold text-amber-100 mt-0.5">Kelola Koleksi Buku</h1>
          <p className="text-xs text-emerald-200/80">Tambah, perbarui, dan atur stok buku perpustakaan.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-4 py-2.5 rounded-xl border border-amber-500 shadow-md transition flex items-center gap-2 text-sm"
        >
          <span>+</span> Tambah Buku
        </button>
      </div>

      {/* Tabel Data Buku */}
      <div className="bg-white border border-emerald-900/15 rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-emerald-900/10">
          <h2 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Daftar Buku ({filteredBooks.length})
          </h2>
          {loading && <span className="text-xs text-amber-600 animate-pulse font-semibold">Memuat data...</span>}
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-950 text-amber-300 border-b border-emerald-900">
              <tr>
                <th className="p-3">Cover</th>
                <th className="p-3">Judul & Penulis</th>
                <th className="p-3">Penerbit / Tahun</th>
                <th className="p-3">Stok (Total/Sisa)</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/10">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-emerald-800/60">Tidak ada data buku ditemukan.</td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-emerald-50/50 transition">
                    <td className="p-3">
                      <img
                        src={book.book_cover || 'https://via.placeholder.com/100x140'}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-lg border border-amber-500/30 shadow-sm"
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-emerald-950">{book.title}</p>
                      <p className="text-xs text-emerald-800/70">Oleh: {book.author}</p>
                    </td>
                    <td className="p-3 text-emerald-900/80">
                      <p className="font-medium">{book.publisher || '-'}</p>
                      <p className="text-xs text-emerald-800/60">Tahun: {book.year || '-'}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full">
                        {book.total_stock} Total / <span className="text-amber-600">{book.available_stock ?? book.available} Sisa</span>
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(book)}
                        className="px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm border border-amber-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
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

      {/* MODAL FORM (CREATE / EDIT BUKU) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-emerald-900/20 w-full max-w-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-emerald-900/10 pb-3">
              <h3 className="text-lg font-bold text-emerald-950">
                {isEditing ? '✏️ Edit Data Buku' : '➕ Tambah Buku Baru'}
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
                <label className="block text-xs font-semibold text-emerald-950 mb-1">Judul Buku</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">Penulis</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">Penerbit</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">Kategori</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">Tahun Terbit</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">Total Stok</label>
                  <input
                    type="number"
                    name="total_stock"
                    value={formData.total_stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-950 mb-1">URL Cover Buku (Image Link)</label>
                <input
                  type="text"
                  name="book_cover"
                  placeholder="https://..."
                  value={formData.book_cover}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-950 mb-1">Deskripsi Ringkas</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-sm border border-emerald-900/15 rounded-xl bg-emerald-50/40 focus:border-amber-500 focus:outline-none text-emerald-950"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-emerald-900/10">
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
                  {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}