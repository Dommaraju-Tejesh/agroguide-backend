const AdvisoryRule = require("../models/AdvisoryRule");
const AdvisoryHistory = require("../models/AdvisoryHistory");

// Admin adds rule
exports.addRule = async (req, res) => {
  const rule = await AdvisoryRule.create(req.body);
  res.json(rule);
};

// Farmer gets advice
exports.getAdvice = async (req, res) => {
  const { crop, soil, stage, farmerId } = req.body;

  const rule = await AdvisoryRule.findOne({
    crop: new RegExp(`^${crop.trim()}$`, "i"),
    soil: new RegExp(`^${soil.trim()}$`, "i"),
    stage: new RegExp(`^${stage.trim()}$`, "i"),
  });

  if (!rule) {
    return res.json({ message: "No advice found" });
  }

  await AdvisoryHistory.create({
    farmerId,
    crop,
    soil,
    stage,
    advice: rule.advice,
  });

  res.json(rule);
};

