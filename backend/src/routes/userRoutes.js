const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Pengguna Biasa - Ambil Profil Sendiri
router.get('/profile', verifyToken, userController.getProfile);

router.put('/profile',verifyToken, userController.updateProfile);

router.put('/change-password', verifyToken, userController.changePassword);

module.exports = router;