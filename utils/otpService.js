const crypto = require('crypto');

const generateOTP = () => { 
    return crypto.randomInt(100000, 999999).toString();//6 digits otp
};

module.exports = {generateOTP}