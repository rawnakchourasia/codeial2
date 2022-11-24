const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "Post Published!");
    return res.redirect("back");
  } catch (error) {
    // console.log("Error", error);
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    console.log("1");
    if (String(post.user).valueOf() === String(req.user.id).valueOf()) {
      post.remove();
      console.log("2");

      await Comment.deleteMany({ post: req.params.id }, function (err) {
        req.flash("success", "Post and associated comments deleted!");
        return res.redirect("back");
      });
    } else {
      req.flash("error", "You cannot delete this post!");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
