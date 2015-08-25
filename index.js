var express = require("express")
var app = express()
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var env = require("./env")
var session = require("express-session")
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(session({
  secret: "ninja please"
}))
app.use(bodyParser({urlencode: true}))
app.set("view engine","hbs")
var postsController = require("./controllers/postsController")
var passport = require("passport")
var TwitterStrategy = require("passport-twitter").Strategy
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize())
app.use(passport.session())

passport.use(new TwitterStrategy({
  consumerKey: env.consumerKey,
  consumerSecret: env.consumerSecret,
  callbackUrl: env.callbackUrl
}, function(aToken, aTokenSecret, aProfile, done){
  token = aToken
  tokenSecret = aTokenSecret
  profile = aProfile
  done(null, profile)
}))

app.get("/auth/twitter", passport.authenticate('twitter'), function(req, res){ })
app.get("/auth/twitter/callback", passport.authenticate('twitter'), function(req, res){ 
 req.session.token = token
 req.session.tokenSecret = tokenSecret
 req.session.profile = profile
 res.redirect("/posts")
})

app.get("/signout", function(req, res){
  req.session.destroy()
  res.redirect("/posts")
})

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