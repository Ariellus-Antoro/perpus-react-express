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
      {/* Banner Header Profil (Hijau Tua Mewah + Emas) */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-5 md:p-8 flex items-center gap-4 mb-6 border border-amber-500/30 shadow-md">
        <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-emerald-900 border-2 border-amber-500/50 text-amber-400 font-bold flex items-center justify-center text-xl shadow-inner">
          {initials}
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">Akun Anggota</span>
          <h2 className="font-bold text-amber-100 text-lg md:text-xl">{displayName}</h2>
          <p className="text-xs md:text-sm text-emerald-200/80">{displayEmail}</p>
        </div>
      </div>

      {/* Menu Options List */}
      <ul className="bg-white rounded-2xl border border-emerald-900/15 shadow-sm overflow-hidden max-w-xl">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold text-emerald-950 border-b border-emerald-900/10 cursor-pointer hover:bg-emerald-50/60 transition-colors"
          >
            <span>{item.label}</span>
            <span className="flex items-center gap-2 text-emerald-800/40">
              {item.hint && (
                <span className="text-xs font-bold text-amber-950 bg-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30 shadow-sm">
                  {item.hint}
                </span>
              )}
              <ChevronIcon />
            </span>
          </li>
        ))}
        
        {/* Logout Option */}
        <li
          onClick={handleLogout}
          className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold text-rose-600 cursor-pointer hover:bg-rose-50/70 transition-colors"
        >
          <span className="flex items-center gap-2">
            <LogoutIcon /> Keluar Akun
          </span>
        </li>
      </ul>
    </AppShell>
  );
}

export default Profile;