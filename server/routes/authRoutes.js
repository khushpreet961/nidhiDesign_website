const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const JWT_SECRET =
  "nidhi_design_secret_key";

router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const admin =
      await Admin.findOne({
        email,
      });

    console.log("ADMIN:", admin);

    if (!admin) {

      return res.status(404).json({
        message:
          "Admin not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    console.log(
      "PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Wrong Password",
      });

    }

    const token = jwt.sign(
      {
        adminId: admin._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      message:
        "Login Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }
  router.get(
  "/verify",
  authMiddleware,
  async (req, res) => {

    res.status(200).json({
      success: true,
      message:
        "Authorized",
    });

  }
);

});

module.exports = router;