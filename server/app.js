// app.js
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes');
const authRoutes = require('./routes/auth');
const inviteRoutes = require('./routes/invite');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/events');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api', routes)
app.use('/api/auth', authRoutes);
app.use('/api/invite', inviteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

module.exports = app
