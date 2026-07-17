const db = require ('../config/db')

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [response] = await db.execute(query,[email]);
    return response[0];
}

const createUser = async (userData) => {
    const query = 'INSERT INTO users (nik, email, password, full_name, address, phone, ktp) values (?,?,?,?,?,?,?)';
    const [response] = await db.execute(query, [userData.nik, userData.email, userData.password, userData.full_name, userData.address, userData.phone, userData.ktp]);
}

const saveSession = async (userId, token, expiresAt) => {
    const query = 'INSERT INTO token_sessions (user_Id, token, expires_At) values (?,?,?)';
    const [response] = await db.execute(query,[userId, token, expiresAt]);
    return response;
}

const getUserById = async (id) => {
    const query = 'SELECT id, nik, email, full_name, address, phone, ktp, role, account_status FROM users WHERE id = ?';
    const [response] = await db.execute(query, [id]);
    return response[0];
}

module.exports = {
    getUserByEmail,
    createUser,
    saveSession,
    getUserById
};

// Bagian Arvid