const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const advisoryRoutes = require("./routes/advisoryRoutes");
const questionRoutes = require("./routes/questionRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("AgroGuide API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/question", questionRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server started");
});
