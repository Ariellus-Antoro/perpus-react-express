const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const pinjamController = require("../controllers/pinjamController");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryRoutes = require("./category_routes");
const bookRoutes = require("./book_routes");

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Testttttttt",
  });
});

router.use("/categories", categoryRoutes);
router.use("/books", bookRoutes);

router.post("/login", authController.login);

router.post("/register", authController.register);
// Belakangan
// router.get('/user/pending', authMiddleware.verifyToken, authMiddleware.verifyAdmin, authController.getPendingUsers);
// router.post('/pinjam', authMiddleware.verifyToken, authMiddleware.isApproved, pinjamController.buatPeminjaman);

router.get("/profile", authMiddleware.verifyToken, userController.getProfile);

module.exports = router;
