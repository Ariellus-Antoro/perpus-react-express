import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import api from '../services/api'; // Integrasi API terpusat

const ASSET_URL = 'http://localhost:8000';

export default function Buku() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Semua');

  // State untuk menyimpan data dari Backend
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchBooksAndCategories = async () => {
      try {
        const [resBooks, resCats] = await Promise.all([
          api.get('/books'),
          api.get('/categories')
        ]);
        
        if (resBooks) setBooks(resBooks.data || resBooks);
        if (resCats) setCategories(resCats.data || resCats);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndCategories();
  }, []);

  console.log("Data buku dari backend:", books);

  // 1. Membuat Tab Dinamis berdasarkan data kategori dari database
  const tabs = ['Semua', ...categories.map(c => c.category_name)];

  // 2. Filter buku berdasarkan Search (query) dan Tab Kategori (active)
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const catName = b.category?.category_name || 'Tanpa Kategori';
      const matchCategory = active === 'Semua' || catName === active;
      
      const matchQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
        
      return matchCategory && matchQuery;
    });
  }, [books, active, query]);

  // 3. Mengelompokkan buku yang sudah difilter berdasarkan Kategori (Grouping)
  // Ini bertujuan agar tampilan per-section (seperti Fiksi, Non-Fiksi) otomatis terbentuk
  const groupedBooks = useMemo(() => {
    const groups = {};
    filteredBooks.forEach(book => {
      const catName = book.category?.category_name || 'Tanpa Kategori';
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(book);
    });
    return groups;
  }, [filteredBooks]);

  // Fungsi pembantu untuk memuat gambar cover
  const getCoverImage = (coverPath) => {
    // Ganti via.placeholder.com menjadi placehold.co
    if (!coverPath) return 'https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover';
    if (coverPath.startsWith('http')) return coverPath;
    
    return `${ASSET_URL}/uploads/${coverPath}`; 
  };

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku atau penulis..." />}>
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

        {/* State Loading / Data Kosong */}
        {loading ? (
          <p className="text-center text-stone-500 font-body py-12 animate-pulse">Memuat koleksi buku perpustakaan...</p>
        ) : Object.keys(groupedBooks).length === 0 ? (
          <p className="text-center text-stone-500 font-body py-12">Tidak ada buku yang ditemukan.</p>
        ) : (
          /* Render Dinamis: Looping Section berdasarkan Kategori yang tersedia */
          Object.keys(groupedBooks).map((categoryName) => (
            <div key={categoryName} className="mb-8">
              {/* Header Kategori */}
              <div className="flex items-baseline justify-between mb-3 border-b border-black pb-2">
                <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2 capitalize">
                  <span className="w-2 h-2 rounded-full bg-stone-900 inline-block"></span>
                  {categoryName}
                </h3>
                {/* Tampilkan tombol "Lihat semua" hanya jika buku di kategori ini lebih dari 6 */}
                {groupedBooks[categoryName].length > 6 && (
                  <span className="text-xs md:text-sm font-semibold text-stone-900 hover:underline cursor-pointer transition">
                    Lihat semua &rarr;
                  </span>
                )}
              </div>
              
              {/* Container Grid Buku */}
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
                {groupedBooks[categoryName].map((b) => (
                  <Link key={b.id} to={`/buku/${b.id}`} className="group">
                    {/* PASTIKAN BAGIAN INI DITULIS SEPERTI INI: */}
                    <BookCard 
                      id={b.id}
                      title={b.title} 
                      author={b.author} 
                      coverUrl={b.book_cover ? `http://localhost:8080/uploads/${b.book_cover}` : null}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}