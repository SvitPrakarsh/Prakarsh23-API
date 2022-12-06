const express = require('express')

const app = express()


app.use('/',require('./routes/index'))


const port = process.env.PORT || 8080

app.listen(port, ()=>console.log(`Running on port ${port}`))