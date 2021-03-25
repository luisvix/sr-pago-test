const jwt = require('jsonwebtoken')
const {utils} = require("./utils");
const {constants, strings} = require('./constants')

const tokens = {}

tokens.create = ({user}) => {
  return new Promise((resolve, reject) => {
    let payload = {
      user,
      expirationDate: new Date().getTime() + constants.tokensExpirationTime,
    }
    jwt.sign(payload, constants.tokenSecurityKey, {}, (error, token) => {
      if (error) return reject(error)
      return resolve({user, token})
    })
  })
}

const verify = (token, options) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, constants.tokenSecurityKey, options, (error, payload) => {
      if (error) return reject(error)
      return resolve(payload)
    })
  })
}

const extractToken = (req = {}) => {
  return new Promise((resolve, reject) => {
    if (!req?.headers?.authorization) return reject(utils.createError(strings.authorizationFailed, strings.noBearerHeader))

    const parts = req.headers.authorization.split(' ')
    if (!/^Bearer$/.test(parts[0]) || parts.length !== 2) return reject(utils.createError(strings.authorizationFailed, strings.noValidToken))
    if (!parts[1]) return reject(utils.createError(strings.authorizationFailed, strings.noToken))
    resolve(parts[1])
  })
}

tokens.validate = (req, res, next) => {
  extractToken(req).then(token => {
    return verify(token)
  }).then(payload => {
    if (payload.expirationDate < new Date().getTime()) return res.status(401).send(utils.createError(strings.authorizationFailed, strings.tokenExpiredError))
    req.user = payload.user
    console.log(`${new Date()}_${req.user.username}_${req.method}_${req.originalUrl}`)
    next()
  }).catch(error => {
    console.log(error)
    return res.status(401).send(error)
  })
}

module.exports = {tokens}
