const mongoose = require("mongoose");
const Category = mongoose.model("category");
const User = mongoose.model("user");
const Activity = mongoose.model("activity");
const ObjectId = mongoose.Types.ObjectId;

exports.addActivity = function(req, res, next) {
  const { name, category, amount, date, activityType } = req.body;
  if (!name || !category || !amount || !date || !activityType)
    return res.status(422).send({ error: "you must provide all details" });
  const categoryObj = new Category({
    name: category
  });
  const activity = new Activity({
    name,
    amount,
    category: categoryObj,
    date,
    activityType
  });
  User.update(
    { _id: req.user._id },
    { $push: { activities: activity } },
    err => {
      if (err) return next(err);
      res.json({ success: true });
    }
  );
};
exports.getActivitiesByUser = function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);
    console.log(user);
    res.json({
      activities: user.activities,
      balance: user.balance
    });
  });
};

exports.addCategory = function(req, res, next) {
  const { name } = req.body;
  if (!name)
    return res.status(422).send({ error: "you must provide all details" });
  const category = new Category({
    name
  });
  category.save(err => {
    if (err) return next(err);
    res.json({ success: true });
  });
};
