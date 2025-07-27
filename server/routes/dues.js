const express = require('express')
const router = express.Router()
const { generateMonthlyDues, getUserDues } = require('../controllers/duesController')

router.post('/generate', generateMonthlyDues)
router.get('/user/:user_id', getUserDues)

module.exports = router