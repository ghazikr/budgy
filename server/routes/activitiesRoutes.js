const passport = require("passport");
const ActivitiesManagement = require("../controllers/activities_management");
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
  app.post("/add_activity", requireAuth, ActivitiesManagement.addActivity);
  app.post("/activity", requireAuth, ActivitiesManagement.getActivitiesByUser);
  app.post(
    "/update_activity",
    requireAuth,
    ActivitiesManagement.updateActivity
  );
};
