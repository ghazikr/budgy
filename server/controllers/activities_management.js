const mongoose = require("mongoose");
const Activity = mongoose.model("activity");

exports.addActivity = function(req, res, next) {
  const { name, category, amount, date, activityType } = req.body;
  if (!name || !category || !amount || !date || !activityType)
    return res.status(422).send({ error: "you must provide all details" });
  const activity = new Activity({
    name,
    amount,
    category,
    date,
    activityType,
    user_id: req.user._id
  });
  activity.save(err => {
    if (err) return next(err);
    res.json({ success: true });
  });
};
const ObjectId = mongoose.Types.ObjectId;
exports.getActivitiesByUser = function(req, res, next) {
  Activity.aggregate(
    [
      {
        $project: {
          name: 1,
          date: 1,
          category: 1,
          user_id: 1,
          activityType: 1,
          amount: 1,
          month: { $month: "$date" }
        }
      },
      {
        $match: {
          $and: [
            { month: new Date(req.body.currentDate).getMonth() + 1 },
            { user_id: ObjectId("5dcc94ce313c0a3cc07082cd") }
          ]
          // user_id: ObjectId(req.user._id)
          // month: new Date(req.body.currentDate).getMonth() + 1
          // activityType: "expense"
          // year: new Date(req.body.currentDate).getFullYear(),
        }
      }
    ],
    function(err, activities) {
      if (err) next(err);
      res.json(activities);
    }
  );
  // Activity.find({ user_id: req.user._id }, function(err, activities) {
  //   if (err) next(err);

  //   res.json(activities);
  // });
};
