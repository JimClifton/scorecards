var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
	username: String,
	password: String
});
usersSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('users', usersSchema);