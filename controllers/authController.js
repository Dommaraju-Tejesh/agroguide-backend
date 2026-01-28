const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, phone, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        phone,
        password: hashed
    });

    res.json(user);
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, user });
};
