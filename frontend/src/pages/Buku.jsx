import { useMemo, useState } from 'react';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import { books, categories } from '../data/books';

const tabs = ['Semua', ...categories.map((c) => c.category_name)];

function Buku() {
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
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((c) => (
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

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400 py-10 text-center">Tidak ada buku yang cocok.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
          {filtered.map((b) => (
            <BookCard key={b.id} id={b.id} title={b.title} author={b.author} gradient={b.book_cover} />
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default Buku;
