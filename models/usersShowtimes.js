const {commonInfo} = require("./commonInfo")
const {moviesModel} = require("./movies")
const {showtimesModel} = require("./showtimes")

const userShowtimesModel = ({id, insertedDate, ...others}) => ({
  ...commonInfo({id, insertedDate}),
  movie: moviesModel(others),
  showtime: showtimesModel(others)
})

module.exports = {userShowtimesModel}
