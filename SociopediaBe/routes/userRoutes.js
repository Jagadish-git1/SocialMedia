const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/auth");
const {
  getUser,
  updateUser,
  getUserFriends,
} = require("../controllers/userConttroller");

router.get("/:id", verifyJwt, getUser);
router.get("/:id/friends", verifyJwt, getUserFriends);

router.patch("/:id/:friendId", verifyJwt, updateUser);

module.exports = router;
