const mongoose = require("mongoose");
const Activity = mongoose.model("activity");

exports.addActivity = function(req, res, next) {
  const { name, category, amount, date } = req.body;
  if (!name || !category || !amount || !date)
    return res.status(422).send({ error: "you must provide all details" });
  const activity = new Activity({
    name,
    amount,
    category,
    date,
    user_id: req.user._id
  });
  activity.save(err => {
    if (err) return next(err);
    res.json({ success: true });
  });
};

exports.getActivitiesByUser = function(req, res, next) {
  Activity.find({ user_id: req.user._id }, function(err, activities) {
    if (err) next(err);

    res.json(activities);
  });
};
