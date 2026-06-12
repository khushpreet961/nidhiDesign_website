const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://nidhidesignss_db_user:2rNVqblKcpMJhym1@nidhi-design-cluster.kour2fn.mongodb.net/nidhidesign?retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

async function createAdmin() {

  try {

    // CHECK EXISTING ADMIN
    const existingAdmin =
      await Admin.findOne({
        email:
          "nidhidesignss@gmail.com",
      });

    if (existingAdmin) {

      console.log(
        "Admin already exists"
      );

      process.exit();

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        "Ankitjain@92",
        10
      );

    // CREATE ADMIN
    const admin = new Admin({
      email:
        "nidhidesignss@gmail.com",

      password:
        hashedPassword,
    });

    // SAVE TO DATABASE
    await admin.save();

    console.log(
      "Admin Saved Successfully"
    );

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }

}

createAdmin();