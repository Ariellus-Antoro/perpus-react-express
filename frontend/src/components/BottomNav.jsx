import { NavLink } from 'react-router-dom';
import { HomeIcon, BookIcon, ProfileIcon } from './icons';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/buku', label: 'Buku', icon: BookIcon },
  { to: '/profile', label: 'Profil', icon: ProfileIcon },
];

function BottomNav() {
  return (
    <nav 
      style={{ backgroundColor: '#FDFBF7' }} 
      className="md:hidden sticky bottom-0 inset-x-0 z-20 flex justify-around items-center border-t border-black pt-2 pb-3 shadow-xs"
    >
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            'flex flex-col items-center gap-1 px-5 py-1 rounded-xl text-[11px] font-label font-semibold transition-all ' +
            (isActive 
              ? 'text-stone-950 bg-amber-100 font-bold border border-black shadow-xs' 
              : 'text-stone-600 hover:text-stone-950')
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