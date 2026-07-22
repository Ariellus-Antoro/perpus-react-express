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
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-emerald-950 text-white border-r border-amber-500/20 h-screen sticky top-0 shadow-lg">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-amber-500/20">
        <div className="w-9 h-9 rounded-xl bg-emerald-900 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-base shadow-sm">
          P
        </div>
        <div>
          <span className="font-bold text-amber-100 text-sm block leading-none">Perpustakaan</span>
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Digital Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ' +
              (isActive
                ? 'bg-amber-400 text-emerald-950 shadow-sm border border-amber-500'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-amber-300')
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mb-6 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
      >
        <LogoutIcon />
        Keluar
      </button>
    </aside>
  );
}