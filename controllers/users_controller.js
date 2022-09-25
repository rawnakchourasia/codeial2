module.exports.profile = function (req, res) {
  //   res.end("<h1>User Profile</h1>");
  res.render("users", {
    title: "profile",
  });
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
