import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import AppShell from '../components/AppShell';
import BookCard from '../components/BookCard';
import api from '../services/api';

const ASSET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Buku() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Semua');

  // State Data
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk mengontrol tampilan (Detail vs Daftar)
  const [selectedBook, setSelectedBook] = useState(null);

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

  // 1. Kategori & Filter
  const tabs = ['Semua', ...categories.map(c => c.category_name)];

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

  // 2. Grouping
  const groupedBooks = useMemo(() => {
    const groups = {};
    filteredBooks.forEach(book => {
      const catName = book.category?.category_name || 'Tanpa Kategori';
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(book);
    });
    return groups;
  }, [filteredBooks]);

  // 3. Helper Image
  const getCoverImage = (coverPath) => {
    if (!coverPath) return 'https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover';
    if (coverPath.startsWith('http')) return coverPath;
    
    // Sesuaikan dengan struktur folder backend Anda
    // Jika di KelolaBukuAdmin Anda menggunakan /uploads/ saja, ikuti ini:
    return `${ASSET_URL}/uploads/${coverPath}`; 
  };


  // Jika ada buku yang dipilih, tampilkan UI Detail
  
  if (selectedBook) {
    const isAvailable = selectedBook.available > 0;

    return (
      <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku atau penulis..." />}>
        <div className="p-4 md:p-8 min-h-screen bg-[#FDFBF7] text-stone-900 font-body animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Detail & Tombol Kembali */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-black/20">
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-label font-bold text-amber-800">
                Detail Koleksi
              </span>
              <h1 className="text-2xl md:text-4xl font-headline font-bold text-stone-950 mt-1">
                {selectedBook.title}
              </h1>
            </div>
            <button
              onClick={() => setSelectedBook(null)}
              className="mt-4 md:mt-0 px-4 py-2 bg-white border border-black rounded-full text-xs font-semibold hover:bg-amber-100 transition inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              &larr; Kembali ke daftar buku
            </button>
          </div>

          {/* Grid Layout Detail Buku */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Kolom Kiri: Gambar & Status */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="rounded-[2rem] overflow-hidden border border-black shadow-xs bg-white aspect-[3/4]">
                <img
                  src={getCoverImage(selectedBook.book_cover || selectedBook.cover)}
                  alt={`Cover ${selectedBook.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="border border-black rounded-[2rem] p-5 bg-white shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Status Stok</p>
                  <p className={`font-bold text-lg ${isAvailable ? 'text-stone-900' : 'text-rose-700'}`}>
                    {isAvailable ? 'Tersedia' : 'Kosong'}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border border-black shadow-xs ${isAvailable ? 'bg-amber-100 text-stone-900' : 'bg-rose-100 text-rose-800'}`}>
                  {selectedBook.available} unit ada
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Info & Deskripsi */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              
              {/* Box Informasi Utama */}
              <div className="border border-black rounded-[2rem] p-6 lg:p-8 bg-white shadow-xs">
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-bold mb-2">Informasi Utama</p>
                <h2 className="text-3xl font-headline font-bold text-stone-950">{selectedBook.title}</h2>
                <p className="text-stone-700 mt-1">
                  Penulis: <span className="font-bold text-stone-900">{selectedBook.author}</span>
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="border border-black rounded-2xl p-4 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Penerbit</p>
                    <p className="font-bold text-stone-900">{selectedBook.publisher || '-'}</p>
                  </div>
                  <div className="border border-black rounded-2xl p-4 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Tahun Terbit</p>
                    <p className="font-bold text-stone-900">{selectedBook.year || '-'}</p>
                  </div>
                  <div className="border border-black rounded-2xl p-4 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Total Stok</p>
                    <p className="font-bold text-stone-900">{selectedBook.total_stock} Eksemplar</p>
                  </div>
                  <div className="border border-black rounded-2xl p-4 bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">Sisa Ketersediaan</p>
                    <p className="font-bold text-amber-800">{selectedBook.available} Eksemplar</p>
                  </div>
                </div>
              </div>

              {/* Box Deskripsi & Tombol Pinjam */}
              <div className="border border-black rounded-[2rem] p-6 lg:p-8 bg-white shadow-xs flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block"></span>
                    Deskripsi Buku
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm md:text-base text-justify mb-8">
                    {selectedBook.description || 'Tidak ada deskripsi yang tersedia untuk buku ini.'}
                  </p>
                </div>
                
                <button 
                  disabled={!isAvailable}
                  className={`w-full py-3.5 rounded-xl border border-black font-label font-bold text-sm shadow-xs transition-colors ${isAvailable ? 'bg-amber-100 hover:bg-amber-200 text-stone-950 cursor-pointer' : 'bg-stone-200 text-stone-500 cursor-not-allowed opacity-70'}`}
                >
                  {isAvailable ? 'Pinjam Buku Sekarang' : 'Stok Sedang Kosong'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // =======================================================================
  // RENDER AREA: Daftar Buku Utama
  // =======================================================================
  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari judul buku atau penulis..." />}>
      <div className="bg-[#FDFBF7] min-h-screen p-2 md:p-4 space-y-6 text-stone-900 animate-in fade-in duration-300">
        
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
          /* Render Dinamis Berdasarkan Kategori */
          Object.keys(groupedBooks).map((categoryName) => (
            <div key={categoryName} className="mb-8">
              
              {/* Header Kategori */}
              <div className="flex items-baseline justify-between mb-3 border-b border-black pb-2">
                <h3 className="font-bold text-stone-900 text-lg flex items-center gap-2 capitalize">
                  <span className="w-2 h-2 rounded-full bg-stone-900 inline-block"></span>
                  {categoryName}
                </h3>
                {groupedBooks[categoryName].length > 6 && (
                  <span className="text-xs md:text-sm font-semibold text-stone-900 hover:underline cursor-pointer transition">
                    Lihat semua &rarr;
                  </span>
                )}
              </div>
              
              {/* Container Grid Buku */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
                {groupedBooks[categoryName].map((b) => (
                  // PERUBAHAN: Mengganti tag <Link> dengan <div> yang memiliki onClick
                  <div 
                    key={b.id} 
                    onClick={() => setSelectedBook(b)}
                    className="group cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
                  >
                    <BookCard 
                      id={b.id}
                      title={b.title} 
                      author={b.author} 
                      coverUrl={getCoverImage(b.book_cover)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}