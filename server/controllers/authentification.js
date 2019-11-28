const mongoose = require("mongoose");
const User = mongoose.model("user");
const Category = mongoose.model("category");
const jwt = require("jwt-simple");
const keys = require("../config/keys");

const BASIC_CATEGORIES = [
  { name: "food", iconName: "fastfood", type: "expenses" },
  { name: "phone", iconName: "local_phone", type: "expenses" },
  { name: "bills", iconName: "receipt", type: "expenses" },
  { name: "transportation", iconName: "commute", type: "expenses" },
  { name: "home", iconName: "home_work", type: "expenses" },
  { name: "entertainment", iconName: "sports_esports", type: "expenses" },
  { name: "telephone", iconName: "phone", type: "expenses" },
  { name: "sport", iconName: "fitness_center", type: "expenses" },
  { name: "travel", iconName: "flight_takeoff", type: "expenses" },
  { name: "smoking", iconName: "smoking_rooms", type: "expenses" },
  { name: "salary", iconName: "account_balance_account", type: "income" },
  { name: "dividends", iconName: "trending_up", type: "income" },
  { name: "monetization_on_icon", iconName: "lottery", type: "income" },
  { name: "others", iconName: "category", type: "income" }
];

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

exports.getCatgoriesByUser = function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);
    res.json({
      userCategories: req.user.categories
    });
  });
};
exports.addCatgory = function(req, res, next) {
  const { name, iconName, type } = req.body;
  if (!name || !iconName || !type)
    return res.status(422).send({ error: "you must provide all details" });
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);
    const isCategoryExists = user.categories.find(
      category => category.name === name
    );

    if (isCategoryExists) {
      return res.status(422).send({ error: "Category in use" });
    }
    const newCategory = new Category({ name, iconName, type });
    User.update(
      { _id: req.user._id },
      { $push: { categories: newCategory } },
      err => {
        if (err) return next(err);
        res.json({ success: true });
      }
    );
  });
};

exports.removeCatgory = function(req, res, next) {
  const { name } = req.body;
  if (!name)
    return res.status(422).send({ error: "you must provide all details" });
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);
    const isCategoryExists = user.categories.find(
      category => category.name === name
    );

    if (!isCategoryExists) {
      return res.status(422).send({ error: "Category does not exist" });
    }
    User.update(
      { _id: req.user._id },
      { $pull: { categories: { name: name } } },
      { safe: true },
      err => {
        if (err) return next(err);
        res.json({ success: true });
      }
    );
  });
};
