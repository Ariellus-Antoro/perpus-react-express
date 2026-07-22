const userService = require('../services/userService');

const getMembers = async(req,res)=>{
    try{
        const result = await userService.getAllMembers();
        res.status(200).json(result);
    }catch(error){
        console.error("Error Get Members: ", error.message);
        res.status(500).json({
            error: "Terjadi kesalahan pada server saat mengambil data"
        });
    }
};

const getProfile = async(req,res) =>{
    try{
        const userId = req.user.id;
        const profile = await userService.getUserProfile(userId);
        res.status(200).json({
            message: "Berhasil mengambil profil pengguna",
            data: profile
        });
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const approveMember = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const result = await userService.approveMemberRegistration(userId);
        
        res.status(200).json({
            message: "Pendaftaran member berhasil disetujui",
            data: result
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMember = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body; 
        
        const result = await userService.editMember(userId, updateData);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const result = await userService.removeMember(userId);
        
        // Result sudah berisi object { message: 'Pengguna berhasil dihapus' } dari service
        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ambil user yang statusnya masih PENDING
const getPendingUsers = async (req, res, next) => {
    try {
        const prisma = require('../config/db');
        const pendingUsers = await prisma.users.findMany({
            where: { account_status: 'PENDING', deleted_at: null },
            select: { id: true, full_name: true, nik: true, email: true, account_status: true }
        });
        res.status(200).json(pendingUsers); // Kirim langsung array agar pas dengan frontend
    } catch (error) {
        next(error);
    }
};

// Ubah status akun user (APPROVED / REJECTED)
const updateUserStatus = async (req, res, next) => {
    try {
        const prisma = require('../config/db');
        const { account_status } = req.body;
        const updated = await prisma.users.update({
            where: { id: parseInt(req.params.id) },
            data: { account_status }
        });
        res.status(200).json({ status: "success", message: "Status berhasil diubah", data: updated });
    } catch (error) {
        next(error);
    }
};

const createUserByAdmin = async (req, res) => {
    try {
        const prisma = require('../config/db');
        const bcrypt = require('bcryptjs');
        
        const { full_name, nik, email, password, address, phone, role, account_status } = req.body;
        
        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar di database!" });
        }

        // Hash password (gunakan password input atau default '123456')
        const hashedPassword = await bcrypt.hash(password || "123456", 10);
        const ktpPath = req.file ? `/uploads/ktp/${req.file.filename}` : null;

        const newUser = await prisma.users.create({
            data: {
                full_name,
                nik,
                email,
                password: hashedPassword,
                address: address || "",
                phone: phone || "",
                ktp: ktpPath,
                role: role || "MEMBER",
                account_status: account_status || "APPROVED"
            }
        });

        res.status(201).json({
            status: "success",
            message: "Pengguna baru berhasil ditambahkan oleh Admin",
            data: newUser
        });
    } catch (error) {
        console.error("Error Create User Admin:", error);
        res.status(400).json({ message: error.message || "Gagal menambahkan pengguna" });
    }
};

// Pastikan kedua fungsi di atas ikut di-ekspor di module.exports bawah

module.exports = {
    getProfile,
    getMembers,
    approveMember,
    updateMember,
    deleteMember,
    getPendingUsers,
    updateUserStatus,
    createUserByAdmin
}