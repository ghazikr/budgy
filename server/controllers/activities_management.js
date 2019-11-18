const mongoose = require("mongoose");
const Activity = mongoose.model("activity");
const Category = mongoose.model("category");
const AuditTask = require("../models/Activity");

exports.addActivity = function(req, res, next) {
  const { name, category, amount, date, activityType } = req.body;
  if (!name || !category || !amount || !date || !activityType)
    return res.status(422).send({ error: "you must provide all details" });
  const activity = new Activity({
    name,
    amount,
    category: ObjectId("5dd1edfa11df6a38e0994be3"),
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
  console.log("***********", req.body);
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
          month: new Date(req.body.currentDate).getMonth() + 1,
          user_id: ObjectId(req.user._id)
        }
      },
      {
        $lookup: {
          from: "categories", // orifinal collection
          localField: "category", // id in activity
          foreignField: "_id",
          as: "activityCategory"
        }
      },
      {
        $unwind: "$activityCategory"
      }
    ],
    function(err, activities) {
      if (err) next(err);
      res.json(activities);
    }
  );
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
