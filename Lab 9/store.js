// Adam Casey - Lab 9

var express = require('express')
var app = express()

app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		var sqlQuery = "select * from store";
// Query to get all the entries.
// conn object which will execute and return results
conn.query(sqlQuery,function(err, rows, fields) {
	if (err) {
// Display error message in case an error
req.flash('error', err)
res.render('store/list', {
	title: 'Store listing',
	data: ''
})
} else {
// render to views/store/list.ejs template file
res.render('store/list', {
	title: 'Store listing',
	data: rows
})
}
})
})
})

// Display form to get values for store item for insertion
app.get('/add', function(req, res, next){
// render to views/store/add.ejs
res.render('store/add', {
	title: 'Add New Item',
	sname: '',
	qty: '',
	price: ''
})
})

// ADD NEW ITEM POST ACTION -- Used to insert values
// Notice that we are using post here
app.post('/add', function(req, res, next){
	req.assert('sname', 'sname is required').notEmpty()
//Validate sname
req.assert('qty', 'Quantity is required').notEmpty()
//Validate qty
req.assert('price', 'Price is required').notEmpty()
//Validate price
var errors = req.validationErrors()
if( !errors ) { //No errors were found. Passed Validation!
	var item = {
		sname: req.sanitize('sname').escape().trim(),
		qty: req.sanitize('qty').escape().trim(),
		price: req.sanitize('price').escape().trim()
	}
	req.getConnection(function(error, conn) {
/* Below we are doing a template replacement. The ?
is replaced by entire item object*/
/* This is the way which is followed to substitute
values for SET*/
conn.query('INSERT INTO store SET ?', item,
	function(err, result) {
		if (err) {
			req.flash('error', err)
// render to views/store/add.ejs
res.render('store/add', {
	title: 'Add New Item',
	sname: item.sname,
	qty: item.qty,
	price: item.price
})
} else {
	req.flash('success', 'Data added successfully!')
// render to views/store/add.ejs
res.render('store/add', {
	title: 'Add New Item',
	sname: '',
	qty: '',
	price: ''
})
}
})
})
}
else { //Display errors to user
	var error_msg = ''
	errors.forEach(function(error) {
		error_msg += error.msg + '<br>'
	})
	req.flash('error', error_msg)
/**
* Using req.body.sname
* because req.param('sname') is deprecated
*/
// Sending back the entered values for user to verify
res.render('store/add', {
	title: 'Add New Item',
	sname: req.body.sname,
	qty: req.body.qty,
	price: req.body.price
})
}
})

//<%- include ../layouts/footer.ejs %>

// SHOW EDIT ITEM FORM - Display form for update
app.get('/edit/(:id)', function(req, res, next){
	/*
	TODO : Update operation is similar to add operation.
	Fill out the appropriate code below
	Hints :
	* req.params.id will give you the id which is passed in
/edit/(:id).Use
		that in SQL update query and any other place where you need
id
	* You are only displaying an item here for the customer.
	* The actual update happens in the post action below this module
	*/
	req.getConnection(function(error, conn) {
		conn.query( "select * from store where id =" + req.params.id + ";", function(err, rows,
			fields) {
	// if item not found
	if (rows.length <= 0) {
		req.flash('error', 'Item not found with id = '+ req.params.id )
		res.redirect('/store')
	}

	else { // if item found
		// render to views/store/edit.ejs template file
		res.render('store/edit', {
			title: 'Edit Item',
			/* Place the code for sending values */
			/* Hint : rows[0] gets the entire tuple from database.
			Get the right values from rows[0]
			*/
			id: rows[0].id /*id*/,
			qty: rows[0].qty/*quantity*/,
			price : rows[0].price /*price*/,
			sname : rows[0].sname /*Item name*/
		})
	}
})
	})	
})

// EDIT ITEM POST ACTION - Update the item, actual update happens here
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('sname', 'Name is required').notEmpty()
//Validate name
req.assert('qty', 'Quantity is required').notEmpty()
//Validate qty
req.assert('price', 'Price is required').notEmpty()
//Validate price
var errors = req.validationErrors()
	if( !errors ) { //No errors were found. Passed Validation!
		var item = {
			sname: req.sanitize('sname').escape().trim(),
			qty: req.sanitize('qty').escape().trim(),
			price: req.sanitize('price').escape().trim()
		}
		req.getConnection(function(error, conn) {
			conn.query('UPDATE store SET sname="' + req.body.sname + '", qty=' + req.body.qty + ', price=' + req.body.price + ' WHERE id=' 
				+ req.params.id + ';',  function(err, result) {
					if (err) {
						req.flash('error', err)
		// render to views/store/edit.ejs
		res.render('store/edit', {
			title: 'Edit Item',
			id: req.params.id,
/* Since this is update query part, no rows are returned You need to fetch below values from req.body
I have already fetched the item id above for you. Beware I have used req.params but below you need to use req.body*/
sname: req.body.sname /*Name*/,	
qty: req.body.qty /*Quantity*/,
price: req.body.price /*Price*/
})
	} else {
		req.flash('success', 'Data updated successfully!')
	// render to views/store/edit.ejs
	res.render( 'store/edit', {
		title: 'Edit Item',
		id: req.params.id,
/* Since this is update query part, no rows are returned You need to fetch below values from req.body I have already fetched the item id
above for you. Beware I have used req.params but below you need to use req.body*/
sname: req.body.sname /*Name*/,	
qty: req.body.qty /*Quantity*/,
price: req.body.price /*Price*/
})
}
})
		})
	}
else { //Display errors to user
	var error_msg = ''
	errors.forEach(function(error) {
		error_msg += error.msg + '<br>'
	})
	req.flash('error', error_msg)
// render to views/store/edit.ejs
res.render('store/edit', {
	title: 'Edit Item,',
	id: req.params.id,
/* Since this is update query part, no rows are returned You need to fetch below values from req.body
I have already fetched the item id above for you. Beware I have used req.params but below you need to use req.body*/
sname: req.body.sname /*Name*/,
qty: req.body.qty /*Quantity*/,
price: req.body.price /*Price*/
})
}
})

// DELETE Item. Pass the right id in the URL.
app.delete('/delete/(:id)', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query("delete from store WHERE id=" + req.params.id + ";", function(err, result) {
			if (err) {
				req.flash('error', err)
// redirect to users list page
res.redirect('/store')
} else {
req.flash('success', 'User ID' + req.params.id + 'deleted successfully!' /*Success message goes
	here. Also pass the id in this message*/)
// redirect to users list page
res.redirect('/store')
}
})
	})
})

module.exports = app // This must be the last line in the file. Any and all code
 //must be added before this line