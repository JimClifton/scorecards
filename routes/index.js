var usersSchema = require('../schemas/users');
var scoreCardsSchema = require('../schemas/scorecards');
var coursesSchema = require('../schemas/courses');

exports.index = function(req, res){
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		res.render('index', {user: req.user});
	}
};

exports.login = function(req, res) {
	res.render('login', {title: 'Log in', user: req.user, message: req.flash('loginMessage')});
};

exports.users = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
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
		res.redirect('/');
	}else{
		scoreCardsSchema.find({userid: req.user.username})
		.exec(function(err, scoreCards) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('myscorecards', {
					title: 'My Scorecards',
					user : req.user,
					scoreCards: scoreCards
				});
			}
		});
	}
};

exports.scorecard = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		scoreCardsSchema.find({_id: ''+req.params.id+''})
		.exec(function(err, scoreCards) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('scorecard', {
					user : req.user,
					scoreCards: scoreCards
				});
			}
		});
	}
};

exports.courses = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		coursesSchema.find({userid: req.user.username})
		.exec(function(err, courses) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('mycourses', {
					title: 'My Courses',
					user : req.user,
					courses: courses
				});
			}
		});
	}
};

exports.course = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		coursesSchema.find({_id: ''+req.params.id+''})
		.exec(function(err, courses) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('course', {
					user : req.user,
					courses: courses
				});
			}
		});
	}
};

exports.addcourse = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		res.render('addcourse', {title: 'Add a Course', user : req.user.username});
	}
};

exports.insertcourse = function(req, res) {
	if(req.session.passport.user === undefined) {
		res.redirect('/');
	}else{
		var coursedata = req.body;
			coursedata = {
				userid : coursedata.userid,
				course : coursedata.course,
				date : coursedata.date,
				scorecard : {
					hole1 : {par: coursedata.hole1},
					hole2 : {par: coursedata.hole2},
					hole3 : {par: coursedata.hole3},
					hole4 : {par: coursedata.hole4},
					hole5 : {par: coursedata.hole5},
					hole6 : {par: coursedata.hole6},
					hole7 : {par: coursedata.hole7},
					hole8 : {par: coursedata.hole8},
					hole9 : {par: coursedata.hole9},
					hole10 : {par: coursedata.hole10},
					hole11 : {par: coursedata.hole11},
					hole12 : {par: coursedata.hole12},
					hole13 : {par: coursedata.hole13},
					hole14 : {par: coursedata.hole14},
					hole15 : {par: coursedata.hole15},
					hole16 : {par: coursedata.hole16},
					hole17 : {par: coursedata.hole17},
					hole18 : {par: coursedata.hole18}
				}
			}
		var course = new coursesSchema(coursedata);
		course.save( function(err, data) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.redirect('/courses');
			}
		});

		
	}
};