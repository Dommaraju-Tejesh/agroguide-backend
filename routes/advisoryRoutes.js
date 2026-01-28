const router = require("express").Router();
const { addRule, getAdvice } = require("../controllers/advisoryController");

router.post("/add", addRule);
router.post("/get", getAdvice);

module.exports = router;
