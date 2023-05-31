const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Not authorized to access this route" });
  }
  const post = await Post.create({
    description,
    userPicturePath: user.picturePath,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    picturePath,
    userId,
    likes: {},
    comments: [],
  });

  const posts = await Post.find({});
  res.status(StatusCodes.CREATED).json(posts);
};

const getFeedPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(StatusCodes.OK).json(posts);
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId });
  res.status(StatusCodes.OK).json({ posts });
};

const likePost = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const { userId } = req.body;
  const post = await Post.findById(id);
  const isLiked = post.likes.get(userId);
  if (!isLiked) {
    post.likes.set(userId, true);
  } else {
    post.likes.delete(userId);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedPost);
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
};
