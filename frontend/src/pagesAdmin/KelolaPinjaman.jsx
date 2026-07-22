import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

// --- FALLBACK DATA DEMO ---
const fallbackUsers = [
  { id: 1, full_name: 'Ahmad Rizky', nik: '3374012304900001' },
  { id: 2, full_name: 'Budi Santoso', nik: '3374012304900002' },
];

const fallbackBooks = [
  { id: 1, title: 'Laskar Pelangi', available_stock: 5 },
  { id: 2, title: 'Atomic Habits', available_stock: 3 },
];

const fallbackBorrowings = [
  {
    id: 'TRX-26072026-001',
    user_id: 1,
    book_id: 1,
    user_name: 'Ahmad Rizky',
    book_title: 'Laskar Pelangi',
    borrow_date: '2026-07-20',
    due_date: '2026-07-27',
    return_date: '',
    status: 'BORROWED'
  },
  {
    id: 'TRX-26072026-002',
    user_id: 2,
    book_id: 2,
    user_name: 'Budi Santoso',
    book_title: 'Atomic Habits',
    borrow_date: '2026-07-21',
    due_date: '2026-07-28',
    return_date: '2026-07-22',
    status: 'RETURNED'
  },
];

const emptyForm = {
  id: '',
  user_id: '',
  book_id: '',
  borrow_date: new Date().toISOString().split('T')[0],
  due_date: '',
  return_date: '',
  status: 'PENDING',
};

