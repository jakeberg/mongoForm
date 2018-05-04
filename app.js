const mongoose = require('mongoose');
const assert = require('assert');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './public/views')

const responseSchema = mongoose.Schema({
    user: String,
    userEmail: String,
    attending: String,
    guests: String
});

const Response = mongoose.model('Response', responseSchema);

let attending = [];
let notAttending = [];
let numberAttending = [];

app.get('/', function (req, res) {
    res.statusCode = 200;

    res.render('index', {
        header: 'Mongoose Form'
    })
})

app.get('/guest', function (req, res) {
    
    Response.find(function (err, going) {
        if (err) return handleError(err);
        // console.log(going)
        // console.log(going.user)
        for(let reservation of going) {
            if (reservation.attending == "I'll be there!") {
                attending.push(reservation.user)
                numberAttending.push(reservation.guests)
            } else {
                notAttending.push(reservation.user)
            }
        }
        res.render('guest', {
            attending,
            notAttending,
            numberAttending

        })
      });
})

app.post('/reply', function (req, res) {
    res.statusCode = 200;
    const name = req.body.name;
    const email = req.body.email;
    const going = req.body.attending;
    const guestCount = req.body.numberOfGuests;

    const userResponse = new Response({user: name, userEmail: email, attending: going, guests: guestCount})

    userResponse.save(function (err, userResponse) {
        if (err) res.end(err);
        res.send("<a href='/guest'> guest list </a>");
      });
})

const DB_USER = "jake";
const DB_PASSWORD = "19181716";
const DB_URI = `ds115360.mlab.com:15360`
const DB_NAME = "rsvp"

app.listen(port, () => mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URI}/${DB_NAME}`));

