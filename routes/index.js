const { Router } = require("express");
const express = require("express");
const router = Router();
const eventRoutes = require("./eventRoutes");
const path = require("path");
const { addEventController } = require("../controllers/eventController");
const checkoutRoutes = require('./checkoutRoutes')
const cartRoutes = require('./cartRoutes');
const checkUserAuth = require("../middlewares/auth-middleware");
const registrationRoutes = require('./registration')
const userRoutes = require('./userRoutes')

// router.get("/", (req, res) => {
//   res.send({
//     message: "working ok",
//   });
// });

// router.post("/", addEventController);

router.get('/', (req, res) => {
    res.send({
        message: 'working ok'
    })
})

router.get('/pay', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

router.use('/events', eventRoutes)

router.use('/checkout', checkUserAuth, checkoutRoutes)

router.use('/cart', checkUserAuth, cartRoutes)

router.use('/registration', checkUserAuth, registrationRoutes)

router.use('/auth', userRoutes)

module.exports = router

