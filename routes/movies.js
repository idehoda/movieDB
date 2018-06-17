let express = require("express");
let router = express.Router();
let fetch =  require('node-fetch');
let Movie = require('../models/Movie');

//movies list

router.get('/movies', function(req, res, next){
    
    Movie.getMovies(function(err, mov){
        if(err){
            res.send(err);
        }
        //res.json(mov); sending json movies list
        res.render("list", {mov, message: ''});    
    });
});


// one movie

router.get('/movies/:movieID', function(req, res, next){
    
    let movieID = req.params.movieID;

    Movie.findOne({ _id: movieID}, function (err, mov) {
        if(err){
            console.log(err);
        }
            //res.json(mov); posted movie json
            res.render("one", {mov: mov, "action" : ""});  

    });
});

//add movie

 router.post('/movies', function(req, res, next){
     
    Movie.findOne({ Title: req.body.movieTitle}, function (err, mov) {
        if(err){
            console.log(err);
        }
        if(!mov){ ///////// if does not exist in our DB
            fetch(`http://www.omdbapi.com/?t=${req.body.movieTitle}&apikey=df51125c`)
            .then(blob => blob.json())
            .then(mov => {

                if(mov.Response === "False") { /////////  if does not exist in external DB -  Response should be falsy
                    Movie.getMovies(function(err, mov){
                        if(err){
                            res.send(err);
                        }
                        res.render("list", {mov: mov, message: "movie not found"});        
                    });  
                }    
                
                else{ ///////// if it exists in external DB -  add
                    Movie.addMovie(mov);
                    res.render("one", {mov, "action" : "-  added to Database"})
                }
            })
            }     

        else{ /////////// if it exists in our DB
            Movie.getMovies(function(err, mov){
                if(err){
                    res.send(err);
                }
                res.render("list", {mov: mov, message: "alerady in base"});        
            });
        }
        
    });

 });


module.exports = router;
