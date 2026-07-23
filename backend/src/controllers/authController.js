
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Foto KTP wajib diunggah!"
            });
        }
        const userData = { 
            nik: req.body.nik,
            email: req.body.email,
            password: req.body.password,
            full_name: req.body.full_name,
            address: req.body.address,
            phone: req.body.phone,
            ktp: req.file.filename // Cukup simpan nama filenya saja!
        };

        await authService.registerUser(userData);

        res.status(201).json({
            success: true,
            message: "Registrasi berhasil. Silahkan tunggu persetujuan ADMIN"
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const login = async  (req,res) => {
    console.log("LOGIN MASUK");
    console.log(req.body);
    try{
        const {email,password} = req.body;

        const {token, user} = await authService.loginUser(email,password);

        res.status(200).json({
            success: true,
            message: 'Login Berhasil',
            token,
            data:user
        });
    }catch(error){
        res.status(401).json({
            success:false,
            message:error.message
        });
    }
};

const logout = async (req,res)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'Token tidak valid !!'});
        }

        const token = authHeader.split(' ')[1];

        const result = await authService.logoutUser(token);

        res.status(200).json(result);
    } catch(error){
        res.status(400).json({message: error.message});
    }
};


module.exports = {
    login,
    register,
    logout
};