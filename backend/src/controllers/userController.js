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

module.exports = {
    getProfile,
    getMembers,
    approveMember,
    updateMember,
    deleteMember

}