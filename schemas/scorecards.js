var mongoose = require('mongoose');

var scoreCardsSchema = mongoose.Schema({
	course: String,
	date: String,
	hole1: { par: Number, myscore: Number },
	hole2: { par: Number, myscore: Number },
	hole3: { par: Number, myscore: Number },
	hole4: { par: Number, myscore: Number },
	hole5: { par: Number, myscore: Number },
	hole6: { par: Number, myscore: Number },
	hole7: { par: Number, myscore: Number },
	hole8: { par: Number, myscore: Number },
	hole9: { par: Number, myscore: Number },
	hole10: { par: Number, myscore: Number },
	hole11: { par: Number, myscore: Number },
	hole12: { par: Number, myscore: Number },
	hole13: { par: Number, myscore: Number },
	hole14: { par: Number, myscore: Number },
	hole15: { par: Number, myscore: Number },
	hole16: { par: Number, myscore: Number },
	hole17: { par: Number, myscore: Number },
	hole18: { par: Number, myscore: Number }
});

module.exports = mongoose.model('scoreCards', scoreCardsSchema);