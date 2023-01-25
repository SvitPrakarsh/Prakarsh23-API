const mongoose = require("mongoose");
const express = require("express");
const Event = require("../Models/EventSchema");
const { EID } = require("../Models/EventSchema");

// development function only
const allEvents = async (req, res) =>{
  res.json(await Event.find())
}

const eventAllCatagoriesController = (req, res) => {
  res.send("hello");
};

const eventSingleCatagoryController = async (req, res) => {
  res.send(req.json);
};

const eventSingleController = async (req, res) => {

  const { id } = req.params;
  console.log(id)
  try {
    const event = await Event.findById(id);

    res.status(200).json(event).json("ok");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



const addEventController = async (req, res) => {
  const {
    title,
    description,
    image,
    video,
    maximum_participants,
    maximum_team,
    department,
    interest,
    year,
    group,
    catagory,
    is_solo } = req.body;
  console.log(req.body);
  
  // department = department.split(', ')
  // interest = interest.split(', ')
  // year = year.split(', ')

  try {
    const event = await Event.create({ title,
      description,
      image,
      video,
      maximum_participants,
      maximum_team,
      department,
      interest,
      year,
      group,
      catagory,
      is_solo});
    res.status(200).send(event);
    // res.setHeader('Content-Type', 'application/json');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  eventAllCatagoriesController,
  eventSingleCatagoryController,
  eventSingleController,
  addEventController,
  allEvents,
};
