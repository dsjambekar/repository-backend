const Question = require('../models/question.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Shree Ganeshay Namaha!');
};

exports.question_create = function (req, res, next) {
    let question = new Question(
        {
            _id: new mongoose.Types.ObjectId(),
            questionType: req.body.questionType,
            difficultyLevel: req.body.difficultyLevel,
            isPublic: req.body.isPublic,
            body: req.body.body,
            explanation: req.body.explanation,
            user: req.body.createdBy,
            createdAt: req.body.createdAt,
            options: req.body.options          
        }
    );

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
    Question.
    find({}).
    sort({createdAt: -1}).
    populate({
        path: 'user',
        match: { _id: req.params.user},
      }).
    exec(function (err, question) {
        if (err) return next(err);
        res.send(question);
    });
};

exports.question_list = function (req, res, next) {
    Question.
        find({}).
        sort({createdAt: -1}).
        populate('user').
        find({isPublic:true}).
        exec(function (err, question) {
            if (err) return next(err);
            res.send(question);
        });
};

exports.filter_question_list = function (req, res, next) {
    Question.
        find({ 'body': { $regex: req.body.searchText, $options: 'i' } }).
        find({ 'questionType': { $regex: req.body.questionType, $options: 'i' } }).
        find({ 'difficultyLevel': { $regex: req.body.difficultyLevel, $options: 'i' } }).
        sort({createdAt: -1}).
        populate('user').
        find({isPublic:true}).
        exec(function (err, question) {
            if (err) return next(err);
            res.send(question);
        });
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

