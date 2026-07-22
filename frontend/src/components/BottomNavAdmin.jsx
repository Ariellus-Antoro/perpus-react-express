import { NavLink } from 'react-router-dom';
import { HomeIcon, BookIcon, CategoryIcon, MemberIcon } from './icons';

const navItems = [
  { to: '/admin/dashboard', label: 'Home', icon: HomeIcon, end: true },
  { to: '/admin/buku', label: 'Buku', icon: BookIcon },
  { to: '/admin/kategori', label: 'Kategori', icon: CategoryIcon },
  { to: '/admin/member', label: 'Profil', icon: MemberIcon },
  { to: '/admin/pinjaman', label: 'Pinjaman', icon: BookIcon },
];

export default function BottomNavAdmin() {
  return (
    <nav 
      style={{ backgroundColor: '#FDFBF7' }} 
      className="md:hidden fixed bottom-0 left-0 right-0 border-t border-black z-50 px-2 pb-safe shadow-xs"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all rounded-xl font-label ${
                isActive
                  ? 'text-stone-950 bg-amber-100 font-bold border border-black shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
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