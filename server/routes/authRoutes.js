const passport = require("passport");
const Authentification = require("../controllers/authentification");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send(req.user);
  });
  app.post("/signup", Authentification.signup);
  app.post("/signin", requireSignIn, Authentification.signin);
};
