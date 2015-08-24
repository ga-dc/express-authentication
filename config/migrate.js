var db = require("./db")
var Post = require("../models/post")(db)
Post.sync({force: true}).then(process.exit)