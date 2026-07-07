require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const advisoryRoutes = require("./routes/advisoryRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/otp", require("./routes/otpRoutes"));

const mongoURI =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/agroguide";

console.log("Connecting to MongoDB...");

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.log(
      "Failed to connect to primary MongoDB. Attempting local fallback...",
      err.message
    );

    const fallbackURI = "mongodb://127.0.0.1:27017/agroguide";

    if (mongoURI !== fallbackURI) {
      mongoose
        .connect(fallbackURI)
        .then(() => console.log("MongoDB Connected to Local Fallback"))
        .catch((fallbackErr) => {
          console.error(
            "Local MongoDB fallback connection failed:",
            fallbackErr.message
          );
        });
    }
  });

app.get("/", (req, res) => {
  res.send("AgroGuide API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/question", questionRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});