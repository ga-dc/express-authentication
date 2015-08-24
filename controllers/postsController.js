var db = require("../config/db")
var Post = require("../models/post")(db)
module.exports = {
  index: function(req, res){
    Post.findAll().then(function(posts){
      res.render("posts/index",{posts: posts})
    }) 
  }
}
