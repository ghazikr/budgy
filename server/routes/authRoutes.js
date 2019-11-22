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
};

// module.exports = app => {
//   app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

//   app.get("/auth/google/callback", passport.authenticate("google"));

//   app.get("/api/current_user", (req, res) => {
//     res.send(req.user);
//   });
//   app.get("/api/logout", (req, res) => {
//     req.logout();
//     res.send(req.user);
//   });
// };
