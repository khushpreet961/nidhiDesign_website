const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://nidhi-design-website.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// ROUTES
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://nidhidesignss_db_user:2rNVqblKcpMJhym1@nidhi-design-cluster.kour2fn.mongodb.net/nidhidesign?retryWrites=true&w=majority",
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

// SERVER
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});