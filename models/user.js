var Sequelize = require("sequelize")
module.exports = function(db){
  return db.define("user",{
    username: Sequelize.STRING,
    password: Sequelize.STRING
  })
}
