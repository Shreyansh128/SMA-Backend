const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',   
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS  
    }
});

const sendMail = (to, link ) => {
    const mailOptions = {
        from:" <arjun.chauhan@swiftrut.com>",
        to: to,
        subject: 'Password Reset Link',
        text: `Your OTP for password reset is: ${link}`,
    };
    return transporter.sendMail(mailOptions);
}

module.exports = {sendMail}