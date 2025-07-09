const express = require('express')
const router = express.Router()
const {
  createEvent,
  getEvents,
  updateEventStatus
} = require('../controllers/eventController')

router.post('/', createEvent)
router.get('/', getEvents)
router.patch('/:id/status', updateEventStatus)

module.exports = router
