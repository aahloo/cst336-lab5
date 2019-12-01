const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// routes
// root route
app.get("/", async function(req, res) {
    
    var imageURLs = await tools.getRandomImages("", 1);  // won't work because in JS the function call is asynchronous (unless using 'async/await')
    //console.log("imageURLs using Promises: " + imageURLs);
    res.render("index", {"imageURL": imageURLs});
    
    

}); // end root route

app.get("/search", async function(req, res) {   // async prefix is required for 'await' function calls
    //console.dir(req);
    //console.log(req.query.keyword);
    var keyword = req.query.keyword;
    
    var imageURLs = await tools.getRandomImages(keyword, 9);  // won't work because in JS the function call is asynchronous (unless using 'async/await')
    console.log("imageURLs using Promises: " + imageURLs);
    res.render("results", {"imageURLs": imageURLs});
    // getRandomImages_cb(keyword, 9, function(imageURLs) {
    //     console.log("imageURLs: " + imageURLs);
    //     res.render("results", {"imageURLs": imageURLs});
    // });
    
 
});


// server listener for Heroku
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});