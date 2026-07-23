const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Pengguna Biasa - Ambil Profil Sendiri
router.get('/profile', verifyToken, userController.getProfile);

router.put('/profile',verifyToken, userController.updateProfile);

router.put('/change-password', verifyToken, userController.changePassword);


router.get('/', verifyToken, verifyAdmin, userController.getMembers);
router.get('/pending', verifyToken, verifyAdmin, userController.getPendingMembers);

router.post(
    '/', 
    verifyToken, 
    verifyAdmin, 
    upload.single('ktp'), 
    userController.createMember
);

router.put(
    '/:id', 
    verifyToken, 
    verifyAdmin, 
    upload.single('ktp'), 
    userController.updateMember
);


router.delete('/:id', verifyToken, verifyAdmin, userController.deleteMember);

router.patch('/:id/approve', verifyToken, verifyAdmin, userController.approveMember);
router.patch('/:id/status', verifyToken, verifyAdmin, userController.changeStatus);



module.exports = router;

