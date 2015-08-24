var db = require("./db")
var Post = require("../models/post")(db)

Post.bulkCreate([
  {title: "My awesome post!", body:"This is the content"},
  {title: "My second awesome post!", body:"This is the second content"},
])