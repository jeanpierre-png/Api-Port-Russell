const Catway = require('../models/Catway');

exports.getAll = () => {
    return Catway.find();
};

exports.getOne = (id) => {
    return Catway.findById(id); 
};

exports.create = (data) => {
    return Catway.create(data);
};
 exports.update = (id, data) => {
    return Catway.findByIdAndUpdate(id, data, { new: true });
 };

 exports.delete = (id) => {
    return Catway.findByIdAndDelete(id);
 };