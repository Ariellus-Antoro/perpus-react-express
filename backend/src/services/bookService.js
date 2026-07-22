const bookModel = require('../models/bookModel');

const getBooks = async () => {
  return await bookModel.getBooks();
};

const getBookById = async (id) => {
  const book = await bookModel.getBookById(id);
  if (!book) {
    const error = new Error('Buku tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return book;
};

module.exports = {
  getBooks,
  getBookById,
};