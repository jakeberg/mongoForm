const mongoose = require('mongoose');
const assert = require('assert');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './public/views')

const responseSchema = mongoose.Schema({
    user: String,
    userEmail: String,
    attending: String
});

const Response = mongoose.model('Response', responseSchema);

app.get('/', function (req, res) {
    res.statusCode = 200;

    res.render('index', {
        header: 'Mongoose Form'
    })
})

app.get('/guest', function (req, res) {


// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Response.find({}, function (err, going) {
    if (err) return handleError(err);
  console.log(responses.name);
  });
    res.send()
})

app.post('/reply', function (req, res) {
    res.statusCode = 200;
    var name = req.body.name
    var email = req.body.email
    var going = req.body.attending

    var userResponse = new Response({user: name, userEmail: email, attending: going})

    userResponse.save(function (err, userResponse) {
        if (err) res.end(err);
        res.send("<a href='/guest'> guest list </a>");
      });
})

app.listen(port, () => mongoose.connect('mongodb://localhost/rsvp'));

