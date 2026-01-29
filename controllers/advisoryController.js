const AdvisoryRule = require("../models/AdvisoryRule");
const AdvisoryHistory = require("../models/AdvisoryHistory");

// ✅ Admin adds rule
exports.addRule = async (req, res) => {
  try {
    const rule = await AdvisoryRule.create(req.body);
    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: "Error adding rule", error: err.message });
  }
};

// ✅ Farmer gets advice + save history
exports.getAdvice = async (req, res) => {
  try {
    const { crop, soil, stage, farmerId } = req.body;

    const rule = await AdvisoryRule.findOne({ crop, soil, stage });

    if (!rule) {
      return res.json({ message: "No advice found" });
    }

    // ⭐ Save history
    await AdvisoryHistory.create({
      farmerId,
      crop,
      soil,
      stage,
      advice: rule.advice,
    });

    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: "Error getting advice", error: err.message });
  }
};

// ✅ Get farmer history
exports.getHistory = async (req, res) => {
  try {
    const history = await AdvisoryHistory.find({
      farmerId: req.params.id,
    }).sort({ date: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message });
  }
};

