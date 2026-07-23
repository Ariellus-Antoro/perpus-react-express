import { Link } from 'react-router-dom';

function BookCard({ id, title, author, coverUrl }) {
  return (
    <div className="flex flex-col min-w-0 group cursor-pointer">
      <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden shadow-sm border border-amber-200/60 transition-transform duration-200 group-hover:-translate-y-1 bg-stone-100">
        
        <img 
          src={coverUrl} 
          alt={`Cover buku ${title}`} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x420/e7e5e4/a8a29e?text=No+Cover';
          }}
        />

      </div>
      <p className="mt-2 text-sm font-bold text-stone-900 truncate group-hover:text-amber-700 transition-colors">
        {title}
      </p>
      <p className="text-xs text-stone-500 truncate">{author}</p>
    </div>
  );
}

export default BookCard;