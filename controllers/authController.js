const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const existing = await User.findOne({ phone });
        if (existing) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            phone,
            password: hashed
        });

        res.json(user);
    } catch (err) {
    console.log("REGISTER ERROR 👉", err);   // ⭐ add this
    res.status(500).json({ message: err.message });
}

};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
