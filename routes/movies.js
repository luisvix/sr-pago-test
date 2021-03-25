const express = require('express');
const {showtimesDb} = require("../database/showtimes");
const {utils} = require("../utils");
const {moviesDb} = require("../database/movies");

const router = express.Router();

router.get('/', (req, res) => {
  moviesDb.list({city: req.query.city}).then(({movies}) => {
    res.send({movies})
  }).catch(error => {
    utils.responseError({res, error})
  })
})

router.get('/:movieId', (req, res) => {
  let movie = {}
  moviesDb.list({id: req.params.movieId}).then(({movies}) => {
    movie = {...movies[0]}
    return showtimesDb.list({movieId: req.params.movieId})
  }).then(({showtimes})=>{
    movie.showtimes = showtimes
    res.send({movie})
  }).catch(error => {
    utils.responseError({res, error})
  })
});

module.exports = router
