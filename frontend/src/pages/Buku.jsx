import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';

const fiksi = [
  { title: 'Laskar Pelangi', author: 'Andrea Hirata', gradient: 'linear-gradient(160deg,#064e3b,#022c22)' },
  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', gradient: 'linear-gradient(160deg,#b45309,#78350f)' },
  { title: 'Negeri 5 Menara', author: 'A. Fuadi', gradient: 'linear-gradient(160deg,#fbbf24,#b45309)' },
  { title: 'Laut Bercerita', author: 'Leila S. Chudori', gradient: 'linear-gradient(160deg,#047857,#065f46)' },
];

const nonFiksi = [
  { title: 'Sapiens', author: 'Yuval N. Harari', gradient: 'linear-gradient(160deg,#334155,#0f172a)' },
  { title: 'Atomic Habits', author: 'James Clear', gradient: 'linear-gradient(160deg,#059669,#064e3b)' },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', gradient: 'linear-gradient(160deg,#d97706,#92400e)' },
  { title: 'Bumi Manusia', author: 'Pramoedya A.T.', gradient: 'linear-gradient(160deg,#065f46,#022c22)' },
];

const categories = ['Semua', 'Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah'];

function Buku() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Semua');

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku..." />}>
      {/* Category Pills Header */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={
              'shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 ' +
              (active === c
                ? 'bg-emerald-950 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'bg-emerald-50 text-emerald-900/70 hover:bg-emerald-100 hover:text-emerald-950')
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Section 1: Fiksi */}
      <div className="flex items-baseline justify-between mb-3 border-b border-emerald-900/10 pb-2">
        <h3 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          Fiksi
        </h3>
        <span className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-700 cursor-pointer transition">
          Lihat semua &rarr;
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 mb-8">
        {fiksi.map((b, index) => (
          <Link key={b.title} to={`/buku/${index + 1}`}>
            <BookCard {...b} />
          </Link>
        ))}
      </div>

      {/* Section 2: Non-Fiksi */}
      <div className="flex items-baseline justify-between mb-3 border-b border-emerald-900/10 pb-2">
        <h3 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          Non-Fiksi
        </h3>
        <span className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-700 cursor-pointer transition">
          Lihat semua &rarr;
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
        {nonFiksi.map((b, index) => (
          <Link key={b.title} to={`/buku/${fiksi.length + index + 1}`}>
            <BookCard {...b} />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

export default Buku;