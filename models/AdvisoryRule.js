const mongoose = require("mongoose");

const advisoryRuleSchema = new mongoose.Schema({
    crop: String,
    soil: String,
    stage: String,
    advice: String
});

module.exports = mongoose.model("AdvisoryRule", advisoryRuleSchema);
