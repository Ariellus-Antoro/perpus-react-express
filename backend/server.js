require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const prisma = require("./src/config/db");
const mainRoutes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 8000;

// 1. WAJIB DI ATAS: Middleware CORS harus dibaca sebelum Routes!
app.use(
  cors({
    origin: "http://localhost:5173", // Mengizinkan akses dari Vite
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// 2. Parser untuk membaca JSON dan URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Akses folder 'public' (untuk menyimpan file upload KTP nantinya)
app.use(express.static(path.join(__dirname, "public")));

// 4. Daftarkan Routes Utama
app.use("/api", mainRoutes);

// 5. Middleware Error Handling
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

async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log("PRISMA SUCCESS : Berhasil terhubung ke database!");
  } catch (error) {
    console.error("PRISMA ERROR : Gagal terhubung ke database");
    console.error(error.message);
    process.exit(1);
  }
}

testPrismaConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
});