const {Router} = require('express')
const router = Router()
const eventRoutes = require('./eventRoutes')
const checkoutRoutes = require('./checkoutRoutes')


router.get('/', (req,res)=>{
    res.send({
        message:'working ok'
    })
})

router.post('/',(req,res)=>{
    res.send({
        message:'working ok'
    })
})

router.use('/event', eventRoutes)

router.use('/checkout', checkoutRoutes)

module.exports = router