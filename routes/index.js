const {Router} = require('express')
const router = Router()
const eventRoutes = require('./eventRoutes')



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


module.exports = router