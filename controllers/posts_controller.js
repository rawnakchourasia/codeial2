const Post = require("../models/post");
const Comment = require("../models/comment");

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

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // .id means converting the object id into string
    console.log("1");
    if (String(post.user).valueOf() === String(req.user.id).valueOf()) {
      post.remove();
      console.log("2");

      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// module.exports.textPost = function (req, res) {
//   res.end("<h1>Text Post</h1>");
// };

// module.exports.imagePost = function (req, res) {
//   res.end("<h1>Image Post</h1>");
// };
