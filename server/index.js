const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const http = require("http");
const moragn = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/User");
require("./models/Activity");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

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
require("./routes/authRoutes")(app);
require("./routes/activitiesRoutes")(app);
const port = process.env.PORT || 5000;
const server = http.createServer(app);
app.listen(port);
console.log("listening ....");
