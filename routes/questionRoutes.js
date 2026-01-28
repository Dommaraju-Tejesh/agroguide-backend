const router = require("express").Router();
const {
    askQuestion,
    replyQuestion,
    getFarmerQuestions
} = require("../controllers/questionController");

router.post("/ask", askQuestion);
router.post("/reply", replyQuestion);
router.get("/farmer/:farmerId", getFarmerQuestions);

module.exports = router;
