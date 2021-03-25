const crypto = require('crypto')

const utils = {
  createError: (message = 'Unexpected error', error = 'Default error') => ({message, error}),
  hashValue: (value) => crypto.createHash('sha512').update(value).digest('hex'),
  responseError: ({res, error}) => {
    console.error(error)
    res.status(500).send(error)
  },
  mysqlDateToJsonResponse: (date) => {
    if (!date) return undefined
    const completeNumericNoTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    return {
      milliseconds: date.getTime(),
      completeNumeric: `${completeNumericNoTime} ${time}`,
      completeNumericNoTime: `${completeNumericNoTime}`
    }
  }
}

module.exports = {utils}
