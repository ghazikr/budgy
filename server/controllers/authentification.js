const mongoose = require("mongoose");
const User = mongoose.model("user");
const Category = mongoose.model("category");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const BASIC_CATEGORIES = require("../basic_categories");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = function(req, res, next) {
  // user has already their email and password auth'd
  // we just need to give them a token
  res.send({
    token: tokenForUser(req.user)
  });
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
    const categories = BASIC_CATEGORIES.map(
      ({ name, iconName, type }) => new Category({ name, iconName, type })
    );

    const user = new User({
      email,
      password,
      categories
    });
    user.save(err => {
      if (err) return next(err);
      res.json({ token: tokenForUser(user), userCategories: categories });
    });
  });
};
