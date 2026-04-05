const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const { getToken }  = require('./setup');

let reservationId;

describe('Reservations API Tests', () => {


    // CRÉATION DE RÉSERVATION

    it('6.POST /reservations → créer une réservation', async () => {
        const res = await request(app)
            .post('/reservations')
            .set('Cookie', [`token=${getToken()}`]) 
            .set('x-test', 'true')
            .send({
                catwayNumber: Math.floor(Math.random() * 1000), 
                clientName: "Test User",
                boatName: "Test Boat",
                startDate: "2024-05-01",
                endDate: "2024-06-01"
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        reservationId = res.body._id;
    });


    // RÉCUPÉRER TOUTES LES RÉSERVATIONS

    it('7.GET /reservations → récupérer toutes les réservations', async () => {
        const res = await request(app)
            .get('/reservations')
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });


    // RÉCUPÉRER UNE RÉSERVATION PAR ID

    it('8.GET /reservations/:id → récupérer une réservation', async () => {
        if (!reservationId) throw new Error("reservationId undefined");

        const res = await request(app)
            .get(`/reservations/${reservationId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(reservationId);
    });

   
    // MODIFIER UNE RÉSERVATION
    
    it('9.PATCH /reservations/:id → modifier une réservation', async () => {
        if (!reservationId) throw new Error("reservationId undefined");

        const res = await request(app)
            .patch(`/reservations/${reservationId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true')
            .send({ boatName: "Updated Boat Name" });

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.boatName).to.equal("Updated Boat Name");
    });


    // SUPPRIMER UNE RÉSERVATION

    it('10.DELETE /reservations/:id → supprimer une réservation', async () => {
        if (!reservationId) throw new Error("reservationId undefined");

        const res = await request(app)
            .delete(`/reservations/${reservationId}`)
            .set('Cookie', [`token=${getToken()}`])
            .set('x-test', 'true');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', "Réservation supprimée");
    });

});