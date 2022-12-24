import express from 'express';
import jwt from 'jsonwebtoken'

const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import checkUserAuthid from '../middlewares/idauth.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)
router.get('/login', UserController.userid)
// router.get("/isauthorised",UserController.authorised)

router.get('/test', checkUserAuthid , async(req,resp)=>{
    
})
// router.get('/test',checkUserAuth, async(req, res)=>{
//     console.log(req.user._id)
//     // await res.send(req)
// })


export default router