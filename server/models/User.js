const mongoose = require("mongoose");
const { Schema } = mongoose;
const Activity = mongoose.model("activity").schema;
const Category = mongoose.model("category").schema;
const bcrypt = require("bcrypt-nodejs");

//on save hook, encrypt password
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  balance: { type: Number, default: 0 },
  activities: [Activity],
  categories: [Category]
});

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

mongoose.model("user", userSchema);
