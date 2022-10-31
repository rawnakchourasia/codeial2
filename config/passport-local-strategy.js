const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    function (email, password, done) {
      // Find a user and Establish the Identity
      User.findOne({ email: email }, function (err, user) {
        // If there is an Error
        if (err) {
          console.log("Error in Finding User -> Passport");
          return done(err);
        }

        // If user is not found or user's password does not match
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        // If user is found
        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which key is to be kept in the Cookies
passport.serializeUser(function (user, done) {
  // We pass the id of user to be stored in cookie
  done(null, user.id);
});

// De-Serializing the user from the key in the Cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    // If there is an error finding user using id in db
    if (err) {
      console.log("Error in Finding user using ID from Cookie -> Passport");
      return done(err);
    }

    // If user is found using id in db
    return done(null, user);
  });
});

module.exports = passport;
