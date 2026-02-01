const twilio = require("twilio");
const User = require("../models/User");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ Use ONE correct env name everywhere
const SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // ✅ Ensure E.164 format (+91...)
    const to = phone.startsWith("+") ? phone : `+91${phone}`;

    console.log("SEND OTP TO 👉", to);

    await client.verify.v2
      .services(SERVICE_SID)
      .verifications.create({
        to,
        channel: "sms",
      });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.log("SEND OTP ERROR 👉", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { name, phone, otp } = req.body;

    // ✅ Same formatting rule
    const to = phone.startsWith("+") ? phone : `+91${phone}`;

    console.log("VERIFY OTP FOR 👉", to);

    const check = await client.verify.v2
      .services(SERVICE_SID)
      .verificationChecks.create({
        to,
        code: otp,
      });

    if (check.status !== "approved") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

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
    console.log("VERIFY OTP ERROR 👉", err.message);
    res.status(500).json({ error: err.message });
  }
};
