const Question = require("../models/Question");

// Farmer asks
exports.askQuestion = async (req, res) => {
    const q = await Question.create(req.body);
    res.json(q);
};

// Admin replies
exports.replyQuestion = async (req, res) => {
    const { id, reply } = req.body;

    const q = await Question.findByIdAndUpdate(id, { reply }, { new: true });
    res.json(q);
};

// Farmer views his questions
exports.getFarmerQuestions = async (req, res) => {
    const data = await Question.find({ farmerId: req.params.farmerId });
    res.json(data);
};
