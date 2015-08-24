var Sequelize = require('sequelize')
var db = new Sequelize("postgres:///auth_db")
module.exports = db
