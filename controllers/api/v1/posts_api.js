const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    console.log("1");
    //   if (String(post.user).valueOf() === String(req.user.id).valueOf()) {
    post.remove();
    console.log("2");

    await Comment.deleteMany({ post: req.params.id });

    // if (req.xhr) {
    //   return res.status(200).json({
    //     data: {
    //       post_id: req.params.id,
    //     },
    //     message: "Post Deleted",
    //   });
    // }
    // req.flash("success", "Post and associated comments deleted!");
    return res.json(200, {
      message: "Posts and associated Comments deleted successfully!",
    });
    //   } else {
    //     req.flash("error", "You cannot delete this post!");
    //     return res.redirect("back");
    //   }
  } catch (error) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
