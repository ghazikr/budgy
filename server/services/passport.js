const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStartegy = require("passport-local");
const User = mongoose.model("user");

// jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret
};
const JwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(JwtLogin);

//local startegy
const localLogin = new LocalStartegy({ usernameField: "email" }, function(
  email,
  password,
  done
) {
  User.findOne({ email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

passport.use(localLogin);
