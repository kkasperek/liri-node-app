// npm install dotenv, request, moment, node-spotify-api
require("dotenv").config()

var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

/* COMMANDS...
    concert-this
    spotify-this-song
    movie-this
    do-what-it-says
*/

//1.) node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API 

let command = process.argv[2];

function concertThis() {
    let artist = process.argv[3];
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        console.log(response.statusCode, "<- should be 200");

        let JSONResponse = JSON.parse(body);
        console.log(JSONResponse);
    });

    /*OUTPUT...
        Name of the venu
        Venue location
        Date of the Event (use moment to format this as "MM/DD/YYYY")
    */
}
concertThis(command);

//---------------------------------------------------------------------------
//2.) node liri.js spotify-this-song '<song name here>'

//---------------------------------------------------------------------------
//3.) node liri.js movie-this '<movie name here>'
let movieName = process.argv[2];
let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

request(queryURL, function (error, response, body) {
    if (error) console.log(error);

    let JSONResponse = JSON.parse(body);
    console.log('Movie Title: ' + JSONResponse.Title +
        '\n Year: ' + JSONResponse.Year +
        '\n IMDB Rating: ' + JSONResponse.imdbRating +
        '\n Rotten Tomatoes Rating: ' + JSONResponse.Year +
        '\n Country: ' + JSONResponse.Country +
        '\n Language: ' + JSONResponse.Language +
        '\n Plot: ' + JSONResponse.Plot +
        '\n Actors: ' + JSONResponse.Actors +
        '-------------------------------------'
    );
});

//---------------------------------------------------------------------------
//4.) node liri.js do-what-it-says
var fs = require("fs");
fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error);
    }
    console.log(data);

    var dataArr = data.split(",");
    console.log(dataArr);

});
//---------------------------------------------------------------------------