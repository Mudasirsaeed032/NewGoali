const express = require('express')
const {
    getAdminMetrics,
    getTeamUsers,
    getTeamInvites,
    getActivityLogs
} = require('../controllers/adminController')

const router = express.Router()

router.get('/metrics', getAdminMetrics);
router.get('/users', getTeamUsers);
router.get('/invites', getTeamInvites);
router.get('/activity', getActivityLogs)


module.exports = router
