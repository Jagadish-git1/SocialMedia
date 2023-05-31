import { Box, useMediaQuery } from "@mui/material";
import UserImage from "components/UserImage";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>
        <Box flexBasis={isNonMobileScreen ? "42%" : undefined}>
          <MyPostWidget picturePath={picturePath}></MyPostWidget>
          <Box margin="2rem 0" />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box margin="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
