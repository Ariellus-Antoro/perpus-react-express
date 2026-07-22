import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import { books, categories } from '../data/books';

const tabs = ['Semua', 'Fiksi', 'Non-Fiksi', 'Sains', 'Sejarah'];

const fiksi = [
  { title: 'Laskar Pelangi', author: 'Andrea Hirata', gradient: 'linear-gradient(160deg,#78350f,#451a03)' },
  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', gradient: 'linear-gradient(160deg,#92400e,#581c87)' },
  { title: 'Negeri 5 Menara', author: 'A. Fuadi', gradient: 'linear-gradient(160deg,#b45309,#78350f)' },
  { title: 'Laut Bercerita', author: 'Leila S. Chudori', gradient: 'linear-gradient(160deg,#65a30d,#3f6212)' },
];

const nonFiksi = [
  { title: 'Sapiens', author: 'Yuval N. Harari', gradient: 'linear-gradient(160deg,#475569,#1e293b)' },
  { title: 'Atomic Habits', author: 'James Clear', gradient: 'linear-gradient(160deg,#d97706,#b45309)' },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', gradient: 'linear-gradient(160deg,#b45309,#78350f)' },
  { title: 'Bumi Manusia', author: 'Pramoedya A.T.', gradient: 'linear-gradient(160deg,#854d0e,#422006)' },
];

export default function Buku() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Semua');

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCategory =
        active === 'Semua' || categories.find((c) => c.id === b.category_id)?.category_name === active;
      const matchQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [active, query]);

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku..." />}>
      {/* Background utama putih polos */}
      <div className="bg-white min-h-screen p-2 md:p-4 space-y-6 text-stone-900">
        
        {/* Category Pills Header */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={
                'shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-250 ' +
                (active === c
                  ? 'bg-amber-100 text-stone-950 border border-black shadow-xs'
                  : 'bg-amber-50/50 text-stone-700 hover:bg-amber-100/60 hover:text-stone-950 border border-black/30')
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Section 1: Fiksi */}
        <div className="flex items-baseline justify-between mb-3 border-b border-black pb-2">
          <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-900 inline-block"></span>
            Fiksi
          </h3>
          <span className="text-xs md:text-sm font-semibold text-stone-900 hover:underline cursor-pointer transition">
            Lihat semua &rarr;
          </span>
        </div>
        
        {/* Container grid dengan border hitam */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
          {fiksi.map((b, index) => (
            <Link key={b.title} to={`/buku/${index + 1}`} className="group">
              <BookCard {...b} />
            </Link>
          ))}
        </div>

        {/* Section 2: Non-Fiksi */}
        <div className="flex items-baseline justify-between mb-3 border-b border-black pb-2">
          <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-900 inline-block"></span>
            Non-Fiksi
          </h3>
          <span className="text-xs md:text-sm font-semibold text-stone-900 hover:underline cursor-pointer transition">
            Lihat semua &rarr;
          </span>
        </div>

        {/* Container grid dengan border hitam */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
          {nonFiksi.map((b, index) => (
            <Link key={b.title} to={`/buku/${fiksi.length + index + 1}`} className="group">
              <BookCard {...b} />
            </Link>
          ))}
        </div>

      </div>
    </AppShell>
  );
}