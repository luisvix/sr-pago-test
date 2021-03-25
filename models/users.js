const {commonInfo} = require("./commonInfo")

const userModel = ({username, fullName, ...others})=>({
  ...commonInfo(others),
  username,
  fullName
})

module.exports = {userModel}
