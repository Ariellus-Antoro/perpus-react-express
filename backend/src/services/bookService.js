const prisma = require("../config/prisma");

async function getAllBooks() {
  return await prisma.books.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      category: true, // ikut sertakan data kategori terkait
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function getBookById(id) {
  return await prisma.books.findFirst({
    where: {
      id: Number(id),
      deleted_at: null,
    },
    include: {
      category: true,
    },
  });
}

async function getCategoryById(category_id) {
  return await prisma.categories.findFirst({
    where: {
      id: Number(category_id),
      deleted_at: null,
    },
  });
}

async function createBook(data) {
  const totalStock = Number(data.total_stock);

  return await prisma.books.create({
    data: {
      category_id: Number(data.category_id),
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      description: data.description ?? null,
      book_cover: data.book_cover ?? null,
      year: Number(data.year),
      total_stock: totalStock,
      available: totalStock, // buku baru: semua stok tersedia
    },
  });
}

async function updateBook(id, data) {
  const existing = await prisma.books.findUnique({ where: { id: Number(id) } });

  let newAvailable = existing.available;

  // kalau total_stock diubah, sesuaikan available berdasarkan selisihnya
  if (data.total_stock !== undefined) {
    const newTotalStock = Number(data.total_stock);
    const diff = newTotalStock - existing.total_stock;
    newAvailable = existing.available + diff;
  }

  if (newAvailable < 0) {
    throw new Error(
      "Total stock tidak boleh lebih kecil dari jumlah buku yang sedang dipinjam",
    );
  }

  return await prisma.books.update({
    where: { id: Number(id) },
    data: {
      category_id: data.category_id
        ? Number(data.category_id)
        : existing.category_id,
      title: data.title ?? existing.title,
      author: data.author ?? existing.author,
      publisher: data.publisher ?? existing.publisher,
      description: data.description ?? existing.description,
      book_cover: data.book_cover ?? existing.book_cover,
      year: data.year ? Number(data.year) : existing.year,
      total_stock: data.total_stock
        ? Number(data.total_stock)
        : existing.total_stock,
      available: newAvailable,
    },
  });
}

async function deleteBook(id) {
  return await prisma.books.update({
    where: { id: Number(id) },
    data: {
      deleted_at: new Date(),
    },
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  getCategoryById,
  createBook,
  updateBook,
  deleteBook,
};
