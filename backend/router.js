var express = require('express');
var router = express.Router();
var User = require('../models/user');


//GET data for reading
router.get('/',function (req, res, next) {
	return res.sendFile(path.join(__dirname + 'landingPage.html'));
});


//Execute POST request
router.post('/', function(req, res, next) {
	//check if the passwords typed are identical
	if(req.body.password !== req.body.passwordCheck) {
		var error = new Error('Passwords are not the same');
		error.status = 400;
		res.send("Passwords don't match");
		return next(error);
	}

	if(req.body.username && req.body.email && req.password && req.passwordCheck) {
		var userData = {
			email: req.body.email,
			password: req.body.password,
		}

		User.create(userData, function (error, user) {
			if(error){
				return next(error);
			} else {
				req.session.userId = user._id;
				return res.redirect('/profile');
			}
		});

		} else if(req.body.logemail && req.body.logpassword) {
			User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
			if(error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.redirect('/profile');
			  }
			});
			} else {
			  	var err = new Error('All fields are required');
				err.status = 400;
				return next(err);
			  }
		})
