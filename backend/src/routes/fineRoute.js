const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fineController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware.verifyToken, fineController.index);
router.get("/:id", authMiddleware.verifyToken, fineController.show);
router.post("/:id/pay", authMiddleware.verifyToken, fineController.pay);

module.exports = router;
