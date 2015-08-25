var bcrypt = require("bcrypt-nodejs")
one = bcrypt.hashSync("what")
two = bcrypt.compareSync("what", one)
console.log(two)