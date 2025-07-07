// app.js
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes')
const authRoutes = require('./routes/auth');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api', routes)
app.use('/api/auth', authRoutes);

module.exports = app
