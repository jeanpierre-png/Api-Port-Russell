const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');

let token;

before(async function () {
    this.timeout(10000);

    // Connexion Mongo
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/port-russell');
    }

    // Reset users
    await User.deleteMany({});

    // Création user test
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
        email: "admin@test.com",
        password: hashedPassword
    });

    // Login pour récupérer token
    const res = await request(app)
        .post('/auth/login')
        .set('x-test', 'true')
        .send({
            email: "admin@test.com",
            password: "123456"
        });

    token = res.body.token;

});

after(async () => {
    await mongoose.connection.close();
});

function getToken() {
    return token;
}

module.exports = { getToken };