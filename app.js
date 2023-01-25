const express = require('express')
const cors = require('cors');
var mongoose = require('mongoose');
const connectDB = require('./config/db_config');
var env = require('dotenv').config(); 
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Middleware Connections
app.use(cors({
    origin: 'https://akshsisodiya-redesigned-robot-7ppp75jp76jhprw7-3000.preview.app.github.dev/',
}))
// app.use(express.json())




app.use('/',require('./routes/index'))


const port = process.env.PORT || 8080


connectDB();

app.listen(port, ()=>console.log(`Running on port ${port}`))