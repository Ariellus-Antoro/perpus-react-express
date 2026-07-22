import { SearchIcon, MenuIcon, BellIcon } from './icons';

function Header({ value, onChange, placeholder = 'Cari buku, penulis...' }) {
  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-amber-200/60 px-4 md:px-8 py-3">
      <div className="flex items-center gap-3 w-full mx-auto">
        <button className="md:hidden w-9 h-9 shrink-0 rounded-xl bg-amber-50 text-stone-900 border border-black flex items-center justify-center hover:bg-amber-100 transition shadow-xs">
          <MenuIcon />
        </button>

        <div className="flex-1 flex items-center gap-2 bg-amber-50/60 border border-black rounded-xl px-3 h-10 text-stone-500 focus-within:ring-2 focus-within:ring-stone-900/20 focus-within:bg-white transition-all shadow-xs">
          <SearchIcon />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-body text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <button className="w-9 h-9 shrink-0 rounded-xl bg-amber-50 text-stone-900 border border-black hover:bg-amber-100 flex items-center justify-center transition shadow-xs cursor-pointer">
          <BellIcon />
        </button>

        <div className="flex items-center gap-2">
            <button
              className="cursor-pointer px-4 h-10 rounded-xl bg-amber-50 border border-black text-stone-900 hover:bg-amber-100 transition shadow-xs text-xs uppercase tracking-wider font-label font-medium"
            >
              Login
            </button>

            <button
              className="cursor-pointer px-4 h-10 rounded-xl bg-amber-50 border border-black text-stone-900 hover:bg-amber-100 transition shadow-xs text-xs uppercase tracking-wider font-label font-medium"
            >
              Register
            </button>
          </div>
      </div>

      {/* {user ? (
          <button className="px-4 h-10 rounded-xl border border-black bg-stone-900 text-white font-medium hover:bg-stone-800 transition">
            {user.name}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button className="px-4 h-10 rounded-xl border border-black bg-white hover:bg-amber-50 transition font-medium">
              Login
            </button>

            <button className="px-4 h-10 rounded-xl border border-black bg-stone-900 text-white hover:bg-stone-800 transition font-medium">
              Register
            </button>
          </div>
        )} */}
    </header>
  );
}

export default Header;