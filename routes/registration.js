const express = require('express')
const router = express.Router()

router.post('/',(req,res)=>{
    res.send(req.user._id)
})

module.exports = router