const prisma = require("../config/db");

async function getDashboardStats(req, res) {
  try {
    const pendingUsers = await prisma.users.count({ 
      where: { account_status: 'PENDING' } 
    });
    
    const pendingBorrowings = await prisma.borrowings.count({ 
      where: { status: 'PENDING' } 
    });
    
    const unreturnedBooks = await prisma.borrowings.count({ 
      where: { status: { in: ['BORROWED', 'LATE', 'REQUEST_EXTEND'] } } 
    });
    
    const activeUsers = await prisma.users.count({ 
      where: { account_status: 'APPROVED', role: 'MEMBER' } 
    });
    
    const totalBooks = await prisma.books.count({ 
      where: { deleted_at: null } 
    });

    res.status(200).json({
      status: "success",
      data: {
        pendingUsers,
        pendingBorrowings,
        unreturnedBooks,
        activeUsers,
        totalBooks
      }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function getPendingUsers(req, res) {
  try {
    const pendingUsers = await prisma.users.findMany({
      where: { account_status: 'PENDING' },
      select: {
        id: true,
        full_name: true,
        nik: true,
        email: true,
        account_status: true,
      },
      orderBy: { created_at: 'desc' }
    });

    res.status(200).json({ 
      status: "success", 
      data: pendingUsers 
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function approveUser(req, res) {
  try {
    const { id } = req.params;
    
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { account_status: 'APPROVED' }
    });

    res.status(200).json({ 
      status: "success", 
      message: "Akun pengguna berhasil disetujui", 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function rejectUser(req, res) {
  try {
    const { id } = req.params;
    
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { account_status: 'REJECTED' }
    });

    res.status(200).json({ 
      status: "success", 
      message: "Pendaftaran akun pengguna ditolak", 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  getDashboardStats,
  getPendingUsers,
  approveUser,
  rejectUser
};