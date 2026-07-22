const express = require('express');
const router = express.Router();

//Import AuthRoutes
const authRoute = require('./authRoutes');


router.get('/', (req, res) => {

  res.status(200).json({
    status: 'success',
    message: 'Testttttttt',
  });
});

router.use('/auth', authRoute);




module.exports = router;