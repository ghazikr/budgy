const mongoose = require("mongoose");
const Category = mongoose.model("category");
const User = mongoose.model("user");
const Activity = mongoose.model("activity");

exports.addActivity = function(req, res, next) {
  const { name, category, amount, date, activityType } = req.body;
  if (!name || !category || !amount || !date || !activityType)
    return res.status(422).send({ error: "you must provide all details" });
  const categoryObj = new Category({
    name,
    iconName: category
    // type: activityType
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
    const { currentDate } = req.body;
    const currentMonth = new Date(currentDate).getMonth();
    const currentYear = new Date(currentDate).getFullYear();
    const activities = user.activities.filter(
      activity =>
        new Date(activity.date).getMonth() === currentMonth &&
        new Date(activity.date).getFullYear() === currentYear
    );
    res.json({
      activities: activities,
      balance: user.balance
    });
  });
};

exports.updateActivity = function(req, res, next) {
  const { name, category, amount, date, activityType, _id } = req.body;
  if (!name || !category || !amount || !date || !activityType || !_id)
    return res.status(422).send({ error: "you must provide all details" });
  User.findOneAndUpdate(
    { _id: req.user._id, "activities._id": req.body._id },
    {
      $set: {
        "activities.$.name": name,
        "activities.$.amount": amount,
        "activities.$.date": date,
        "activities.$.activityType": activityType
        // "activities.$.category": name
      }
    },
    err => {
      if (err) return next(err);
      res.json({ success: true });
    }
  );
};
