const nodemailer = require('nodemailer')
const {google} = require('googleapis')
require('dotenv').config()

const sendEmail = async (mailOptions)=>{
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    const OAuth2Client = new google.auth.OAuth2(process.env.EMAIL_CLIENT_ID, process.env.EMAIL_CLIENT_SECRET, REDIRECT_URI)
    OAuth2Client.setCredentials({refresh_token : process.env.EMAIL_REFRESH_TOKEN})
        const accessToken = await OAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'OAuth2',
                user: 'prakarsh23server@svitvasad.ac.in',
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const result = await transport.sendMail(mailOptions)
        return result
}

module.exports = sendEmail