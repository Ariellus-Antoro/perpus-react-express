const prisma = require('../config/db');

const getUserByEmail = async (email) => {
    return prisma.users.findUnique({
        where: { email: email }
    });
};

const createUser = async (userData) => {
    return prisma.users.create({
        data: {
            nik: userData.nik,
            email: userData.email,
            password: userData.password,
            full_name: userData.full_name,
            address: userData.address,
            phone: userData.phone,
            ktp: userData.ktp
        }
    });
};

const saveSession = async (userId, token, expiresAt) => {
    return prisma.tokenSessions.create({
        data: {
            user_id: userId,
            token,
            expires_at: new Date(expiresAt)
        }
    });
};

const getUserById = async (id) => {
    return prisma.users.findFirst({
        where: {
            id: parseInt(id),
            deleted_at: null
        },
        select: {
            id: true,
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

const deleteSession = async (token) => {
    return await prisma.tokenSessions.deleteMany({
        where: { token: token }
    });
};

// --- Fungsi Khususu Member ---

const getAllMembers = async () => {
    return await prisma.users.findMany({
        where: {
            role: 'MEMBER',
            deleted_at: null
        },
        select: {
            id: true,
            nik: true,
            email: true,
            full_name: true,
            phone: true,
            account_status: true,
            created_at: true,
        },
        orderBy: { created_at: 'desc' }
    });
};

const updateMemberStatus = async (id, status) => {
    return await prisma.users.update({
        where: { id: Number(id) },
        data: { account_status: status },
        select: {
            id: true,
            full_name: true,
            account_status: true
        }
    });
};

const deleteMember = async (id) => {
    return await prisma.users.update({
        where: { id: Number(id) },
        data: { deleted_at: new Date() },
        select: {
            id: true,
            email: true,
            deleted_at: true
        }
    });
};

// --- Fungsi Khusus Admin (All Users) ---

const getAllUsers = async () => {
    return prisma.users.findMany({
        where: { deleted_at: null },
        select: {
            id: true,
            nik: true,
            email: true,
            full_name: true,
            address: true,
            phone: true,
            role: true,
            account_status: true,
            created_at: true
        },
        orderBy: { created_at: 'desc' }
    });
};

const updateUser = async (id, data) => {
    return prisma.users.update({
        where: { id: parseInt(id) },
        data: data
    });
};

const deleteUser = async (id) => {
    return prisma.users.update({
        where: { id: parseInt(id) },
        data: { deleted_at: new Date() }
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
    deleteMember,
    getAllUsers,
    updateUser,
    deleteUser
};