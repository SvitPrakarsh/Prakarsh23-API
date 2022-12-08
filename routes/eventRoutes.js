const express = require('express')
const { eventAllCatagoriesController, eventSingleCatagoryController, eventSingleController } = require('../controllers/eventController')
const router = express.Router()

router.get('/eventCatgories', eventAllCatagoriesController)
router.get('/:catagory', eventSingleCatagoryController)
router.get('/', eventSingleController)

module.exports = router