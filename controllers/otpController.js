const User = require("../models/User");
const transporter = require("../config/mailer");

// Store OTPs temporarily in memory
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ---------------- SEND OTP ----------------

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const otp = generateOTP();

    // Store OTP for 5 minutes
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: {
        name: "AgroGuide",
        address: "d.tejeshraju67@gmail.com",
      },
      to: email,
      subject: "AgroGuide OTP Verification",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>🌿 AgroGuide</h2>

          <p>Your OTP is:</p>

          <h1 style="letter-spacing:5px;color:#198754;">
            ${otp}
          </h1>

          <p>This OTP is valid for <b>5 minutes</b>.</p>

          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    res.json({
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

// ---------------- VERIFY OTP ----------------

exports.verifyOTP = async (req, res) => {
  try {
    const { name, email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const data = otpStore.get(email);

    if (!data) {
      return res.status(400).json({
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (Date.now() > data.expiresAt) {
      otpStore.delete(email);

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (data.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // OTP verified
    otpStore.delete(email);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Farmer",
        email,
        password: "otp-login",
      });
    }

    res.json({
      message: "OTP verified successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Verification failed",
    });
  }
};
