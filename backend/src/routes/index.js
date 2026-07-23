const express = require("express");
const router = express.Router();

const categoryRoutes = require("./category_routes");
const bookRoutes = require("./book_routes");
const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const adminRoute = require('./adminRoutes'); 

router.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Testttttttt" });
});

router.use("/categories", categoryRoutes);
router.use("/books", bookRoutes);
router.use('/auth', authRoute);
router.use('/user', userRoute); 
router.use('/admin', adminRoute); 

module.exports = router;