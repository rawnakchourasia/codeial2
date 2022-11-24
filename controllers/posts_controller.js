const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return;
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
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
