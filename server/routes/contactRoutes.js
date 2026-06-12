const express = require("express");

const router = express.Router();

const Contact = require("../models/Contact");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Contact API Working");
});

// SAVE CONTACT
router.post("/", async (req, res) => {

  try {

    const newContact = new Contact(req.body);

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;