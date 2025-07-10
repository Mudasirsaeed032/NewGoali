const express = require('express')
const supabase = require('../services/supabase')
const router = express.Router()
const {
  createFundraiser,
  getFundraisers,
  updateFundraiserStatus
} = require('../controllers/fundraiserController')

router.post('/', createFundraiser)
router.get('/', getFundraisers)
router.patch('/:id/status', updateFundraiserStatus)
// routes/fundraisers.js
router.get('/all', async (req, res) => {
  const { data, error } = await supabase.from('fundraisers').select('*')
  if (error) return res.status(500).json({ error: 'Failed to fetch fundraisers' })
  res.json({ fundraisers: data })
})


module.exports = router
