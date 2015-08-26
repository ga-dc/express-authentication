var db = require("../config/db")
var Post = require("../models/post")(db)
module.exports = {
  index: function(req, res){
    Post.findAll().then(function(posts){
      res.render("posts/index",{posts: posts})
    }) 
  },
  create: function(req, res){
    Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(post){
      res.redirect("/posts") 
    })	  
  },
  destroy: function(req, res){
    Post.destroy({
      where: {
        id: req.params.id	     
      }
    }).then(function(){
      res.redirect("/posts")
    })
  }
}
