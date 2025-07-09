const express = require('express')
const { getAdminMetrics, getTeamUsers, getTeamInvites } = require('../controllers/adminController')

const router = express.Router()

router.get('/metrics', getAdminMetrics);
router.get('/users', getTeamUsers);
router.get('/invites', getTeamInvites);

module.exports = router
