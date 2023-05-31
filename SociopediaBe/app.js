const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("express-async-errors");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const { fileURLToPath } = require("url");
const multer = require("multer");
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postsRoutes");
const { createPost } = require("./controllers/postsController");
const { register } = require("./controllers/authController");
const verifyJwt = require("./middleware/auth");
const User = require("./models/User");
const Post = require("./models/Post");
const { users, posts } = require("./data/index");

// Configurations
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files uploads
app.post("/api/v1/auth/register", upload.single("picture"), register);
app.post(
  "/api/v1/users/posts",
  verifyJwt,
  upload.single("picture"),
  createPost
);

// App routes setup
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// app start setup

const PORT = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`server listening on ${PORT}...`));
    // User.insertMany(users);
    // Post.insertMany(posts);
  } catch (err) {
    console.log(err);
  }
};

start();
