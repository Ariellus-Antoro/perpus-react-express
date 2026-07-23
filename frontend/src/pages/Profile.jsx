import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import { ChevronIcon, LogoutIcon } from '../components/icons';
import { getSession, clearSession, fetchProfile } from '../services/api';

const menuItems = [
  { label: 'Buku Dipinjam', hint: 'aktif', path: '/dipinjam' },
  { label: 'Riwayat Peminjaman', hint: '', path: '/riwayat' },
  { label: 'Pengaturan Akun', hint: '', path: '/pengaturan' },
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
      <div style={{ backgroundColor: '#FDFBF7' }} className="min-h-screen text-stone-900 space-y-6">
        
        {/* Banner Header Profil */}
        <div className="rounded-2xl bg-amber-50/80 p-5 md:p-8 flex items-center gap-4 border border-black shadow-xs">
          <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-amber-100 border-2 border-black text-stone-950 font-headline font-bold flex items-center justify-center text-xl shadow-xs">
            {initials}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-label font-bold text-amber-800">Akun Anggota</span>
            <h2 className="font-headline font-bold text-stone-950 text-lg md:text-xl">{displayName}</h2>
            <p className="text-xs md:text-sm font-body text-stone-600">{displayEmail}</p>
          </div>
        </div>

        {/* Menu Options List */}
        <ul className="bg-amber-50/40 rounded-2xl border border-black shadow-xs overflow-hidden max-w-xl font-label">
          {menuItems.map((item) => (
            <li
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold text-stone-900 border-b border-black cursor-pointer hover:bg-amber-100/50 transition-colors"
          >
            <span>{item.label}</span>

            <span className="flex items-center gap-2 text-stone-400">
              {item.hint && (
                <span className="text-xs font-bold text-stone-950 bg-amber-200 px-2.5 py-0.5 rounded-full border border-black shadow-xs">
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
            className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold text-rose-700 cursor-pointer hover:bg-rose-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <LogoutIcon /> Keluar Akun
            </span>
          </li>
        </ul>

      </div>
    </AppShell>
  );
}

export default Profile;