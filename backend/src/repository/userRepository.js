const prisma = require('../config/db')

// Prisma ORM
const getUserByEmail = async (email) => {
    return prisma.users.findUnique({
        where: { email: email }
    });
};
// Bagian Arvid
// const getUserByEmail = async (email) => {
//     const query = 'SELECT * FROM users WHERE email = ?';
//     const [response] = await db.execute(query,[email]);
//     return response[0];
// }

// Prisma ORM
const createUser = async (userData) => {
    return prisma.users.create({
        data: {
            nik: userData.nik,
            email: userData.email,
            password: userData.password,
            full_name: userData.full_name,
            address: userData.address,
            phone: userData.phone,
            ktp: userData.ktp,
            role: userData.role, // <-- PERBAIKAN: Wajib ditambahkan
            account_status: userData.account_status // <-- PERBAIKAN: Wajib ditambahkan
        }
    });
};

// const createUser = async (userData) => {
//     const query = 'INSERT INTO users (nik, email, password, full_name, address, phone, ktp) values (?,?,?,?,?,?,?)';
//     const [response] = await db.execute(query, [userData.nik, userData.email, userData.password, userData.full_name, userData.address, userData.phone, userData.ktp]);
// }

// Prisma ORM
const saveSession = async (userId, token, expiresAt) => {
    return prisma.tokenSessions.create({
        data: {
            user_id: userId,
            token,
            expires_at: new Date(expiresAt)
        }
    });
};

// const saveSession = async (userId, token, expiresAt) => {
//     const query = 'INSERT INTO token_sessions (user_Id, token, expires_At) values (?,?,?)';
//     const [response] = await db.execute(query,[userId, token, expiresAt]);
//     return response;
// }


// Prisma ORM
const getUserById = async (id) => {
    return prisma.users.findFirst({
        where: {
            id: parseInt(id),
            deleted_at: null
        },
        select: {
            id: true, // <-- PERBAIKAN: Duplikat id:true dihapus
            nik: true,
            email: true,
            full_name: true,
            address: true,
            phone: true,
            ktp: true,
            role: true,
            account_status: true
        }
    });
};

// const getUserById = async (id) => {
//     const query = 'SELECT id, nik, email, full_name, address, phone, ktp, role, account_status FROM users WHERE id = ?';
//     const [response] = await db.execute(query, [id]);
//     return response[0];
// }

const deleteSession = async (token) => {
    return await prisma.tokenSessions.deleteMany({
        where: {
            token: token
        }
    });
};

const getAllMembers = async () => {
    return await prisma.users.findMany({
        where: {
            // PERBAIKAN: Filter role dihapus agar admin bisa melihat semua data pengguna di tabel
            deleted_at: null
        },
        select: {
            id: true,
            nik: true,
            email: true,
            full_name: true,
            phone: true,
            role: true, // <-- PERBAIKAN: Ditambahkan agar tabel Frontend bisa memunculkan Role
            account_status: true,
            created_at: true,
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};

const updateMemberStatus = async (id, status) => {
    return await prisma.users.update({
        where: {
            id: Number(id)
        },
        data: {
            account_status: status
        },
        select: {
            id: true,
            full_name: true,
            account_status: true
        }
    });
};

const updateUser = async (id, updateData) => {
    return await prisma.users.update({
        where: {
            id: Number(id)
        },
        data: updateData,
        select: {
            id: true,
            nik: true,
            email: true,
            full_name: true,
            address: true,
            phone: true,
            ktp: true,
            role: true, // <-- PERBAIKAN: Ditambahkan
            account_status: true, // <-- PERBAIKAN: Ditambahkan
            updated_at: true
        }
    });
};

const deleteMember = async (id) => {
    return await prisma.users.update({
        where: {
            id: Number(id)
        },
        data: {
            deleted_at: new Date()
        },
        select: {
            id: true,
            email: true,
            deleted_at: true
        }
    });
};

module.exports = {
    getUserByEmail,
    createUser,
    saveSession,
    getUserById,
    deleteSession,
    getAllMembers,
    updateMemberStatus,
    updateUser,
    deleteMember,
};