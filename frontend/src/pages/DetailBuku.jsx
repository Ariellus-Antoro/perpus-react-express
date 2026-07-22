import Header from '../components/Header';
import AppShell from '../components/AppShell';
import { Link } from 'react-router-dom';

function DetailBuku() {
  const book = {
    id: 1,
    category_id: 2,
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    description:
      'Laskar Pelangi adalah kisah sekelompok anak di Belitung yang berjuang untuk tetap sekolah meski dibayang-bayangi kemiskinan, persahabatan, dan mimpi besar. Buku ini menghadirkan optimisme, nilai persahabatan, dan kekuatan pendidikan.',
    book_cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    year: '2005',
    total_stock: 12,
    available: 8,
  };

  return (
    <AppShell header={<Header placeholder="Cari buku, penulis..." />}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between border-b border-emerald-900/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-600">Detail Koleksi</p>
            <h1 className="text-3xl font-bold text-emerald-950 mt-1">{book.title}</h1>
          </div>
          <Link
            to="/buku"
            className="inline-flex items-center rounded-full border border-emerald-900/20 bg-emerald-50/50 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 hover:text-emerald-950"
          >
            &larr; Kembali ke daftar buku
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Left Column: Cover & Status Box */}
          <div className="space-y-4">
            <img
              src={book.book_cover}
              alt={book.title}
              className="h-[460px] w-full rounded-[28px] object-cover shadow-md border-2 border-amber-500/30"
            />
            <div className="rounded-[28px] border border-emerald-900/15 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-emerald-800/60 font-medium">Status Stok</p>
                  <p className={`text-lg font-bold ${book.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {book.available > 0 ? 'Tersedia' : 'Sedang Dipinjam'}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-950 px-3.5 py-1.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                  {book.available} unit ada
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info Metadata & Description */}
          <div className="space-y-6">
            <div className="rounded-[28px] border border-emerald-900/15 bg-white p-8 shadow-sm">
              <div className="mb-6 flex flex-col gap-1 border-b border-emerald-900/10 pb-4">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-600">Informasi Utama</p>
                <h2 className="text-3xl font-bold text-emerald-950">{book.title}</h2>
                <p className="text-base font-medium text-emerald-800/80">Penulis: <span className="text-emerald-950 font-semibold">{book.author}</span></p>
              </div>

              {/* Grid Metadata Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">ID Buku</p>
                  <p className="font-bold text-emerald-950">{book.id}</p>
                </div>
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">Kategori ID</p>
                  <p className="font-bold text-emerald-950">{book.category_id}</p>
                </div>
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">Penerbit</p>
                  <p className="font-bold text-emerald-950">{book.publisher}</p>
                </div>
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">Tahun Terbit</p>
                  <p className="font-bold text-emerald-950">{book.year}</p>
                </div>
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">Total Stok</p>
                  <p className="font-bold text-emerald-950">{book.total_stock} Eksemplar</p>
                </div>
                <div className="space-y-1 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-800/70 font-semibold">Sisa Ketersediaan</p>
                  <p className="font-bold text-amber-600">{book.available} Eksemplar</p>
                </div>
              </div>
            </div>

            {/* Description & Action CTA */}
            <div className="rounded-[28px] border border-emerald-900/15 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-950 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                Deskripsi Buku
              </h3>
              <p className="text-emerald-900/80 leading-relaxed text-sm md:text-base">{book.description}</p>
              
              <button
                type="button"
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-950 border border-amber-500/40 px-6 py-3.5 text-base font-bold text-amber-400 shadow-md transition-all duration-200 hover:bg-emerald-900 hover:text-amber-300"
              >
                Pinjam Buku Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default DetailBuku;