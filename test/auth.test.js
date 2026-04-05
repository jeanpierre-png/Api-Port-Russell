const assert = require('chai').assert;
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Auth API Tests', () => {

    beforeEach(async () => {
        await User.deleteMany({});

        const hashedPassword = await bcrypt.hash("123456", 10);

        await User.create({
            email: "admin@test.com",
            password: hashedPassword
        });
    });

    it('POST /auth/login → succès', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('x-test', 'true')
            .send({
                email: "admin@test.com",
                password: "123456"
            });

        assert.equal(res.status, 200);
        assert.exists(res.body.token);
    });

    it('POST /auth/login → mauvais mot de passe', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "admin@test.com",
                password: "wrongpassword"
            });

        assert.equal(res.status, 401);
    });

    it('POST /auth/login → utilisateur inexistant', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "notfound@test.com",
                password: "123456"
            });

        assert.equal(res.status, 401);
    });

});