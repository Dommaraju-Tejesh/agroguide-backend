const twilio = require("twilio");
const User = require("../models/User");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { name, phone, otp } = req.body;

    const check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: otp,
      });

    if (check.status !== "approved") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Create user here if not exists
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        name,
        phone,
        password: "otp-login", // dummy
      });
    }

    res.json({ message: "OTP verified & user created", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};