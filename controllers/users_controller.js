const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log("Error in diplaying profile");
      }
      if (user) {
        return res.render("users", {
          title: "profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
  //   res.end("<h1>User Profile</h1>");
};

module.exports.profilePic = function (req, res) {
  res.end("<h1>User Profile Pic!</h1>");
};

module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "Sign In",
  });
};

module.exports.signUp = function (req, res) {
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
        // In above 'user' is the document inside which fields exists in db
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
  // Steps to authenticate
  // Find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(`Error in finding user ${req.body.email} while signing in`);
    }

    // Handle User Found
    if (user) {
      // Handle password matching
      if (user.password != req.body.password) {
        console.log(`Passwords of ${req.body.email} do not match`);
        return res.redirect("back");
      }

      // Handling Session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // Handle user not found
      console.log(`Email ${req.body.email} not found`);
      return res.redirect("back");
    }
  });
};

// sign out and end the session for the user
module.exports.endSession = function (req, res) {
  if (req.cookies.user_id) {
    res.cookie("user_id", "");
    return res.redirect("back");
  }
};
