let express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended : true }));
const mongoose = require("mongoose");

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
mongoose.connect(process.env.db);


const routes = require("./routes/index");
const movies = require("./routes/movies");
const comments = require("./routes/comments");


 app.use('/', routes);
 app.use('/', movies);
 app.use('/', comments);

app.listen(PORT, () => console.log("running on port 5000..."));