const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/auth");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/postsController");

router.get("/", verifyJwt, getFeedPosts);
router.get("/:userId/posts", verifyJwt, getUserPosts);
router.patch("/:id/like", verifyJwt, likePost);

module.exports = router;
