const userService = require('../services/userService');

const getProfile = async (req,res,next) => {
    try{
        const userId = req.user.id;
        const dataProfile = await userService.getUserProfile(userId);
        res.status(200).json({ status: "success", message: "Data berhasil dibaca" });

    } catch (error){
        next(error);
    }
}

module.exports = {
    getProfile
}