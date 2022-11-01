const User = require("../models/user");

module.exports.profile = function (req, res) {
  //   res.end("<h1>User Profile</h1>");
  res.render("user_profile", {
    title: "profile",
  });
};

module.exports.profilePic = function (req, res) {
  res.end("<h1>User Profile Pic!</h1>");
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  res.render("user_sign_in", {
    title: "Sign In",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// get the sign Up data
module.exports.create = function (req, res) {
  // console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  // This checks for that user in the DB
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(`Error in creating user ${req.body.name} while signing up`);
      return;
    }

    // If that user is not found in the DB then proceed with creating that user in DB
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log(
            `Error in creating user ${req.body.name} while signing up`
          );
          return;
        }

        return res.redirect("../users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// sign out user
module.exports.destroySession = function (req, res) {
  req.logout(function (err, user) {
    if (err) {
      console.log(`Error in signing out user - ${req.body.name} `);
      return;
    }
  });
  return res.redirect("/");
};
