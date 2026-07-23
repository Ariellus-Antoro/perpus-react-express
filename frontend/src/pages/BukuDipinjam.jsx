import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import api, { requestExtendBorrowing } from "../services/api";

const ASSET_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
function BorrowedBooks() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBorrowedBooks = async () => {
        setLoading(true);
        try {
        const res = await api.get("/borrow");
        if (res.status === "success") {
            const activeBorrowings = res.data.filter(b => 
            (b.status !== "RETURNED" && b.status !== "REJECTED") || 
            (b.status === "RETURNED" && b.fine && b.fine.payment_status === "UNPAID")
            );
            setBorrowedBooks(activeBorrowings);
        }
        } catch (error) {
        console.error("Gagal mengambil data buku dipinjam:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const handleRequestExtend = async (id) => {
    if (!window.confirm("Ingin mengajukan tambahan waktu 7 hari untuk buku ini?")) return;
    
    try {
        await requestExtendBorrowing(id);
        alert("Pengajuan perpanjangan berhasil dikirim ke Admin!");
        fetchBorrowedBooks(); // Refresh UI agar statusnya berubah jadi REQUEST_EXTEND
    } catch (error) {
        alert(error.response?.data?.message || "Gagal mengajukan perpanjangan.");
    }
    };

    const getCoverImage = (coverPath) => {
        if (!coverPath) return "https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover";
        if (coverPath.startsWith("http")) return coverPath;
        return `${ASSET_URL}/uploads/${coverPath}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const getStatusBadge = (status, hasUnpaidFine) => {
        if (hasUnpaidFine || status === "LATE") {
        return <span className="w-full sm:w-auto text-center px-3 py-2 rounded-full bg-rose-100 border border-rose-600 text-rose-800 text-xs font-bold uppercase tracking-wide">Terkena Denda</span>;
        }
        switch (status) {
        case "PENDING": 
            return (
                <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-blue-100 border border-blue-600 text-blue-800 text-xs font-bold uppercase tracking-wide">
                    Menunggu Persetujuan
                </span>
            );
        case "REJECTED": 
            return (
            <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-stone-200 border border-stone-600 text-stone-700 text-xs font-bold uppercase tracking-wide line-through">
                Ditolak Admin
            </span>
            );
        case "BORROWED":
            return (
            <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-emerald-100 border border-emerald-600 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                Sedang Dipinjam
            </span>
            );
        case "LATE":
            return (
            <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-rose-100 border border-rose-600 text-rose-800 text-xs font-bold uppercase tracking-wide">
                Terlambat
            </span>
            );
        case "REQUEST_EXTEND":
            return (
            <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-amber-200 border border-amber-600 text-amber-900 text-xs font-bold uppercase tracking-wide">
                Menunggu Perpanjangan
            </span>
            );
        default:
            return (
            <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-stone-100 border border-stone-600 text-stone-800 text-xs font-bold uppercase tracking-wide">
                {status}
            </span>
            );
        }
    };


    return (
        <AppShell header={<Header value="" onChange={() => {}} />}>
        <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
            
            {/* Header Title */}
            <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-label text-stone-600 font-medium">Perpustakaan</span>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">Buku Dipinjam</h1>
            </div>

            {/* List Buku */}
            <div className="space-y-4">
            {loading ? (
                <p className="text-center font-label font-bold text-stone-500 py-12 animate-pulse">Memuat data pinjaman...</p>
            ) : borrowedBooks.length === 0 ? (
                <p className="text-center font-label text-stone-500 py-12">Kamu tidak memiliki buku yang aktif dipinjam saat ini.</p>
            ) : (
                borrowedBooks.map((borrow) => {
                const isLate = new Date(borrow.due_date) < new Date();
                const hasUnpaidFine = borrow.fine && borrow.fine.payment_status === "UNPAID";
                const statusToDisplay = isLate && borrow.status === "BORROWED" ? "LATE" : borrow.status;

                return (
                    <div key={borrow.id} className="bg-amber-50 border border-black rounded-2xl p-4 shadow-xs">
                    
                    {/* BANNER DENDA*/}
                    {(isLate || hasUnpaidFine) && (
                        <div className="mb-4 p-3 rounded-xl bg-rose-100 border border-rose-500 text-rose-800 text-xs font-bold font-body">
                        {hasUnpaidFine 
                            ? `Buku telah dikembalikan, namun Anda memiliki denda Rp${borrow.fine.total_fines} yang belum lunas. Harap segera bayar langsung ke petugas perpustakaan.` 
                            : "Buku telah melewati batas waktu pengembalian. Harap segera kembalikan buku dan lunasi denda secara langsung ke petugas perpustakaan."}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <img src={getCoverImage(borrow.book.book_cover)} alt={borrow.book.title} className="w-24 h-32 rounded-lg border border-black object-cover shrink-0 bg-white" />
                        
                        <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-lg font-bold text-stone-900">{borrow.book.title}</h2>
                            <p className="text-sm text-stone-600 font-body">{borrow.book.author}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm font-body">
                            <div>
                            <p className="text-stone-500 text-xs uppercase font-bold">Tanggal Pinjam</p>
                            <p className="font-semibold">{formatDate(borrow.borrow_date)}</p>
                            </div>
                            <div>
                            <p className={`text-xs uppercase font-bold ${isLate ? 'text-rose-600' : 'text-stone-500'}`}>Jatuh Tempo</p>
                            <p className={`font-semibold ${isLate ? 'text-rose-600' : 'text-stone-900'}`}>{formatDate(borrow.due_date)}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Tampilkan Badge dengan mengirim 2 parameter */}
                        <div>{getStatusBadge(statusToDisplay, hasUnpaidFine)}</div>
                        
                        <div className="flex gap-2">
                        {borrow.status === 'BORROWED' && !isLate && borrow.extend_count === 0 && (
                            <button 
                            onClick={() => handleRequestExtend(borrow.id)}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-100 border border-black hover:bg-blue-200 transition text-xs uppercase font-bold text-stone-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            >
                            Perpanjang
                            </button>
                        )}
                        <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-100 border border-black hover:bg-amber-200 transition text-xs uppercase font-bold text-stone-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            Detail
                        </button>
                        </div>
                    </div>
                    </div>
                );
                })

            )}
            </div>
        </div>
        </AppShell>
    );
}

export default BorrowedBooks;