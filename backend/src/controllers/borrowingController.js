const borrowingService = require("../services/borrowingService");

async function index(req, res) {
  try {
    const user_id = req.user.id;
    const role = req.user.role;

    const borrowings = await borrowingService.getAllBorrowings(user_id, role);

    res.status(200).json({
      status: "success",
      data: borrowings,
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

    const borrowing = await borrowingService.getBorrowingById(id);

    if (!borrowing) {
      return res.status(404).json({
        status: "error",
        message: "Data peminjaman tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: borrowing,
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
    const user_id = req.user.id; // dari token, bukan dari body
    const { book_id } = req.body;

    if (!book_id || isNaN(book_id)) {
      return res.status(400).json({
        status: "error",
        message: "book_id wajib diisi",
      });
    }

    // 1. cek buku ada & stok tersedia
    const book = await borrowingService.getBookById(book_id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    if (book.available <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Stok buku habis",
      });
    }

    // 2. cek user belum punya peminjaman aktif untuk buku yang sama
    const existingBorrowing = await borrowingService.findActiveBorrowingForBook(
      user_id,
      book_id,
    );
    if (existingBorrowing) {
      return res.status(400).json({
        status: "error",
        message: "Kamu masih memiliki peminjaman aktif untuk buku ini",
      });
    }

    // 3. cek maksimal 5 buku aktif
    const activeCount = await borrowingService.countActiveBorrowings(user_id);
    if (activeCount >= borrowingService.MAX_ACTIVE_BORROWINGS) {
      return res.status(400).json({
        status: "error",
        message: `Kamu sudah mencapai batas maksimal ${borrowingService.MAX_ACTIVE_BORROWINGS} buku aktif`,
      });
    }

    // 4. buat peminjaman + kurangi stok (dalam transaction)
    const borrowing = await borrowingService.createBorrowing(user_id, book_id);

    res.status(201).json({
      status: "success",
      data: borrowing,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function storeBulk(req, res) {
  try {
    const user_id = req.user.id;
    const { book_ids } = req.body;

    // 1. validasi input dasar
    if (!Array.isArray(book_ids) || book_ids.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "book_ids wajib diisi berupa array dan tidak boleh kosong",
      });
    }

    // 2. cek duplikat id dalam satu request
    const uniqueIds = new Set(book_ids.map((id) => Number(id)));
    if (uniqueIds.size !== book_ids.length) {
      return res.status(400).json({
        status: "error",
        message: "Terdapat book_id yang duplikat dalam satu request",
      });
    }

    // 3. cek total gabungan (yang sudah aktif + yang mau dipinjam) tidak melebihi batas maks
    const activeCount = await borrowingService.countActiveBorrowings(user_id);
    if (
      activeCount + book_ids.length >
      borrowingService.MAX_ACTIVE_BORROWINGS
    ) {
      return res.status(400).json({
        status: "error",
        message: `Total peminjaman akan melebihi batas maksimal ${borrowingService.MAX_ACTIVE_BORROWINGS} buku aktif (saat ini aktif: ${activeCount})`,
      });
    }

    // 4. proses semua buku dalam satu transaction (all-or-nothing)
    const borrowings = await borrowingService.createBorrowingsBulk(
      user_id,
      book_ids,
    );

    res.status(201).json({
      status: "success",
      message: `${borrowings.length} buku berhasil dipinjam`,
      data: borrowings,
    });
  } catch (error) {
    // error dari dalam transaction (stok habis, buku gak ada, dll) balik ke sini
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}


async function returnConfirm(req, res) {
  try {
    const { id } = req.params;

    const result = await borrowingService.confirmReturn(id);

    res.status(200).json({
      status: "success",
      message:
        result.late_days > 0
          ? `Buku dikembalikan telat ${result.late_days} hari. Denda: Rp${result.fine.total_fines}`
          : "Buku dikembalikan tepat waktu",
      data: result,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
}

async function requestExtend(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const borrowing = await borrowingService.requestExtend(id, user_id);

    res.status(200).json({
      status: "success",
      message: "Request perpanjangan masa peminjaman berhasil dikirim",
      data: borrowing,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
}

async function confirmExtend(req, res) {
  try {
    const { id } = req.params;

    const borrowing = await borrowingService.confirmExtend(id);

    res.status(200).json({
      status: "success",
      message: "Perpanjangan masa peminjaman berhasil disetujui",
      data: borrowing,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
}

async function rejectExtend(req, res) {
  try {
    const { id } = req.params;

    const borrowing = await borrowingService.rejectExtend(id);

    res.status(200).json({
      status: "success",
      message: "Request perpanjangan masa peminjaman ditolak",
      data: borrowing,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  storeBulk,
  returnConfirm,
  requestExtend,
  confirmExtend,
  rejectExtend,
};
