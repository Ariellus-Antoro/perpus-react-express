const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const pinjamController = require ('../controllers/pinjamController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {

  res.status(200).json({
    status: 'success',
    message: 'Testttttttt',
  });
});

router.post('/login', authController.login);

router.post('/register', authController.register);
// Belakangan
// router.get('/user/pending', authMiddleware.verifyToken, authMiddleware.verifyAdmin, authController.getPendingUsers);
// router.post('/pinjam', authMiddleware.verifyToken, authMiddleware.isApproved, pinjamController.buatPeminjaman);

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);



module.exports = router;