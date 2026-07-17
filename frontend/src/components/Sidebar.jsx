import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, BookIcon, ProfileIcon, LogoutIcon } from './icons';
import { clearSession } from '../services/api';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/buku', label: 'Buku', icon: BookIcon },
  { to: '/profile', label: 'Profil', icon: ProfileIcon },
];

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm">
          P
        </div>
        <span className="font-semibold text-slate-800">Perpustakaan</span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ' +
              (isActive ? 'bg-indigo-50 text-brand' : 'text-slate-500 hover:bg-slate-50')
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-3 mb-6 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
      >
        <LogoutIcon />
        Keluar
      </button>
    </aside>
  );
}

export default Sidebar;
