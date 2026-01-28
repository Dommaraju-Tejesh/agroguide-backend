const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,   // ❌ remove unique from here
    password: String,
    role: { type: String, default: "farmer" }
});

userSchema.index({ phone: 1 }, { unique: true }); // ✅ correct way

module.exports = mongoose.model("User", userSchema);
