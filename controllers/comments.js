const express = require("express");
const fetch =  require('node-fetch');
const Movie = require('../models/Movie');

 //// get comments

 exports.getComments = (req, res, next) => {

    Movie.getMovies(function(err, movies){
        if(err){
            res.send(err);
        }
        let comments = movies.map((mov)=>mov.Comments);

        //res.json(comments);  all comments in database
        res.render('comments', {movies});
    });

 };

 exports.getMoviebyId = (req, res, next) => {
    const movieID = req.params.movieID;

    Movie.findOne({ _id: movieID}, function (err, mov) {
        if(err){
            console.log(err);
        }    
             res.render("movieComments", {mov: mov});  
    });

 };

 //// post comment

 exports.postComment = (req, res, next) => {
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
 };
