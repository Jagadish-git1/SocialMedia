import WidgetWrapper from "components/WidgetWrapper";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        alt="advert"
        width="100%"
        height="auto"
        src="http://localhost:5000/assets/lospollos.jpg"
      />
      <FlexBetween>
        <Typography color={main}>Los Pollos</Typography>
        <Typography color={medium}>lospolloshermanos.com</Typography>
      </FlexBetween>
      <Typography color={medium} margin="0.5rem 0">
        Your go to location for divine fried chicken.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
