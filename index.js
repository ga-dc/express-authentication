var express = require("express")
var app = express()
app.set("view engine","hbs")
var postsController = require("./controllers/postsController")

app.get("/posts", postsController.index)
/*
app.post("/posts", postsController.create)
app.get("/posts/new", postsController.new)
app.get("/posts/:id", postsController.show)
app.delete("/posts/:id", postsController.destroy)
*/

app.listen(3000, function(){
  console.log("listening on port 3000")
})