import { useState } from 'react';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';

const fiksi = [
  { title: 'Laskar Pelangi', author: 'Andrea Hirata', gradient: 'linear-gradient(160deg,#60a5fa,#1d4ed8)' },
  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', gradient: 'linear-gradient(160deg,#f472b6,#be185d)' },
  { title: 'Negeri 5 Menara', author: 'A. Fuadi', gradient: 'linear-gradient(160deg,#fbbf24,#b45309)' },
  { title: 'Laut Bercerita', author: 'Leila S. Chudori', gradient: 'linear-gradient(160deg,#6d5efc,#4338ca)' },
];

const nonFiksi = [
  { title: 'Sapiens', author: 'Yuval N. Harari', gradient: 'linear-gradient(160deg,#94a3b8,#334155)' },
  { title: 'Atomic Habits', author: 'James Clear', gradient: 'linear-gradient(160deg,#4ade80,#15803d)' },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', gradient: 'linear-gradient(160deg,#34d399,#047857)' },
  { title: 'Bumi Manusia', author: 'Pramoedya A.T.', gradient: 'linear-gradient(160deg,#fb7185,#be123c)' },
];

const categories = ['Semua', 'Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah'];

function Buku() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Semua');

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku..." />}>
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={
              'shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap ' +
              (active === c ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500')
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Fiksi</h3>
        <span className="text-xs md:text-sm font-semibold text-brand cursor-pointer">Lihat semua</span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 mb-8">
        {fiksi.map((b) => (
          <BookCard key={b.title} {...b} />
        ))}
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Non-Fiksi</h3>
        <span className="text-xs md:text-sm font-semibold text-brand cursor-pointer">Lihat semua</span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
        {nonFiksi.map((b) => (
          <BookCard key={b.title} {...b} />
        ))}
      </div>
    </AppShell>
  );
}

export default Buku;
