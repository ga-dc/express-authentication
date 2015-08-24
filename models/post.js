var Sequelize = require("sequelize")
module.exports = function(db){
  return db.define("post",{
    title: Sequelize.STRING,
    body: Sequelize.TEXT
  })
}
