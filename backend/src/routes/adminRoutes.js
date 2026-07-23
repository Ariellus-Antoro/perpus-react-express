const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Setup Multer untuk menangkap file FormData dari Frontend
const upload = multer({ dest: 'public/uploads/ktp/' }); 

router.use(verifyToken, verifyAdmin);

// ==========================================
// KELOLA MEMBER (APPROVAL & LIST)
// ==========================================
router.get('/members/pending', userController.getPendingMembers);
router.patch('/members/:id/status', userController.changeStatus);
router.get('/members', userController.getMembers);
router.delete('/members/:id', userController.deleteMember);

// ROUTE BARU: Tambah & Edit
// Kata 'ktp' di bawah ini harus sama dengan nama field "name='ktp'" di Frontend Anda
router.post('/members', upload.single('ktp'), userController.createMember);
router.put('/members/:id', upload.single('ktp'), userController.updateMember);

module.exports = router;