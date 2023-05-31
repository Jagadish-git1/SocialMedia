import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const URL = "http://localhost:5000/api/v1";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  occupation: "",
  picture: "",
};

const initialLoginValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isRegister = pageType === "register";
  const isLogin = pageType === "login";

  const login = async (values, onSubmitProps) => {
    const loggedInUser = await axios.post(`${URL}/auth/login`, {
      email: values.email,
      password: values.password,
    });
    onSubmitProps.resetForm();
    if (loggedInUser) {
      dispatch(
        setLogin({
          user: loggedInUser.data.user,
          token: loggedInUser.data.token,
        })
      );
      navigate("/home");
    }
  };
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUser = await axios.post(`${URL}/auth/register`, formData);
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    else await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
            width="100%"
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="firstName"
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="lastName"
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="location"
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="occupation"
                  value={values.occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  padding="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        padding="1rem"
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.light}`}
                        sx={{
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon></EditOutlinedIcon>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>
          <Box width="100%">
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "2rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              width="fit-content"
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up!"
                : "Already have an account? Login here!"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
