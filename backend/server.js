require("dotenv").config();
const express = require("express");
const path = require("path");

// const pool = require("./src/config/db");
const prisma = require("./src/config/db");
//

const mainRoutes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
// Akses folder 'public'
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", mainRoutes);

// Middleware error handling
app.use((req, res, next) => {
  const error = new Error(`Rute ${req.originalUrl} tidak ditemukan`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: "error",
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// async function testDatabaseConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log("SUCCESS : Connected to Mysql");
//     connection.release();
//   } catch (error) {
//     console.error("ERROR : Failed to connect to Mysql");
//     console.error(error.message);
//   }
// }

async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log("PRISMA SUCCESS : Berhasil terhubung ke database!");
  }catch (error) {
    console.error("PRISMA ERROR : Gagal terhubung ke database");
    console.error(error.message);
    process.exit(1); // Matikan server jika database gagal terhubung
    }
}
testPrismaConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
});