const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OptionSchema = new Schema({
    isCorrect: {type: Boolean, required: true},
    body: {type: String, required: true}
});

let QuestionSchema = new Schema({
    questionType: {type: String, required: true},
    difficultyLevel: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    body: {type: String, required: true},
    explanation: {type: String, required: true},
    createdBy: {type: String, required: true},
    createdAt: {type: String, required: true},
    //options: {type: [OptionSchema], required:false}
});




// Export the model
module.exports = mongoose.model('Question', QuestionSchema);
//module.exports = mongoose.model('Option', OptionSchema);