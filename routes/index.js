const express = require("express");
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const commentsController = require('../controllers/comments');
const moviesController = require('../controllers/movies');

router.get('/', (req, res, next) => res.render('index'));

router.get('/comments', commentsController.getComments);
router.get('/comments/:movieID', commentsController.getMoviebyId);
router.post('/comments', commentsController.postComment);
router.get('/movies', moviesController.getMovies);
router.get('/movies/:movieID', moviesController.getDetails);
router.post('/movies', moviesController.addMovie);

module.exports = router;