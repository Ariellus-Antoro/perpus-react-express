import { Link } from 'react-router-dom';

function BookCard({ id, title, author, gradient }) {
  return (
    <div className="flex flex-col min-w-0 group cursor-pointer">
      <div
        className="aspect-[3/4.2] rounded-xl flex items-end p-2.5 shadow-md border border-amber-500/20 transition-transform duration-200 group-hover:-translate-y-1"
        style={{ background: gradient }}
      >
        <span className="text-amber-100 text-[11px] font-bold leading-snug drop-shadow-md">
          {title}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold text-emerald-950 truncate group-hover:text-amber-600 transition-colors">
        {title}
      </p>
      <p className="text-xs text-emerald-800/70 truncate">{author}</p>
    </div>
  );
}

export default BookCard;