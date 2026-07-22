import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Header from "../components/Header";

// Data dummy sementara di frontend (belum ada endpoint backend untuk riwayat).
const riwayat = [
  {
    id: 1,
    title: "Sapiens",
    author: "Yuval N. Harari",
    gradient: "linear-gradient(160deg,#94a3b8,#334155)",
    borrowDate: "2 Mei 2026",
    returnDate: "16 Mei 2026",
    status: "Selesai",
  },
  {
    id: 2,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    gradient: "linear-gradient(160deg,#34d399,#047857)",
    borrowDate: "20 April 2026",
    returnDate: "4 Mei 2026",
    status: "Selesai",
  },
  {
    id: 3,
    title: "Negeri 5 Menara",
    author: "A. Fuadi",
    gradient: "linear-gradient(160deg,#fbbf24,#b45309)",
    borrowDate: "10 Maret 2026",
    returnDate: "2 April 2026",
    status: "Terlambat",
  },
  {
    id: 4,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    gradient: "linear-gradient(160deg,#6d5efc,#4338ca)",
    borrowDate: "15 Februari 2026",
    returnDate: "1 Maret 2026",
    status: "Selesai",
  },
];

function statusStyle(status) {
  if (status === "Terlambat") {
    return "bg-rose-100 border-rose-600 text-rose-700";
  }
  return "bg-green-100 border-green-600 text-green-700";
}

function RiwayatPeminjaman() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = riwayat.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari riwayat..." />}>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-label text-stone-600 font-medium">
            Perpustakaan
          </span>

          <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">
            Riwayat Peminjaman
          </h1>

          <p className="text-sm text-stone-500 font-body">
            Semua buku yang pernah Anda pinjam sebelumnya.
          </p>
        </div>

        {/* List Riwayat */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/buku/${item.id}`)}
              className="bg-amber-50 border border-black rounded-2xl p-4 shadow-xs hover:bg-amber-100/40 transition cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Cover */}
                <div
                  className="w-24 h-32 mx-auto sm:mx-0 rounded-lg border border-black shrink-0"
                  style={{ background: item.gradient }}
                />

                {/* Informasi */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-headline text-lg md:text-xl font-bold text-stone-900">
                      {item.title}
                    </h2>
                    <p className="text-sm text-stone-600 font-body">{item.author}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                    <div>
                      <p className="text-stone-500">Tanggal Pinjam</p>
                      <p className="font-semibold">{item.borrowDate}</p>
                    </div>

                    <div>
                      <p className="text-stone-500">Tanggal Kembali</p>
                      <p className="font-semibold">{item.returnDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <span
                  className={
                    "w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full border text-xs font-bold uppercase tracking-wide " +
                    statusStyle(item.status)
                  }
                >
                  {item.status}
                </span>

                <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-50 border border-black hover:bg-amber-100 transition text-xs uppercase tracking-wider font-label font-medium">
                  Detail
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-sm text-stone-500 font-body py-10">
              Tidak ada riwayat yang cocok dengan pencarian.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default RiwayatPeminjaman;
