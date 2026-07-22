const db = require('../config/db');

const getBooks = async () => {
  const query = `SELECT id, category_id, title, author, publisher, description, book_cover, year, total_stock, available FROM books WHERE deleted_at IS NULL`;
  const [response] = await db.execute(query);
  return response;
};

const getBookById = async (id) => {
  const query = `SELECT id, category_id, title, author, publisher, description, book_cover, year, total_stock, available FROM books WHERE id = ? AND deleted_at IS NULL`;
  const [response] = await db.execute(query, [id]);
  return response[0];
};

module.exports = {
  getBooks,
  getBookById,
};