const express = require('express')
const { allEvents, eventAllCatagoriesController, addEventController, eventSingleCatagoryController, eventSingleController } = require('../controllers/eventController')
const router = express.Router()

router.get('/', allEvents)
router.post('/add', addEventController)
router.get('/eventCatgories', eventAllCatagoriesController)
router.get('/catagory/:catagory', eventSingleCatagoryController)
router.get('/:id', eventSingleController)


module.exports = router