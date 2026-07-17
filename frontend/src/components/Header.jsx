import { SearchIcon, MenuIcon, BellIcon } from './icons';

function Header({ value, onChange, placeholder = 'Cari buku, penulis...' }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 md:px-8 py-3">
      <div className="flex items-center gap-3 max-w-5xl">
        <button className="md:hidden w-9 h-9 shrink-0 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <MenuIcon />
        </button>

        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-xl px-3 h-10 text-slate-400 focus-within:ring-2 focus-within:ring-brand/30">
          <SearchIcon />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <button className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <BellIcon />
        </button>
      </div>
    </header>
  );
}

export default Header;
