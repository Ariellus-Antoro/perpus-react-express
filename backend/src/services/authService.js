const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function loginUser(email, passwordInput) {
    
    const userDariDatabase = await userModel.getUserByEmail(email);
    if (!userDariDatabase) { 
            throw new Error('Email tidak ditemukan'); 
    }const isMatch = await bcrypt.compare(passwordInput, userDariDatabase.password);
    if (!isMatch){
                throw new Error ('Password anda salah');
            }
            const token = jwt.sign({ id: userDariDatabase.id, role: userDariDatabase.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            await userModel.saveSession(userDariDatabase.id, token, '2026-12-31') //Data dummy sek
        return token;
}

async function registerUser(userData){
    const userAda = await userModel.getUserByEmail(userData.email);
    if(userAda){
        throw new Error ('Email sudah terdaftar, silahkan input email lain');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const dataSimpan = {...userData, password: hashedPassword};
    await userModel.createUser(dataSimpan)
    return "Registrasi berhasil"
}

module.exports = {
    loginUser,
    registerUser
};