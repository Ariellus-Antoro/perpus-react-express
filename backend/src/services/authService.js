const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/userRepository');

// ORM
const registerUser = async(userData)=>{
    const existingUser = await userRepo.getUserByEmail(userData.email);
    if(existingUser){
        throw new Error('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser={
        nik: userData.nik,
        email: userData.email,
        password: hashedPassword,
        full_name: userData.full_name,
        address: userData.address,
        phone: userData.phone,
        ktp: userData.ktp,
        role: 'MEMBER',            
        account_status: 'PENDING' 
    };
    
    const createdUser = await userRepo.createUser(newUser);
    return createdUser;
};
// async function registerUser(userData){
//     const userAda = await userModel.getUserByEmail(userData.email);
//     if(userAda){
//         throw new Error ('Email sudah terdaftar, silahkan input email lain');
//     }
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const dataSimpan = {...userData, password: hashedPassword};
//     await userModel.createUser(dataSimpan)
//     return "Registrasi berhasil"
// }

const loginUser = async(email,password) =>{
    //Cari berdasarkan email
    const user = await userRepo.getUserByEmail(email);
    if(!user){
        throw new Error('Email atau password salah');
    }

    // Cek status akun
    if(user.account_status !== 'APPROVED'){
        throw new Error(`Akses ditolak. Akun Anda berstatus: ${user.account_status}`);
    }

    // Cek password valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email atau password salah');
    }

    //Cek jwt di laptop Arvid (sempet masalah)
    console.log("CEK ISI JWT SECRET:", process.env.JWT_SECRET);
    

    // Buat token jwt
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    // Hitung kadaluarsa 
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    // Simpan session
    await userRepo.saveSession(user.id, token, expiresAt);

    // Return token dan data ke controller
    return{
        token,
        user:{id: user.id, email: user.email, role: user.role, full_name: user.full_name}
    };

};

// async function loginUser(email, passwordInput) {
    
//     const userDariDatabase = await userModel.getUserByEmail(email);
//     if (!userDariDatabase) { 
//             throw new Error('Email tidak ditemukan'); 
//     }const isMatch = await bcrypt.compare(passwordInput, userDariDatabase.password);
//     if (!isMatch){
//                 throw new Error ('Password anda salah');
//             }
//             const token = jwt.sign({ id: userDariDatabase.id, role: userDariDatabase.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//             await userModel.saveSession(userDariDatabase.id, token, '2026-12-31') //Data dummy sek
//         return token;
// }


const logoutUser = async(token)=>{
    if(!token){
        throw new Error('Token tidak ditemukan atau sudah tidak valid');
    }

    await userRepo.deleteSession(token);
    return{
        message: "Logout berhasil"
    };
}



module.exports = {
    loginUser,
    registerUser,
    logoutUser
};