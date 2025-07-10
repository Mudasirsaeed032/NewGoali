const express = require('express')
const {
    getAdminMetrics,
    getTeamUsers,
    getTeamInvites,
    getActivityLogs,
    getTeamPayments,
    removeUserFromTeam
} = require('../controllers/adminController')

const router = express.Router()

router.get('/metrics', getAdminMetrics);
router.get('/users', getTeamUsers);
router.get('/invites', getTeamInvites);
router.get('/activity', getActivityLogs);
router.get('/payments', getTeamPayments);
router.post('/remove-user', removeUserFromTeam)



module.exports = router