import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

// Fallback data
const fallbackStats = {
  pendingUsers: 12,
  pendingBorrowings: 5,
  unreturnedBooks: 28,
  activeUsers: 142,
  totalBooks: 520,
};

//data dummy
const fallbackPendingUsers = [
  { id: 1, full_name: 'Budi Santoso', nik: '3374012304900001', email: 'budi@gmail.com', account_status: 'PENDING' },
  { id: 2, full_name: 'Siti Rahma', nik: '3374012304900002', email: 'siti@gmail.com', account_status: 'PENDING' },
];

const fallbackPendingBorrowings = [
  { id: 'BRG-001', member: 'Ahmad Rizky', bookTitle: 'Laut Bercerita', date: '2026-07-20', status: 'PENDING' },
  { id: 'BRG-002', member: 'Dewi Lestari', bookTitle: 'Atomic Habits', date: '2026-07-21', status: 'PENDING' },
];

export default function DasboardAdmin() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pendaftar');
  const [searchReturn, setSearchReturn] = useState('');

  const [stats, setStats] = useState(fallbackStats);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingBorrowings, setPendingBorrowings] = useState(fallbackPendingBorrowings);
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [resStats, resUsers, resBorrowings] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/dashboard/stats`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/admin/members/pending`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/admin/borrow/pending`, getAuthHeader()),
      ]);

      if (resStats.data) setStats(resStats.data);
      if (resUsers.data) setPendingUsers(resUsers.data);
      if (resBorrowings.data) setPendingBorrowings(resBorrowings.data);
    } catch (error) {
      console.warn("Backend belum terhubung, menggunakan data fallback sementara:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      // Sesuaikan dengan endpoint backend Anda yang menyediakan data member pending
      const res = await axios.get(`${API_BASE_URL}/admin/members/pending`, getAuthHeader());
      setPendingUsers(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal memuat pendaftar pending:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchPendingUsers();
  }, []);

  const handleUserStatus = async (userId, newStatus) => {
    try {
      // PERBAIKAN: Kirim kedua variasi key agar diterima oleh backend dengan tepat
      await axios.patch(`${API_BASE_URL}/admin/members/${userId}/status`, 
        { 
          status: newStatus,          // Digunakan jika backend membaca req.body.status
          account_status: newStatus   // Digunakan jika backend membaca req.body.account_status
        }, 
        getAuthHeader()
      );
      
      // Perbarui state lokal agar baris langsung hilang dari tabel
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      alert(`Berhasil mengubah status menjadi ${newStatus}`);
    } catch (err) {
      alert("Gagal memperbarui status: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBorrowingAction = async (borrowingId, action) => {
    try {
      await axios.patch(`${API_BASE_URL}/admin/borrow/${borrowingId}/${action}`, {}, getAuthHeader());
      alert(`Peminjaman berhasil di-${action === 'approve' ? 'setujui' : 'tolak'}!`);
      fetchDashboardData();
    } catch (err) {
      setPendingBorrowings(prev => prev.filter(b => b.id !== borrowingId));
      alert(`[Demo Mode] Request ${borrowingId} berhasil di-${action}`);
    }
  };

  const handleSearchReturn = async () => {
    if (!searchReturn.trim()) return alert("Masukkan NIK Member, Nama, atau ID Buku terlebih dahulu!");
    try {
      await axios.get(`${API_BASE_URL}/admin/borrow/search?q=${searchReturn}`, getAuthHeader());
      alert(`Data ditemukan untuk: ${searchReturn}`);
    } catch (err) {
      alert(`[Demo Mode] Mencari data pengembalian untuk: ${searchReturn}`);
    }
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      {/* Header Search */}
      <Header value={query} onChange={setQuery} placeholder="Cari di dashboard..." />

      {/* HEADER / TITLE BANNER */}
      <div className='text-align c'>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">ATUR AJA MAS, KAMU YANG ADMIN NYA.</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Dashboard Admin</h1>
        <p className="text-xs font-body text-stone-600">Kelola persetujuan anggota, peminjaman, dan sirkulasi buku perpustakaan.</p>
      </div>


      {/* 1. TOP SECTION: STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Card 1: Pendaftar Pending */}
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Pendaftar Pending</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">{stats.pendingUsers ?? stats.pending_users}</div>
          <p className="text-[11px] font-body text-stone-500 mt-1">Butuh verifikasi akun</p>
        </div>

        {/* Card 2: Request Peminjaman */}
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Req. Peminjaman</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">{stats.pendingBorrowings ?? stats.pending_borrowings}</div>
          <p className="text-[11px] font-body text-stone-500 mt-1">Menunggu approval</p>
        </div>

        {/* Card 3: Belum Kembali */}
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Belum Kembali</span>
          <div className="text-2xl font-headline font-bold text-rose-700 mt-1">{stats.unreturnedBooks ?? stats.unreturned_books}</div>
          <p className="text-[11px] font-body text-stone-500 mt-1">Buku dipinjam / terlambat</p>
        </div>

        {/* Card 4: Total User & Buku */}
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Total User & Buku</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">
            {stats.activeUsers ?? stats.total_active_users} / {stats.totalBooks ?? stats.total_books}
          </div>
          <p className="text-[11px] font-body text-stone-500 mt-1">User aktif / Koleksi buku</p>
        </div>

      </div>



      {/* 3. BOTTOM SECTION: TABS APPROVAL QUEUE */}

      {/* Tab Bar Header */}
      <div className="flex border-b border-black mb-4 font-label">
        <button
          onClick={() => setActiveTab('pendaftar')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${activeTab === 'pendaftar'
              ? 'border-black text-stone-950 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
        >
          Pendaftar Baru ({pendingUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('peminjaman')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${activeTab === 'peminjaman'
              ? 'border-black text-stone-950 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
        >
          Request Peminjaman  ({pendingBorrowings.length})
        </button>
      </div>

      {/* Tab 1 Content: Users Pending */}
      {activeTab === 'pendaftar' && (
        <div className="overflow-x-auto border border-black bg-white shadow-xs">
          <table className="w-full text-left text-sm font-body">
            <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
              <tr>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">NIK</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {pendingUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-stone-500 font-body">Tidak ada pendaftar baru yang pending.</td>
                </tr>
              ) : (
                pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-amber-50/50">
                    <td className="p-3 font-medium text-stone-950">{user.full_name}</td>
                    <td className="p-3 text-stone-700">{user.nik}</td>
                    <td className="p-3 text-stone-700">{user.email}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[11px] font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                        {user.account_status || user.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleUserStatus(user.id, 'REJECTED')}
                        className="px-4 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-500 rounded-lg hover:bg-rose-50 shadow-xs inline-flex items-center gap-1"
                      >
                        <span>&times;</span> Reject
                      </button>
                      <button
                        onClick={() => handleUserStatus(user.id, 'APPROVED')}
                        className="px-4 py-1.5 text-xs font-label font-bold text-amber-100 bg-stone-700 hover:bg-stone-800 rounded-lg shadow-xs border border-stone-800 inline-flex items-center gap-1"
                      >
                        <span>&#10003;</span> Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2 Content: Borrowings Pending */}
      {activeTab === 'peminjaman' && (
        <div className="overflow-x-auto border border-black bg-white shadow-xs">
          <table className="w-full text-left text-sm font-body">
            <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
              <tr>
                <th className="p-3">ID Req</th>
                <th className="p-3">Peminjam</th>
                <th className="p-3">Judul Buku</th>
                <th className="p-3">Tgl Pengajuan</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {pendingBorrowings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-stone-500 font-body">Tidak ada request peminjaman.</td>
                </tr>
              ) : (
                pendingBorrowings.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/50">
                    <td className="p-3 font-mono text-xs text-stone-700">{b.id}</td>
                    <td className="p-3 font-medium text-stone-950">{b.member || b.user_id}</td>
                    <td className="p-3 text-stone-700">{b.bookTitle || b.book_id}</td>
                    <td className="p-3 text-stone-700">{b.date || b.borrow_date}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[11px] font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleBorrowingAction(b.id, 'reject')}
                        className="px-4 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-500 rounded-lg hover:bg-rose-50 shadow-xs inline-flex items-center gap-1"
                      >
                        <span>&times;</span> Reject
                      </button>
                      <button
                        onClick={() => handleBorrowingAction(b.id, 'approve')}
                        className="px-4 py-1.5 text-xs font-label font-bold text-amber-100 bg-stone-700 hover:bg-stone-800 rounded-lg shadow-xs border border-stone-800 inline-flex items-center gap-1"
                      >
                        <span>&#10003;</span> Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>


  );
}