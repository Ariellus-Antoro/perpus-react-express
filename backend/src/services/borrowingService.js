const prisma = require("../config/db");
const prisma = require("../config/prisma"); // FIX: sebelumnya salah import dari config/db (pool MySQL lama)

const MAX_ACTIVE_BORROWINGS = 5;
const BORROW_DURATION_DAYS = 7;
const EXTEND_DURATION_DAYS = 14; // masa tambahan kalau perpanjangan di-approve
const EXTEND_MIN_HOURS_BEFORE_DUE = 5; // request ditolak kalau kurang dari 5 jam ke deadline
const MAX_EXTEND_COUNT = 1; // perpanjangan cuma boleh 1x per peminjaman
const FINE_PER_DAY = 10000; // Rp 10.000 / hari telat

async function countActiveBorrowings(user_id) {
  return await prisma.borrowings.count({
    where: {
      user_id: Number(user_id),
      status: { in: ["BORROWED", "REQUEST_EXTEND", "LATE"] },
    },
  });
}

async function getBookById(book_id) {
  return await prisma.books.findFirst({
    where: { id: Number(book_id), deleted_at: null },
  });
}

async function findActiveBorrowingForBook(user_id, book_id) {
  return await prisma.borrowings.findFirst({
    where: {
      user_id: Number(user_id),
      book_id: Number(book_id),
      status: { in: ["BORROWED", "REQUEST_EXTEND", "LATE"] },
    },
  });
}

async function createBorrowing(user_id, book_id) {
  const borrow_date = new Date();
  const due_date = new Date();
  due_date.setDate(due_date.getDate() + BORROW_DURATION_DAYS);

  return await prisma.$transaction(async (tx) => {
    const borrowing = await tx.borrowings.create({
      data: {
        user_id: Number(user_id),
        book_id: Number(book_id),
        borrow_date,
        due_date,
        status: "BORROWED",
      },
    });

    await tx.books.update({
      where: { id: Number(book_id) },
      data: { available: { decrement: 1 } },
    });

    return borrowing;
  });
}

async function getAllBorrowings(user_id, role) {
  const where = role === "ADMIN" ? {} : { user_id: Number(user_id) };

  return await prisma.borrowings.findMany({
    where,
    include: {
      book: true,
      user: { select: { id: true, full_name: true, email: true } },
      fine: true,
    },
    orderBy: { created_at: "desc" },
  });
}

async function getBorrowingById(id, user_id, role) {
  const where =
    role === "ADMIN"
      ? { id: Number(id) }
      : {
          id: Number(id),
          user_id: Number(user_id),
        };

  return await prisma.borrowings.findUnique({
    where,
    include: {
      book: true,
      user: { select: { id: true, full_name: true, email: true } },
      fine: true,
    },
  });
}

async function validateBatchLimit(user_id, book_ids) {
  const uniqueIds = new Set(book_ids.map((id) => Number(id)));
  if (uniqueIds.size !== book_ids.length) {
    return "Terdapat buku yang sama dipilih lebih dari sekali";
  }

  const currentActive = await countActiveBorrowings(user_id);
  if (currentActive + book_ids.length > MAX_ACTIVE_BORROWINGS) {
    return `Total peminjaman aktif akan melebihi batas maksimal ${MAX_ACTIVE_BORROWINGS} buku`;
  }

  return null;
}

async function createBorrowingsBulk(user_id, book_ids) {
  const borrow_date = new Date();
  const due_date = new Date();
  due_date.setDate(due_date.getDate() + BORROW_DURATION_DAYS);

  return await prisma.$transaction(async (tx) => {
    const results = [];

    for (const book_id of book_ids) {
      const book = await tx.books.findFirst({
        where: { id: Number(book_id), deleted_at: null },
      });

      if (!book) throw new Error(`Buku dengan id ${book_id} tidak ditemukan`);
      if (book.available <= 0)
        throw new Error(`Stok buku "${book.title}" habis`);

      const existingBorrowing = await tx.borrowings.findFirst({
        where: {
          user_id: Number(user_id),
          book_id: Number(book_id),
          status: { in: ["BORROWED", "REQUEST_EXTEND", "LATE"] },
        },
      });

      if (existingBorrowing) {
        throw new Error(
          `Kamu masih memiliki peminjaman aktif untuk buku "${book.title}"`,
        );
      }

      const borrowing = await tx.borrowings.create({
        data: {
          user_id: Number(user_id),
          book_id: Number(book_id),
          borrow_date,
          due_date,
          status: "BORROWED",
        },
      });

      await tx.books.update({
        where: { id: Number(book_id) },
        data: { available: { decrement: 1 } },
      });

      results.push(borrowing);
    }

    return results;
  });
}

