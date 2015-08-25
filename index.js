var express = require("express")
var app = express()
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
app.use(methodOverride('_method'))
app.use(bodyParser({urlencode: true}))
app.set("view engine","hbs")
var postsController = require("./controllers/postsController")

app.get("/posts", postsController.index)
app.delete("/posts/:id", postsController.destroy)
app.post("/posts", postsController.create)
/*
app.get("/posts/new", postsController.new)
app.get("/posts/:id", postsController.show)
*/

app.listen(3001, function(){
  console.log("listening on port 3000")
})