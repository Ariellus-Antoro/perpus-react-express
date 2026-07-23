const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer");
const path = require("path");

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Pastikan folder 'public/uploads' sudah Anda buat di direktori backend
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    // Memberikan nama file unik (timestamp + ekstensi asli)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/", bookController.index);
router.get("/:id", bookController.show);
// Sisipkan upload.single('book_cover') pada route POST dan PUT
router.post("/", upload.single('book_cover'), bookController.store);
router.put("/:id", upload.single('book_cover'), bookController.update);
router.delete("/:id", bookController.destroy);

module.exports = router;