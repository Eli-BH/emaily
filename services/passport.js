const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
}); //puts id into a cookie

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
}); //pull id out of cookie to use

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we already have a record of the id
          done(null, existingUser);
        } else {
          // we don't have a record
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user)); //makes new user
        }
      });
    } //heres where we can identify and save users to our DB
  )
);
