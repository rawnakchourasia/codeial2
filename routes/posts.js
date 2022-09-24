const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts_controller");

router.get("/text", postsController.textPost);
router.get("/image", postsController.imagePost);

module.exports = router;