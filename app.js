const express = require('express')
const cors = require('cors');
var mongoose = require('mongoose');
const connectDB = require('./config/db_config');
var env = require('dotenv').config(); 
const app = express()

// Middleware Connections
app.use(cors())
app.use(express.json())

 




app.use('/',require('./routes/index'))


const port = process.env.PORT || 8080


// connectDB()

app.listen(port, ()=>console.log(`Running on port ${port}`))