const capitainerie = require('mongoose');

const userSchema = new capitainerie.Schema( {
    name: String,
    email: String,
    password: String
});

module.exports = capitainerie.model('User', userSchema)