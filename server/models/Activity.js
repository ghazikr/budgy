const mongoose = require("mongoose");
const { Schema } = mongoose;
const activitySchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  amount: Number,
  date: Date,
  activityType: String,
  user_id: { type: Schema.Types.ObjectId, ref: "users" }
});

const model = mongoose.model("activity", activitySchema);
exports.model = model;
