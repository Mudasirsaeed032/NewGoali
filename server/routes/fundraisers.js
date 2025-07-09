const express = require('express')
const router = express.Router()
const {
  createFundraiser,
  getFundraisers,
  updateFundraiserStatus
} = require('../controllers/fundraiserController')

router.post('/', createFundraiser)
router.get('/', getFundraisers)
router.patch('/:id/status', updateFundraiserStatus)

module.exports = router
