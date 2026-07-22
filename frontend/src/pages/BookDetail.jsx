


// TIDAK DI GUNAKAN !!!!



// import { useParams, useNavigate, Link } from 'react-router-dom';
// import AppShell from '../components/AppShell';
// import Header from '../components/Header';
// import { getBookById, getCategoryName } from '../data/books';

// const ChevronLeftIcon = (props) => (
//     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
//         <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// function BookDetail() {
//     const { id } = useParams();   
//     const navigate = useNavigate();
//     const book = getBookById(id);

//     if (!book) {
//         return (
//         <AppShell header={<Header value="" onChange={() => {}} />}>
//             <div className="max-w-xl mx-auto text-center py-16 font-body" style={{ backgroundColor: '#FDFBF7' }}>
//             <h2 className="text-lg font-headline font-semibold text-stone-900 mb-2">Buku tidak ditemukan</h2>
//             <p className="text-sm font-body text-stone-600 mb-6">
//                 Buku yang kamu cari mungkin sudah dihapus atau tidak tersedia.
//             </p>
//             <Link to="/buku" className="font-label text-stone-900 font-semibold text-sm hover:underline">
//                 Kembali ke daftar buku
//             </Link>
//             </div>
//         </AppShell>
//         );
//     }

//     const isAvailable = book.available > 0;

//     return (
//         <AppShell header={<Header value="" onChange={() => {}} />}>
//         <div style={{ backgroundColor: '#FDFBF7' }} className="min-h-screen p-2 md:p-4 text-stone-900 space-y-6">
//             <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-1.5 text-sm font-label font-semibold text-stone-600 mb-5 hover:text-stone-950 transition"
//             >
//                 <ChevronLeftIcon />
//                 Kembali
//             </button>

//             <div className="max-w-4xl mx-auto md:flex md:gap-10 bg-amber-50/40 p-6 md:p-8 rounded-2xl border border-black shadow-xs">
//                 <div
//                 className="w-40 sm:w-52 md:w-64 shrink-0 mx-auto md:mx-0 aspect-[3/4.2] rounded-2xl shadow-xs border border-black flex items-end p-4"
//                 style={{ background: book.book_cover }}
//                 >
//                 <span className="text-amber-100 font-headline font-bold text-sm leading-snug drop-shadow-md">{book.title}</span>
//                 </div>

//                 <div className="mt-6 md:mt-0 flex-1">
//                 <span className="inline-block text-[11px] font-label font-bold text-stone-950 bg-amber-200 border border-black px-3 py-1 rounded-full mb-3 shadow-xs">
//                     {getCategoryName(book.category_id)}
//                 </span>

//                 <h1 className="text-xl md:text-2xl font-headline font-bold text-stone-950 mb-1">{book.title}</h1>
//                 <p className="text-sm font-body text-stone-600 mb-5">{book.author}</p>

//                 <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm font-body">
//                     <div className="bg-white p-3 rounded-xl border border-black shadow-xs">
//                         <dt className="text-stone-500 font-label text-xs mb-0.5">Penerbit</dt>
//                         <dd className="font-semibold text-stone-900">{book.publisher}</dd>
//                     </div>
//                     <div className="bg-white p-3 rounded-xl border border-black shadow-xs">
//                         <dt className="text-stone-500 font-label text-xs mb-0.5">Tahun Terbit</dt>
//                         <dd className="font-semibold text-stone-900">{book.year}</dd>
//                     </div>
//                     <div className="bg-white p-3 rounded-xl border border-black shadow-xs">
//                         <dt className="text-stone-500 font-label text-xs mb-0.5">Stok Tersedia</dt>
//                         <dd className="font-semibold text-stone-900">
//                             {book.available} / {book.total_stock}
//                         </dd>
//                     </div>
//                 </dl>

//                 <div className="mb-6 bg-white p-4 rounded-xl border border-black shadow-xs">
//                     <h2 className="text-sm font-headline font-bold text-stone-950 mb-2">Deskripsi</h2>
//                     <p className="text-sm font-body text-stone-700 leading-relaxed">{book.description}</p>
//                 </div>

//                 <button
//                     disabled={!isAvailable}
//                     className={
//                     'w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-label font-bold transition-all border border-black ' +
//                     (isAvailable
//                         ? 'bg-amber-100 text-stone-950 hover:bg-amber-200 shadow-xs'
//                         : 'bg-stone-200 text-stone-400 cursor-not-allowed')
//                     }
//                 >
//                     {isAvailable ? 'Pinjam Buku' : 'Stok Habis'}
//                 </button>
//                 </div>
//             </div>
//         </div>
//         </AppShell>
//     );
// }

// export default BookDetail;