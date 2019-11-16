const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = function(req, res, next) {
  // user has already their email and password auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};
exports.signup = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(422)
      .send({ error: "you must provide email and password" });
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: "email in use" });
    const user = new User({
      email,
      password
    });
    user.save(err => {
      if (err) return next(err);
      res.json(tokenForUser(user));
    });
  });
};
