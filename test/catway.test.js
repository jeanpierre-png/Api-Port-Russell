const assert = require('chai').assert;
const request = require('supertest');
const app = require('../app');
require('./setup');

const { getToken } = require('./setup');

let catwayId;

describe('Catways API Tests', () => {

    it('1. GET /catways → récupérer tous les catways', async () => {
        const res = await request(app)
            .get('/catways')
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        assert.equal(res.status, 200);
        assert.isArray(res.body);
    });

    it('2. POST /catways → créer un catway', async () => {
        const res = await request(app)
            .post('/catways')
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true')
            .send({
                // éviter duplicate key
                catwayNumber: Math.floor(Math.random() * 10000),
                catwayType: "long",
                catwayState: "Disponible"
            });

        assert.equal(res.status, 201);
        assert.isObject(res.body);
        assert.exists(res.body._id);

        catwayId = res.body._id;
    });

    it('3. GET /catways/:id → récupérer un catway', async () => {
        if (!catwayId) throw new Error("catwayId undefined");

        const res = await request(app)
            .get(`/catways/${catwayId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        assert.equal(res.status, 200);
        assert.equal(res.body._id, catwayId);
    });

    it('4. PATCH /catways/:id → modifier un catway', async () => {
        if (!catwayId) throw new Error("catwayId undefined");

        const res = await request(app)
            .patch(`/catways/${catwayId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true')
            .send({ catwayState: "Occupé" });

        assert.equal(res.status, 200);
        assert.equal(res.body.catwayState, "Occupé");
    });

    it('5. DELETE /catways/:id → supprimer un catway', async () => {
        if (!catwayId) throw new Error("catwayId undefined");

        const res = await request(app)
            .delete(`/catways/${catwayId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        assert.equal(res.status, 200);
        assert.equal(res.body.message, "Catway supprimé");
    });

});