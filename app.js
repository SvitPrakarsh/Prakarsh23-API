const express = require('express')

var mongoose = require('mongoose');
const connectDB = require('./config/db_config');
var env = require('dotenv').config(); 



 

const app = express()


app.use('/',require('./routes/index'))


const port = process.env.PORT || 8080


connectDB();

app.listen(port, ()=>console.log(`Running on port ${port}`))