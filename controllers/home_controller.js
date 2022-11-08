const Post = require("../models/post");

module.exports.home = function (req, res) {
  //   return res.end("<h1>Express is up for Codeial!</h1>");
  // console.log(req.cookies);
  // res.cookie("user_id", 45);

  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codeial | Home",
  //     posts: posts,
  //   });
  // });

  // Populate the user of each post
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    });
};

module.exports.settings = function (req, res) {
  return res.end("<h1>Codeial Settings!</h1>");
};
