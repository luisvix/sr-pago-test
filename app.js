const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
const {constants} = require("./constants")

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

app.listen(constants.port, ()=>console.log(`Starting server in port ${constants.port}`))
