const { Router } = require("express");
const express = require("express");
const router = Router();
const eventRoutes = require("./eventRoutes");
const path = require("path");
const { addEventController } = require( "../controllers/eventController");

// router.get("/", (req, res) => {
//   res.send({
//     message: "working ok",
//   });
// });

router.post("/", addEventController);

router.use(express.json());
router.use("/event", eventRoutes);

module.exports = router;
