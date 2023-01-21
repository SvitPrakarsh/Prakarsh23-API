const express = require('express')

const router = express.Router();
const AmbassadorController = require('../controllers/AmbassadorController')
const checkAmbassadorAuth = require('../middlewares/auth-middleware')
// const checkAmbassadorAuthid = require('../middlewares/idauth')

// ROute Level Middleware - To Protect Route
router.use('/ambassador/changepassword', checkAmbassadorAuth)
router.use('/ambassador/loggeduser', checkAmbassadorAuth)

// Public Routes
router.post('/ambassador/register', AmbassadorController.AmbassadorRegistration)
router.post('/ambassador/login', AmbassadorController.AmbassadorLogin)
router.post('/ambassador/send-reset-password-email', AmbassadorController.sendAmbassadorPasswordResetEmail)
router.post('/ambassador/reset-password/:id/:token', AmbassadorController.AmbassadorPasswordReset)

// Protected Routes
router.post('/ambassador/changepassword', AmbassadorController.changeAmbassadorPassword)
router.get('/ambassador/loggeduser', AmbassadorController.loggedAmbassador)
router.get('/ambassador/login', AmbassadorController.Ambassadorid)
// router.get("/isauthorised",AmbassadorController.authorised)

// router.get('/test', checkUserAuthid , async(req,resp)=>{
    
// })
// router.get('/test',checkUserAuth, async(req, res)=>{
//     console.log(req.user._id)
//     // await res.send(req)
// })

module.exports = router