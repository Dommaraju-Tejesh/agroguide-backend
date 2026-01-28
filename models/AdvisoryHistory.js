const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    farmerId: String,
    crop: String,
    soil: String,
    stage: String,
    advice: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AdvisoryHistory", historySchema);
