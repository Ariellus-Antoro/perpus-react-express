import { Link } from 'react-router-dom';

function BookCard({ id, title, author, gradient }) {
  return (
    <div className="flex flex-col min-w-0 group cursor-pointer">
      <div
        className="aspect-[3/4.2] rounded-xl flex items-end p-2.5 shadow-sm border border-amber-200/60 transition-transform duration-200 group-hover:-translate-y-1"
        style={{ background: gradient }}
      >
        <span className="text-amber-100 text-[11px] font-bold leading-snug drop-shadow-md">
          {title}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold text-stone-900 truncate group-hover:text-amber-700 transition-colors">
        {title}
      </p>
      <p className="text-xs text-stone-500 truncate">{author}</p>
    </div>
  );
}

export default BookCard;