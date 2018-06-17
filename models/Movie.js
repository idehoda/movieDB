 let mongoose = require("mongoose");

// Movie Schema
let movieSchema = mongoose.Schema({
    Title: {
        type: String
    },
    Plot: {
        type: String
    },
    Poster: {
        type: String
    },
    Director: {
        type: String
    },
    Year:{
        type: String
    },
    Genre:{
        type: String
    },
    Released: {
        type: String
    },
    Comments:{
        type: []
    }
    
});


let Movie = module.exports = mongoose.model('Movie', movieSchema);

module.exports.getMovies = function(clb, limit){
    Movie.find(clb);
}

module.exports.addMovie = function(mov){
    Movie.create(mov);
}
// module.exports.updateComment = function(mov){
//     Movie.create(mov);
// }