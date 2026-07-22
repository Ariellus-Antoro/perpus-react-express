import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const fallbackPendingVerifications = [
  { 
    id: 1, 
    full_name: 'Budi Santoso', 
    nik: '3374012304900001', 
    email: 'budi@gmail.com', 
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Salatiga',
    gender: 'Laki-laki',
    ktp_photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    account_status: 'PENDING' 
  },
  { 
    id: 2, 
    full_name: 'Siti Rahma', 
    nik: '3374012304900002', 
    email: 'siti@gmail.com', 
    phone: '089876543210',
    address: 'Jl. Diponegoro No. 45, Ambarawa',
    gender: 'Perempuan',
    ktp_photo: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    account_status: 'PENDING' 
  },
];

export default function KelolaVerifikasiAdmin() {
  const [pendingList, setPendingList] = useState(fallbackPendingVerifications);
  const [loading, setLoading] = useState(false);
  const [selectedKtp, setSelectedKtp] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchPendingData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/users/pending`, getAuthHeader());
      if (res.data) setPendingList(res.data);
    } catch (err) {
      console.warn("Backend offline, menggunakan data fallback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  const handleStatusAction = async (userId, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/admin/users/${userId}/status`, { account_status: newStatus }, getAuthHeader());
      alert(`Verifikasi berhasil di-${newStatus.toLowerCase()}!`);
      fetchPendingData();
    } catch (err) {
      setPendingList(prev => prev.filter(u => u.id !== userId));
      alert(`[Demo Mode] Status user ID ${userId} diubah ke ${newStatus}`);
    }
  };

  return (
    <div className="space-y-6 text-stone-900 font-body">
      {/* HEADER BANNER */}
      <div className="py-2">
        <span className="text-[11px] uppercase tracking-widest font-label font-bold text-amber-800">VALIDASI KEANGGOTAAN</span>
        <h1 className="text-2xl font-headline font-bold text-stone-950 mt-0.5">Verifikasi Admin</h1>
        <p className="text-xs font-body text-stone-600">Periksa data diri lengkap dan pratinjau foto KTP pendaftar baru sebelum memberikan persetujuan.</p>
      </div>

      {/* TABEL VERIFIKASI */}
      <div className="overflow-x-auto border border-black bg-white shadow-xs">
        <table className="w-full text-left text-sm font-body">
          <thead className="bg-amber-100 text-stone-950 border-b border-black font-label">
            <tr>
              <th className="p-3">Pratinjau KTP</th>
              <th className="p-3">Nama & Kontak</th>
              <th className="p-3">NIK</th>
              <th className="p-3">Jenis Kelamin</th>
              <th className="p-3">Alamat</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {pendingList.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-stone-500 font-body">Tidak ada pendaftar yang menunggu verifikasi.</td>
              </tr>
            ) : (
              pendingList.map((user) => (
                <tr key={user.id} className="hover:bg-amber-50/50 transition">
                  <td className="p-3">
                    <img
                      src={user.ktp_photo || user.ktp || 'https://via.placeholder.com/120x80'}
                      alt={`KTP ${user.full_name}`}
                      onClick={() => setSelectedKtp(user.ktp_photo || user.ktp || 'https://via.placeholder.com/120x80')}
                      className="w-16 h-10 object-cover rounded-lg border border-black shadow-xs cursor-pointer hover:opacity-80 transition"
                      title="Klik untuk memperbesar foto KTP"
                    />
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-stone-950">{user.full_name}</p>
                    <p className="text-xs text-stone-600">Email: {user.email}</p>
                    <p className="text-xs text-stone-600">Telp: {user.phone || '-'}</p>
                  </td>
                  <td className="p-3 font-mono text-xs text-stone-700">{user.nik}</td>
                  <td className="p-3 text-stone-700 text-xs font-medium">{user.gender || '-'}</td>
                  <td className="p-3 text-stone-700 text-xs max-w-xs truncate" title={user.address}>
                    {user.address || '-'}
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-[11px] font-label font-bold bg-amber-200 text-stone-950 border border-black rounded-full shadow-xs">
                      {user.account_status || user.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleStatusAction(user.id, 'REJECTED')}
                      className="px-4 py-1.5 text-xs font-label font-semibold text-rose-700 border border-rose-500 rounded-lg hover:bg-rose-50 shadow-xs inline-flex items-center gap-1 transition"
                    >
                      <span>&times;</span> Tolak
                    </button>
                    <button
                      onClick={() => handleStatusAction(user.id, 'APPROVED')}
                      className="px-4 py-1.5 text-xs font-label font-bold text-amber-100 bg-stone-700 hover:bg-stone-800 rounded-lg shadow-xs border border-stone-800 inline-flex items-center gap-1 transition"
                    >
                      <span>&#10003;</span> Terima
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PRATINJAU KTP */}
      {selectedKtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-amber-50 rounded-3xl border border-black p-4 max-w-2xl w-full shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-black pb-2">
              <h3 className="text-sm font-headline font-bold text-stone-950">Pratinjau Foto KTP</h3>
              <button
                onClick={() => setSelectedKtp(null)}
                className="text-stone-600 hover:text-stone-950 font-bold text-lg"
              >
                &times;
              </button>
            </div>
            <div className="flex justify-center bg-white border border-black rounded-2xl p-2 overflow-hidden">
              <img src={selectedKtp} alt="KTP Zoom" className="max-h-[70vh] object-contain rounded-lg" />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedKtp(null)}
                className="px-4 py-2 text-xs font-label font-bold text-stone-950 bg-amber-200 border border-black rounded-xl hover:bg-amber-300 shadow-xs"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}