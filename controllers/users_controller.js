module.exports.profile = function (req, res) {
  //   res.end("<h1>User Profile</h1>");
  res.render("users", {
    title: "profile",
  });
};

module.exports.profilePic = function (req, res) {
  res.end("<h1>User Profile Pic!</h1>");
};
