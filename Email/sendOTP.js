const sendEmail = require('./sendEmail')
require('dotenv').config()


const sendOTP = async (email, OTP) => {

    const mailOptions = {
        from: 'prakarsh23server@svitvasad.ac.in',
        to: email,
        subject: 'OTP for Prakarsh Authentication',
        text: 'Your OTP is',
        html: `<h1>${OTP}</h1>`,
    }

    const result = await sendEmail(mailOptions)
    return result 
}

module.exports = sendOTP