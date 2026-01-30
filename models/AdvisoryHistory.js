const mongoose = require("mongoose");

const advisoryHistorySchema = new mongoose.Schema({
    farmerId: String,
    crop: String,
    soil: String,
    stage: String,
    advice: String
}, { timestamps: true });

module.exports = mongoose.model("AdvisoryHistory", advisoryHistorySchema);
