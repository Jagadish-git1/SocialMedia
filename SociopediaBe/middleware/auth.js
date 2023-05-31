const { StatusCodes } = require("http-status-codes");
const Jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Please provide a valid token" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  const verified = Jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
};

module.exports = verifyJwt;
