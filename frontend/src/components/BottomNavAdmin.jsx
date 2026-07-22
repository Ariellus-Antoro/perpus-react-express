import { NavLink } from 'react-router-dom';
import { HomeIcon, BookIcon, CategoryIcon, MemberIcon } from './icons';

const navItems = [
  { to: '/admin/dashboard', label: 'Home', icon: HomeIcon, end: true },
  { to: '/admin/buku', label: 'Buku', icon: BookIcon },
  { to: '/admin/kategori', label: 'Kategori', icon: CategoryIcon },
  { to: '/admin/member', label: 'Profil', icon: MemberIcon },
  { to: '/admin/pinjaman', label: 'Pinjaman Buku', icon: BookIcon },
];

export default function BottomNavAdmin() {
  return (
    // md:hidden artinya ini hanya akan muncul di layar HP, dan hilang di Desktop (karena di desktop sudah pakai Sidebar)
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-950 border-t border-amber-500/20 z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${
                isActive
                  ? 'text-amber-400'
                  : 'text-emerald-100/60 hover:text-amber-300'
              }`
            }
          >
            <Icon />
            <span className="text-[10px] font-semibold">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}