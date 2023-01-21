const Camodel = require('../Models/CampusAmbassadorSchema')
const bcrypt =  require('bcrypt')
const jwt =  require('jsonwebtoken')
const transporter =  require('../config/emailConfig')

class CaController {
    static AmbassadorRegistration = async (req, res) => {
      const { name, email, password, password_confirmation, coupon } = req.body
      const Ambassador = await Camodel.findOne({ email: email })
      if (Ambassador) {
        res.send({ "status": "failed", "message": "Email already exists" })
      } else {
        if (name && email && password && password_confirmation && coupon) {
          if (password === password_confirmation) {
            try {
              const salt = await bcrypt.genSalt(10)
              const hashPassword = await bcrypt.hash(password, salt)
              const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
                coupon: coupon
              })
              const data = await doc.save()
              // res.send(data._id)
              const saved_Ambassador = await Camodel.findOne({ email: email })
              // Generate JWT Token
              const token = jwt.sign({ AmbassadorId: saved_Ambassador._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
              res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
            } catch (error) {
              console.log(error)
              res.send({ "status": "failed", "message": "Unable to Register" })
            }
          } else {
            res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
          }
        } else {
          res.send({ "status": "failed", "message": "All fields are required" })
        }
      }
    }

    static AmbassadorLogin = async (req, res) => {
        try {
          const { email, password } = req.body
          if (email && password) {
            const Ambassador = await Camodel.findOne({ email: email })
            if (Ambassador != null) {
              const isMatch = await bcrypt.compare(password, Ambassador.password)
              if ((Ambassador.email === email) && isMatch) {
                // let final = await JSON.stringify( user._id)
                // res.send(final)
                // Generate JWT Token
                const token = jwt.sign({ AmbassadorId: Ambassador._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.send({ "status": "success", "message": "Login Success", "token": token })
                // const id = await UserModel.findOne({ email: email })
                //   let id = JSON.stringify(user._id)
    
              } else {
                res.send({ "status": "failed", "message": "Email or Password is not Valid" })
              }
            } else {
              res.send({ "status": "failed", "message": "You are not a Registered User" })
            }
          } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Login" })
        }
      }
    
      static changeAmbassadorPassword = async (req, res) => {
        const { password, password_confirmation } = req.body
        if (password && password_confirmation) {
          if (password !== password_confirmation) {
            res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await Camodel.findByIdAndUpdate(req.Ambassador._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "Password changed succesfully" })
          }
        } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
      }
    
      static loggedAmbassador = async (req, res) => {
        res.send({ "Ambassador": req.Ambassador })
      }
    
      static sendAmbassadorPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
          const Ambassador = await Camodel.findOne({ email: email })
          if (Ambassador) {
            const secret = Ambassador._id + process.env.JWT_SECRET_KEY
            const token = jwt.sign({ AmbassadorId: Ambassador._id }, secret, { expiresIn: '15m' })
            const link = `http://127.0.0.1:3000/api/Ambassador/reset/${Ambassador._id}/${token}`
            console.log(link)
            // // Send Email
            let info = await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: Ambassador.email,
              subject: "GeekShop - Password Reset Link",
              html: `<a href=${link}>Click Here</a> to Reset Your Password`
            }
            )
            res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
          } else {
            res.send({ "status": "failed", "message": "Email doesn't exists" })
          }
        } else {
          res.send({ "status": "failed", "message": "Email Field is Required" })
        }
      }  
      static Ambassadorid = async (req, res) => {
        // try {
        const { email, password } = req.body
        if (email && password) {
          const Ambassador = await Camodel.findOne({ email: email })
          if (Ambassador != null) {
            const isMatch = await bcrypt.compare(password, Ambassador.password)
            if ((Ambassador.email === email) && isMatch) {
              let final = await JSON.stringify(Ambassador._id)
              res.send(final)
            }
          }
        }
      }
    
      static AmbassadorPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        const Ambassador = await Camodel.findById(id)
        const new_secret = Ambassador._id + process.env.JWT_SECRET_KEY
        try {
          jwt.verify(token, new_secret)
          if (password && password_confirmation) {
            if (password !== password_confirmation) {
              res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
              const salt = await bcrypt.genSalt(10)
              const newHashPassword = await bcrypt.hash(password, salt)
              await Camodel.findByIdAndUpdate(Ambassador._id, { $set: { password: newHashPassword } })
              res.send({ "status": "success", "message": "Password Reset Successfully" })
            }
          } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
          }
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Invalid Token" })
        }
      }    
}


module.exports = CaController