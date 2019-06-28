const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('341534115873-nclp710qvjvial7e3pqgel110odcrn9s');

const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User Test controller!');
};

exports.verify = function(req, res, next) {
    console.log("Entered");
    client.verifyIdToken({
        idToken: req.params.id,
        audience: '341534115873-nclp710qvjvial7e3pqgel110odcrn9s'}, function (err, user) {
            if (err) return next(err);
            console.log(payload);
        })
  };
  

exports.user_create = function (req, res, next) {
    let user = new User(
        {
            provider: req.body.provider,
            id: req.body.id,
            email: req.body.email,
            name:req.body.name,
            image: req.body.image,
            token: req.body.token,
            idToken: req.body.idToken   
            
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User created successfully')
    })
};

exports.user_details = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};
