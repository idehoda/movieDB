let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended : true }));
let mongoose = require("mongoose");

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost/mongomovies');
mongoose.connect('mongodb://u1:u12345@ds151169.mlab.com:51169/movie-test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.log("mongodb connected");
});

let routes = require("./routes/index");
let movies = require("./routes/movies");
let comments = require("./routes/comments");


 app.use('/', routes);
 app.use('/', movies);
 app.use('/', comments);

app.listen(PORT, function(){
    console.log("running on port 5000...")
})
