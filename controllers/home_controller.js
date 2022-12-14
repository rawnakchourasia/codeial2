const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    // Populate the user of each post
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.settings = function (req, res) {
  return res.end("<h1>Codeial Settings!</h1>");
};
