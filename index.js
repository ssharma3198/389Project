var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var dataUtil = require("./JS/data-util");
var _ = require('underscore');
var Review = require('./model/Review');
var app = express();

dotenv.load();
console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error',function(err){
    console.log("Connection was unable to take place");
    console.log(err);
    process.exit(1);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */
app.use("/JS",express.static(__dirname + "/JS"));

/* https://codepen.io/damonbauer/pen/mPexMz */
app.get('/', function(req, res) {
     console.log("hi3")
     var new_review = new Review({
        rating: 4,
        comment: "Exciting",
        poster: "Jkr",
        author: "Dan_Brown",
        book: "Da_Vinci_Code",        
        genre: ["Action", "Thriller"],
        date: "09/01/2008"
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err;        
    });

    var new_review = new Review({
        rating: 4,
        comment: "Great read!",
        poster: "Huffpo",
        author: "Michelle_Obama",
        book: "Becoming",        
        genre: ["Biography"],
        date: "12/02/2018"
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err;        
    });

    var new_review = new Review({
        rating: 3.5,
        comment: "Boring at times",
        poster: "Fox",
        author: "Michelle_Obama",
        book: "Becoming",        
        genre: ["Biography"],
        date: "12/02/2018"
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err;
    });

    var new_review = new Review({
        rating: 5,
        comment: "Wow!",
        poster: "Huffpo",
        author: "Dan_Brown",
        book: "Angels_And_Demons",        
        genre: ["Action", "Thriller"],
        date: "01/01/2010"
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err;
    });
     Review.find({}, function(err, reviews) {
        if (err) throw err;
    
        console.log(reviews)
        console.log("hi")
     })
     console.log("hi2")
     res.render('home', {review:[]});
})

function save_record() {
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
        return res.send("Successfully inserted book :)");
    });
}

app.get('/review/new', function(req, res) {
    res.render('new_review');
})

app.get('/review/:posters', function(req, res) {
    Review.findOne({poster: req.body.poster})
})

app.get('/api/new-review', function(req, res) {
    Review.find({}, function(err, reviews) {
        return res.send(reviews);
    });
})

app.post('/api/new-review', function(req, res) {
    // Create new movie
    var new_review = new Review({
    	rating: req.body.rating,
    	comment: req.body.comment,
        poster: req.body.poster,
    	author: req.body.author,
    	book: req.body.book,        
        genre: req.body.genre,
        date: req.body.date
    });

    // Save movie to database
    new_review.save(function(err){
        if (err) throw err; 
        return res.send("Successfully inserted book :)");
    });
});

app.delete('/api/delete', function(req, res) {
    Review.find({book: req.body.book, poster: req.body.poster}, function(err, review) {
        Review.findByIdAndRemove(review.id, function(err, movie){
        if (err) throw err;
        return res.send("Book "+req.body.id+" was deleted!");
        });
    });
})

app.listen(process.env.PORT || function() {
    console.log('Book Reviewers listening on port 3000!');
});
