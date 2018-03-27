var express = require('express');
var router = express.Router();

var expressValidator = require('express-validator');

/* Implementing password hashing with bcrypt */
var bcrypt = require('bcrypt');
/* 
saltRounds is the number of hashings the password will go through
salting is a randomly generated string of characters generated for each time a user is inserted
into our db
 */
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'aMAZEing Games' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'aMAZEing Games' });
});

/* GET Game Page 1 */

/* GET Game Page 2 */

/* GET User Profile Page */

router.post('/register', function(req, res, next) {

	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4,15);
	req.checkBody('email', 'The email entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4,100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8,100);
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8,100);
	req.checkBody('passwordMatch', 'Passwords do not match. Please try again.').equals(req.body.password);


	const errors = req.validationErrors();

	if (errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {
			title: 'Registration Error',
			errors: errors
		});
	} else {

	const Username = req.body.username;
	const Useremail = req.body.email;
	const Userpassword = req.body.password;
	var UserID=Math.floor(Math.random()*11)

	/*console.log(Username);
	console.log(Useremail);
	console.log(Userpassword);
	console.log(UserID);*/

	//This is what actually connects us to the db
	const db = require('../db.js')

	/* saltRounds gets added onto the end of the password to make it harder to crack */
	bcrypt.hash(Userpassword, saltRounds, function(err, hash) {
		//Access databse object and call a query on it
		//This should actually insert a new user into the db
  		db.query('INSERT INTO users (UserID, Username, Useremail, Userpassword) VALUES (?, ?, ?, ?)', [UserID, Username, Useremail, hash],
			function(error, results, fields) {
				if (error) throw error;

				res.render('register', { title: 'Registration Complete!' });
			})
		});
	//res.render('register', { title: 'Registration Complete!' });
	}

});
module.exports = router;


