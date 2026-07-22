const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.get('/profile', verifyToken, userController.getProfile);

// Admin - GetAllMember
router.get('/members', verifyToken, verifyAdmin, userController.getMembers);

// Admin - APPROVE
router.patch('/members/:id/approve', verifyToken, verifyAdmin, userController.approveMember);

// Admin - updateDataMember
router.put('/members/:id', verifyToken, verifyAdmin, userController.updateMember);

// Admin - Soft delete member
router.delete('/members/:id', verifyToken, verifyAdmin, userController.deleteMember);


module.exports = router;