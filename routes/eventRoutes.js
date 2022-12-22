const express = require('express')
const { eventAllCatagoriesController, addEventController, eventSingleCatagoryController, eventSingleController } = require('../controllers/eventController')
const router = express.Router()

router.get('/eventCatgories', eventAllCatagoriesController)
router.get('/:catagory', eventSingleCatagoryController)
router.get('/:id', eventSingleController)
router.post('/add', addEventController)

module.exports = router