export default function KelolaPinjamanAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowings, setBorrowings] = useState(fallbackBorrowings);

  // Data Master untuk Dropdown
  const [users, setUsers] = useState(fallbackUsers);
  const [books, setBooks] = useState(fallbackBooks);

  const [loading, setLoading] = useState(false);

  // State Modal (Tambah & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fetch Data Peminjaman beserta Data Master User & Buku
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resBorrow, resUsers, resBooks] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/borrowings`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/admin/users`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/admin/books`, getAuthHeader()),
      ]);
      if (resBorrow.data) setBorrowings(resBorrow.data);
      if (resUsers.data) setUsers(resUsers.data);
      if (resBooks.data) setBooks(resBooks.data);
    } catch (err) {
      console.warn("Backend offline, menggunakan data fallback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pencarian berdasarkan ID Transaksi, Nama Peminjam, atau Judul Buku
  const filteredBorrowings = borrowings.filter(
    (b) =>
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.user_name && b.user_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.book_title && b.book_title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAddModal = () => {
    const autoId = `TRX-${Date.now()}`;
    setFormData({ ...emptyForm, id: autoId });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (borrow) => {
    setFormData(borrow);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/admin/borrowings/${formData.id}`, formData, getAuthHeader());
        alert('Data transaksi peminjaman berhasil diperbarui!');
      } else {
        await axios.post(`${API_BASE_URL}/admin/borrowings`, formData, getAuthHeader());
        alert('Transaksi peminjaman baru berhasil ditambahkan!');
      }
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      // Demo Fallback Mode
      if (isEditing) {
        setBorrowings((prev) => prev.map((b) => (b.id === formData.id ? { ...formData, user_name: users.find(u => u.id == formData.user_id)?.full_name, book_title: books.find(bk => bk.id == formData.book_id)?.title } : b)));
        alert('[Demo Mode] Berhasil mengedit transaksi!');
      } else {
        const newBorrow = {
          ...formData,
          user_name: users.find(u => u.id == formData.user_id)?.full_name || 'User Dummy',
          book_title: books.find(bk => bk.id == formData.book_id)?.title || 'Buku Dummy',
        };
        setBorrowings((prev) => [newBorrow, ...prev]);
        alert('[Demo Mode] Berhasil menambah transaksi baru!');
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data transaksi ini secara permanen?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/borrowings/${id}`, getAuthHeader());
      alert('Data transaksi berhasil dihapus!');
      fetchData();
    } catch (err) {
      setBorrowings((prev) => prev.filter((b) => b.id !== id));
      alert(`[Demo Mode] Transaksi dengan ID ${id} berhasil dihapus`);
    }
  };

  // Warna badge berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case 'BORROWED': return 'bg-amber-200 text-stone-950 border-black';
      case 'RETURNED': return 'bg-amber-200 text-stone-950 border-black';
      case 'LATE': return 'bg-rose-100 text-rose-800 border-rose-400';
      case 'LOST': return 'bg-stone-900 text-amber-100 border-black';
      case 'RETURN_REQUESTED': return 'bg-amber-100 text-stone-950 border-black';
      case 'REJECTED': return 'bg-rose-100 text-rose-800 border-rose-400';
      default: return 'bg-amber-100 text-stone-950 border-black';
    }
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      {/* Header Search */}
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari ID transaksi, nama, atau buku..." />

      {/* Banner Section */}
      <div>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Sirkulasi</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Kelola Peminjaman</h1>
        <p className="text-xs font-body text-stone-600">Atur peminjaman, tenggat waktu, dan pengembalian buku.</p>
      </div>



      {/* Tabel Data Peminjaman */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
          <h2 className="font-headline font-bold text-stone-950 text-lg flex items-center gap-2">
            Daftar Pinjaman ({filteredBorrowings.length})
          </h2>
          {loading && <span className="text-xs font-label text-amber-800 animate-pulse font-semibold">Memuat data...</span>}
          <button
            onClick={handleOpenAddModal}
            className="bg-amber-100 hover:bg-amber-200 text-stone-950 font-label font-bold px-4 py-2.5 rounded-xl border border-black shadow-xs transition flex items-center gap-2 text-sm"
          >
            <span>+</span> Catat Pinjaman
          </button>
        </div>

        <div className="overflow-x-auto border border-black bg-white shadow-xs">
          <table className="w-full text-left text-sm font-body">
            <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
              <tr>
                <th className="p-3">ID Transaksi</th>
                <th className="p-3">Peminjam</th>
                <th className="p-3">Judul Buku</th>
                <th className="p-3">Tgl Pinjam - Tenggat</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {filteredBorrowings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-stone-500 font-body">Tidak ada data transaksi ditemukan.</td>
                </tr>
              ) : (
                filteredBorrowings.map((borrow) => (
                  <tr key={borrow.id} className="hover:bg-amber-50/50 transition">
                    <td className="p-3 font-mono text-xs font-bold text-stone-900">{borrow.id}</td>
                    <td className="p-3 font-semibold text-stone-950">{borrow.user_name || `User ID: ${borrow.user_id}`}</td>
                    <td className="p-3 text-stone-700">{borrow.book_title || `Book ID: ${borrow.book_id}`}</td>
                    <td className="p-3">
                      <p className="text-stone-900 font-medium">{borrow.borrow_date}</p>
                      <p className="text-xs text-rose-700 font-semibold mt-0.5">s/d {borrow.due_date}</p>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 text-[10px] font-label font-bold rounded-full border shadow-xs ${getStatusColor(borrow.status)}`}>
                        {borrow.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(borrow)}
                        className="px-3 py-1.5 text-xs font-label font-bold text-stone-950 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-xs border border-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(borrow.id)}
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

      {/* MODAL FORM (CREATE / EDIT PEMINJAMAN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto text-stone-900 font-body">
            <div className="flex justify-between items-center mb-4 border-b border-black pb-3">
              <h3 className="text-lg font-headline font-bold text-stone-950">
                {isEditing ? '✏️ Edit Transaksi' : '➕ Catat Transaksi Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-600 hover:text-stone-950 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: ID Transaksi */}
              <div>
                <label className="block text-xs font-label font-semibold text-stone-900 mb-1">ID Transaksi (VARCHAR PK)</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  disabled={isEditing}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:outline-none shadow-xs ${isEditing
                      ? 'bg-stone-200 border-black text-stone-500 cursor-not-allowed'
                      : 'border-black bg-white text-stone-900'
                    }`}
                />
              </div>

              {/* Row 2: Relasi User dan Buku */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Member (Peminjam)</label>
                  <select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  >
                    <option value="">-- Pilih Member --</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.full_name} (NIK: {u.nik})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Buku yang Dipinjam</label>
                  <select
                    name="book_id"
                    value={formData.book_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  >
                    <option value="">-- Pilih Buku --</option>
                    {books.map(b => (
                      <option key={b.id} value={b.id}>{b.title} (Sisa: {b.available_stock})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Tanggal Pinjam & Tenggat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Tanggal Pinjam (borrow_date)</label>
                  <input
                    type="date"
                    name="borrow_date"
                    value={formData.borrow_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Tenggat Waktu (due_date)</label>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                </div>
              </div>

              {/* Row 4: Status & Tanggal Kembali (Opsional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Status Transaksi</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 font-bold shadow-xs"
                  >
                    <option value="PENDING">PENDING (Menunggu Approval)</option>
                    <option value="BORROWED">BORROWED (Sedang Dipinjam)</option>
                    <option value="RETURN_REQUESTED">RETURN REQUESTED (Minta Kembali)</option>
                    <option value="RETURNED">RETURNED (Sudah Dikembalikan)</option>
                    <option value="LATE">LATE (Terlambat)</option>
                    <option value="LOST">LOST (Hilang)</option>
                    <option value="REJECTED">REJECTED (Ditolak)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Tanggal Dikembalikan (Opsional)</label>
                  <input
                    type="date"
                    name="return_date"
                    value={formData.return_date || ''}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">Kosongkan jika buku belum dikembalikan (NULL).</p>
                </div>
              </div>

              {/* Action Buttons */}
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
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-100 border border-black rounded-xl hover:bg-amber-200 shadow-xs"
                >
                  {isEditing ? 'Simpan Perubahan' : 'Catat Pinjaman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}