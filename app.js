const express = require('express');
const path = require('path');
const app = express();

const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', require('./routes/auth.routes'));
app.use('/catways', require('./routes/catway.routes'));
app.use('/reservations', require('./routes/reservation.routes'));
app.use('/users', require('./routes/user.routes'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', async (req, res) => {

    const catways = await Catway.find();
    const reservations = await Reservation.find();
    const users = await User.find();

    res.render('dashboard', {
        catways: catways,
        reservations: reservations,
        users: users
    });
});

module.exports = app;