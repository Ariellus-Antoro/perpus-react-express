import { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const emptyForm = {
  user_id: '',
  book_id: '',
};

export default function KelolaPinjamanAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowings, setBorrowings] = useState([]);
  
  // Data Master untuk Dropdown
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Gunakan Promise.allSettled atau panggil terpisah agar tidak saling memblokir jika satu rute gagal
      const resBorrow = await api.get('/borrowings');
      if (resBorrow) setBorrowings(resBorrow.data || resBorrow);

      // Pastikan Anda memiliki endpoint ini di backend Anda
      const resUsers = await api.get('/users'); 
      if (resUsers) setUsers(resUsers.data || resUsers);

      const resBooks = await api.get('/books');
      if (resBooks) setBooks(resBooks.data || resBooks);
    } catch (err) {
      console.error("Gagal mengambil data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Pencarian (mencocokkan ID, Nama User, dan Judul Buku dari relasi Prisma)
  const filteredBorrowings = borrowings.filter(
    (b) =>
      b.id.toString().includes(searchQuery) ||
      (b.user?.full_name && b.user.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.book?.title && b.book.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAddModal = () => {
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Submit Tambah Pinjaman Baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hanya perlu mengirim book_id dan user_id, tanggal dll diatur backend
      await api.post('/borrowings', {
        user_id: formData.user_id,
        book_id: formData.book_id
      });
      alert('Transaksi peminjaman baru berhasil dicatat!');
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Gagal menambah transaksi peminjaman');
    }
  };

  // --- HANDLER AKSI SPESIFIK (MENGGANTIKAN FITUR EDIT MANUAL) ---

  const handleConfirmReturn = async (id) => {
    if (!window.confirm('Konfirmasi bahwa buku telah dikembalikan secara fisik?')) return;
    try {
      const res = await api.post(`/borrowings/${id}/return/confirm`);
      alert(res.message || 'Buku berhasil dikembalikan!');
      fetchData();
    } catch (err) {
      alert(err.message || 'Gagal mengonfirmasi pengembalian');
    }
  };

  const handleApproveExtend = async (id) => {
    if (!window.confirm('Setujui permintaan perpanjangan buku ini?')) return;
    try {
      await api.post(`/borrowings/${id}/extend/confirm`);
      alert('Perpanjangan berhasil disetujui!');
      fetchData();
    } catch (err) {
      alert(err.message || 'Gagal menyetujui perpanjangan');
    }
  };

  const handleRejectExtend = async (id) => {
    if (!window.confirm('Tolak permintaan perpanjangan buku ini?')) return;
    try {
      await api.post(`/borrowings/${id}/extend/reject`);
      alert('Perpanjangan ditolak!');
      fetchData();
    } catch (err) {
      alert(err.message || 'Gagal menolak perpanjangan');
    }
  };

  // Format Tanggal ISO ke format lokal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  // Warna badge berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case 'BORROWED': return 'bg-amber-200 text-stone-950 border-black';
      case 'RETURNED': return 'bg-stone-200 text-stone-600 border-stone-400';
      case 'LATE': return 'bg-rose-100 text-rose-800 border-rose-400';
      case 'LOST': return 'bg-stone-900 text-amber-100 border-black';
      case 'REQUEST_EXTEND': return 'bg-blue-100 text-blue-800 border-blue-400 font-pulse';
      case 'REJECTED': return 'bg-rose-100 text-rose-800 border-rose-400';
      default: return 'bg-amber-100 text-stone-950 border-black';
    }
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      <Header value={searchQuery} onChange={setSearchQuery} placeholder="Cari ID transaksi, nama, atau buku..." />

      <div>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Sirkulasi</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Kelola Peminjaman</h1>
        <p className="text-xs font-body text-stone-600">Atur peminjaman, tenggat waktu, dan pengembalian buku.</p>
      </div>

      <div className="flex justify-between items-center mb-4 pb-3 border-b border-black">
        <h2 className="font-headline font-bold text-stone-950 text-lg flex items-center gap-2">
          Daftar Pinjaman ({filteredBorrowings.length})
        </h2>
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
              <th className="p-3">ID / Tgl Pinjam</th>
              <th className="p-3">Peminjam</th>
              <th className="p-3">Judul Buku</th>
              <th className="p-3">Tenggat / Kembali</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {loading ? (
               <tr>
                 <td colSpan="6" className="p-6 text-center text-stone-500 font-body">Memuat data transaksi...</td>
               </tr>
            ) : filteredBorrowings.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-stone-500 font-body">Tidak ada data transaksi ditemukan.</td>
              </tr>
            ) : (
              filteredBorrowings.map((borrow) => (
                <tr key={borrow.id} className="hover:bg-amber-50/50 transition">
                  <td className="p-3">
                    <p className="font-mono text-xs font-bold text-stone-900">TRX-{borrow.id}</p>
                    <p className="text-xs text-stone-600 mt-0.5">{formatDate(borrow.borrow_date)}</p>
                  </td>
                  <td className="p-3 font-semibold text-stone-950">
                    {borrow.user?.full_name || `User ID: ${borrow.user_id}`}
                  </td>
                  <td className="p-3 text-stone-700">
                    {borrow.book?.title || `Book ID: ${borrow.book_id}`}
                  </td>
                  <td className="p-3">
                    <p className="text-xs text-rose-700 font-bold">Due: {formatDate(borrow.due_date)}</p>
                    {borrow.return_date && (
                      <p className="text-xs text-stone-500 mt-0.5">Ret: {formatDate(borrow.return_date)}</p>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] font-label font-bold rounded-full border shadow-xs ${getStatusColor(borrow.status)}`}>
                      {borrow.status}
                    </span>
                    {borrow.fine && borrow.fine.total_fines > 0 && (
                      <p className="text-[10px] text-rose-600 font-bold mt-1">
                        Denda: Rp{borrow.fine.total_fines}
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {/* Logika Tampilan Tombol Aksi berdasarkan Status */}
                    {(borrow.status === 'BORROWED' || borrow.status === 'LATE') && (
                      <button
                        onClick={() => handleConfirmReturn(borrow.id)}
                        className="px-3 py-1.5 text-xs font-label font-bold text-stone-950 bg-emerald-200 hover:bg-emerald-300 rounded-lg shadow-xs border border-black"
                      >
                        Kembalikan
                      </button>
                    )}
                    {borrow.status === 'REQUEST_EXTEND' && (
                      <>
                        <button
                          onClick={() => handleApproveExtend(borrow.id)}
                          className="px-3 py-1.5 text-xs font-label font-bold text-stone-950 bg-blue-200 hover:bg-blue-300 rounded-lg shadow-xs border border-black"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleRejectExtend(borrow.id)}
                          className="px-3 py-1.5 text-xs font-label font-bold text-rose-900 bg-rose-200 hover:bg-rose-300 rounded-lg shadow-xs border border-black"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {/* Jika status RETURNED/REJECTED, tidak ada aksi yg perlu dilakukan */}
                    {['RETURNED', 'REJECTED'].includes(borrow.status) && (
                      <span className="text-xs text-stone-400 italic">Selesai</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM (HANYA UNTUK CREATE PEMINJAMAN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black w-full max-w-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto text-stone-900 font-body">
            <div className="flex justify-between items-center mb-4 border-b border-black pb-3">
              <h3 className="text-lg font-headline font-bold text-stone-950">
                ➕ Catat Transaksi Baru
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-600 hover:text-stone-950 font-bold text-xl">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    // Asumsi struktur data user backend memiliki field full_name / nik / email
                    <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
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
                    // Menampilkan stok tersedia agar Admin tahu
                    <option key={b.id} value={b.id} disabled={b.available <= 0}>
                      {b.title} {b.available <= 0 ? '(STOK HABIS)' : `(Sisa: ${b.available})`}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-stone-500 mt-1">Tanggal pinjam dan tenggat (7 hari) akan diatur otomatis oleh sistem.</p>
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
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-100 border border-black rounded-xl hover:bg-amber-200 shadow-xs"
                >
                  Catat Pinjaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}