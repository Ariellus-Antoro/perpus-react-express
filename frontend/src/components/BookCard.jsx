import { Link } from 'react-router-dom';

function BookCard({ id, title, author, gradient }) {
  return (
    <div className="flex flex-col min-w-0">
      <Link
        to={`/buku/${id}`}
        className="block aspect-[3/4.2] rounded-xl overflow-hidden shadow-md shadow-slate-900/10 transition-transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
      >
        <div className="w-full h-full flex items-end p-2" style={{ background: gradient }}>
          <span className="text-white/90 text-[11px] font-bold leading-snug">{title}</span>
        </div>
      </Link>
      <p className="mt-2 text-sm font-semibold text-slate-800 truncate">{title}</p>
      <p className="text-xs text-slate-400 truncate">{author}</p>
    </div>
  );
}

export default BookCard;