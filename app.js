// app.js
const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const question = require('./routes/question.route'); // Imports routes for the questions
var cors = require('cors')
const app = express();
app.use(cors())

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://dsjambekar:repobackend123@cluster0-7bb46.mongodb.net/test?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/questions', question);

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});