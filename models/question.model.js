const mongoose = require('mongoose');
const User = require('../models/user.model');
const Schema = mongoose.Schema;

let OptionSchema = new Schema({
    isCorrect: {type: Boolean, required: true},
    body: {type: String, required: true}
});

let QuestionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    questionType: {type: String, required: true},
    difficultyLevel: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    body: {type: String, required: true},
    explanation: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // createdById: {type: String, required: true},
    // createdByName: {type: String, required: true},
    // createdByImage: {type: String, required: true},
    createdAt: {type: Date, required: true},
    options: [{
        isCorrect: {type: Boolean, required: true},
        body: {type: String, required: true}
    }]
});




// Export the model
module.exports = mongoose.model('Question', QuestionSchema);
// module.exports = mongoose.model('Option', OptionSchema);