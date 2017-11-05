const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const token = 'MlvJIUxOmBpoAJdKygFfZaSMYUIJzTjvmDBVXBrw';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {song: null, error: null});
});

app.post('/', function (req, res) {
    let mood = req.body.mood;
    console.log(mood);
    let options = {
        url: `https://api.discogs.com/database/search?genre=${mood}&token=${token}`,
        headers: {
            'User-Agent': 'GeetikaAppTest'
        }
    };

    request(options, function (err, response, body) {
        if(err){
            console.log(err);
            res.render('index', {song: null, error: 'Error, please try again'});
        } else {
            let song = JSON.parse(body);
            console.log(song);
            if(song.main == undefined){
                res.render('index', {song: null, error: 'Error, please try again'});
            } else {
                //let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {song: song, error: null});
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000.')
})