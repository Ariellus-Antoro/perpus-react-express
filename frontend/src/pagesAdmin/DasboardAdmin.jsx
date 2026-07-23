import { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from '../components/Header';

const API_BASE_URL = 'http://localhost:8080/api';

// Fallback data
const fallbackStats = {
  pendingUsers: 12,
  pendingBorrowings: 5,
  unreturnedBooks: 28,
  activeUsers: 142,
  totalBooks: 520,
};

export default function DasboardAdmin() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pendaftar');
  const [searchReturn, setSearchReturn] = useState('');

  const [stats, setStats] = useState({
    pendingUsers: 0,
    pendingBorrowings: 0,
    unreturnedBooks: 0,
    activeUsers: 0,
    totalBooks: 0,
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingBorrowings, setPendingBorrowings] = useState([]);
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
        axios.get(`${API_BASE_URL}/borrow`, getAuthHeader()), 
      ]);

      if (resStats.data?.data) setStats(resStats.data.data);
      if (resUsers.data?.data) setPendingUsers(resUsers.data.data);
      
      // Filter hanya data peminjaman yang berstatus PENDING
      if (resBorrowings.data?.data) {
        const pending = resBorrowings.data.data.filter(b => b.status === 'PENDING');
        setPendingBorrowings(pending);
      }
    } catch (error) {
      console.warn("Gagal mengambil data dari backend:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const handleUserStatus = async (userId, action) => {
    if (!window.confirm(`Yakin ingin ${action} user ini?`)) return;
    try {
      // Endpoint asumsi: POST /admin/users/:id/approve atau reject
      await axios.post(`${API_BASE_URL}/admin/users/${userId}/${action}`, {}, getAuthHeader());
      alert(`Berhasil melakukan ${action} pada user!`);
      fetchDashboardData(); // Refresh data
    } catch (err) {
      alert("Gagal memperbarui status: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBorrowingAction = async (borrowingId, action) => {
    if (!window.confirm(`Yakin ingin ${action} peminjaman ini?`)) return;
    try {
      // Sesuai dengan endpoint yang kita buat sebelumnya di backend
      await axios.post(`${API_BASE_URL}/borrow/${borrowingId}/${action}`, {}, getAuthHeader());
      alert(`Peminjaman berhasil di-${action === 'approve' ? 'setujui' : 'tolak'}!`);
      fetchDashboardData(); // Refresh data
    } catch (err) {
      alert("Gagal memproses peminjaman: " + (err.response?.data?.message || err.message));
    }
  };

  // Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };


return (
    <div className="space-y-6 text-stone-900 font-body">
      <div className='text-align c'>
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">Manajemen Utama</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Dashboard Admin</h1>
        <p className="text-xs font-body text-stone-600">Kelola persetujuan anggota, peminjaman, dan sirkulasi buku perpustakaan.</p>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Pendaftar Pending</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">{stats.pendingUsers}</div>
        </div>
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Req. Peminjaman</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">{stats.pendingBorrowings}</div>
        </div>
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Belum Kembali</span>
          <div className="text-2xl font-headline font-bold text-rose-700 mt-1">{stats.unreturnedBooks}</div>
        </div>
        <div className="bg-amber-50/40 border border-black p-4 rounded-2xl shadow-xs">
          <span className="text-xs font-label font-semibold text-stone-700">Total User / Buku</span>
          <div className="text-2xl font-headline font-bold text-stone-950 mt-1">
            {stats.activeUsers} <span className="text-stone-400">/</span> {stats.totalBooks}
          </div>
        </div>
      </div>

      {/* 2. TABS NAVIGASI */}
      <div className="flex border-b border-black mb-4 font-label">
        <button
          onClick={() => setActiveTab('pendaftar')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${activeTab === 'pendaftar' ? 'border-black text-stone-950 font-bold' : 'border-transparent text-stone-600 hover:text-stone-900'}`}
        >
          Pendaftar Baru ({pendingUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('peminjaman')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${activeTab === 'peminjaman' ? 'border-black text-stone-950 font-bold' : 'border-transparent text-stone-600 hover:text-stone-900'}`}
        >
          Request Peminjaman ({pendingBorrowings.length})
        </button>
      </div>

      {/* 3. TAB CONTENT 1: PENDAFTAR PENDING */}
      {activeTab === 'pendaftar' && (
        <div className="overflow-x-auto border border-black bg-white shadow-xs rounded-xl">
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
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-stone-500 font-body animate-pulse">Memuat data pendaftar...</td></tr>
              ) : pendingUsers.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-stone-500 font-body">Tidak ada pendaftar baru yang menunggu konfirmasi.</td></tr>
              ) : (
                pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-amber-50/50">
                    <td className="p-3 font-medium text-stone-950">{user.full_name}</td>
                    <td className="p-3 text-stone-700">{user.nik || '-'}</td>
                    <td className="p-3 text-stone-700">{user.email}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                        {user.account_status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => handleUserStatus(user.id, 'reject')} className="px-3 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-500 rounded-lg hover:bg-rose-50 shadow-xs">
                        Tolak
                      </button>
                      <button onClick={() => handleUserStatus(user.id, 'approve')} className="px-3 py-1.5 text-xs font-label font-bold text-amber-100 bg-stone-700 hover:bg-stone-800 rounded-lg shadow-xs border border-stone-800">
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

      {/* 4. TAB CONTENT 2: PEMINJAMAN PENDING */}
      {activeTab === 'peminjaman' && (
        <div className="overflow-x-auto border border-black bg-white shadow-xs rounded-xl">
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
              {loading ? (
                <tr><td colSpan="6" className="p-6 text-center text-stone-500 font-body animate-pulse">Memuat data peminjaman...</td></tr>
              ) : pendingBorrowings.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-stone-500 font-body">Tidak ada request peminjaman baru.</td></tr>
              ) : (
                pendingBorrowings.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/50">
                    <td className="p-3 font-mono text-xs font-bold text-stone-900">TRX-{b.id}</td>
                    <td className="p-3 font-medium text-stone-950">
                      {b.user?.full_name || `User ID: ${b.user_id}`}
                    </td>
                    <td className="p-3 text-stone-700">
                      {b.book?.title || `Book ID: ${b.book_id}`}
                    </td>
                    <td className="p-3 text-stone-700">
                      {formatDate(b.borrow_date)}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] font-label font-bold bg-blue-100 text-blue-800 border border-blue-400 rounded-full shadow-xs">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => handleBorrowingAction(b.id, 'reject')} className="px-3 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-500 rounded-lg hover:bg-rose-50 shadow-xs">
                        Tolak
                      </button>
                      <button onClick={() => handleBorrowingAction(b.id, 'approve')} className="px-3 py-1.5 text-xs font-label font-bold text-emerald-900 bg-emerald-200 hover:bg-emerald-300 rounded-lg shadow-xs border border-emerald-900">
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
    </div>
  );
}