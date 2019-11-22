const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: String,
  iconName: String,
  type: String
});

mongoose.model("category", categorySchema);
