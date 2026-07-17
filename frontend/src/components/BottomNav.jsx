import { NavLink } from 'react-router-dom';
import { HomeIcon, BookIcon, ProfileIcon } from './icons';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/buku', label: 'Buku', icon: BookIcon },
  { to: '/profile', label: 'Profil', icon: ProfileIcon },
];

function BottomNav() {
  return (
    <nav className="md:hidden sticky bottom-0 inset-x-0 z-20 flex justify-around items-center bg-white border-t border-slate-200 pt-2 pb-3">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            'flex flex-col items-center gap-1 px-5 py-1 rounded-xl text-[11px] font-medium ' +
            (isActive ? 'text-brand' : 'text-slate-400')
          }
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
