let express = require("express");
let router = express.Router();
let fetch =  require('node-fetch');
let Movie = require('../models/Movie');
//movies list

exports.getMovies = async (req, res, next) => {
    const mov = await Movie.find();
    res.render("list", {mov: mov, message: ''});
};

// one movie

exports.getDetails = async (req, res, next) => {
    const movieID = req.params.movieID;
    const mov = await Movie.findOne({ _id: movieID});
    res.render("one", {mov: mov, "action" : ""});
};

//add movie

 exports.addMovie = async (req, res, next) => {
     
    const mov = await Movie.findOne({ Title: req.body.movieTitle});
        if(!mov){ ///////// if does not exist in our DB
            fetch(`http://www.omdbapi.com/?t=${req.body.movieTitle}&apikey=${process.env.key}`)
            .then(blob => blob.json())
            .then(mov => {
                if(mov.Response === "False") { /////////  if does not exist in external DB -  Response should be falsy
                    Movie.find((err, mov) => {
                        if(err){
                            res.send(err);
                        }
                        res.render("list", {mov: mov, message: "movie not found"});
                    });
                }    
                
                else { ///////// if it exists in external DB -  add
                    Movie.create(mov);
                    res.render("one", {mov, "action" : "-  added to Database"})
                }
            })
            }     

        else { /////////// if it exists in our DB
            Movie.find(function(err, mov){
                if(err){
                    res.send(err);
                }
                res.render("list", {mov: mov, message: "alerady in base"});        
            });
        }
 };