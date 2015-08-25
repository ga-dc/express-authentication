var express = require("express")
var app = express()
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var bcrypt = require("bcrypt-nodejs")
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(bodyParser({urlencode: true}))
app.set("view engine","hbs")
var postsController = require("./controllers/postsController")
var passport = require("passport")
var Strategy = require("passport-local").Strategy
var db = require("./config/db")
var User = require("./models/user")(db)
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(function(username, pass, cb){
  var hashedPass = bcrypt.hashSync(pass)
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if (err) { console.log("there"); return cb(err); }
    if (!user) { 
    return cb(null, false); }
    if (!bcrypt.compareSync(pass, user.password)){ 
      return cb(null, false); }
    console.log("i made it this far")
    return cb(null, user);
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.find({ where: {id: id}}).then(function (err, user) {
    if (err) { return cb(err); }
    cb(null, user.id);
  });
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.


app.get("/posts", postsController.index)
app.delete("/posts/:id", postsController.destroy)
app.post("/posts", postsController.create)

app.get("/signin", function(req, res){
  res.render("auth/signin")
})
app.get("/signup", function(req, res){
  res.render("auth/signup")
})

app.post("/signin", passport.authenticate('local', { 
  failureRedirect: '/signin',
  successRedirect: '/posts'
}))

app.post("/signup", function(req, res){
  User.findOne({
    where: {
     username: req.body.username
    }
  }).then(function(user){
    if(!user){
      User.create({
        username: req.body.username,
	password: bcrypt.hashSync(req.body.password)
      }).then(function(user){
        res.redirect("/posts")
      })
    } else {
      res.send("user exists")
    }
  })
})

app.listen(3001, function(){
  console.log("listening on port 3000")
})