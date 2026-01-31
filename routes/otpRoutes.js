const router = require("express").Router();
const { sendOTP, verifyOTP } = require("../controllers/otpController");

// keep simple paths
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
