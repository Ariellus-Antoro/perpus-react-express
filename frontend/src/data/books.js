// Data dummy sementara di frontend (belum ada endpoint backend untuk buku).
// Struktur field sengaja mengikuti tabel `books` & `categories` pada ERD:
// books: id, category_id, title, author, publisher, description, book_cover,
//        year, total_stock, available
// categories: id, category_name

export const categories = [
  { id: 1, category_name: 'Fiksi' },
  { id: 2, category_name: 'Non-Fiksi' },
];

export const books = [
  {
    id: 1,
    category_id: 1,
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    publisher: 'Kepustakaan Populer Gramedia',
    description:
      'Novel yang mengisahkan kehidupan Laut, seorang aktivis mahasiswa, dan pergolakan batin keluarganya di tengah masa kelam Indonesia akhir era Orde Baru.',
    book_cover: 'linear-gradient(160deg,#6d5efc,#4338ca)',
    year: 2017,
    total_stock: 8,
    available: 3,
  },
  {
    id: 2,
    category_id: 1,
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    publisher: 'Hasta Mitra',
    description:
      'Kisah Minke, pemuda pribumi di masa kolonial Belanda, yang bergulat dengan cinta, identitas, dan ketidakadilan sistem kolonial lewat sudut pandang yang jernih dan berani.',
    book_cover: 'linear-gradient(160deg,#fb7185,#be123c)',
    year: 1980,
    total_stock: 6,
    available: 0,
  },
  {
    id: 3,
    category_id: 2,
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    publisher: 'Kompas',
    description:
      'Pengantar populer filsafat Stoisisme yang membahas cara mengelola emosi negatif dan menjalani hidup lebih tenang, dikemas dengan bahasa yang ringan dan konteks masa kini.',
    book_cover: 'linear-gradient(160deg,#34d399,#047857)',
    year: 2018,
    total_stock: 10,
    available: 7,
  },
  {
    id: 4,
    category_id: 2,
    title: 'Sapiens',
    author: 'Yuval N. Harari',
    publisher: 'Pantheon Books',
    description:
      'Menelusuri sejarah panjang manusia dari zaman batu hingga era modern, membahas bagaimana bahasa, mitos, dan kerja sama membentuk peradaban manusia sapiens.',
    book_cover: 'linear-gradient(160deg,#94a3b8,#334155)',
    year: 2011,
    total_stock: 5,
    available: 2,
  },
  {
    id: 5,
    category_id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Avery',
    description:
      'Panduan praktis membangun kebiasaan baik dan menghilangkan kebiasaan buruk lewat perubahan-perubahan kecil yang konsisten, didukung riset ilmu perilaku.',
    book_cover: 'linear-gradient(160deg,#4ade80,#15803d)',
    year: 2018,
    total_stock: 9,
    available: 9,
  },
  {
    id: 6,
    category_id: 1,
    title: 'Negeri 5 Menara',
    author: 'A. Fuadi',
    publisher: 'Gramedia Pustaka Utama',
    description:
      'Perjalanan Alif dan lima sahabatnya menimba ilmu di pondok pesantren, menggapai mimpi hingga ke penjuru dunia lewat mantra "man jadda wajada".',
    book_cover: 'linear-gradient(160deg,#fbbf24,#b45309)',
    year: 2009,
    total_stock: 7,
    available: 4,
  },
  {
    id: 7,
    category_id: 1,
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    description:
      'Kisah perjuangan sepuluh anak Belitung menempuh pendidikan di tengah keterbatasan, dibalut persahabatan dan semangat pantang menyerah.',
    book_cover: 'linear-gradient(160deg,#60a5fa,#1d4ed8)',
    year: 2005,
    total_stock: 6,
    available: 1,
  },
  {
    id: 8,
    category_id: 1,
    title: 'Cantik Itu Luka',
    author: 'Eka Kurniawan',
    publisher: 'AKY Press',
    description:
      'Saga keluarga yang memadukan realisme magis dengan sejarah kelam Indonesia, berpusat pada kisah Dewi Ayu dan keempat putrinya.',
    book_cover: 'linear-gradient(160deg,#f472b6,#be185d)',
    year: 2002,
    total_stock: 4,
    available: 2,
  },
];

export function getBookById(id) {
  return books.find((b) => String(b.id) === String(id)) || null;
}

export function getCategoryName(categoryId) {
  return categories.find((c) => c.id === categoryId)?.category_name || '-';
}
