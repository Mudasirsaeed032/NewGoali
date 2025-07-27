const express = require('express')
const router = express.Router()
const { 
    generateMonthlyDues, 
    getUserDues, 
    getTeamDues 
} = require('../controllers/duesController')

router.post('/generate', generateMonthlyDues)
router.get('/user/:user_id', getUserDues)
router.get('/team/:team_id', getTeamDues);

module.exports = router