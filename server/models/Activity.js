const mongoose = require("mongoose");
const { Schema } = mongoose;
const activitySchema = new Schema({
  name: String,
  category: String,
  amount: Number,
  date: Date,
  user_id: String
});

const ModelClass = mongoose.model("activity", activitySchema);
