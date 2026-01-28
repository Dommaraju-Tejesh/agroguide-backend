const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    farmerId: String,
    question: String,
    reply: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Question", questionSchema);
