var usersSchema = require('../schemas/users');
var scoreCardsSchema = require('../schemas/scorecards');

exports.index = function(req, res){
  res.render('index', {user: req.user});
};

exports.login = function(req, res) {
	res.render('login', {title: 'Log in', user: req.user, message: req.flash('loginMessage')})
};

exports.users = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/login');
	}else{
		usersSchema.find()
		.exec(function(err, users) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('users', {
					title: 'Users',
					user : req.user,
					users: users
				});
			}
		});
	}
};

exports.scorecards = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/login');
	}else{
		scoreCardsSchema.find({userid: req.user.username})
		.exec(function(err, scoreCards) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('scorecards', {
					title: 'Scorecards',
					user : req.user,
					scoreCards: scoreCards
				});
			}
		});
	}
};

exports.scorecard = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/login');
	}else{
		scoreCardsSchema.find({_id: ''+req.params.id+''})
		.exec(function(err, scoreCards) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				console.log(scoreCards);
				res.render('scorecard', {
					title: 'Scorecard',
					user : req.user,
					scoreCards: scoreCards
				});
			}
		});
	}
};