import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/${userId}`,
      config
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box margin="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box flexBasis={isNonMobileScreen ? "42%" : undefined}>
          <MyPostWidget picturePath={user.picturePath}></MyPostWidget>
          <PostsWidget userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
