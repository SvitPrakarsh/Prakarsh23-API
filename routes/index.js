const {Router} = require('express')
const router = Router()



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




module.exports = router