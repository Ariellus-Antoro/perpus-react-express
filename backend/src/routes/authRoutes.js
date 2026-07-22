const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


// Route Register 
router.post('/register', upload.single('ktp'), authController.register);

// Route Login
router.post('/login', authController.login);

module.exports = router;