const fineService = require("../services/fineService");

async function index(req, res) {
  try {
    const user_id = req.user.id;
    const role = req.user.role;

    const fines = await fineService.getAllFines(user_id, role);

    res.status(200).json({
      status: "success",
      data: fines,
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
    const user_id = req.user.id;
    const role = req.user.role;

    const fine = await fineService.getFineById(id);

    if (!fine) {
      return res.status(404).json({
        status: "error",
        message: "Data denda tidak ditemukan",
      });
    }

    // member cuma boleh lihat denda miliknya sendiri
    if (role !== "ADMIN" && fine.borrowing.user_id !== Number(user_id)) {
      return res.status(403).json({
        status: "error",
        message: "Kamu tidak punya akses ke denda ini",
      });
    }

    res.status(200).json({
      status: "success",
      data: fine,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function pay(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const role = req.user.role;
    const { payment_method } = req.body; 
    const fine = await fineService.payFine(id, user_id, role, payment_method);

    res.status(200).json({
      status: "success",
      message: "Denda berhasil dibayar",
      data: fine,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = { index, show, pay };
