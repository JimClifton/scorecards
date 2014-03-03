var mongoose = require('mongoose');

mongoose.connect('mongodb://scores:password@ds030817.mongolab.com:30817/scorecards');

module.exports = mongoose.connection;