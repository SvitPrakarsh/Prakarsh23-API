 const  mongoose = require("mongoose");
 const express = require("express");

const eventAllCatagoriesController = (req, res) =>{
    res.send('hello')
}

const eventSingleCatagoryController = (req, res)=>{
    res.send(req.params)

}

const eventSingleController = (req, res)=>{

}

module.exports = {eventAllCatagoriesController, eventSingleCatagoryController, eventSingleController}