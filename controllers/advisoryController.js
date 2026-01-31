const AdvisoryRule = require("../models/AdvisoryRule");
const AdvisoryHistory = require("../models/AdvisoryHistory");

// Helper to normalize text
const normalize = (text) => text.trim().toLowerCase();

// Admin adds rule
exports.addRule = async (req, res) => {
  try {
    const { crop, soil, stage, advice } = req.body;

    const rule = await AdvisoryRule.create({
      crop: normalize(crop),
      soil: normalize(soil),
      stage: normalize(stage),
      advice,
    });

    res.json({ message: "Rule added successfully", rule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Farmer gets advice
exports.getAdvice = async (req, res) => {
  try {
    const { crop, soil, stage, farmerId } = req.body;

    const rule = await AdvisoryRule.findOne({
      crop: normalize(crop),
      soil: normalize(soil),
      stage: normalize(stage),
    });

    if (!rule) {
      return res.json({ message: "No advice found" });
    }

    await AdvisoryHistory.create({
      farmerId,
      crop: normalize(crop),
      soil: normalize(soil),
      stage: normalize(stage),
      advice: rule.advice,
    });

    res.json(rule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// History
exports.getHistory = async (req, res) => {
  try {
    const history = await AdvisoryHistory.find({
      farmerId: req.params.farmerId,
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
