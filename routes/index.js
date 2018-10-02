const express = require("express");
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const commentsController = require('../controllers/comments');
const moviesController = require('../controllers/movies');

router.get('/', (req, res, next) => res.render('index'));

router.get('/comments', catchErrors(commentsController.getComments));
router.get('/comments/:movieID', catchErrors(commentsController.getMoviebyId));
router.post('/comments', commentsController.postComment);
router.get('/movies', catchErrors(moviesController.getMovies));
router.get('/movies/:movieID', catchErrors(moviesController.getDetails));
router.post('/movies', catchErrors(moviesController.addMovie));

module.exports = router;