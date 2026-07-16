const userModel = require('../models/userModel');

async function getUserProfile(userId){
    const ambilUser = await userModel.getUserById(userId)

    if(!ambilUser){
        throw new Error('Data pengguna tidak ada');
    }
    return ambilUser;
}

module.exports = {
    getUserProfile
};