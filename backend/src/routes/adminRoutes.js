const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// 1. Wajib impor uploadMiddleware di sini
const upload = require('../middlewares/uploadMiddleware'); 

router.use(verifyToken, verifyAdmin);

router.get('/users/pending', userController.getPendingUsers);
router.patch('/users/:id/status', userController.updateUserStatus);
router.get('/users', userController.getMembers);

// 2. PERBAIKAN: Pasang upload.single('ktp') dan gunakan createUserByAdmin
router.post('/users', upload.single('ktp'), userController.createUserByAdmin); 

router.put('/users/:id', upload.single('ktp'), userController.updateMember);
router.delete('/users/:id', userController.deleteMember);

router.get('/dashboard/stats', async (req, res) => {
    res.status(200).json({
        pendingUsers: 0,
        pendingBorrowings: 0,
        unreturnedBooks: 0,
        activeUsers: 1,
        totalBooks: 0
    });
});

module.exports = router;