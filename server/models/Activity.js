const mongoose = require("mongoose");
const { Schema } = mongoose;
const Category = mongoose.model("category").schema;

const activitySchema = new Schema({
  name: String,
  category: Category,
  amount: Number,
  date: Date,
  activityType: String
});

mongoose.model("activity", activitySchema);
