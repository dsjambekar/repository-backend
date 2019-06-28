const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    provider:  {type: String, required: true},
    id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    token:{type: String},
    idToken:{type: String},
});


// Export the model
module.exports = mongoose.model('User', UserSchema);