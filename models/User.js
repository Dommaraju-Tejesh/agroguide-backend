const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    role: { type: String, default: "farmer" }
});

module.exports = mongoose.model("User", userSchema);
