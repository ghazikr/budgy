const mongoose = require("mongoose");
const User = mongoose.model("user");
const Category = mongoose.model("category");

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
