const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));
app.use('/catways', require('./routes/catway.routes'));

module.exports = app;