const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user_profile", {
      title: "profile",
      profile_user: user,
    });
  });
  //   res.end("<h1>User Profile</h1>");
};

module.exports.update = async function (req, res) {
  console.log(req.user.id, req.params);
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("****Multer Error : ", err);
        }
        // console.log(req.file);

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            let filename0 = path.join(__dirname, "..", user.avatar);
            if (fs.existsSync(filename0)) {
              console.log("found");
              fs.unlinkSync(filename0);
            } else {
              console.log("not found");
            }
          }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
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
  req.flash("success", "Logged in successfully");
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
  req.flash("success", "You have Logged Out!");
  return res.redirect("/");
};
