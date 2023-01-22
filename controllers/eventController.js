const mongoose = require("mongoose");
const express = require("express");
const Event = require("../Models/EventSchema");
const { EID } = require("../Models/EventSchema");

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
  const { EID, title, description, image,video } = req.body;
  console.log(req.body);
  try {
    const event = await Event.create({ title, description, image, video});
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
};