function calculateLateDays(due_date, compare_date) {
  const due = new Date(due_date);
  const compared = new Date(compare_date);

  due.setHours(0, 0, 0, 0);
  compared.setHours(0, 0, 0, 0);

  const diffMs = compared - due;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

// pengembalian sekarang 1 langkah: admin proses langsung saat buku fisik diterima
async function confirmReturn(borrowing_id) {
  const borrowing = await prisma.borrowings.findUnique({
    where: { id: Number(borrowing_id) },
  });

  if (!borrowing) {
    throw { status: 404, message: "Data peminjaman tidak ditemukan" };
  }

  if (!["BORROWED", "LATE"].includes(borrowing.status)) {
    throw { status: 400, message: "Buku ini tidak sedang dipinjam" };
  }

  const return_date = new Date();
  const lateDays = calculateLateDays(borrowing.due_date, return_date);
  const fineAmount = lateDays * FINE_PER_DAY;
  const finalStatus = lateDays > 0 ? "LATE" : "RETURNED";

  return await prisma.$transaction(async (tx) => {
    const updatedBorrowing = await tx.borrowings.update({
      where: { id: Number(borrowing_id) },
      data: {
        status: finalStatus,
        return_date,
      },
    });

    await tx.books.update({
      where: { id: borrowing.book_id },
      data: { available: { increment: 1 } },
    });

    let fine = null;
    if (fineAmount > 0) {
      fine = await tx.fines.create({
        data: {
          borrowing_id: Number(borrowing_id),
          total_fines: fineAmount,
          payment_status: "UNPAID",
        },
      });
    }

    return { borrowing: updatedBorrowing, late_days: lateDays, fine };
  });
}

async function requestExtend(borrowing_id, user_id) {
  const borrowing = await prisma.borrowings.findFirst({
    where: { id: Number(borrowing_id), user_id: Number(user_id) },
  });

  if (!borrowing) {
    throw { status: 404, message: "Data peminjaman tidak ditemukan" };
  }

  if (borrowing.status !== "BORROWED") {
    throw {
      status: 400,
      message: "Peminjaman ini tidak bisa diajukan perpanjangan",
    };
  }

  if (borrowing.extend_count >= MAX_EXTEND_COUNT) {
    throw {
      status: 400,
      message:
        "Peminjaman ini sudah pernah diperpanjang, tidak bisa diperpanjang lagi",
    };
  }

  const now = new Date();
  const hoursUntilDue =
    (new Date(borrowing.due_date).getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilDue < EXTEND_MIN_HOURS_BEFORE_DUE) {
    throw {
      status: 400,
      message: `Request perpanjangan ditolak, minimal ${EXTEND_MIN_HOURS_BEFORE_DUE} jam sebelum jatuh tempo`,
    };
  }

  return await prisma.borrowings.update({
    where: { id: Number(borrowing_id) },
    data: { status: "REQUEST_EXTEND" },
  });
}

async function confirmExtend(borrowing_id) {
  const borrowing = await prisma.borrowings.findUnique({
    where: { id: Number(borrowing_id) },
  });

  if (!borrowing) {
    throw { status: 404, message: "Data peminjaman tidak ditemukan" };
  }

  if (borrowing.status !== "REQUEST_EXTEND") {
    throw {
      status: 400,
      message: "Peminjaman ini belum diajukan perpanjangan oleh user",
    };
  }

  const newDueDate = new Date(borrowing.due_date);
  newDueDate.setDate(newDueDate.getDate() + EXTEND_DURATION_DAYS);

  return await prisma.borrowings.update({
    where: { id: Number(borrowing_id) },
    data: {
      status: "BORROWED",
      due_date: newDueDate,
      extend_count: { increment: 1 },
    },
  });
}

async function rejectExtend(borrowing_id) {
  const borrowing = await prisma.borrowings.findUnique({
    where: { id: Number(borrowing_id) },
  });

  if (!borrowing) {
    throw { status: 404, message: "Data peminjaman tidak ditemukan" };
  }

  if (borrowing.status !== "REQUEST_EXTEND") {
    throw {
      status: 400,
      message: "Peminjaman ini belum diajukan perpanjangan",
    };
  }

  return await prisma.borrowings.update({
    where: { id: Number(borrowing_id) },
    data: { status: "BORROWED" },
  });
}

module.exports = {
  MAX_ACTIVE_BORROWINGS,
  countActiveBorrowings,
  getBookById,
  findActiveBorrowingForBook,
  createBorrowing,
  validateBatchLimit,
  createBorrowingsBulk,
  getAllBorrowings,
  getBorrowingById,
  confirmReturn,
  requestExtend,
  confirmExtend,
  rejectExtend,
};
