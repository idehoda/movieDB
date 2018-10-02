const express = require("express");
const fetch =  require('node-fetch');
const Movie = require('../models/Movie');

 //// get comments

 exports.getComments = async (req, res, next) => {

    const movies = await Movie.find();
    const comments = movies.map( mov => mov.Comments);
    res.render('comments', {movies});
    };

 exports.getMoviebyId = async (req, res, next) => {
   const movieID = req.params.movieID;
   const mov = await Movie.findOne({ _id: movieID})
   res.render("movieComments", {mov});
 };

 //// post comment

 exports.postComment = async (req, res, next) => {
     let commentObj = req.body.commentText; 
     const movieID = Object.entries(commentObj)[0][0];
     const comment = Object.entries(commentObj)[0][1];
     await Movie.findOneAndUpdate(
        {_id: movieID},
        { $push: { "Comments": comment } },
        { upsert: true }
    );
     res.redirect('/movies');
 };
