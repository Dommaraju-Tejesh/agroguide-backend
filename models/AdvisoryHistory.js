const mongoose = require("mongoose");

const advisoryHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  crop: String,
  soil: String,
  season: String,
  advice: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AdvisoryHistory", advisoryHistorySchema);
