const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verifyAdmin);


router.get("/dashboard/stats", adminController.getDashboardStats);



router.get("/users/pending", adminController.getPendingUsers);


router.post("/users/:id/approve", adminController.approveUser);

router.post("/users/:id/reject", adminController.rejectUser);


module.exports = router;