const router = require("express").Router();
const {
  addRule,
  getAdvice,
  getHistory,
} = require("../controllers/advisoryController");

router.post("/add", addRule);
router.post("/get", getAdvice);
router.get("/history/:id", getHistory);

module.exports = router;
