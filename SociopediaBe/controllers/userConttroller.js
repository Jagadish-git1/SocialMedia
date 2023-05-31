const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with id ${userId}` });
  }

  delete user.password;
  res.status(StatusCodes.OK).json(user);
};

const getUserFriends = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  const friends = await Promise.all(
    user.friends.map((id) => {
      User.findById(id);
    })
  );
  const newFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );
  res.status(StatusCodes.SUCCESS).json(newFriends);
};

const updateUser = async (req, res) => {
  const { id: userId, friendId } = req.params;
  console.log(userId, friendId);
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);
  if (!user || !friend) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Provide valid ids for user and friend` });
  }
  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }
  await user.save();
  await friend.save();
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  res.status(StatusCodes.OK).json({ friends: formattedFriends });
};

module.exports = {
  getUser,
  getUserFriends,
  updateUser,
};
