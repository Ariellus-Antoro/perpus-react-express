const authService = require('../services/authService');

const login = async  (req,res,next) => {
    try {
        const {email, password} = req.body
        const token = await authService.loginUser(email, password);

        res.status(200).json({ status: "success", message: "Login berhasil", data: { token } });
    } catch (error) {
        next(error)
    }
}

const register = async (req,res,next) => {
    try{
        await authService.registerUser(req.body);
        res.status(200).json({ status: "success", message: "Registrasi berhasil, menunggu verifikasi admin."});
    } catch (error) {
        next(error)
    }
}



module.exports = {
    login,
    register
};