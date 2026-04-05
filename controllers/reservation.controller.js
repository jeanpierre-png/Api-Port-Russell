const reservationService = require('../services/reservation.service.js');

exports.getAll = async (req, res) => {
    const reservations = await reservationService.getAll();

    if (req.headers['x-test']) return res.json(reservations);
    res.render("reservations", {
        reservations: reservations
    });
};

exports.getOne = async (req, res) => {
    const reservation = await reservationService.getOne(req.params.id);

    if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }

    if (req.headers['x-test']) return res.json(reservation);
    res.render("reservation", {
        reservation: reservation
    });
};

exports.create = async (req, res) => {
    const newReservation = await reservationService.create(req.body);

    if (req.headers['x-test']) return res.status(201).json(newReservation);
    res.redirect('/dashboard');
};

exports.update = async (req, res) => {
    const update = await reservationService.update(req.params.id, req.body);
    
    if (!update) {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(update);
};

exports.delete = async (req, res) => {
    const deleted = await reservationService.delete(req.params.id);

    if (!deleted) {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json({ message: "Réservation supprimée" });
};