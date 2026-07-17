require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');

const mainRoutes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.use('/api', mainRoutes);

// Middleware error handling
app.use((req, res, next) => {
    const error = new Error(`Rute ${req.originalUrl} tidak ditemukan`);
    res.status(404);
    next(error);
});


app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    });
});

async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('SUCCESS : Connected to Mysql');
    connection.release();
  } catch (error) {
    console.error('ERROR : Failed to connect to Mysql');
    console.error(error.message);
  }
}

testDatabaseConnection();

app.listen(PORT, () => {
  console.log(` Server running in port : ${PORT}`);
});