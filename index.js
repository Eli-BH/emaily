const express = require("express");
const mongoose = require("mongoose");
require("./models/User"); //must come before passport
require("./services/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //immdiately invokes the functiions on app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// get get info
// post send info
// put update all the properties of something
// delete delet something
//patch update one or two properties of something
// app.get("/", (req, res) => {
//   res.send({ bye: "m8" });
// });//look at the environment for an assigned port
//if not, set 5000
