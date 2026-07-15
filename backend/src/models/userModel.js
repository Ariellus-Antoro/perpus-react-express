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
    const query = 'INSERT INTO token_sessions (user_Id, token, expiresAt) values (?,?,?)';
    const [response] = await db.execute(query,[userId, token, expiresAt]);
    return response;
}

module.exports = {
    getUserByEmail,
    createUser,
    saveSession
};

// Bagian Arvid