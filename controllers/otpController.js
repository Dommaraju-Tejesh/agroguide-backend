const User = require("../models/User");

// In-memory OTP store (temporary)
const otpStore = {};

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const to = phone.startsWith("+") ? phone : `+91${phone}`;

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store OTP
    otpStore[to] = otp;

    console.log("🟢 OTP for", to, "is 👉", otp);

    res.json({ message: "OTP generated (check server logs)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { name, phone, otp } = req.body;

    const to = phone.startsWith("+") ? phone : `+91${phone}`;

    // check OTP
    if (otpStore[to] !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otpStore[to]; // remove after use

    let user = await User.findOne({ phone: to });

    if (!user) {
      user = await User.create({
        name,
        phone: to,
        password: "otp-login",
      });
    }

    res.json({ message: "OTP verified & user created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
