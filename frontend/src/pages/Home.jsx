import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import { books } from '../data/books';

<<<<<<< HEAD
const rekomendasi = [
  { title: 'Laut Bercerita', author: 'Leila S. Chudori', gradient: 'linear-gradient(160deg,#047857,#065f46)' },
  { title: 'Bumi Manusia', author: 'Pramoedya A.T.', gradient: 'linear-gradient(160deg,#065f46,#022c22)' },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', gradient: 'linear-gradient(160deg,#d97706,#92400e)' },
  { title: 'Sapiens', author: 'Yuval N. Harari', gradient: 'linear-gradient(160deg,#334155,#0f172a)' },
  { title: 'Atomic Habits', author: 'James Clear', gradient: 'linear-gradient(160deg,#059669,#064e3b)' },
  { title: 'Negeri 5 Menara', author: 'A. Fuadi', gradient: 'linear-gradient(160deg,#fbbf24,#b45309)' },
];
=======
const rekomendasi = books.slice(0, 6);
>>>>>>> 4099cc5811666c48a14df0c4a8440a68fd0530b6

function Home() {
  const [query, setQuery] = useState('');

  return (
    <AppShell header={<Header value={query} onChange={setQuery} />}>
      {/* Hero Banner Promo */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 md:p-10 mb-8 border border-amber-500/30 shadow-md">
        <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
          Promo Minggu Ini
        </span>
        <h2 className="text-xl md:text-3xl font-bold mb-2 text-amber-100">Baca Gratis 30 Hari</h2>
        <p className="text-sm md:text-base text-emerald-100/80 max-w-xs md:max-w-md">
          Nikmati ribuan koleksi e-book &amp; buku fisik favoritmu dengan keanggotaan eksklusif.
        </p>
      </section>

<<<<<<< HEAD
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-3 border-b border-emerald-900/10 pb-2">
        <h3 className="font-bold text-emerald-950 text-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          Buku Pilihan
        </h3>
        <span className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-700 cursor-pointer transition">
          Lihat semua &rarr;
        </span>
=======
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Buku Pilihan</h3>
        <Link to="/buku" className="text-xs md:text-sm font-semibold text-brand">
          Lihat semua
        </Link>
>>>>>>> 4099cc5811666c48a14df0c4a8440a68fd0530b6
      </div>

      {/* Grid Book Cards */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 mb-8">
        {rekomendasi.map((b) => (
          <BookCard key={b.id} id={b.id} title={b.title} author={b.author} gradient={b.book_cover} />
        ))}
      </div>

      {/* Banner Klub Baca */}
      <section className="rounded-2xl bg-amber-50 border border-amber-300/60 p-6 md:p-8 shadow-sm">
        <h3 className="font-bold text-amber-900 text-lg mb-1 flex items-center gap-2">
          ✨ Gabung Klub Baca
        </h3>
        <p className="text-sm text-amber-800/80">Diskusi buku bareng komunitas dan penikmat literatur setiap minggu.</p>
      </section>
    </AppShell>
  );
}

export default Home;