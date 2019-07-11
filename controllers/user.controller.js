const {OAuth2Client} = require('google-auth-library');
const mongoose = require('mongoose');

const client = new OAuth2Client('939928615748-a4q3gq6pjuhjmptrfu4vanhinqh1i9do.apps.googleusercontent.com');

const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User Test controller!');
};

exports.verify = function(req, res, next) {
    let payload;
    client.verifyIdToken({
        idToken: req.params.idToken,
        audience: '939928615748-a4q3gq6pjuhjmptrfu4vanhinqh1i9do.apps.googleusercontent.com'}, function (err, ticket) {
            if (err) return next(err);
            payload = ticket.getPayload();
            res.send(payload);
        })
 
  };
  

// use payload data to save in the db
exports.user_create = function (req, res, next) {
    let user = new User(
        {
            _id: new mongoose.Types.ObjectId(),
            id: req.body.id,
            email: req.body.email,
            name:req.body.name,
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            image: req.body.image,
            token: req.body.token,
            locale: req.body.locale,
        }
    );
    user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.send(user._id)
    })
};

exports.user_details = function (req, res, next) {
    User.findOne({id:req.params.id}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};
