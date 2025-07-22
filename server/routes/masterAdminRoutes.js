const express = require('express');
const router = express.router();
const {
    getGlobalMetrics,
    getAllUsers,
    getAllInvites,
    getAllPayments,
    getAllLogs
} = require('../controllers/masterAdminController');

router.get('/metrics', getGlobalMetrics);
router.get('/users', getAllUsers);
router.get('/invites', getAllInvites);
router.get('/payments', getAllPayments);
router.get('/logs', getAllLogs);

module.exports = router;