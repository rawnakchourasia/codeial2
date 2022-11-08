const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts_controller");

router.post("/create", passport.checkAuthentication, postsController.create);

// router.get("/text", postsController.textPost);
// router.get("/image", postsController.imagePost);

module.exports = router;
