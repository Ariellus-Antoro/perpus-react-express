const userRepository = require('../repository/userRepository');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userRepository.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User tidak ditemukan",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Data berhasil dibaca",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    getProfile,
};