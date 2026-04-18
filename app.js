const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');

const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');
const swaggerSpec = require('./docs/swagger');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', require('./routes/auth.routes'));
app.use('/catways', require('./routes/catway.routes'));
app.use('/reservations', require('./routes/reservation.routes'));
app.use('/users', require('./routes/user.routes'));

///app.get('/', (req, res) => {
    ///res.render('index');
///});

app.get('/', (req, res) => {
    res.send('API fonctionne ');
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