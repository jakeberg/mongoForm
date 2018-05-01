const mongoose = require('mongoose');
const assert = require('assert');
const express = require('express');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/rsvp');

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './public/views')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var responses = mongoose.Schema({
    user: String,
    userEmail: String
});

app.get('/index', function (req, res) {
    res.statusCode = 200;

    res.render('index', {
        header: 'Mongoose Form'
    })
})

app.post('/reply', function (req, res) {
    res.statusCode = 200;
    var name = req.body.name
    var email = req.body.email

    var userResponses = mongoose.model('users', responses);
    var userResponse = new userResponses({user: name, userEmail: email})
    userResponse.save(function (err, userResponse) {
        if (err) return console.error(err);
      });
})

app.listen(port)