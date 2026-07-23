import { useState, useEffect } from 'react';
import Header from '../components/Header';
import api from '../services/api';

const ASSET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const emptyForm = {
  id: null,
  title: '',
  author: '',
  publisher: '',
  category_id: '',
  year: '',
  total_stock: 0,
  book_cover: '',
  cover_file: null,
  description: '',
};

export default function KelolaBukuAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  // PERBAIKAN: Memisahkan fetching kategori dan buku agar jika salah satu gagal, 
  // yang lain tetap berhasil dimuat (mencegah dropdown kosong).
  const fetchBooksAndCategories = async () => {
    setLoading(true);

    // 1. Ambil Data Kategori
    try {
      const resCategories = await api.get('/categories');
      const catData = resCategories.data || resCategories;
      // Pastikan data yang diset adalah format Array
      if (Array.isArray(catData)) setCategories(catData);
    } catch (err) {
      console.error("Gagal mengambil data kategori:", err.message);
    }

    // 2. Ambil Data Buku
    try {
      // Disesuaikan menjadi /books (menghapus /admin) agar seragam dengan rute kategori
      const resBooks = await api.get('/books');
      const bookData = resBooks.data || resBooks;
      if (Array.isArray(bookData)) setBooks(bookData);
    } catch (err) {
      console.error("Gagal mengambil data buku:", err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBooksAndCategories();
  }, []);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setFormData({ 
      ...book, 
      category_id: book.category_id || '', 
      cover_file: null 
    });
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
      setFormData((prev) => ({ ...prev, cover_file: file }));
    }
  };

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

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    try {
      if (isEditing) {
        // PERBAIKAN: Disesuaikan menjadi rute /books
        await api.put(`/books/${formData.id}`, data, config);
        alert('Buku berhasil diperbarui!');
      } else {
        await api.post('/books', data, config);
        alert('Buku baru berhasil ditambahkan!');
      }
      fetchBooksAndCategories();
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Terjadi kesalahan saat menyimpan data buku.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
    try {
      // PERBAIKAN: Disesuaikan menjadi rute /books
      await api.delete(`/books/${id}`);
      alert('Buku berhasil dihapus!');
      fetchBooksAndCategories();
    } catch (err) {
      alert(err.message || 'Gagal menghapus buku.');
    }
  };

  const getCoverImage = (coverPath) => {
    if (!coverPath) return 'https://via.placeholder.com/100x140';
    if (coverPath.startsWith('http')) return coverPath;
    return `${ASSET_URL}/uploads/${coverPath}`;
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari judul atau penulis buku..." />

      <div>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Inventaris</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Kelola Koleksi Buku</h1>
        <p className="text-xs font-body text-stone-600">Tambah, perbarui, dan atur stok buku perpustakaan.</p>
      </div>

      <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
        <h2 className="font-headline font-bold text-stone-950 text-lg flex items-center gap-2">
          Daftar Buku ({filteredBooks.length})
        </h2>
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
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-stone-500 font-body">Memuat data buku...</td>
              </tr>
            ) : filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-stone-500 font-body">Tidak ada data buku ditemukan.</td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-amber-50/50 transition">
                  <td className="p-3">
                    <img
                      src={getCoverImage(book.book_cover)}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg border border-black shadow-xs"
                    />
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-stone-950 text-base">{book.title}</p>
                    <p className="text-xs text-stone-600">Oleh: {book.author}</p>
                    {/* PERBAIKAN: Menggunakan .category_name sesuai struktur relasi dari Prisma */}
                    <span className="inline-block mt-1 px-2 py-0.5 bg-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {book.category?.category_name || 'Tanpa Kategori'}
                    </span>
                  </td>
                  <td className="p-3 text-stone-700">
                    <p className="font-medium">{book.publisher || '-'}</p>
                    <p className="text-xs text-stone-500">Tahun: {book.year || '-'}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-xs font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                      {book.total_stock} Total / <span className="text-amber-800">{book.available} Sisa</span>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black w-full max-w-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto text-stone-900 font-body">
            <div className="flex justify-between items-center mb-4 border-b border-black pb-3">
              <h3 className="text-lg font-headline font-bold text-stone-950">
                {isEditing ? 'Edit Data Buku' : 'Tambah Buku Baru'}
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
                      <option key={c.id} value={c.id}>{c.category_name}</option>
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