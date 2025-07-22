const express = require('express')
const supabase = require('../services/supabase')
const router = express.Router()
const {
  createEvent,
  getEvents,
  updateEventStatus,
  getAllEvents
} = require('../controllers/eventController')

router.post('/', createEvent)
router.get('/', getEvents)
router.patch('/:id/status', updateEventStatus)
router.get('/all', getAllEvents);


module.exports = router
