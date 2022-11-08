const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creating a Post");
        return;
      }
      return res.redirect("back");
    }
  );
};

// module.exports.textPost = function (req, res) {
//   res.end("<h1>Text Post</h1>");
// };

// module.exports.imagePost = function (req, res) {
//   res.end("<h1>Image Post</h1>");
// };
