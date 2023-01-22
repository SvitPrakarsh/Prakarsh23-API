const express = require('express')

const router = express.Router();
const PromotorController = require('../controllers/PromotorController')
const checkPromotorAuth = require('../middlewares/auth-middleware')
// const checkUserAuthid = require('../middlewares/idauth')

// ROute Level Middleware - To Protect Route
router.use('/promotor/changepassword', checkPromotorAuth)
router.use('/promotor/loggeduser', checkPromotorAuth)

// Public Routes
router.post('/promotor/register', PromotorController.PromotorRegistration)
router.post('/promotor/login', PromotorController.PromotorLogin)
router.post('/promotor/send-reset-password-email', PromotorController.sendPromotorPasswordResetEmail)
router.post('/promotor/reset-password/:id/:token', PromotorController.PromotorPasswordReset)

// Protected Routes
router.post('/promotor/changepassword', PromotorController.changePromotorPassword)
router.get('/promotor/loggeduser', PromotorController.loggedPromotor)
router.get('/promotor/login', PromotorController.Promotorid)
// router.get("/isauthorised",PromotorController.authorised)

// router.get('/test', checkUserAuthid , async(req,resp)=>{
    
// })
// router.get('/test',checkUserAuth, async(req, res)=>{
//     console.log(req.user._id)
//     // await res.send(req)
// })

module.exports = router