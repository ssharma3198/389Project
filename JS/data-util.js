// var mongoose = require('mongoose');
// var Review = require('../model/Review');
// var dotenv = require('dotenv');

// dotenv.load();
// console.log(process.env.MONGODB);

// // Connect to Sandbox MongoDB
// mongoose.createConnection(process.env.MONGODB, {poolSize: 2});
// var db = mongoose.connection;
// db.on('error',function(err){
//     console.log("Connection was unable to take place");
//     console.log(err);
//     process.exit(1);
// });

function save_record() {
    alert("hiiii")
    var genres = $("#genre").val().split(" ");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
    var new_review = new Review({
        rating: $("#rating").val(),
        comment: $("#comment").val(),
        poster: $("#user").val(),
        author: $("#author").val(),
        book: $("#book").val(),        
        genre: genres,
        date: today
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err; 
        console.log("Successfully inserted book :)");
    });
}