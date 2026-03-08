const reservationService = require('../services/reservation.service.js');

exports.getAll = async (req, res) => {
    const reservations = await reservationService.getAll();
    res.json(reservations);
};

exports.getOne = async (req, res) => {
    const reservation = await reservationService.getOne(req.params.id);

    if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(reservation);
};

exports.create = async (req, res) => {
    const newReservation = await reservationService.create(req.body);
    res.status(201).json(newReservation);
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