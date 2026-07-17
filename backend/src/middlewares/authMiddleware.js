const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const verifyToken = (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ status: "failed", message: "Akses ditolak."});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (error){
        res.status(401).json({ status: "failed", message: "Token tidak valid."});
    }
}

const verifyAdmin = (req,res,next) => {
    try{
        const isAdmin = req.user.role

        if(isAdmin !== 'ADMIN'){
            return res.status(403).json({status:"failed", message:"Anda tidak punya akses"});
        }
        next();
    } catch (error){
    res.status(403).json({ status: "failed", message: "Akses tidak valid."});
    }
}

const isApproved = async (req,res,next) => {
    try{
    const user = await userModel.getUserById(req.user.id);
    
    if(user.account_status === 'PENDING') {
        return res.status(403).json({ status: "failed", message: "Akun Anda belum diverifikasi Admin. Anda hanya boleh membaca di tempat." });
        }
        next();
    } catch (error){
    res.status(403).json({ status: "failed", message: "Akses tidak valid."});
    }
}

module.exports = {
    verifyToken,
    verifyAdmin,
    isApproved
};