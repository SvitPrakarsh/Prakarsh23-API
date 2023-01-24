const User = require('../models/UserSchema')
// const FotpUserModel = require('../models/authedotpuser')
const TOtpModel = require('../Models/Otp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require('../config/emailConfig')
const otpGenerator = require('otp-generator')
const sendOTP = require('../Email/sendOTP')

class UserController {
  // static userRegistration = async (req, res) => {

  //   const { name, email, password, password_confirmation, tc } = req.body
  //   const user = await User.findOne({ email: email })
  //   if (user) {
  //     res.send({ "status": "failed", "message": "Email already exists" })
  //   } else {
  //     if (name && email && password && password_confirmation && tc) {
  //       if (password === password_confirmation) {
  //         try {
  //           const salt = await bcrypt.genSalt(10)
  //           const hashPassword = await bcrypt.hash(password, salt)
  //           const doc = new User({
  //             name: name,
  //             email: email,
  //             password: hashPassword,
  //             tc: tc
  //           })
  //           const data = await doc.save()
  //           // res.send(data._id)
  //           const saved_user = await User.findOne({ email: email })
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
  //         } catch (error) {
  //           console.log(error)
  //           res.send({ "status": "failed", "message": "Unable to Register" })
  //         }
  //       } else {
  //         res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All fields are required" })
  //     }
  //   }
  // }

  // static userLogin = async (req, res) => {
  //   try {
  //     const { email, password } = req.body
  //     if (email && password) {
  //       const user = await User.findOne({ email: email })
  //       if (user != null) {
  //         const isMatch = await bcrypt.compare(password, user.password)
  //         if ((user.email === email) && isMatch) {
  //           // let final = await JSON.stringify( user._id)
  //           // res.send(final)
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.send({ "status": "success", "message": "Login Success", "token": token })
  //           // const id = await User.findOne({ email: email })
  //           //   let id = JSON.stringify(user._id)

  //         } else {
  //           res.send({ "status": "failed", "message": "Email or Password is not Valid" })
  //         }
  //       } else {
  //         res.send({ "status": "failed", "message": "You are not a Registered User" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Unable to Login" })
  //   }
  // }

  // static changeUserPassword = async (req, res) => {
  //   const { password, password_confirmation } = req.body
  //   if (password && password_confirmation) {
  //     if (password !== password_confirmation) {
  //       res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //     } else {
  //       const salt = await bcrypt.genSalt(10)
  //       const newHashPassword = await bcrypt.hash(password, salt)
  //       await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
  //       res.send({ "status": "success", "message": "Password changed succesfully" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "All Fields are Required" })
  //   }
  // }

  // static loggedUser = async (req, res) => {
  //   res.send({ "user": req.user })
  // }

  // static sendUserPasswordResetEmail = async (req, res) => {
  //   const { email } = req.body
  //   if (email) {
  //     const user = await User.findOne({ email: email })
  //     if (user) {
  //       const secret = user._id + process.env.JWT_SECRET_KEY
  //       const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
  //       const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
  //       console.log(link)
  //       // // Send Email
  //       let info = await transporter.sendMail({
  //         from: process.env.EMAIL_FROM,
  //         to: user.email,
  //         subject: "Password Reset Link",
  //         html: `<a href=${link}>Click Here</a> to Reset Your Password`
  //       }
  //       )
  //       res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
  //     } else {
  //       res.send({ "status": "failed", "message": "Email doesn't exists" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "Email Field is Required" })
  //   }
  // }
  // static userid = async (req, res) => {
  //   // try {
  //   const { email, password } = req.body
  //   if (email && password) {
  //     const user = await User.findOne({ email: email })
  //     if (user != null) {
  //       const isMatch = await bcrypt.compare(password, user.password)
  //       if ((user.email === email) && isMatch) {
  //         let final = await JSON.stringify(user._id)
  //         res.send(final)
  //       }
  //     }
  //   }
  // }

  // static userPasswordReset = async (req, res) => {
  //   const { password, password_confirmation } = req.body
  //   const { id, token } = req.params
  //   const user = await User.findById(id)
  //   const new_secret = user._id + process.env.JWT_SECRET_KEY
  //   try {
  //     jwt.verify(token, new_secret)
  //     if (password && password_confirmation) {
  //       if (password !== password_confirmation) {
  //         res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //       } else {
  //         const salt = await bcrypt.genSalt(10)
  //         const newHashPassword = await bcrypt.hash(password, salt)
  //         await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
  //         res.send({ "status": "success", "message": "Password Reset Successfully" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Invalid Token" })
  //   }
  // }


  // static OtpUserRegistration = async (req, res) => {


  //   const { name, email } = req.body
  //   const OtpUser = await FotpUserModel.findOne({ email: email })
  //   if (Otpuser) {
  //     res.send({ "status": "failed", "message": "Email already exists" })
  //   } else {
  //     generateOTP(email);
  //     const { OTP } = req.body;
  //     if (name && email && OTP) {
  //       if (OTP === OtpUser.otp) {
  //         try {
  //           const POtpUser = await FotpUserModel.findOne({ email: email })

  //           const doc = new FotpUserModel({
  //             name: name,
  //             email: email,
  //             otp: OTP
  //           })
  //           const data = await doc.save()
  //           // res.send(data._id)
  //           const saved_user = await FotpUserModel.findOne({ email: email })
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
  //         } catch (error) {
  //           console.log(error)
  //           res.send({ "status": "failed", "message": "Unable to Register" })
  //         }
  //       } else {
  //         res.send({ "status": "failed" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All fields are required" })
  //     }
  //   }
  // }

  // static OtpLogin = async (req, res) => {
  //   try {
  //     generateOTP(email);
  //     const { email, OTP } = req.body
  //     if (email && OTP) {
  //       const otp = await TOtpModel.findOne({ email: email })
  //       if (otp != null) {
  //         // const isMatch = await (OTP===otp.OTP)
  //         if ((otp.email === email) && (OTP === otp.OTP)) {
  //           // Generate JWT Token
  //           const token = jwt.sign({ otpID: otp._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.send({ "status": "success", "message": "Login Success", "token": token })

  //         } else {
  //           res.send({ "status": "failed", "message": "Email or OTP is not Valid" })
  //         }
  //       } else {
  //         res.send({ "status": "failed", "message": "You are not a Registered User" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Unable to Login" })
  //   }
  // }

  

  static sendOTPController = async (req, res)=>{
    const email = req.body.email
    const otp = await generateOTP(email)
    console.log(otp)
    try{
      const result = await sendOTP(email, otp)
      if(result.error){
        res.status(400).json({message: "otp could not be sent"})
      }
      resetOTP(email)
    res.status(200).json({email: email, message: "otp sent successfully"})

    } catch(e){
      console.log(e)
      res.status(400).json({
        message: 'otp could not be sent'
      })
    }
    
  }

  static otpVerification = async (req, res) =>{
    const email = req.body.email
    const otp = req.body.otp
    if(otp && email){
      const otpObj = await TOtpModel.findOne({ email: email })
      if(otpObj.otp === otp){
        try{
           const user = await User.findOne({email:email})
           const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
           res.status(200).json({message: "signIn success", token:token})
        } catch(e) {
          res.status(200).json({message:"OTP verification successfull", email: email})
        }
      } else {
        res.status(400).json({message: "Otp expired"})
      }
    }

  }

  static updateNewUser = async (req, res) =>{
    try{
      const user = User.create(req.body)
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
      res.status(200).json({message: "signIn success", token:token})
    } catch(e){

      res.status(400).json({message: "User not create"})
    }
  }


  // static otpuserid = async (req, res) => {
  //   // try {
  //   const { email } = req.body
  //   if (email ) {
  //     const user = await FotpUserModel.findOne({ email: email })
  //     if (user != null) {
  //       if ((user.email === email)) {
  //         let final = await JSON.stringify(user._id)
  //         res.send(final)
  //       }
  //     }
  //   }
  // }
}

const resetOTP = async (email)=> {
  setTimeout(() => {
    const OTP = otpGenerator.generate(
      6,
      { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }

    ).then(otp => otp)

    try{
      const otpObj = TOtpModel.findOne({email: email})
      otpObj.otp = OTP
      otpObj.save()
    } catch(e){
      const otpObj = TOtpModel.create({
        email:email,
        otp: OTP
      })
    }
  }, 600000)
}

const generateOTP = async (email) => {
  const OTP = otpGenerator.generate(
    6,
    { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }
  )
  console.log(OTP)
    try{
      const otpObj = await TOtpModel.findOne({email: email})
      otpObj.otp = OTP
      otpObj.save()
    } catch(e){
      const otpObj = await TOtpModel.create({
        email:email,
        otp: OTP
      })
    }
  return OTP
}

// const SignInWithOTP = async(req, res ,OTP)=>{

//   sendOTP(req.body.email, OTP)

//   // rest should be done by nirav
//   const otp = await TOtpModel.findOne({email:email})
//   if(otp)
//   {
//     if(otp.otp===OTP)
//     {
//       res.send("Success")
//       //give function to redirect
//     }
//     else
//     {
//       res.send("OTP verification failed")
//     }
//   }
// }

module.exports = UserController