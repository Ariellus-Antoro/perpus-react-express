const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const verifyToken = async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ status: "failed", message: "Akses ditolak. Token tidak ditemukan"});
        }
        const token = authHeader.split(' ')[1];

        //Verifikasi kriptografi 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const session = await prisma.tokenSessions.findFirst({
            where:{
                token:token,
                user_id:decoded.id
            }
        });

        if (!session || new Date() > session.expires_at) {
            return res.status(401).json({ success: false, message: 'Sesi telah berakhir atau tidak valid. Silakan login kembali.' });
        }

        req.user = decoded;
        
        next();
    } catch (error){
        res.status(401).json({ status: "failed", message: "Token tidak valid atau kadaluarsa"});
    }
};

const verifyAdmin = (req,res,next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Akses ditolak. Halaman ini khusus Administrator.' });
    }
};



// const isApproved = async (req,res,next) => {
//     try{
//     const user = await userModel.getUserById(req.user.id);
    
//     if(user.account_status === 'PENDING') {
//         return res.status(403).json({ status: "failed", message: "Akun Anda belum diverifikasi Admin. Anda hanya boleh membaca di tempat." });
//         }
//         next();
//     } catch (error){
//     res.status(403).json({ status: "failed", message: "Akses tidak valid."});
//     }
// }

module.exports = {
    verifyToken,
    verifyAdmin,
    // isApproved
};