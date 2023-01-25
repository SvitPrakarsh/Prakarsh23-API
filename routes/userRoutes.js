const express = require('express')

const router = express.Router();
const UserController = require('../controllers/userController')
const checkUserAuth = require('../middlewares/auth-middleware')
// const checkUserAuthid = require('../middlewares/idauth')

// ROute Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth)
// router.use('/loggeduser', checkUserAuth)

// // Public Routes
// router.post('/register', UserController.userRegistration)
// router.post('/login', UserController.userLogin)
// router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
// router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// router.post('/otpregister', UserController.OtpUserRegistration)
// router.post('/otplogin', UserController.OtpLogin)

// // Protected Routes
// router.post('/changepassword', UserController.changeUserPassword)
// router.get('/loggeduser', UserController.loggedUser)
// router.get('/login', UserController.userid)
// router.get('/otplogin', UserController.otpuserid)

// OTP routes
router.post('/sendotp', UserController.sendOTPController)
router.post('/verifyotp', UserController.otpVerification)
router.post('/update-new-user', UserController.updateNewUser)

module.exports = router