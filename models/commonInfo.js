const {utils} = require("../utils");

const commonInfo = ({id, insertedDate})=>({
  id,
  insertedDate: utils.mysqlDateToJsonResponse(insertedDate)
})

module.exports = {commonInfo}
