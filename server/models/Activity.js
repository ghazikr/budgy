const mongoose = require("mongoose");
const { Schema } = mongoose;
const activitySchema = new Schema({
  name: String,
  category: String,
  amount: Number,
  date: Date,
  activityType: String,
  user_id: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("activity", activitySchema);
