const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Pengguna Biasa - Ambil Profil Sendiri
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;