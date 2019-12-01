const request = require("request");
const mysql = require("mysql");

module.exports = {

// Return random image URLs from an API
/**
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 **/
getRandomImages_cb: function (keyword, imageCount, callback) {
    
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=f3a22633170a3fdfe484438da98f9b246841aa00a7cf33a9b2c51069084f6800&orientation=landscape";
    request(requestURL, function(error, response, body) {
        
       if (!error) {
           var parseData = JSON.parse(body);
            //console.log('image url:', parseData["urls"]["regular"]); // displays HTML for the unsplash random image
            var imageURLs = [];
            for (let i = 0; i < 9; i++) {
                imageURLs.push(parseData[i].urls.regular); // images are stored in an array
            }
            //console.log(imageURLs);
            //return imageURLs;
            callback(imageURLs);
       }
       else {
           console.log("error", error);
       }
        
    }); // request
    
},

// Return random image URLs from an API
/**
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 **/
getRandomImages: function (keyword, imageCount) {
    
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=f3a22633170a3fdfe484438da98f9b246841aa00a7cf33a9b2c51069084f6800&orientation=landscape";
    
    return new Promise( function( resolve, reject ) {
        
        request(requestURL, function(error, response, body) {
        
        if (!error) {
           var parseData = JSON.parse(body);
            //console.log('image url:', parseData["urls"]["regular"]); // displays HTML for the unsplash random image
            var imageURLs = [];
            for (let i = 0; i < imageCount; i++) {
                imageURLs.push(parseData[i].urls.regular); // images are stored in an array
            }
            //console.log(imageURLs);
            //return imageURLs;
            //callback(imageURLs);  // not using with async/await
            resolve(imageURLs);
        }
        else {
           console.log("error", error);
       }
        
    })
    
    
        
    }); // request
    
}, // end of function

/**
/* creates database connection
 * @return db connection
 **/
createConnection: function() {
    
    var conn = mysql.createConnection( {
		host: "us-cdbr-iron-east-05.cleardb.net",
		user: "ba7b21b60250de",
		password: "d32eb70b",
		database: "heroku_67314fd25b205ab"
	});
	
	return conn;
}

};  // end moduke.exports

