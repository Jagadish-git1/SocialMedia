const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    });

    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(err.message || `Please provide all the fields`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all the fields" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "No user with that email" });
  }
  console.log(await bcrypt.compare(password, user.password));

  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user.password;
  res.status(StatusCodes.OK).json({ token, user });
};

module.exports = { register, login };
