const prisma = require("../config/db");

const { PaymentMethod } = require("@prisma/client");

const VALID_PAYMENT_METHODS = Object.values(PaymentMethod);

async function getAllFines(user_id, role) {
  // admin lihat semua, member cuma lihat denda dari peminjaman miliknya sendiri
  const where =
    role === "ADMIN"
      ? {}
      : {
          borrowing: {
            user_id: Number(user_id),
          },
        };

  return await prisma.fines.findMany({
    where,
    include: {
      borrowing: {
        include: {
          book: true,
          user: {
            select: { id: true, full_name: true, email: true },
          },
        },
      },
    },
    orderBy: { id: "desc" },
  });
}

async function getFineById(id) {
  return await prisma.fines.findUnique({
    where: { id: Number(id) },
    include: {
      borrowing: {
        include: {
          book: true,
          user: {
            select: { id: true, full_name: true, email: true },
          },
        },
      },
    },
  });
}

async function payFine(fine_id, user_id, role, payment_method) {
  const fine = await getFineById(fine_id);

  if (!fine) {
    throw { status: 404, message: "Data denda tidak ditemukan" };
  }

  // member hanya boleh bayar denda miliknya sendiri
  if (role !== "ADMIN" && fine.borrowing.user_id !== Number(user_id)) {
    throw { status: 403, message: "Kamu tidak punya akses ke denda ini" };
  }

  if (fine.payment_status === "PAID") {
    throw { status: 400, message: "Denda ini sudah dibayar" };
  }

  if (!payment_method || !VALID_PAYMENT_METHODS.includes(payment_method)) {
    throw {
      status: 400,
      message: `payment_method wajib diisi, salah satu dari: ${VALID_PAYMENT_METHODS.join(", ")}`,
    };
  }

  return await prisma.fines.update({
    where: { id: Number(fine_id) },
    data: {
      payment_status: "PAID",
      payment_method,
      payment_date: new Date(),
    },
  });
}

module.exports = {
  getAllFines,
  getFineById,
  payFine,
};