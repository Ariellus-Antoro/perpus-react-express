const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
    ktpUploadDir,
    maxUploadSize
} = require("../config/upload");

// Pastikan folder upload tersedia
fs.mkdirSync(ktpUploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ktpUploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname).toLowerCase();

        cb(
            null,
            `KTP-${uniqueSuffix}${path.extname(file.originalname)}`
        );
    }
});

function fileFilter(req, file, cb) {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new Error("Hanya file JPG, JPEG, dan PNG yang diperbolehkan."));
}

module.exports = multer({
    storage,
    limits: {
        fileSize: maxUploadSize
    },
    fileFilter
});