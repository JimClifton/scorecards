var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	usersSchema = require('./schemas/users');

passport.use(new LocalStrategy({
		passReqToCallback : true // allows us to pass back the entire request to the callback
    },
	function(req, username, password, done) {
		usersSchema.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Wrong password.'));
			}
			return done(null, user);
        });
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;