const prisma = require ('../config/db')

// Prisma ORM
const getUserByEmail = async(email) =>{
    return prisma.users.findUnique({
        where: {email: email}
    });
};

// const getUserByEmail = async (email) => {
//     const query = 'SELECT * FROM users WHERE email = ?';
//     const [response] = await db.execute(query,[email]);
//     return response[0];
// }

// Prisma ORM
const createUser = async(userData) =>{
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

// const createUser = async (userData) => {
//     const query = 'INSERT INTO users (nik, email, password, full_name, address, phone, ktp) values (?,?,?,?,?,?,?)';
//     const [response] = await db.execute(query, [userData.nik, userData.email, userData.password, userData.full_name, userData.address, userData.phone, userData.ktp]);
// }

// Prisma ORM
const saveSession = async(userId, token, expiresAt)=>{
    return prisma.tokenSessions.create({
        data:{
            user_id:userId,
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
const getUserById = async (id)=>{
    return prisma.users.findUnique({
        where:{
            id: parseInt(id)
        },
        select:{
            id:true,
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

// const getUserById = async (id) => {
//     const query = 'SELECT id, nik, email, full_name, address, phone, ktp, role, account_status FROM users WHERE id = ?';
//     const [response] = await db.execute(query, [id]);
//     return response[0];
// }

module.exports = {
    getUserByEmail,
    createUser,
    saveSession,
    getUserById
};

// Bagian Arvid