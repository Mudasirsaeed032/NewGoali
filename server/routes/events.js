const express = require('express')
const supabase = require('../services/supabase')
const router = express.Router()
const {
  createEvent,
  getEvents,
  updateEventStatus
} = require('../controllers/eventController')

router.post('/', createEvent)
router.get('/', getEvents)
router.patch('/:id/status', updateEventStatus)
// routes/events.js
router.get('/all', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*')
  if (error) return res.status(500).json({ error: 'Failed to fetch events' })
  res.json({ events: data })
})


module.exports = router
