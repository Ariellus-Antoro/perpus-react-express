const userRepo = require('../repository/userRepository');
const bcrypt = require('bcrypt'); // Tambahkan bcrypt untuk keamanan password

// 1. FUNGSI BARU: Tambah Pengguna (Create)
const createMember = async (data) => {
    // Validasi dasar
    if (!data.password) {
        throw new Error("Password wajib diisi untuk pengguna baru.");
    }
    if (!data.email || !data.nik || !data.full_name) {
        throw new Error("Data NIK, Nama Lengkap, dan Email wajib diisi.");
    }

    // Enkripsi (Hash) password sebelum masuk ke database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Siapkan payload data
    const newUserData = {
        nik: data.nik,
        full_name: data.full_name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone || null,
        address: data.address || null,
        role: data.role || 'MEMBER',
        account_status: data.account_status || 'APPROVED',
        ktp: data.ktp || null,
    };

    // Panggil fungsi createUser dari repository
    const newUser = await userRepo.createUser(newUserData);
    return newUser;
};

const getAllMembers = async () => {
    const members = await userRepo.getAllMembers();
    if (!members || members.length === 0) {
        return { message: "Belum ada data anggota yang terdaftar.", data: [] };
    }
    return members;
};

const getUserProfile = async (userId) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error('Data Pengguna tidak ditemukan');
    }
    return user;
};

// 2. FUNGSI EDIT (UNTUK ADMIN): Mendukung perubahan password, role, dan email
const editMember = async (userId, updateData) => {
    const user = await userRepo.getUserById(userId);

    if (!user) {
        throw new Error('Data Pengguna tidak ditemukan');
    }

    // Daftarkan semua field yang diizinkan untuk diubah dari form
    const allowedUpdates = {
        nik: updateData.nik,
        full_name: updateData.full_name,
        email: updateData.email,
        address: updateData.address,
        phone: updateData.phone,
        role: updateData.role,
        account_status: updateData.account_status,
        ktp: updateData.ktp
    };

    // Jika admin mengisi password baru di form edit, kita hash password tersebut
    if (updateData.password && updateData.password.trim() !== '') {
        const salt = await bcrypt.genSalt(10);
        allowedUpdates.password = await bcrypt.hash(updateData.password, salt);
    }

    // Bersihkan data yang undefined (tidak dikirim dari frontend) agar tidak merusak database
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

const approveMemberRegistration = async (userId) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
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

const getPendingMembers = async () => {
    const members = await userRepo.getAllMembers();
    if (!members || members.length === 0) return [];
    
    return members.filter(user => user.account_status === 'PENDING');
};

const changeMemberStatus = async (userId, newStatus) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error('Data Pengguna tidak ditemukan');
    }
    if (user.account_status === newStatus) {
        throw new Error(`Akun pengguna ini sudah berstatus ${newStatus}`);
    }

    const updatedUser = await userRepo.updateMemberStatus(userId, newStatus);
    return updatedUser;
};

const removeMember = async (userId) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error('Data pengguna tidak ditemukan atau sudah dihapus sebelumnya');
    }

    await userRepo.deleteMember(userId);
    return {
        message: 'Member berhasil dihapus'
    };
};

// ============================================================================
// FUNGSI BARU UNTUK HALAMAN "PENGATURAN AKUN" (AKSES MEMBER)
// ============================================================================

const updateUserProfile = async (userId, updateData) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error('Data Pengguna tidak ditemukan');
    }

    // Pembatasan akses: Member hanya boleh mengubah Nama, Telepon, dan Alamat
    const allowedUpdates = {
        full_name: updateData.full_name,
        phone: updateData.phone,
        address: updateData.address
    };

    // Bersihkan field yang undefined agar query database tidak error
    Object.keys(allowedUpdates).forEach(key => {
        if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
        }
    });

    if (Object.keys(allowedUpdates).length === 0) {
        throw new Error('Tidak ada data valid yang dikirim untuk diperbarui');
    }

    // Menggunakan fungsi updateUser yang sama dari repository Anda
    const updatedUser = await userRepo.updateUser(userId, allowedUpdates);
    return updatedUser;
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error('Data Pengguna tidak ditemukan');
    }

    // 1. Verifikasi kecocokan password lama menggunakan bcrypt
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('Kata sandi saat ini tidak cocok');
    }

    // 2. Jika cocok, hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // 3. Simpan password baru ke database (menggunakan repository Anda)
    await userRepo.updateUser(userId, { password: hashedNewPassword });
    
    return true;
};

// Ekspor semua fungsi
module.exports = {
    createMember, 
    getAllMembers,
    getUserProfile,
    editMember,
    approveMemberRegistration,
    getPendingMembers,
    changeMemberStatus,
    removeMember,
    updateUserProfile,  
    changeUserPassword  
};