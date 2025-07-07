// server/routes/auth.js
const express = require('express')
const { handleSignup } = require('../controllers/authController')

const router = express.Router()

router.post('/signup', handleSignup)

module.exports = router
