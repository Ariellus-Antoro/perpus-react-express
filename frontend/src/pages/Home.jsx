import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import { books } from '../data/books';

const rekomendasi = books.slice(0, 6);

function Home() {
  const [query, setQuery] = useState('');

  return (
    <AppShell header={<Header value={query} onChange={setQuery} />}>
      <section className="rounded-2xl bg-gradient-to-br from-brand to-violet-600 text-white p-6 md:p-10 mb-8">
        <span className="inline-block bg-white/20 text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
          Promo Minggu Ini
        </span>
        <h2 className="text-xl md:text-3xl font-bold mb-2">Baca Gratis 30 Hari</h2>
        <p className="text-sm md:text-base text-white/85 max-w-xs md:max-w-md">
          Nikmati ribuan koleksi e-book &amp; buku fisik favoritmu.
        </p>
      </section>

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Buku Pilihan</h3>
        <Link to="/buku" className="text-xs md:text-sm font-semibold text-brand">
          Lihat semua
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 mb-8">
        {rekomendasi.map((b) => (
          <BookCard key={b.id} id={b.id} title={b.title} author={b.author} gradient={b.book_cover} />
        ))}
      </div>

      <section className="rounded-2xl bg-amber-100 p-6 md:p-8">
        <h3 className="font-semibold text-amber-800 mb-1">Gabung Klub Baca</h3>
        <p className="text-sm text-amber-700">Diskusi buku bareng komunitas setiap minggu.</p>
      </section>
    </AppShell>
  );
}

export default Home;
