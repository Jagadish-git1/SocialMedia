import { Box, useTheme, Typography, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/v1/users";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/${userId}`,
      config
    );
    setUser(response.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
    impressions,
    viewedProfile,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profileLocationOnOutlined/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      <Box padding="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <WorkOutlineOutlined fontSize="large" sx={{ color: { main } }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box padding="1rem 0">
        <FlexBetween marginBottom="0.5rem">
          <Typography color={medium}>Who's viewed you profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      <Box padding="1rem 0">
        <Typography
          fontSize="1rem"
          color={main}
          fontWeight="500"
          marginBottom="1rem"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontWeight="500">
                Social network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                linkedin
              </Typography>
              <Typography color={medium} fontWeight="500">
                Network platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
