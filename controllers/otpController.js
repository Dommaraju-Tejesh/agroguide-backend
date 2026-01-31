const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: `+91${phone}`, channel: "sms" });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (check.status === "approved") {
      res.json({ message: "OTP verified" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
