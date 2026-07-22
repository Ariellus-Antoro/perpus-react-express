import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, BookIcon, CategoryIcon, MemberIcon, LogoutIcon } from './icons';
import { clearSession } from '../services/api';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon, end: true },
  { to: '/admin/buku', label: 'Kelola Buku', icon: BookIcon },
  { to: '/admin/kategori', label: 'Kelola Kategori', icon: CategoryIcon },
  { to: '/admin/member', label: 'Kelola Member', icon: MemberIcon },
  { to: '/admin/pinjaman', label: 'Pinjaman Buku', icon: BookIcon },
];

export default function SidebarAdmin() {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <aside style={{ backgroundColor: '#FDFBF7' }} className="hidden md:flex md:flex-col w-64 shrink-0 text-stone-900 h-screen sticky top-0 shadow-xs">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-amber-200/60">
        <div className="w-9 h-9 rounded-xl bg-amber-100 border border-black flex items-center justify-center text-stone-900 font-headline font-bold text-base shadow-xs">
          P
        </div>
        <div>
          <span className="font-headline font-bold text-stone-950 text-sm block leading-none">Perpustakaan</span>
          <span className="font-label text-[10px] uppercase tracking-wider text-amber-800 font-semibold">Digital Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5 font-label">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ' +
              (isActive
                ? 'bg-amber-100 text-stone-950 shadow-xs border border-black'
                : 'text-stone-700 hover:bg-amber-50 hover:text-stone-950 border border-transparent')
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="font-label mx-3 mb-6 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-300 transition-all"
      >
        <LogoutIcon />
        Keluar
      </button>
    </aside>
  );
}