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
  const [pendingUsers, setPendingUsers] = useState(fallbackPendingUsers);
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
        axios.get(`${API_BASE_URL}/admin/users/pending`, getAuthHeader()),
        axios.get(`${API_BASE_URL}/admin/borrowings/pending`, getAuthHeader()),
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUserStatus = async (userId, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/admin/users/${userId}/status`, { account_status: newStatus }, getAuthHeader());
      alert(`User berhasil di-${newStatus.toLowerCase()}!`);
      fetchDashboardData();
    } catch (err) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      alert(`[Demo Mode] Status user ID ${userId} diubah ke ${newStatus}`);
    }
  };

  const handleBorrowingAction = async (borrowingId, action) => {
    try {
      await axios.patch(`${API_BASE_URL}/admin/borrowings/${borrowingId}/${action}`, {}, getAuthHeader());
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
      await axios.get(`${API_BASE_URL}/admin/borrowings/search?q=${searchReturn}`, getAuthHeader());
      alert(`Data ditemukan untuk: ${searchReturn}`);
    } catch (err) {
      alert(`[Demo Mode] Mencari data pengembalian untuk: ${searchReturn}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Search diletakkan di dalam div, bukan sebagai prop AppShell */}
      <Header value={query} onChange={setQuery} placeholder="Cari di dashboard..." />
        
      {/* HEADER / TITLE BANNER (Hijau Tua Gradasi) */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-6 rounded-2xl border border-amber-500/30 shadow-md text-white flex justify-between items-center">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400">ATUR AJA MAS, KAMU YANG ADMIN NYA.</span>
          <h1 className="text-2xl font-bold text-amber-100 mt-0.5">Dashboard Admin</h1>
          <p className="text-xs text-emerald-200/80">Kelola persetujuan anggota, peminjaman, dan sirkulasi buku perpustakaan.</p>
        </div>
        {loading && <span className="text-xs font-semibold text-amber-400 animate-pulse">Memuat data...</span>}
      </div>

      {/* 1. TOP SECTION: STATS CARDS (Hijau Tua & Nuansa Emas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Pendaftar Pending */}
        <div className="bg-emerald-900/10 border border-amber-500/30 p-4 rounded-xl bg-white shadow-sm">
          <span className="text-xs font-semibold text-emerald-900">Pendaftar Pending</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{stats.pendingUsers ?? stats.pending_users}</div>
          <p className="text-[11px] text-emerald-700 mt-1">Butuh verifikasi akun</p>
        </div>

        {/* Card 2: Request Peminjaman */}
        <div className="bg-emerald-900/10 border border-amber-500/30 p-4 rounded-xl bg-white shadow-sm">
          <span className="text-xs font-semibold text-emerald-900">Req. Peminjaman</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{stats.pendingBorrowings ?? stats.pending_borrowings}</div>
          <p className="text-[11px] text-emerald-700 mt-1">Menunggu approval</p>
        </div>

        {/* Card 3: Belum Kembali */}
        <div className="bg-emerald-900/10 border border-amber-500/30 p-4 rounded-xl bg-white shadow-sm">
          <span className="text-xs font-semibold text-emerald-900">Belum Kembali</span>
          <div className="text-2xl font-bold text-rose-600 mt-1">{stats.unreturnedBooks ?? stats.unreturned_books}</div>
          <p className="text-[11px] text-emerald-700 mt-1">Buku dipinjam / terlambat</p>
        </div>

        {/* Card 4: Total User & Buku */}
        <div className="bg-emerald-900/10 border border-amber-500/30 p-4 rounded-xl bg-white shadow-sm">
          <span className="text-xs font-semibold text-emerald-900">Total User & Buku</span>
          <div className="text-2xl font-bold text-emerald-950 mt-1">
            {stats.activeUsers ?? stats.total_active_users} / {stats.totalBooks ?? stats.total_books}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">User aktif / Koleksi buku</p>
        </div>

      </div>

      {/* 2. MIDDLE SECTION: MEJA PENGEMBALIAN CEPAT */}
      <div className="bg-white border border-emerald-900/15 p-5 rounded-2xl shadow-sm">
        <h2 className="font-semibold text-emerald-950 mb-3">Meja Pengembalian Cepat (Sirkulasi)</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchReturn}
            onChange={(e) => setSearchReturn(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchReturn()}
            placeholder="Cari berdasarkan NIK Member, Nama, atau ID Buku..."
            className="flex-1 px-4 py-2 text-sm border border-emerald-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button 
            onClick={handleSearchReturn}
            className="bg-emerald-900 hover:bg-emerald-950 text-amber-400 border border-amber-500/40 text-sm font-semibold px-5 py-2 rounded-xl transition shadow-sm"
          >
            Cari Data
          </button>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: TABS APPROVAL QUEUE */}
      <div className="bg-white border border-emerald-900/15 rounded-2xl p-5 shadow-sm">
        {/* Tab Bar Header */}
        <div className="flex border-b border-emerald-900/10 mb-4">
          <button
            onClick={() => setActiveTab('pendaftar')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              activeTab === 'pendaftar'
                ? 'border-amber-500 text-emerald-950 font-bold'
                : 'border-transparent text-emerald-800/60 hover:text-emerald-900'
            }`}
          >
            Pendaftar Baru ({pendingUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('peminjaman')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              activeTab === 'peminjaman'
                ? 'border-amber-500 text-emerald-950 font-bold'
                : 'border-transparent text-emerald-800/60 hover:text-emerald-900'
            }`}
          >
            Request Peminjaman ({pendingBorrowings.length})
          </button>
        </div>

        {/* Tab 1 Content: Users Pending */}
        {activeTab === 'pendaftar' && (
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-950 text-amber-300 border-b border-emerald-900">
                <tr>
                  <th className="p-3">Nama Lengkap</th>
                  <th className="p-3">NIK</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/10">
                {pendingUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-emerald-800/50">Tidak ada pendaftar baru yang pending.</td>
                  </tr>
                ) : (
                  pendingUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-emerald-50/50">
                      <td className="p-3 font-medium text-emerald-950">{user.full_name}</td>
                      <td className="p-3 text-emerald-900/70">{user.nik}</td>
                      <td className="p-3 text-emerald-900/70">{user.email}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 rounded-full">
                          {user.account_status || user.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button 
                          onClick={() => handleUserStatus(user.id, 'REJECTED')}
                          className="px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-300 rounded-lg hover:bg-rose-50"
                        >
                          Tolak
                        </button>
                        <button 
                          onClick={() => handleUserStatus(user.id, 'APPROVED')}
                          className="px-3 py-1 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm border border-amber-500"
                        >
                          Setujui
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
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left text-sm ">
              <thead className="bg-emerald-950 text-amber-300 border-b border-emerald-900">
                <tr>
                  <th className="p-3">ID Req</th>
                  <th className="p-3">Peminjam</th>
                  <th className="p-3">Judul Buku</th>
                  <th className="p-3">Tgl Pengajuan</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/10">
                {pendingBorrowings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-emerald-800/50">Tidak ada request peminjaman.</td>
                  </tr>
                ) : (
                  pendingBorrowings.map((b) => (
                    <tr key={b.id} className="hover:bg-emerald-50/50">
                      <td className="p-3 font-mono text-xs text-emerald-800/70">{b.id}</td>
                      <td className="p-3 font-medium text-emerald-950">{b.member || b.user_id}</td>
                      <td className="p-3 text-emerald-900/70">{b.bookTitle || b.book_id}</td>
                      <td className="p-3 text-emerald-900/70">{b.date || b.borrow_date}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button 
                          onClick={() => handleBorrowingAction(b.id, 'reject')}
                          className="px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-300 rounded-lg hover:bg-rose-50"
                        >
                          Tolak
                        </button>
                        <button 
                          onClick={() => handleBorrowingAction(b.id, 'approve')}
                          className="px-3 py-1 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm border border-amber-500"
                        >
                          Setujui Pinjam
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

    </div>
  );
}