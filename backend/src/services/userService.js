const userRepo = require('../repository/userRepository');

const getAllMembers = async()=>{
    const members = await userRepo.getAllMembers();
    if (!members || members.length === 0) {
        return { message: "Belum ada data anggota yang terdaftar.", data: [] };
    }

    return members;
};

const getUserProfile = async(userId)=>{
    const user = await userRepo.getUserById(userId);
    if(!user){
        throw new Error('Data Pengguna tidak ditemukan');
    }

    return user;
};

const editMember = async(userId, updateData)=>{
    const user = await userRepo.getUserById(userId);

    if(!user){
        throw new Error('Data Pengguna tidak ditemukan');
    }

    const allowedUpdates = {
        nik: updateData.nik,
        full_name: updateData.full_name,
        address: updateData.address,
        phone: updateData.phone,
        ktp: updateData.ktp
    };

    Object.keys(allowedUpdates).forEach(key => {
        if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
        }
    });

    if (Object.keys(allowedUpdates).length === 0) {
        throw new Error('Tidak ada data valid yang dikirim untuk diubah');
    }

    const updatedUser = await userRepo.updateUser(userId, allowedUpdates);

    return {
        message: "Data member berhasil diperbarui",
        data: updatedUser
    };
};


const approveMemberRegistration = async(userId)=>{
    const user = await userRepo.getUserById(userId);
    if(!user){
        throw new Error('Data Pengguna tidak ditemukan');
    }

    if (user.account_status === 'APPROVED') {
        throw new Error('Akun pengguna ini sudah berstatus disetujui');
    }

    if (user.account_status === 'REJECTED') {
        throw new Error('Akun pengguna ini telah ditolak sebelumnya');
    }

    const approvedUser = await userRepo.updateMemberStatus(userId, 'APPROVED');

    return approvedUser;
};

const removeMember = async (userId)=>{
    const user = await userRepo.getUserById(userId);

    if(!user){
        throw new Error('Data pengguna tidak ditemukan atau sudah dihapus sebelumnya');
    }

    await userRepo.deleteMember(userId);

    return{
        message:'Member berhasil dihapus'
    };
};


module.exports = {
    getAllMembers,
    getUserProfile,
    editMember,
    approveMemberRegistration,
    removeMember
};