import { useParams, useNavigate, Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import Header from '../components/Header';
import { getBookById, getCategoryName } from '../data/books';

const ChevronLeftIcon = (props) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function BookDetail() {
    const { id } = useParams();   
    const navigate = useNavigate();
    const book = getBookById(id);

    if (!book) {
        return (
        <AppShell header={<Header value="" onChange={() => {}} />}>
            <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Buku tidak ditemukan</h2>
            <p className="text-sm text-slate-500 mb-6">
                Buku yang kamu cari mungkin sudah dihapus atau tidak tersedia.
            </p>
            <Link to="/buku" className="text-brand font-semibold text-sm">
                Kembali ke daftar buku
            </Link>
            </div>
        </AppShell>
        );
    }

    const isAvailable = book.available > 0;

    return (
        <AppShell header={<Header value="" onChange={() => {}} />}>
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-5 hover:text-slate-700"
        >
            <ChevronLeftIcon />
            Kembali
        </button>

        <div className="max-w-4xl mx-auto md:flex md:gap-10">
            <div
            className="w-40 sm:w-52 md:w-64 shrink-0 mx-auto md:mx-0 aspect-[3/4.2] rounded-2xl shadow-lg shadow-slate-900/15 flex items-end  p-4"
            style={{ background: book.book_cover }}
            >
            <span className="text-white font-bold text-sm leading-snug">{book.title}</span>
            </div>

            <div className="mt-6 md:mt-0 flex-1">
            <span className="inline-block text-[11px] font-semibold text-brand bg-indigo-50 px-3 py-1 rounded-full mb-3">
                {getCategoryName(book.category_id)}
            </span>

            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">{book.title}</h1>
            <p className="text-sm text-slate-500 mb-5">{book.author}</p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                <dt className="text-slate-400 text-xs mb-0.5">Penerbit</dt>
                <dd className="font-semibold text-slate-700">{book.publisher}</dd>
                </div>
                <div>
                <dt className="text-slate-400 text-xs mb-0.5">Tahun Terbit</dt>
                <dd className="font-semibold text-slate-700">{book.year}</dd>
                </div>
                <div>
                <dt className="text-slate-400 text-xs mb-0.5">Stok Tersedia</dt>
                <dd className="font-semibold text-slate-700">
                    {book.available} / {book.total_stock}
                </dd>
                </div>
            </dl>

            <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-700 mb-2">Deskripsi</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{book.description}</p>
            </div>

            <button
                disabled={!isAvailable}
                className={
                'w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-semibold transition-colors ' +
                (isAvailable
                    ? 'bg-brand text-white hover:bg-indigo-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed')
                }
            >
                {isAvailable ? 'Pinjam Buku' : 'Stok Habis'}
            </button>
            </div>
        </div>
        </AppShell>
    );
}

export default BookDetail;
