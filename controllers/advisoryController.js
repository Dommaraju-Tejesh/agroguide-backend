const AdvisoryRule = require("../models/AdvisoryRule");
const AdvisoryHistory = require("../models/AdvisoryHistory");

// Admin adds rule
exports.addRule = async (req, res) => {
    const rule = await AdvisoryRule.create(req.body);
    res.json(rule);
};

// Farmer gets advice
exports.getAdvice = async (req, res) => {
    try {
        const { crop, soil, stage, farmerId } = req.body;

        const rule = await AdvisoryRule.findOne({
            crop: { $regex: new RegExp(crop, "i") },
            soil: { $regex: new RegExp(soil, "i") },
            stage: { $regex: new RegExp(stage, "i") }
        });

        if (!rule) {
            return res.json({ message: "No advice found" });
        }

        await AdvisoryHistory.create({
            farmerId,
            crop,
            soil,
            stage,
            advice: rule.advice
        });

        res.json({ advice: rule.advice });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Farmer advisory history
exports.getHistory = async (req, res) => {
    const history = await AdvisoryHistory
        .find({ farmerId: req.params.farmerId })
        .sort({ createdAt: -1 });

    res.json(history);
};

