var express = require('express');
var router = express.Router();

var expressValidator = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'aMAZEing Games' });
});

router.post('/register', function(req, res, next) {

	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	const errors = req.validationErrors();

	if (errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {title: 'Registration Error'});
	}

	const Username = req.body.username;
	const Useremail = req.body.email;
	const Userpassword = req.body.password;
	var UserID=Math.floor(Math.random()*11)



	console.log(Username);
	console.log(Useremail);
	console.log(Userpassword);
	console.log(UserID);

	//This is what actually connects us to the db
	const db = require('../db.js')
	//Access databse object and call a query on it
	//This should actually insert a new user into the db
	db.query('INSERT INTO users (UserID, Username, Useremail, Userpassword) VALUES (?, ?, ?, ?)', [UserID, Username, Useremail, Userpassword],
		function(error, results, fields) {
			if (error) throw error;

			//res.render('register', { title: 'Registration Complete!' });
		});
	res.render('register', { title: 'Registration Complete!' });
});
module.exports = router;


