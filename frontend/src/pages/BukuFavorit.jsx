import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import { HeartIcon } from "../components/icons";

// Data dummy sementara di frontend (belum ada endpoint backend untuk favorit).
const favoritAwal = [
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    gradient: "linear-gradient(160deg,#4ade80,#15803d)",
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    gradient: "linear-gradient(160deg,#fb7185,#be123c)",
  },
  {
    id: 7,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    gradient: "linear-gradient(160deg,#60a5fa,#1d4ed8)",
  },
  {
    id: 8,
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    gradient: "linear-gradient(160deg,#f472b6,#be185d)",
  },
];

function BukuFavorit() {
  const [query, setQuery] = useState("");
  const [favorit, setFavorit] = useState(favoritAwal);

  function hapusFavorit(id) {
    setFavorit((prev) => prev.filter((b) => b.id !== id));
  }

  const filtered = favorit.filter(
    (b) =>
      !query ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari buku favorit..." />}>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-label text-stone-600 font-medium">
            Perpustakaan
          </span>

          <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">
            Buku Favorit
          </h1>

          <p className="text-sm text-stone-500 font-body">
            Buku-buku yang sudah Anda tandai sebagai favorit.
          </p>
        </div>

        {/* Grid Buku Favorit */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-amber-50/40 border border-black shadow-xs">
            {filtered.map((b) => (
              <div key={b.id} className="relative group">
                <Link to={`/buku/${b.id}`} className="block">
                  <div
                    className="w-full aspect-[3/4] rounded-xl border border-black shadow-xs"
                    style={{ background: b.gradient }}
                  />
                  <h3 className="mt-2 text-sm font-headline font-bold text-stone-900 truncate">
                    {b.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-body truncate">{b.author}</p>
                </Link>

                <button
                  onClick={() => hapusFavorit(b.id)}
                  title="Hapus dari favorit"
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-amber-50 border border-black shadow-xs hover:bg-rose-100 transition text-rose-600"
                >
                  <HeartIcon fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-stone-500 font-body py-10 rounded-2xl bg-amber-50/40 border border-black">
            Belum ada buku favorit. Tambahkan dari halaman detail buku.
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default BukuFavorit;
