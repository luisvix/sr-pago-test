const mysql = require('mysql')

const {
  TOKEN_KEY,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  CLOUD_SQL_CONNECTION
} = process.env

const constants = {
  port:8080,
  tokensExpirationTime: (5 * 24 * 60 * 60 * 1000),  //days * hours * minutes * seconds * milliseconds
  tokenSecurityKey: TOKEN_KEY
}

const strings = {
  authorizationFailed: 'Hubo un error al autenticar su identidad, intente mas tarde o contacte con soporte.',
  tokenExpiredError: 'Your token has expired.',
  noBearerHeader: 'No Authorization header is present',
  noToken: 'No token value is present',
  noValidToken: 'No is a valid token',
  mysqlFailed: 'No pudimos establecer comunicación con la base de datos, intente mas tarde o contacte con soporte.',
  duplicatedUser: 'Usuario registrado anteriormente, prueba iniciando sesión.',
  loginFailed: 'Usuario o contraseña incorrectos.',
  movieNotFound: 'La película que seleccionaste no existe.',
  differentUser: 'El usuario al que intestas agregar la película es diferente de tu usuario actual, favor de verificar.',
}

const connections = {
  movies: mysql.createPool({
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    socketPath: CLOUD_SQL_CONNECTION ?  `/cloudsql/${CLOUD_SQL_CONNECTION}` : undefined,
  })
}

module.exports = {constants, strings, connections}
