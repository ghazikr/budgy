const passport = require("passport");
const Categories = require("../controllers/categories");
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
  app.get("/user_categories", requireAuth, Categories.getCatgoriesByUser);
  app.post("/add_category", requireAuth, Categories.addCatgory);
  app.post("/remove_category", requireAuth, Categories.removeCatgory);
};
