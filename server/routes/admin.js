const express = require('express')
const { getAdminMetrics, getTeamUsers } = require('../controllers/adminController')

const router = express.Router()

router.get('/metrics', getAdminMetrics);
router.get('/users', getTeamUsers);

module.exports = router
