const {utils} = require("../utils")
const {commonInfo} = require("./commonInfo")

const showtimesModel = ({place, showDate, ...others})=>({
  ...commonInfo(others),
  place,
  showDate: utils.mysqlDateToJsonResponse(showDate)
})

module.exports = {showtimesModel}
