const bookService = require("../services/bookService");

async function index(req, res) {
  try {
    const books = await bookService.getAllBooks();

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
    // req.body sekarang sudah terbaca!
    const { title, author, publisher, year, category_id, total_stock } = req.body;

    if (!title || !author || !publisher || !year || !category_id || total_stock === undefined) {
      return res.status(400).json({
        status: "error",
        message: "title, author, publisher, year, category_id, dan total_stock wajib diisi",
      });
    }

    if (Number(total_stock) < 0) {
      return res.status(400).json({
        status: "error",
        message: "total_stock tidak boleh negatif",
      });
    }

    const category = await bookService.getCategoryById(category_id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Kategori tidak ditemukan",
      });
    }

    // TANGKAP FILE GAMBAR: Jika ada file yang diunggah, simpan nama filenya ke req.body.book_cover
    if (req.file) {
      req.body.book_cover = req.file.filename;
    }

    const book = await bookService.createBook(req.body);

    res.status(201).json({
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

async function update(req, res) {
  try {
    const { id } = req.params;
    const { category_id, total_stock } = req.body;

    const existing = await bookService.getBookById(id);
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    if (category_id) {
      const category = await bookService.getCategoryById(category_id);
      if (!category) {
        return res.status(404).json({
          status: "error",
          message: "Kategori tidak ditemukan",
        });
      }
    }

    if (total_stock !== undefined && Number(total_stock) < 0) {
      return res.status(400).json({
        status: "error",
        message: "total_stock tidak boleh negatif",
      });
    }

    // TANGKAP FILE GAMBAR: Jika Admin mengunggah cover baru, timpa data cover yang lama
    if (req.file) {
      req.body.book_cover = req.file.filename;
    }

    const book = await bookService.updateBook(id, req.body);

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