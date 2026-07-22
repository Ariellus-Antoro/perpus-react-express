const path = require("path");
const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;

module.exports = {
    ktpUploadDir: path.join(__dirname, "../../public/uploads/ktp"),
    maxUploadSize: MAX_UPLOAD_SIZE
};