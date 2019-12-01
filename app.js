/**
 * Austin Ah Loo
 * CST 336 Lab 5 - Express and MySQL
 * 2019.11.29
 **/

// import Express library
const express = require("express");
// import request library
const request = require('request');
// import mysql library
const mysql = require('mysql');
// import custom tools file
const tools = require('./tools');

// variable to access the methods
// exposes a top-level function
const app = express();

// render HTML
// app.engine('html', require('ejs').renderFile);
// set view engine
app.set('view engine', 'ejs');
// add static files folder 
app.use(express.static("public"));

// creating a “route”
app.get("/", async function (req, res) {

	/*
	console.log('in the app.get function');    
	console.log('set the var to the web API: var requestURL = ', requestURL);
	*/
	//var requestURL = "https://api.unsplash.com/photos/random?client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

	// call web API with promise
	var imageURLs = await tools.getRandomImages("", 1);

	res.render("index", {
		"imageURLs": imageURLs
	});


}); // root route

// creating a “route”
app.get("/search", async function (req, res) {

	// keyword enterd by user
	var keyword = req.query.keyword;

	// call web API with promise, keyword and image count
	var imageURLs = await tools.getRandomImages(keyword, 9);
	console.log("imageURLs using Promises:" + imageURLs);

	res.render("results", {
		"imageURLs": imageURLs,
		"keyword": keyword
	});

}); // search route

app.get("/api/updateFavorites", function(req, res) {

	var conn = tools.createConnection();
	
	var sql;
	var sqlParams;
	
	if (req.query.action == "add") {
		sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
		sqlParams = [req.query.imageURL, req.query.keyword];
	}
	else {
		sql = "DELETE FROM favorites WHERE imageURL = ?";
		sqlParams = [req.query.imageURL];
	}
	
	conn.connect(function(err) {
		
		if (err) throw err;
		
		conn.query(sql, sqlParams, function(err, result) {
			if (err) throw err;
		});
	});
	
	res.send("it works!");
		
});

app.get("/displayKeywords", async function(req, res) {
	
	var imageURLs = await tools.getRandomImages("", 1);
	var conn = tools.createConnection();
	var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
	
	conn.connect(function(err) {
		
		if (err) throw err;
		
		conn.query(sql, function(err, result) {
			if (err) throw err;
			res.render("favorites", {"rows": result, "imageURLs": imageURLs});
			
		});	// end query
	});
	
});

app.get("/api/displayFavorites", function(req, res) {
	
	var conn = tools.createConnection();
	var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
	var sqlParams = [req.query.keyword];
	
	conn.connect(function(err) {
		
		if (err) throw err;
		
		conn.query(sql, sqlParams, function(err, results) {
			if (err) throw err;
			res.send(results);
			
		});	// end query
	});
	
});

// allow the server to listen for any request
// local server listener
// app.listen("8081", "127.0.0.1", function() {
// heroku server listner
app.listen(process.env.PORT, process.env.IP, function () {

	console.log("Express Server is Running...")

});

