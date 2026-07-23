const userService = require('../services/userService'); // PERBAIKAN: Ubah jadi userService

// --- Fungsi Baru: Tambah Pengguna ---
const createMember = async (req, res) => {
    try {
        const memberData = req.body;
        
        // Jika ada file KTP yang diupload, simpan nama filenya
        if (req.file) {
            memberData.ktp = req.file.filename; 
        }

        const result = await userService.createMember(memberData);
        res.status(201).json({ 
            message: "Pengguna berhasil ditambahkan", 
            data: result 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Fungsi Edit yang disesuaikan dengan File Upload ---
const updateMember = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body; 
        
        // Jika admin mengupload KTP baru saat mengedit
        if (req.file) {
            updateData.ktp = req.file.filename;
        }

        const result = await userService.editMember(userId, updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMembers = async (req, res) => {
    try {
        const result = await userService.getAllMembers();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error Get Members: ", error.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server saat mengambil data" });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await userService.getUserProfile(userId);
        res.status(200).json({ message: "Berhasil mengambil profil pengguna", data: profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const approveMember = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.approveMemberRegistration(userId);
        res.status(200).json({ message: "Pendaftaran member berhasil disetujui", data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.removeMember(userId);
        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPendingMembers = async (req, res) => {
    try {
        const result = await userService.getPendingMembers();
        res.status(200).json(result); 
    } catch (error) {
        console.error("Error Get Pending Members: ", error.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server saat mengambil data" });
    }
};

const changeStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const { account_status } = req.body; 
        
        if (!account_status) return res.status(400).json({ message: "Status tidak boleh kosong" });

        const result = await userService.changeMemberStatus(userId, account_status);
        res.status(200).json({ message: `Pendaftaran member berhasil di-${account_status.toLowerCase()}`, data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body; 
        

        const result = await userService.updateUserProfile(userId, updateData);
        
        res.status(200).json({ 
            message: "Profil berhasil diperbarui", 
            data: result 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { old_password, new_password } = req.body;
        
        await userService.changeUserPassword(userId, old_password, new_password);
        
        res.status(200).json({ message: "Kata sandi berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    getMembers,
    createMember, 
    approveMember,
    updateMember,
    deleteMember,
    getPendingMembers,
    changeStatus,
    updateProfile,
    changePassword
}