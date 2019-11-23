const passport = require("passport");
const Authentification = require("../controllers/authentification");
const passportService = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send(req.user);
  });
  app.post("/signup", Authentification.signup);
  app.post("/signin", requireSignIn, Authentification.signin);
  app.get("/user_categories", requireAuth, Authentification.getCatgoriesByUser);
  app.post("/add_category", requireAuth, Authentification.addCatgory);
};
