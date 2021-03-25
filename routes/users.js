const express = require('express')
const {strings} = require("../constants");
const {tokens} = require("../tokens")
const {usersDb} = require("../database/users")
const {usersShowtimesDb} = require("../database/users_showtimes")
const {utils} = require("../utils")

const router = express.Router()

router.post('/', (req, res) => {
  //we can implement validations here
  usersDb.create(req.body).then(() => res.status(204).send()).catch(error => utils.responseError({res, error}))
})

router.post('/getToken', (req, res) => {
  usersDb.login(req.body).then(({user}) => {
    return tokens.create({user})
  }).then(({token, user}) => {
    res.status(200).send({user, token})
  }).catch(error => {
    utils.responseError({res, error})
  })
})

router.post('/:userId/movies/:movieId/showtimes/:showtimeId', tokens.validate, (req, res) => {
  if(req.user.id+'' !== req.params.userId+'') return utils.responseError({res, error: utils.createError(strings.differentUser)})
  usersShowtimesDb.create(req.params).then(({id})=>{
    res.send({id})
  })
})

router.get('/:userId/movies', tokens.validate, (req, res) => {
  if(req.user.id+'' !== req.params.userId+'') return utils.responseError({res, error: utils.createError(strings.differentUser)})
  usersShowtimesDb.list(req.params).then(({bookingMovies})=>{
    res.send({bookingMovies})
  })
})



module.exports = router
