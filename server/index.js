const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const http = require("http");
const moragn = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
const path = require("path");
require("./models/Category");
require("./models/Activity");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(moragn("combined"));
app.use(bodyParser.json({ type: "*/*" }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

if (process.env.NODE_ENV === "production") {
  app.get("/", function(req, res) {
    res.render(path.resolve(__dirname, "../client/build/index.html"));
  });
}
require("./routes/authRoutes")(app);
require("./routes/activitiesRoutes")(app);
require("./routes/categoriesRoutes")(app);
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
app.listen(port);
console.log("listening ....");
