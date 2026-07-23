const express = require("express");
const router = express.Router();
const borrowingController = require("../controllers/borrowingController");
const authMiddleware = require("../middlewares/authMiddleware");

// semua route peminjaman wajib login
router.get("/", authMiddleware.verifyToken, borrowingController.index);
router.get("/:id", authMiddleware.verifyToken, borrowingController.show);
router.post("/", authMiddleware.verifyToken, borrowingController.store);
router.post("/bulk", authMiddleware.verifyToken, borrowingController.storeBulk);

// user request perpanjangan
router.post(
  "/:id/extend",
  authMiddleware.verifyToken,
  borrowingController.requestExtend,
);

// admin approve/reject perpanjangan
router.post(
  "/:id/extend/confirm",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  borrowingController.confirmExtend,
);

router.post(
  "/:id/extend/reject",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  borrowingController.rejectExtend,
);

// admin konfirmasi pengembalian buku
router.post(
  "/:id/return/confirm",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  borrowingController.returnConfirm,
);

module.exports = router;