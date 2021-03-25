const {userModel} = require("../models/users")
const {strings} = require("../constants")
const {utils} = require("../utils")
const {connections} = require("../constants")
const usersDb ={}

usersDb.create = ({username, password, fullName})=>{
  return new Promise((resolve, reject) => {
    const query = `insert into srPago.users(username, password, fullName) VALUE (?,?,?)`
    connections.movies.query(query, [username, utils.hashValue(password), fullName], (error, status)=>{
      if (error){
        if ((error?.sqlMessage||'').includes('Duplicate entry')) return  reject(utils.createError(strings.duplicatedUser))
        return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      }
      resolve({id:status.insertId})
    })
  })
}

usersDb.login=({username='', password=''})=>{
  return new Promise((resolve, reject) => {
    const query = `select id, username, insertedDate from srPago.users where username=? and password=?`
    connections.movies.query(query, [username, utils.hashValue(password)], (error, rows)=>{
      if (error) return reject(utils.createError(strings?.mysqlFailed, error?.sqlMessage))
      if((rows?.length || 0)<1) return reject(utils.createError(strings.loginFailed))
      resolve({user:userModel(rows[0])})
    })
  })
}

module.exports = {usersDb}
