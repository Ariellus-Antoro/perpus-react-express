function BookCard({ title, author, gradient }) {
  return (
    <div className="flex flex-col min-w-0">
      <div
        className="aspect-[3/4.2] rounded-xl flex items-end p-2 shadow-md shadow-slate-900/10"
        style={{ background: gradient }}
      >
        <span className="text-white/90 text-[11px] font-bold leading-snug">{title}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-800 truncate">{title}</p>
      <p className="text-xs text-slate-400 truncate">{author}</p>
    </div>
  );
}

export default BookCard;
