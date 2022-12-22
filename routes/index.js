const {Router} = require('express')
const router = Router()
const eventRoutes = require('./eventRoutes')
const checkoutRoutes = require('./checkoutRoutes')
const cartRoutes = require('./cartRoutes')
const path = require('path')



router.get('/',(req,res)=>{
    res.send({
        message:'working ok'
    })
})

router.get('/pay', (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

router.use('/event', eventRoutes)

router.use('/checkout', checkoutRoutes)

router.use('/cart', cartRoutes)

module.exports = router