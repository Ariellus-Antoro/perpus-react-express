const bookService = require('../services/bookService');

const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json({ status: 'success', data: books });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json({ status: 'success', data: book });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBookById,
};