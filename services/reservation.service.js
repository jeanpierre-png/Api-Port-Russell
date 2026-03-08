const Reservation = require('../models/Reservation.js');

exports.getAll = () => {
    return Reservation.find();
};

exports.getOne = (id) => {
    return Reservation.findById(id);
};

exports.create = (data) => {
    return Reservation.create(data);
};

exports.update = (data) => {
    return Reservation.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = (id) => {
    return Reservation.findByIdAndDelete(id);
};