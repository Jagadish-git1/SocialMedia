import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box widht={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="user"
        width={size}
        height={size}
        src={`http://localhost:5000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
