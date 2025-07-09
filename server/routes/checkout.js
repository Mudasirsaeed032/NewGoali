const express = require('express')
const router = express.Router()
const { createFundraiserCheckout } = require('../controllers/checkoutController')

router.post('/fundraiser', createFundraiserCheckout)

module.exports = router
