const Question = require('../models/question.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Question Test controller!');
};

exports.question_create = function (req, res, next) {
    let question = new Question(
        {
            questionType: req.body.questionType,
            difficultyLevel: req.body.difficultyLevel,
            isPublic: req.body.isPublic,
            body: req.body.body,
            explanation: req.body.explanation,
            createdBy: req.body.createdBy,
            createdAt: req.body.createdAt,
            options: req.body.options          
            
        }
    );


    // var myArray = new Array();

    // for (var i = 0; i < req.body.options.length; i++) {
    //     var optionObject = req.body.options;
    //     myArray.push(optionObject);
    // }

    //   question.options = myArray;

    //  return next (req.body.options.length);


    question.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Question Created successfully')
    })
};

exports.question_details = function (req, res, next) {
    Question.findById(req.params.id, function (err, question) {
        if (err) return next(err);
        res.send(question);
    })
};

exports.question_list_by_user = function (req, res, next) {
    Question.find({}).sort({createdAt: -1}).find({createdBy:req.params.user}, function (err, question) {
        if (err) return next(err);
        res.send(question);
    })
};

exports.question_list = function (req, res, next) {
    Question.find({}).sort({createdAt: -1}).find({isPublic:true}, function (err, question) {
        if (err) return next(err);
        res.send(question);
    })
};

exports.question_update = function (req, res, next) {
    Question.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, question) {
        if (err) return next(err);
        res.send('Question udpated.');
    });
};

exports.question_delete = function (req, res, next) {
    Question.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

