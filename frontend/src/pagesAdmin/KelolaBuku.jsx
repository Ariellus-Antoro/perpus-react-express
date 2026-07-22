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
  cover_file: null,
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
    setFormData({ ...book, cover_file: null });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File Change Handler untuk Cover Buku
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cover_file: file }));
    }
  };

  // Submit Handler (Create & Update dengan FormData agar mendukung file upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('publisher', formData.publisher || '');
    data.append('category_id', formData.category_id);
    data.append('year', formData.year || '');
    data.append('total_stock', formData.total_stock);
    data.append('description', formData.description || '');
    
    if (formData.cover_file) {
      data.append('book_cover', formData.cover_file);
    }

    const authHeaderMultipart = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      if (isEditing) {
        // UPDATE BUKU
        await axios.post(`${API_BASE_URL}/admin/books/${formData.id}?_method=PUT`, data, authHeaderMultipart);
        alert('Buku berhasil diperbarui!');
      } else {
        // CREATE BUKU
        await axios.post(`${API_BASE_URL}/admin/books`, data, authHeaderMultipart);
        alert('Buku baru berhasil ditambahkan!');
      }
      fetchBooksAndCategories();
      setIsModalOpen(false);
    } catch (err) {
      // Demo Fallback Mode
      const coverUrl = formData.cover_file ? URL.createObjectURL(formData.cover_file) : formData.book_cover;
      if (isEditing) {
        setBooks((prev) => prev.map((b) => (b.id === formData.id ? { ...formData, book_cover: coverUrl } : b)));
        alert('[Demo Mode] Berhasil mengedit data buku!');
      } else {
        const newBook = { ...formData, id: Date.now(), book_cover: coverUrl };
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
    <div className="space-y-6 text-stone-900 font-body">
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari judul atau penulis buku..." />

      {/* Banner Section */}
      <div>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Inventaris</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Kelola Koleksi Buku</h1>
        <p className="text-xs font-body text-stone-600">Tambah, perbarui, dan atur stok buku perpustakaan.</p>
      </div>

      {/* Tabel Data Buku */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
        <h2 className="font-headline font-bold text-stone-950 text-lg flex items-center gap-2">
          Daftar Buku ({filteredBooks.length})
        </h2>

        {/*button tambah*/}
        <button
          onClick={handleOpenAddModal}
          className="bg-amber-100 hover:bg-amber-200 text-stone-950 font-label font-bold px-4 py-2.5 rounded-xl border border-black shadow-xs transition flex items-center gap-2 text-sm"
        >
          <span>+</span> Tambah Buku
        </button>
      </div>

      <div className="overflow-x-auto border border-black bg-white shadow-xs">
        <table className="w-full text-left text-sm font-body">
          <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Judul & Penulis</th>
              <th className="p-3">Penerbit / Tahun</th>
              <th className="p-3">Stok (Total/Sisa)</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-stone-500 font-body">Tidak ada data buku ditemukan.</td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-amber-50/50 transition">
                  <td className="p-3">
                    <img
                      src={book.book_cover || 'https://via.placeholder.com/100x140'}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg border border-black shadow-xs"
                    />
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-stone-950">{book.title}</p>
                    <p className="text-xs text-stone-600">Oleh: {book.author}</p>
                  </td>
                  <td className="p-3 text-stone-700">
                    <p className="font-medium">{book.publisher || '-'}</p>
                    <p className="text-xs text-stone-500">Tahun: {book.year || '-'}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-xs font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                      {book.total_stock} Total / <span className="text-amber-800">{book.available_stock ?? book.available} Sisa</span>
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(book)}
                      className="px-3 py-1.5 text-xs font-label font-bold text-stone-950 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-xs border border-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
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

      {/* MODAL FORM (CREATE / EDIT BUKU) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black w-full max-w-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto text-stone-900 font-body">
            <div className="flex justify-between items-center mb-4 border-b border-black pb-3">
              <h3 className="text-lg font-headline font-bold text-stone-950">
                {isEditing ? '✏️ Edit Data Buku' : '➕ Tambah Buku Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-600 hover:text-stone-950 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Judul Buku</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Penulis</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Penerbit</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Kategori</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Tahun Terbit</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Total Stok</label>
                  <input
                    type="number"
                    name="total_stock"
                    value={formData.total_stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Upload File Cover Buku</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-stone-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-black file:text-xs file:font-semibold file:bg-amber-100 hover:file:bg-amber-200 file:cursor-pointer border border-black rounded-xl bg-white shadow-xs p-1"
                />
              </div>

              <div>
                <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Deskripsi Ringkas</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-black font-label">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 border border-black rounded-xl hover:bg-stone-100 shadow-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-100 border border-black rounded-xl hover:bg-amber-200 shadow-xs"
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