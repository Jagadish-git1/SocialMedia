import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ marginBottom: "1.5rem" }}
        >
          Welcome to Sociopedia, the social media for sociopaths
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
