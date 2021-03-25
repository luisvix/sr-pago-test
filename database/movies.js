const {moviesModel} = require("../models/movies")
const {strings} = require("../constants")
const {utils} = require("../utils")
const {connections} = require("../constants")

const moviesDb ={}

moviesDb.list = ({city, id})=>{
  return new Promise((resolve, reject) => {
    let values = [], wheres = []
    if(city){
      values = [...values, city]
      wheres = [...wheres, 'city=?']
    }
    if(id){
      values = [...values, id]
      wheres = [...wheres, 'id=?']
    }
    const query = `select * from movies where ${wheres.join('and ')}`
    connections.movies.query(query, values, (error, rows)=>{
      if (error) return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      if(id && rows.length<1) return reject(utils.createError(strings.movieNotFound))
      resolve({movies: rows.map(moviesModel)})
    })
  })
}

module.exports = {moviesDb}
