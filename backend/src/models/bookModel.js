const prisma = require('../config/db');

const getBooks = async () => {
  // Menggunakan Prisma ORM untuk mengambil buku yang belum dihapus
  const books = await prisma.books.findMany({
    where: {
      deleted_at: null
    },
    select: {
      id: true,
      category_id: true,
      title: true,
      author: true,
      publisher: true,
      description: true,
      book_cover: true,
      year: true,
      total_stock: true,
      available: true
    }
  });
  return books;
};

const getBookById = async (id) => {
  const book = await prisma.books.findFirst({
    where: {
      id: parseInt(id),
      deleted_at: null
    },
    select: {
      id: true,
      category_id: true,
      title: true,
      author: true,
      publisher: true,
      description: true,
      book_cover: true,
      year: true,
      total_stock: true,
      available: true
    }
  });
  return book;
};

module.exports = {
  getBooks,
  getBookById,
};