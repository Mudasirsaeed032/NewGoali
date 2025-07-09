const express = require('express')
const { getAdminMetrics } = require('../controllers/adminController')

const router = express.Router()

router.get('/metrics', getAdminMetrics)

module.exports = router
