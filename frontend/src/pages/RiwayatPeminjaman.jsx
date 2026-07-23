import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import { fetchBorrowingHistory } from "../services/api";

const ASSET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Fungsi bantuan untuk mengubah tanggal dari backend menjadi format lokal (ex: 2 Mei 2026)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Fungsi memetakan status bahasa Inggris dari Database ke tampilan UI pengguna
function getStatusDisplay(status) {
  switch (status) {
    case "PENDING":
      return { label: "Menunggu Persetujuan", style: "bg-amber-100 border-amber-500 text-amber-700" };
    case "BORROWED":
      return { label: "Sedang Dipinjam", style: "bg-blue-100 border-blue-500 text-blue-700" };
    case "REQUEST_EXTEND":
      return { label: "Proses Perpanjangan", style: "bg-purple-100 border-purple-500 text-purple-700" };
    case "LATE":
      return { label: "Terlambat", style: "bg-rose-100 border-rose-600 text-rose-700" };
    case "RETURNED":
      return { label: "Selesai", style: "bg-green-100 border-green-600 text-green-700" };
    case "REJECTED":
      return { label: "Ditolak", style: "bg-stone-100 border-stone-500 text-stone-700" };
    default:
      return { label: status, style: "bg-gray-100 border-gray-400 text-gray-700" };
  }
}

function RiwayatPeminjaman() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data riwayat peminjaman dari Backend saat halaman dimuat
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await fetchBorrowingHistory();
        if (response && response.data) {
          setRiwayat(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil riwayat peminjaman:", error);
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  // Filter pencarian berdasarkan judul buku atau penulis
  const filtered = riwayat.filter(
    (r) =>
      !query ||
      r.book?.title.toLowerCase().includes(query.toLowerCase()) ||
      r.book?.author.toLowerCase().includes(query.toLowerCase())
  );

  const getCoverImage = (coverPath) => {
    if (!coverPath) return 'https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover';
    if (coverPath.startsWith('http')) return coverPath;
    return `${ASSET_URL}/uploads/${coverPath}`; 
  };

  return (
    <AppShell header={<Header value={query} onChange={setQuery} placeholder="Cari riwayat..." />}>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
        
        {/* Header Section */}
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

        {/* List Riwayat Berdasarkan Data Dinamis */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-sm text-stone-500 font-body py-10 animate-pulse">
              Memuat riwayat peminjaman...
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => {
              const displayStatus = getStatusDisplay(item.status);
              
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/buku/${item.book?.id}`)}
                  className="bg-amber-50 border border-black rounded-2xl p-4 shadow-xs hover:bg-amber-100/40 transition cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* Cover Buku */}
                    <img
                      src={getCoverImage(item.book?.book_cover || item.book?.cover)}
                      alt={`Cover ${item.book?.title}`}
                      className="w-24 h-32 mx-auto sm:mx-0 rounded-lg border border-black shrink-0 object-cover"
                    />

                    {/* Informasi Teks */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline text-lg md:text-xl font-bold text-stone-900">
                          {item.book?.title || "Buku Tidak Diketahui"}
                        </h2>
                        <p className="text-sm text-stone-600 font-body">{item.book?.author || "-"}</p>
                      </div>

                      {/* Detail Tanggal */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm font-body">
                        <div>
                          <p className="text-stone-500 text-xs font-semibold mb-0.5">Tanggal Pinjam</p>
                          <p className="font-bold text-stone-900">{formatDate(item.borrow_date)}</p>
                        </div>

                        <div>
                          <p className="text-stone-500 text-xs font-semibold mb-0.5">
                            {item.status === 'RETURNED' ? 'Dikembalikan Pada' : 'Batas Kembali'}
                          </p>
                          <p className="font-bold text-stone-900">
                            {item.status === 'RETURNED' 
                              ? formatDate(item.return_date) 
                              : formatDate(item.due_date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Badge Status */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                    <span
                      className={
                        "w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider shadow-xs " +
                        displayStatus.style
                      }
                    >
                      {displayStatus.label}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-sm text-stone-500 font-body py-10">
              Tidak ada riwayat yang cocok dengan pencarian Anda.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default RiwayatPeminjaman;