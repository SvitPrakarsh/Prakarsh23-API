const PromotorModel = require('../Models/CampusAmbassadorSchema')
const bcrypt =  require('bcrypt')
const jwt =  require('jsonwebtoken')
const transporter =  require('../config/emailConfig')

class PromotorController {
    static PromotorRegistration = async (req, res) => {
      const { name, email, password, password_confirmation, region } = req.body
      const Promotor = await PromotorModel.findOne({ email: email })
      if (Promotor) {
        res.send({ "status": "failed", "message": "Email already exists" })
      } else {
        if (name && email && password && password_confirmation && region) {
          if (password === password_confirmation) {
            try {
              const salt = await bcrypt.genSalt(10)
              const hashPassword = await bcrypt.hash(password, salt)
              const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
                region: region
              })
              const data = await doc.save()
              // res.send(data._id)
              const saved_Promotor = await PromotorModel.findOne({ email: email })
              // Generate JWT Token
              const token = jwt.sign({ PromotorId: saved_Promotor._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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

    static PromotorLogin = async (req, res) => {
        try {
          const { email, password } = req.body
          if (email && password) {
            const Promotor = await PromotorModel.findOne({ email: email })
            if (Promotor != null) {
              const isMatch = await bcrypt.compare(password, Promotor.password)
              if ((Promotor.email === email) && isMatch) {
                // let final = await JSON.stringify( user._id)
                // res.send(final)
                // Generate JWT Token
                const token = jwt.sign({ PromotorId: Promotor._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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
    
      static changePromotorPassword = async (req, res) => {
        const { password, password_confirmation } = req.body
        if (password && password_confirmation) {
          if (password !== password_confirmation) {
            res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await PromotorModel.findByIdAndUpdate(req.Promotor._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "Password changed succesfully" })
          }
        } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
      }
    
      static loggedPromotor = async (req, res) => {
        res.send({ "Promotor": req.Promotor })
      }
    
      static sendPromotorPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
          const Promotor = await PromotorModel.findOne({ email: email })
          if (Promotor) {
            const secret = Promotor._id + process.env.JWT_SECRET_KEY
            const token = jwt.sign({ PromotorId: Promotor._id }, secret, { expiresIn: '15m' })
            const link = `http://127.0.0.1:3000/api/Promotor/reset/${Promotor._id}/${token}`
            console.log(link)
            // // Send Email
            let info = await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: Promotor.email,
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
      static Promotorid = async (req, res) => {
        // try {
        const { email, password } = req.body
        if (email && password) {
          const Promotor = await PromotorModel.findOne({ email: email })
          if (Promotor != null) {
            const isMatch = await bcrypt.compare(password, Promotor.password)
            if ((Promotor.email === email) && isMatch) {
              let final = await JSON.stringify(Promotor._id)
              res.send(final)
            }
          }
        }
      }
    
      static PromotorPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        const Promotor = await PromotorModel.findById(id)
        const new_secret = Promotor._id + process.env.JWT_SECRET_KEY
        try {
          jwt.verify(token, new_secret)
          if (password && password_confirmation) {
            if (password !== password_confirmation) {
              res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
              const salt = await bcrypt.genSalt(10)
              const newHashPassword = await bcrypt.hash(password, salt)
              await PromotorModel.findByIdAndUpdate(Promotor._id, { $set: { password: newHashPassword } })
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


module.exports = PromotorController