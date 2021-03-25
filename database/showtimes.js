const {showtimesModel} = require("../models/showtimes")
const {strings} = require("../constants")
const {utils} = require("../utils")
const {connections} = require("../constants")

const showtimesDb = {}

showtimesDb.list = ({movieId}) => {
  return new Promise((resolve, reject) => {
    let values = [], wheres = []
    if (movieId) {
      values = [...values, movieId]
      wheres = [...wheres, 'movieId=?']
    }
    const query = `select id, place, showDate from showtimes where ${wheres.join('and ')}`
    connections.movies.query(query, values, (error, rows) => {
      if (error) return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      resolve({showtimes: rows.map(showtimesModel)})
    })
  })
}

module.exports = {showtimesDb}
