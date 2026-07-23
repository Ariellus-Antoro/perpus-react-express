const bookService = require("../services/bookService");

async function index(req, res) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const books = await bookService.getAllBooks(limit);

    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function store(req, res) {
  try {
    const { title, author, publisher, year, category_id, total_stock } = req.body;

    // Validasi dasar
    if (!title || !author || !publisher || !year || !category_id || total_stock === undefined) {
      return res.status(400).json({ status: "error", message: "Data wajib diisi semua" });
    }

    if (Number(total_stock) < 0) {
      return res.status(400).json({ status: "error", message: "Stok tidak boleh negatif" });
    }

    const category = await bookService.getCategoryById(category_id);
    if (!category) return res.status(404).json({ status: "error", message: "Kategori tidak ditemukan" });

    // PERBAIKAN: Buat objek data yang bersih dan casting tipe data angka
    const bookData = {
      title: title,
      author: author,
      publisher: publisher,
      year: parseInt(year),
      category_id: parseInt(category_id),
      total_stock: parseInt(total_stock),
      available: parseInt(total_stock), // Tersedia awal = total stok
      book_cover: req.file ? req.file.filename : null, // Tangkap nama file!
    };

    // Kirim objek yang sudah bersih ke Service
    const book = await bookService.createBook(bookData);

    res.status(201).json({ status: "success", data: book });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const existing = await bookService.getBookById(id);
    if (!existing) return res.status(404).json({ status: "error", message: "Buku tidak ditemukan" });

    // 💡 PERBAIKAN: Siapkan objek update
    const updateData = { ...req.body };

    // Parsing ke integer jika data dikirim
    if (updateData.year) updateData.year = parseInt(updateData.year);
    if (updateData.category_id) updateData.category_id = parseInt(updateData.category_id);
    if (updateData.total_stock) updateData.total_stock = parseInt(updateData.total_stock);
    if (updateData.available) updateData.available = parseInt(updateData.available);

    // Tangkap file jika admin mengunggah cover baru
    if (req.file) {
      updateData.book_cover = req.file.filename;
    }

    const book = await bookService.updateBook(id, updateData);

    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;

    const existing = await bookService.getBookById(id);
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    await bookService.deleteBook(id);

    res.status(200).json({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};