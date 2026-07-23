import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import { fetchBooks } from '../services/api';

// 1. Tambahkan konstanta ASSET_URL
const ASSET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function Home() {
  const [query, setQuery] = useState('');
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestBooks = async () => {
      try {
        const res = await fetchBooks(6);
        if (res.status === 'success') {
          setLatestBooks(res.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data buku:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getLatestBooks();
  }, []);

  // 2. Bawa fungsi pembantu getCoverImage ke sini
  const getCoverImage = (coverPath) => {
    if (!coverPath) return 'https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover';
    if (coverPath.startsWith('http')) return coverPath;
    return `${ASSET_URL}/uploads/${coverPath}`; 
  };

  return (
    <AppShell header={<Header value={query} onChange={setQuery} />}>
      <div style={{ backgroundColor: '#FDFBF7' }} className="min-h-screen space-y-8 text-stone-900 p-2 md:p-4">
        
        {/* Hero Banner Promo */}
        <section className="rounded-2xl bg-amber-50/80 text-stone-900 p-6 md:p-10 border border-black shadow-xs">
          <span className="inline-block bg-amber-200 text-stone-900 border border-black text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-xs">
            Promo Minggu Ini
          </span>
          <h2 className="text-xl md:text-3xl font-bold mb-2 text-stone-950">Baca Gratis 30 Hari</h2>
          <p className="text-sm md:text-base text-stone-700 max-w-xs md:max-w-md">
            Nikmati ribuan koleksi e-book &amp; buku fisik favoritmu dengan keanggotaan eksklusif.
          </p>
        </section>

        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-3 border-b border-black pb-2">
          <h3 className="font-bold text-stone-950 text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-950 inline-block"></span>
            Buku Pilihan
          </h3>
          <Link 
            to="/buku"
            className="text-xs md:text-sm font-semibold text-stone-900 hover:underline cursor-pointer transition">
            Lihat semua &rarr;
          </Link>
        </div>

        {/* Grid Book Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
        {loading ? (
            <div className="col-span-full flex justify-center items-center font-label font-bold text-stone-500 py-8">
              Memuat koleksi buku...
            </div>
        ) : latestBooks.length > 0 ? (
          latestBooks.map((b) =>(
            // 3. PERBAIKAN: Gunakan rute "/buku" dan kirimkan data buku lewat 'state'
            <Link key={b.id} to="/buku" state={{ selectedBook: b }} className="group transform hover:-translate-y-1 transition-transform duration-200">
                <BookCard 
                  title={b.title} 
                  author={b.author} 
                  // 4. Gunakan fungsi getCoverImage
                  coverUrl={getCoverImage(b.book_cover)} 
                />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center font-label text-stone-500 py-8">
            Belum ada buku yang tersedia.
          </div>
        )}
        </div>

        {/* Banner Klub Baca */}
        <section className="rounded-2xl bg-amber-50/80 border border-black p-6 md:p-8 shadow-xs">
          <h3 className="font-bold text-stone-950 text-lg mb-1 flex items-center gap-2">
            Gabung Klub Baca
          </h3>
          <p className="text-sm text-stone-700">Diskusi buku bareng komunitas dan penikmat literatur setiap minggu siang.</p>
        </section>

      </div>
    </AppShell>
  );
}

export default Home;