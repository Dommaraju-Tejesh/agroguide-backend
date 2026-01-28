const AdvisoryRule = require("../models/AdvisoryRule");

// Admin adds rule
exports.addRule = async (req, res) => {
    const rule = await AdvisoryRule.create(req.body);
    res.json(rule);
};

// Farmer gets advice
exports.getAdvice = async (req, res) => {
    const { crop, soil, stage } = req.body;

    const rule = await AdvisoryRule.findOne({ crop, soil, stage });

    if (!rule) {
        return res.json({ message: "No advice found" });
    }

    res.json(rule);
};
