const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "nidhi_design_secret_key";

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    const token =
      req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Access Denied",
      });

    }

    const verified =
      jwt.verify(
        token,
        JWT_SECRET
      );

    req.admin = verified;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message:
        "Invalid Token",
    });

  }

};

module.exports =
  authMiddleware;