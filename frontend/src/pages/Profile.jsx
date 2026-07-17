import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import { ChevronIcon, LogoutIcon } from '../components/icons';
import { getSession, clearSession, fetchProfile } from '../services/api';

const menuItems = [
  { label: 'Buku Dipinjam', hint: '2 aktif' },
  { label: 'Riwayat Peminjaman', hint: '' },
  { label: 'Buku Favorit', hint: '' },
  { label: 'Pengaturan Akun', hint: '' },
];

function Profile() {
  const navigate = useNavigate();
  const { token, claims } = getSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchProfile(token)
      .then((res) => {
        // Backend saat ini hanya mengembalikan { status, message } tanpa field
        // data user. Kalau suatu saat endpoint /api/profile sudah mengirim
        // data user, tampilan ini otomatis akan memakainya.
        if (res?.data) setProfile(res.data);
      })
      .catch(() => {
        // diamkan - tetap tampilkan fallback dari token
      });
  }, [token]);

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  const displayName = profile?.full_name || 'Pengguna';
  const displayEmail = profile?.email || (claims?.role ? `Role: ${claims.role}` : '-');
  const initials = (profile?.full_name || 'P').slice(0, 2).toUpperCase();

  return (
    <AppShell header={<Header value="" onChange={() => {}} placeholder="Cari..." />}>
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5 md:p-8 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-gradient-to-br from-brand to-violet-600 text-white font-bold flex items-center justify-center text-lg">
          {initials}
        </div>
        <div>
          <h2 className="font-semibold text-slate-800 text-base md:text-lg">{displayName}</h2>
          <p className="text-sm text-slate-500">{displayEmail}</p>
        </div>
      </div>

      <ul className="bg-white rounded-2xl shadow-sm shadow-slate-900/5 overflow-hidden max-w-xl">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-medium text-slate-800 border-b border-slate-100 cursor-pointer hover:bg-slate-50"
          >
            <span>{item.label}</span>
            <span className="flex items-center gap-2 text-slate-300">
              {item.hint && <span className="text-xs font-semibold text-brand">{item.hint}</span>}
              <ChevronIcon />
            </span>
          </li>
        ))}
        <li
          onClick={handleLogout}
          className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-medium text-red-500 cursor-pointer hover:bg-red-50"
        >
          <span className="flex items-center gap-2">
            <LogoutIcon /> Keluar
          </span>
        </li>
      </ul>
    </AppShell>
  );
}

export default Profile;
