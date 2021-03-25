const {userShowtimesModel} = require("../models/usersShowtimes");
const {strings} = require("../constants")
const {utils} = require("../utils")
const {connections} = require("../constants")

const usersShowtimesDb = {}

usersShowtimesDb.create = ({userId, movieId, showtimeId}) => {
  return new Promise((resolve, reject) => {
    const query = `insert into users_showtimes(userId, movieId, showtimeId) value(?,?,?)`
    connections.movies.query(query, [userId, movieId, showtimeId], (error, status) => {
      if (error) return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      resolve({id: status.insertId})
    })
  })
}

usersShowtimesDb.list = ({userId}) => {
  return new Promise((resolve, reject) => {
    const query = `select userShowtime.insertedDate, userShowtime.id,
       movie.id as movieId, movie.title, movie.categories, movie.city, movie.imageUrl,
       showtime.place, showtime.showDate
    from users_showtimes as userShowtime
      left join movies as movie on movieId=movie.id
      left join showtimes as showtime on showtimeId=showtime.id
    where userId = ?;`
    connections.movies.query(query, [userId], (error, rows) => {
      if (error) return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      resolve({bookingMovies: rows.map(userShowtimesModel)})
    })
  })
}

module.exports = {usersShowtimesDb}
