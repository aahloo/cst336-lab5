/** functions.js
 * Javascript/JQuery Functions for app.js
 **/

$(document).ready(function() {
    
    // function to toggle the fav icon on and off
    //$(".favoriteIcon").on("click", function() {
    $(document).on("click", ".favoriteIcon", function() {
        
        //alert("it works");
        //alert($(this).prev().attr("src"));
        
        
        var imageURL = $(this).prev().attr("src");

        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorite("add", imageURL); // insert new record
        } // if
        else {
            $(this).attr("src", "img/fav_off.png");
            updateFavorite("delete", imageURL); // delete a record
        } // else      
        

    }); // on favorite icon click
    
    // function to display favorite images per user-select
    $(".keywordLink").on("click", function() {
        
        //alert($(this).text().trim());
        
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                 "keyword" : $(this).text().trim(),
            },
            success: function(rows, status) {
                
                $("#favorites").html("");
                
                rows.forEach(function(row, index) {
                    (index % 4 == 0) ? $("#favorites").append('<br>') : $("#favorites").append('');
                    $("#favorites").append("<div class='imageContainer'><img class='image' src='" + row.imageURL + "' width='200' height='200'><img class='favoriteIcon' src='img/fav_on.png' width='20'></div>");
                    
                });
            }// data

        }); // ajax
        
    });
    
    // function to add or remove images from favorites database
    function updateFavorite(action, imageURL) {

        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {
                "imageURL": imageURL,                
                "keyword" : $("#keyword").val(),
                "action": action
                
            } // data

        }); // ajax

    } // function
    
    

}); // doc ready