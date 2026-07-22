import { SearchIcon, MenuIcon, BellIcon } from './icons';

function Header({ value, onChange, placeholder = 'Cari buku, penulis...' }) {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 px-4 md:px-8 py-3">
      <div className="flex items-center gap-3 max-w-5xl">
        <button className="md:hidden w-9 h-9 shrink-0 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-900/10 flex items-center justify-center">
          <MenuIcon />
        </button>

        <div className="flex-1 flex items-center gap-2 bg-emerald-50/60 border border-emerald-900/15 rounded-xl px-3 h-10 text-emerald-800/60 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:bg-white transition-all">
          <SearchIcon />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-emerald-950 placeholder:text-emerald-800/50"
          />
        </div>

        <button className="w-9 h-9 shrink-0 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-900/10 hover:bg-emerald-100 flex items-center justify-center transition">
          <BellIcon />
        </button>
      </div>
    </header>
  );
}

export default Header;