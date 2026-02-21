const User = require('../models/User')

exports.createUser = (data) => {
    return User.create(data);
};

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};

exports.findByEmail = (email) => {
    return User.findOne({ email });
};