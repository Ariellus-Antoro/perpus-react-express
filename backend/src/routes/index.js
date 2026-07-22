const express = require('express');
const router = express.Router();

//Import AuthRoutes
const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');


router.get('/', (req, res) => {

  res.status(200).json({
    status: 'success',
    message: 'Testttttttt',
  });
});

router.use('/auth', authRoute);
router.use('/user', userRoute);




module.exports = router;