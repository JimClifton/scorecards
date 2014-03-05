
/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('./auth');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./db');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
	secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/home', routes.index);
app.get('/users', routes.users);
app.get('/scorecards', routes.scorecards);
app.get('/scorecards/:id', routes.scorecard);
app.get('/courses', routes.courses);
app.get('/courses/:id', routes.course);
app.get('/addcourse', routes.addcourse);
app.post('/insertcourse', routes.insertcourse);

app.get('/', routes.login);
app.post('/', passport.authenticate('local', {
	failureRedirect: '/',
	successRedirect: '/scorecards',
	failureFlash: true
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
