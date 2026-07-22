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
    <aside style={{ backgroundColor: '#FDFBF7' }} className="hidden md:flex md:flex-col w-64 shrink-0 text-stone-900 h-screen sticky top-0 shadow-xs">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-amber-200/60">
        <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-base shadow-xs">
          P
        </div>
        <div>
          <span className="font-bold text-stone-900 text-sm block leading-none">Perpustakaan</span>
          <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold">Digital</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ' +
              (isActive
                ? 'bg-amber-100 text-amber-950 shadow-xs border border-amber-300'
                : 'text-stone-600 hover:bg-amber-50 hover:text-amber-900')
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mx-3 mb-6 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
      >
        <LogoutIcon />
        Keluar
      </button>
    </aside>
  );
}

export default Sidebar;