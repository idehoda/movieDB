let express = require("express");
let router = express.Router();
let fetch =  require('node-fetch');
let Movie = require('../models/Movie');

 //// get comments

 router.get('/comments', function(req, res, next){

    Movie.getMovies(function(err, movies){
        if(err){
            res.send(err);
        }
        let comments = movies.map((mov)=>mov.Comments);

        //res.json(comments);  all comments in database
        res.render('comments', {movies});
    });

 });

 router.get('/comments/:movieID', function(req, res, next){
    let movieID = req.params.movieID;

    Movie.findOne({ _id: movieID}, function (err, mov) {
        if(err){
            console.log(err);
        }    
             res.render("movieComments", {mov: mov});  
    });

 });

 //// post comment

 router.post('/comments', function(req, res, next){
     let commentObj = req.body.commentText; 
     let movieID = Object.entries(commentObj)[0][0];
     let comment = Object.entries(commentObj)[0][1];

     Movie.findOneAndUpdate(
        {_id: movieID},
        { $push: { "Comments": comment } },
        { upsert: true }, 
        function(err, data) {
            if(err){
                console.log(err);
            } 
    });
     //res.json(comment); posted comment body json
    res.redirect('/movies');

 });

module.exports = router;
