import AppShell from "../components/AppShell";
import Header from "../components/Header";

const borrowedBooks = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://via.placeholder.com/90x130",
        borrowDate: "12 Juli 2026",
        dueDate: "26 Juli 2026",
        status: "Dipinjam",
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        cover: "https://via.placeholder.com/90x130",
        borrowDate: "18 Juli 2026",
        dueDate: "1 Agustus 2026",
        status: "Dipinjam",
    },
    ];

    function BorrowedBooks() {
    return (
        <AppShell header={<Header value="" onChange={() => {}} />}>
        <div
            className="min-h-screen p-6 space-y-6"
            style={{ backgroundColor: "#FDFBF7" }}
        >
            {/* Header */}
            <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-label text-stone-600 font-medium">
                    Perpustakaan
                </span>

                <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">
                    Buku Dipinjam
                </h1>

                <p className="text-sm text-stone-500 font-body">
                    Daftar buku yang sedang Anda pinjam.
                </p>
            </div>

            {/* List Buku */}
            <div className="space-y-4">
            {borrowedBooks.map((book) => (
                <div
                    key={book.id}
                    className="bg-amber-50 border border-black rounded-2xl p-4 shadow-xs hover:bg-amber-100/40 transition"
                    >
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Cover */}
                        <img
                        src={book.cover}
                        alt={book.title}
                        className="w-24 h-32 mx-auto sm:mx-0 rounded-lg border border-black object-cover shrink-0"
                        />

                        {/* Informasi */}
                        <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-lg md:text-xl font-bold text-stone-900">
                            {book.title}
                            </h2>

                            <p className="text-sm text-stone-600 font-body">
                            {book.author}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                            <div>
                            <p className="text-stone-500">Tanggal Pinjam</p>
                            <p className="font-semibold">{book.borrowDate}</p>
                            </div>

                            <div>
                            <p className="text-stone-500">Jatuh Tempo</p>
                            <p className="font-semibold">{book.dueDate}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                        <span className="w-full sm:w-auto flex items-center justify-center px-3 py-2 rounded-full bg-green-100 border border-green-600 text-green-700 text-xs font-bold uppercase tracking-wide">
                            {book.status}
                        </span>

                        <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-50 border border-black hover:bg-amber-100 transition text-xs uppercase tracking-wider font-label font-medium">
                        Detail
                        </button>
                    </div>
                    </div>
            ))}
            </div>
        </div>
        </AppShell>
    );
}

export default BorrowedBooks;