const express = require('express')

var mongoose = require('mongoose');
var env = require('dotenv').config(); 



 

const app = express()


app.use('/',require('./routes/index'))


const port = process.env.PORT || 8080



mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
 })
 .then(() => console.log('Connection to CosmosDB successful'))
 .catch((err) => console.error(err));



app.listen(port, ()=>console.log(`Running on port ${port}`))